/**
 * Production-grade in-memory rate limiter with auto-cleanup.
 *
 * For distributed deployments (multiple Vercel instances), replace
 * the `store` with Upstash Redis using @upstash/ratelimit.
 */

type RateEntry = { count: number; lastReset: number };

const store = new Map<string, RateEntry>();

export interface RateLimitOptions {
  windowMs: number;    // time window in ms
  maxRequests: number; // max requests per window
}

// ── Auto-cleanup stale entries every 10 minutes ──────────────────────────────
// Prevents memory leak in long-running server processes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now - entry.lastReset > 10 * 60 * 1000) {
        store.delete(key);
      }
    }
  }, 10 * 60 * 1000);
}

// ── Check and record a request for the given IP ──────────────────────────────
export function isRateLimited(ip: string, opts: RateLimitOptions): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  // First request or window expired → reset
  if (!entry || now - entry.lastReset > opts.windowMs) {
    store.set(ip, { count: 1, lastReset: now });
    return false;
  }

  // Over limit
  if (entry.count >= opts.maxRequests) return true;

  // Within window, increment
  entry.count += 1;
  store.set(ip, entry);
  return false;
}

// ── Standard rate limit response headers ─────────────────────────────────────
export function rateLimitHeaders(ip: string, opts: RateLimitOptions) {
  const entry = store.get(ip);
  const remaining = entry
    ? Math.max(0, opts.maxRequests - entry.count)
    : opts.maxRequests;
  const resetEpochSec = entry
    ? Math.ceil((entry.lastReset + opts.windowMs) / 1000)
    : Math.ceil((Date.now() + opts.windowMs) / 1000);

  return {
    'X-RateLimit-Limit': String(opts.maxRequests),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(resetEpochSec),
  };
}

// ── Get remaining requests for an IP (for diagnostics) ───────────────────────
export function getRateLimitStatus(ip: string, opts: RateLimitOptions) {
  const entry = store.get(ip);
  if (!entry || Date.now() - entry.lastReset > opts.windowMs) {
    return { limited: false, remaining: opts.maxRequests, resetIn: opts.windowMs };
  }
  const remaining = Math.max(0, opts.maxRequests - entry.count);
  const resetIn = Math.max(0, opts.windowMs - (Date.now() - entry.lastReset));
  return { limited: remaining === 0, remaining, resetIn };
}
