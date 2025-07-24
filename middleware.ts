import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle case-insensitive routing for Yoruba Word Master
  if (pathname.toLowerCase() === '/yoruba-word-master' && pathname !== '/yoruba-word-master') {
    return NextResponse.redirect(new URL('/yoruba-word-master', request.url));
  }
  
  // Handle other potential case variations
  if (pathname.toLowerCase() === '/yoruba-wordle' && pathname !== '/yoruba-wordle') {
    return NextResponse.redirect(new URL('/yoruba-word-master', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 