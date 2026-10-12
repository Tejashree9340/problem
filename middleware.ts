import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPrefixes = ['/journey', '/review', '/heaven', '/admin', '/attempts'];

export function middleware(request: NextRequest) {
  const needsSession = protectedPrefixes.some((prefix) => request.nextUrl.pathname.startsWith(prefix));
  if (needsSession && !request.cookies.get('problem_coffin_user')?.value) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/journey/:path*', '/review/:path*', '/heaven/:path*', '/admin/:path*', '/attempts/:path*'] };
