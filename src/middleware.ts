import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/signin",
  "/signup",
  "/test",
  "/api/transcript",
  "/api/summarize",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth(); // ✅ correct way to get userId

  if (!isPublicRoute(req)) {
    if (!userId) {
      const signInUrl = new URL("/signup", req.url);
      signInUrl.searchParams.set("redirect_url", req.nextUrl.pathname); // ✅ correct key
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // ignore _next and static assets
};
