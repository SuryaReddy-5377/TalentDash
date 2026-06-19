import { NextResponse } from 'next/server';

export function proxy(request: Request) {
  // Simple check - allow all pages for now
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};