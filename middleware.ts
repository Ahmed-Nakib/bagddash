import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(req: NextRequest) {
// Example: redirect if trying to access /admin and no token cookie
const token = req.cookies.get('token')?.value;
if (req.nextUrl.pathname.startsWith('/admin')) {
if (!token) return NextResponse.redirect(new URL('/login', req.url));
}
return NextResponse.next();
}


export const config = { matcher: ['/admin/:path*', '/dashboard/:path*'] };