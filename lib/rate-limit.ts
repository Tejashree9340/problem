import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(request: NextRequest, limit = 60, windowMs = 60_000) {
  const key = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) { buckets.set(key, { count: 1, resetAt: now + windowMs }); return null; }
  current.count += 1;
  if (current.count > limit) return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429, headers: { 'Retry-After': String(Math.ceil((current.resetAt - now) / 1000)) } });
  return null;
}
