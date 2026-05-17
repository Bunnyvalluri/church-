import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

// 1. Zod Schema for strong input validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().max(20, "Phone number is too long").optional().nullable(),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
});

// 2. Simple In-Memory Rate Limiter (For demonstration; in production use Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

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
    // 3. Apply Rate Limiting
    // In Next.js App Router, we can approximate IP from headers, though x-forwarded-for is best if behind a proxy
    const ip = req.headers.get("x-forwarded-for") || "unknown-ip";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 4. Validate input using Zod
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Map Zod errors to a more readable format
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = validationResult.data;

    // 5. Attempt to save to database with proper error propagation
    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          phone: phone || null,
          subject,
          message,
        },
      });
      console.log(`[CONTACT FORM] Message saved from ${name} (${email})`);
    } catch (dbError) {
      console.error("[CONTACT FORM] Database Insertion Error:", dbError);
      // DO NOT fail silently in a real backend. Let the client know the system is experiencing issues.
      // Alternatively, push to a fallback queue here (e.g. SQS).
      return NextResponse.json(
        { error: "Failed to save your message due to a server error. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT FORM] Unexpected Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
