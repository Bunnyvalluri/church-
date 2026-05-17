/**
 * Shared in-memory rate limiter.
 * For production with multiple instances, replace with Upstash Redis.
 */
type RateEntry = { count: number; lastReset: number };

const store = new Map<string, RateEntry>();

interface RateLimitOptions {
  windowMs: number;   // time window in ms
  maxRequests: number; // max requests per window
}

export function isRateLimited(ip: string, opts: RateLimitOptions): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now - entry.lastReset > opts.windowMs) {
    store.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (entry.count >= opts.maxRequests) return true;

  entry.count += 1;
  return false;
}

/** Returns headers to include in rate-limited responses */
export function rateLimitHeaders(ip: string, opts: RateLimitOptions) {
  const entry = store.get(ip);
  const remaining = entry ? Math.max(0, opts.maxRequests - entry.count) : opts.maxRequests;
  const reset = entry ? Math.ceil((entry.lastReset + opts.windowMs) / 1000) : 0;
  return {
    'X-RateLimit-Limit': String(opts.maxRequests),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(reset),
  };
}
