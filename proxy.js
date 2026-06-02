import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api/auth (authentication endpoints)
     */
    '/((?!_next/static|_next/image|favicon.ico|login|api/auth/register|public).*)',
  ],
};

const publicRoutes = ['/login', '/forgot-password'];
const protectedRoutes = ['/main'];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token');

  const isValid = token ? await verifyToken() : false;

  if (isProtectedRoute(pathname) && !isValid) {
    return redirectToLogin(request, pathname);
  }
}

function isProtectedRoute(pathname) {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

function isAuthRoute(pathname) {
  return publicRoutes.some(route => pathname === route);
}

function redirectToLogin(request, returnUrl) {
  const url = new URL('/login', request.url);
  url.searchParams.set('from', returnUrl);
  return NextResponse.redirect(url);
}

export async function verifyToken() {
  return true;
}
