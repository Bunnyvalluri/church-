import { NextResponse } from 'next/server';

export async function GET() {
  // Return empty session for now (will be implemented with NextAuth)
  return NextResponse.json({ user: null });
}
