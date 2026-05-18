import { NextResponse } from 'next/server';
import { getClientIp } from '@/lib/apiResponse';

// ── GET /api/auth/session ─────────────────────────────────────────────────────
// Returns current user session from Firebase ID token (sent as Authorization header)
// Client calls: fetch('/api/auth/session', { headers: { Authorization: `Bearer ${token}` } })
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    // No token provided — unauthenticated session
    if (!token) {
      return NextResponse.json({ user: null, authenticated: false }, { status: 200 });
    }

    // NOTE: Full server-side Firebase Admin token verification requires
    // firebase-admin SDK. For now, we return a trusted client-side state.
    // To enable server-side verification, add FIREBASE_ADMIN_SERVICE_ACCOUNT
    // to your env and uncomment the verification block below.

    /*
    import { adminAuth } from '@/lib/firebaseAdmin';
    const decoded = await adminAuth.verifyIdToken(token);
    return NextResponse.json({
      authenticated: true,
      user: {
        uid: decoded.uid,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      },
    });
    */

    return NextResponse.json({
      authenticated: true,
      user: null, // populated when firebase-admin is wired up
      note: 'Token received — server-side verification pending firebase-admin setup',
    });

  } catch (err) {
    console.error('[AUTH/SESSION] Error:', err);
    return NextResponse.json({ user: null, authenticated: false }, { status: 500 });
  }
}

// ── DELETE /api/auth/session — server-side logout hook ───────────────────────
export async function DELETE(req: Request) {
  const ip = getClientIp(req);
  console.log(`[AUTH/SESSION] Logout from IP: ${ip}`);
  // When firebase-admin is set up, revoke refresh tokens here
  return NextResponse.json({ success: true, message: 'Logged out' });
}
