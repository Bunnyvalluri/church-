import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// Create an OpenAI API client pointing to OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
  defaultHeaders: {
    "HTTP-Referer": "https://kingdomofchrist.org",
    "X-Title": "KCM Church Assistant",
  }
});

// Simple In-Memory Rate Limiter to protect AI tokens
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 messages per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRate = rateLimitMap.get(ip);

  if (!userRate || now - userRate.lastReset > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }
  if (userRate.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  userRate.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Security
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please wait a minute before sending more messages." }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = await req.json();

    // 2. Payload Validation: Prevent massive context arrays to save tokens
    if (!messages || !Array.isArray(messages) || messages.length > 20) {
      return new Response(
        JSON.stringify({ error: "Invalid conversation history. Conversation too long." }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001', 
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are a helpful, spiritual, and welcoming assistant for Kingdom of Christ Ministries (KCM) church. 
Your goal is to help answer questions about service times, locations, prayer, ministries, events, etc.
Address: H.No. 15-201, Vivekananda Nagar, J.P. Road, Hafeezpet, Hyderabad - 55.
Senior Pastor: Gangareddy (B.Th.)
Contact Numbers: 97040 90069, 73964 33856, 99664 30999, 96409 43777
Sunday Services: 5:45 AM (Watch Tower), 8:30 AM (Sunday Service), 10:30 AM (Youth Service). Senior Pastor Special Message at 10:00 AM.
Weekly Meetings: Wednesday 6:30 PM (Prayer), Thursday 7:00 AM & 10:00 AM (Fasting Prayer), Saturday 6:30 PM (Special Meeting).
Monthly Meetings: 3rd Friday 4:00 PM (Healing Worship), 1st Sunday (Baptisms).

MULTILINGUAL SUPPORT:
- If the user speaks Telugu, you MUST reply in Telugu (తెలుగు).
- If the user speaks Hindi, you MUST reply in Hindi (हिंदी).
- Always be polite, encouraging, and use a spiritual tone (God bless you, Praise the Lord).`
        },
        ...messages
      ]
    });

    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: 'I apologize, I am having trouble connecting right now. Please try again later.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
