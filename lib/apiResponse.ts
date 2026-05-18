import { NextResponse } from 'next/server';

// ── Standard success response ────────────────────────────────────────────────
export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

// ── Standard error response ──────────────────────────────────────────────────
export function err(message: string, status = 500, details?: unknown) {
  // Clamp status to valid HTTP range
  const safeStatus = Number.isInteger(status) && status >= 100 && status <= 599
    ? status
    : 500;

  return NextResponse.json(
    { success: false, error: message, ...(details !== undefined ? { details } : {}) },
    { status: safeStatus }
  );
}

// ── Extract real client IP (handles proxies, Cloudflare, Vercel edge) ─────────
export function getClientIp(req: Request): string {
  // Priority: Cloudflare → Vercel/proxy x-forwarded-for → x-real-ip → fallback
  const cf = req.headers.get('cf-connecting-ip');
  if (cf?.trim()) return cf.trim();

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp?.trim()) return realIp.trim();

  return 'unknown';
}

// ── Safely parse JSON body (guards against malformed payloads) ───────────────
export async function safeJson<T>(req: Request): Promise<T | null> {
  try {
    const contentType = req.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) return null;

    const text = await req.text();
    if (!text?.trim()) return null; // empty body

    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

// ── Paginated response with input validation ──────────────────────────────────
/**
 * DSA note: totalPages = ceil(total / pageSize).
 * Guards against division-by-zero and negative inputs.
 */
export function paginated<T>(
  data: T[],
  total: number,
  page: number,
  pageSize: number
) {
  // Input validation — prevent division by zero and nonsensical values
  const safePage     = Math.max(1, Math.floor(page));
  const safePageSize = Math.max(1, Math.min(100, Math.floor(pageSize))); // cap at 100
  const safeTotal    = Math.max(0, Math.floor(total));
  const totalPages   = safeTotal === 0 ? 0 : Math.ceil(safeTotal / safePageSize);
  const hasNext      = safePage < totalPages;
  const hasPrev      = safePage > 1;

  return NextResponse.json({
    success: true,
    data,
    meta: {
      total:      safeTotal,
      page:       safePage,
      pageSize:   safePageSize,
      totalPages,
      hasNext,
      hasPrev,
    },
  });
}

// ── No-content response (204) ─────────────────────────────────────────────────
export function noContent() {
  return new Response(null, { status: 204 });
}

// ── Method not allowed (405) with Allow header ────────────────────────────────
export function methodNotAllowed(allowed: string[]) {
  return NextResponse.json(
    { success: false, error: 'Method Not Allowed' },
    {
      status: 405,
      headers: { Allow: allowed.join(', ') },
    }
  );
}
