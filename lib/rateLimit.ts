/**
 * Production-grade in-memory rate limiter with atomic-safe operations.
 *
 * DSA note: Uses a Map for O(1) read/write. The window-based sliding-log
 * approach is approximated here with a fixed window reset (simpler, lower
 * memory). For strict sliding window, replace with a circular queue per IP.
 *
 * For distributed deployments (multiple Vercel instances), replace the
 * `store` with Upstash Redis using @upstash/ratelimit.
 */

// ── Types ─────────────────────────────────────────────────────────────────────
type RateEntry = { count: number; lastReset: number };

export interface RateLimitOptions {
  windowMs: number;    // time window in ms
  maxRequests: number; // max requests allowed per window
}

// ── Module-level store (singleton per serverless instance) ───────────────────
const store = new Map<string, RateEntry>();

// ── Cleanup: prevent memory leak in long-running processes ───────────────────
// Uses a WeakRef-safe pattern so the interval doesn't prevent GC
let _cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanup() {
  if (_cleanupTimer !== null) return; // already running
  if (typeof setInterval === 'undefined') return; // edge runtime guard

  _cleanupTimer = setInterval(() => {
    const now = Date.now();
    const staleThreshold = 10 * 60 * 1000; // 10 minutes

    // O(n) sweep — acceptable since store is bounded by active IPs
    for (const [key, entry] of store.entries()) {
      if (now - entry.lastReset > staleThreshold) {
        store.delete(key);
      }
    }
  }, 10 * 60 * 1000);

  // Allow Node.js to exit even if this timer is pending
  if (typeof _cleanupTimer === 'object' && _cleanupTimer !== null) {
    (_cleanupTimer as NodeJS.Timeout).unref?.();
  }
}

ensureCleanup();

// ── isRateLimited: atomic-safe check-and-increment ───────────────────────────
/**
 * Checks whether `ip` has exceeded its rate limit.
 * Returns true if the request should be blocked.
 *
 * Atomicity guarantee: Map operations in Node.js are synchronous and
 * single-threaded, so there is no true race condition within one instance.
 * However, in a serverless environment multiple instances run in parallel —
 * use Redis for cross-instance atomicity.
 */
export function isRateLimited(ip: string, opts: RateLimitOptions): boolean {
  if (!ip || opts.maxRequests <= 0 || opts.windowMs <= 0) return false;

  const now = Date.now();
  const entry = store.get(ip);

  // Window expired or first request → reset counter
  if (!entry || now - entry.lastReset > opts.windowMs) {
    store.set(ip, { count: 1, lastReset: now });
    return false; // first request in new window — always allowed
  }

  // Already at/over limit — reject BEFORE incrementing (avoids overflow)
  if (entry.count >= opts.maxRequests) {
    return true;
  }

  // Safe to increment — still within limit
  entry.count += 1;
  // Mutate in-place (Map still holds same reference, no re-set needed)
  return false;
}

// ── Standard rate limit response headers (RFC 6585 / IETF draft) ─────────────
export function rateLimitHeaders(
  ip: string,
  opts: RateLimitOptions
): Record<string, string> {
  const entry = store.get(ip);
  const now = Date.now();

  const remaining = entry
    ? Math.max(0, opts.maxRequests - entry.count)
    : opts.maxRequests;

  const resetEpochSec = entry
    ? Math.ceil((entry.lastReset + opts.windowMs) / 1000)
    : Math.ceil((now + opts.windowMs) / 1000);

  const retryAfterSec = entry
    ? Math.max(0, Math.ceil((entry.lastReset + opts.windowMs - now) / 1000))
    : 0;

  return {
    'X-RateLimit-Limit':     String(opts.maxRequests),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset':     String(resetEpochSec),
    'X-RateLimit-Policy':    `${opts.maxRequests};w=${Math.floor(opts.windowMs / 1000)}`,
    ...(remaining === 0 ? { 'Retry-After': String(retryAfterSec) } : {}),
  };
}

// ── Diagnostic: get current status without modifying state ───────────────────
export function getRateLimitStatus(ip: string, opts: RateLimitOptions) {
  const entry = store.get(ip);
  const now = Date.now();

  if (!entry || now - entry.lastReset > opts.windowMs) {
    return {
      limited:   false,
      remaining: opts.maxRequests,
      resetIn:   opts.windowMs,
      count:     0,
    };
  }

  const remaining = Math.max(0, opts.maxRequests - entry.count);
  const resetIn   = Math.max(0, opts.windowMs - (now - entry.lastReset));

  return {
    limited:   remaining === 0,
    remaining,
    resetIn,
    count:     entry.count,
  };
}

// ── Store size (for monitoring/observability) ─────────────────────────────────
export function getRateLimitStoreSize(): number {
  return store.size;
}
