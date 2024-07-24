/*import { NextResponse } from "next/server";

//custom middleware
export function middleware(request) {
  console.log(request);
  // infinity loop redirect to /about if no matcher in config
   return NextResponse.redirect(new URL("/about", request.url));
}*/

import { auth } from '@/app/_lib/auth';
export const middleware = auth;

//if url match /account redirect to /about
export const config = {
  matcher: ['/account'], // here protected pages
};
