import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { z } from 'zod';
import { isRateLimited, rateLimitHeaders } from '@/lib/rateLimit';
import { getClientIp, safeJson } from '@/lib/apiResponse';

// ── OpenRouter client ────────────────────────────────────────────────────────
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY ?? '',
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL ?? 'https://church-eight-hazel.vercel.app',
    'X-Title': 'KCM Church Assistant',
  },
});

// ── Validation ───────────────────────────────────────────────────────────────
const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1).max(4000).trim(), // increased limit for long prayers/scripture
});

const chatSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

// ── Rate limit config ────────────────────────────────────────────────────────
const RL_OPTS = { windowMs: 60_000, maxRequests: 10 };

// ── KCM System Prompt ────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a helpful, spiritual, and welcoming assistant for Kingdom of Christ Ministries (KCM), a Christian church in Hyderabad, India.

CHURCH DETAILS:
- Name: Kingdom of Christ Ministries (KCM)
- Address: 15-201, Vivekananda Nagar, Srinivas Nagar, Jeedimetla, Hyderabad, Telangana 500055
- Senior Pastor: Bishop Kurra Kristhu Raju
- Contact: 97040 90069 | 73964 33856 | 99664 30999 | 96409 43777

SERVICE SCHEDULE:
Sunday:
  • 5:45 AM  — Watch Tower (Early Morning Worship)
  • 8:30 AM  — Sunday Service
  • 10:00 AM — Senior Pastor Special Message
  • 10:30 AM — Youth Service

Weekly:
  • Wednesday  6:30 PM — Prayer Meeting
  • Thursday   7:00 AM & 10:00 AM — Fasting Prayer
  • Saturday   6:30 PM — Special Meeting

Monthly:
  • 3rd Friday 4:00 PM — Healing Worship
  • 1st Sunday           — Water Baptism Service

GUIDELINES:
- Be warm, spiritual, and encouraging in every response
- Use phrases like "Praise the Lord", "God bless you", "Hallelujah" naturally
- Keep answers concise but complete
- For prayer requests, offer a short prayer or blessing
- Do NOT make up information not listed above
- If you don't know something, say "Please contact us at 97040 90069"

MULTILINGUAL:
- Detect the user's language automatically
- If Telugu → reply entirely in Telugu (తెలుగు)
- If Hindi  → reply entirely in Hindi (हिंदी)
- If English → reply in English
- Mix languages only if the user mixes them`;

// ── POST /api/chat ────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  // 1. Rate limiting
  const ip = getClientIp(req);
  const rlHeaders = rateLimitHeaders(ip, RL_OPTS);

  if (isRateLimited(ip, RL_OPTS)) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Please wait a minute.' }),
      { status: 429, headers: { 'Content-Type': 'application/json', ...rlHeaders, 'Retry-After': '60' } }
    );
  }

  // 2. Parse body
  const body = await safeJson<unknown>(req);
  if (!body) {
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 3. Validate message shape
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: 'Invalid message format', details: parsed.error.errors }),
      { status: 422, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { messages } = parsed.data;

  // 4. Filter out any injected system messages from client (security)
  const safeMessages = messages.filter((m) => m.role !== 'system');

  // 5. Call AI with streaming
  try {
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      stream: true,
      max_tokens: 800,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...safeMessages,
      ],
    });

    const stream = OpenAIStream(response as Parameters<typeof OpenAIStream>[0]);
    return new StreamingTextResponse(stream, { headers: rlHeaders });

  } catch (error: unknown) {
    const e = error as { message?: string; status?: number };
    console.error('[CHAT] OpenRouter error:', e?.message ?? String(error));

    const status = (typeof e?.status === 'number') ? e.status : 500;
    const message =
      status === 401 ? 'AI service authentication failed. Please contact support.' :
      status === 429 ? 'AI service is busy. Please try again in a moment.' :
      'I am having trouble connecting right now. Please try again later.';

    return new Response(
      JSON.stringify({ error: message }),
      { status, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
