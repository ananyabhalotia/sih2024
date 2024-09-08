import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname === "/") {
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });

    // If there is no session, redirect to the absolute URL
    if (!session) {
      const url = req.nextUrl.clone(); // Clone the current URL
      url.pathname = "/home"; // Set the pathname for redirection
      return NextResponse.redirect(url); // Use the absolute URL
    }
    // If user is authenticated, continue.
  }
  return NextResponse.next(); // Continue if no redirection is needed
}
