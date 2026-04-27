import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Simple validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Attempt to save to database
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
      console.log(`[CONTACT FORM] Message saved from ${name}`);
    } catch (dbError) {
      // Fallback to logging if DB is not connected locally
      console.error("[CONTACT FORM] DB Error, logging to console instead.");
      console.log(`--- NEW MESSAGE FROM: ${name} (${email}) ---`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log(`-------------------------------------------`);
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT FORM] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
