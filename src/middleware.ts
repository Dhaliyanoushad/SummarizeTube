import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define your public route matcher
const isPublicRoute = createRouteMatcher(["/test,/dashboard"]);

// Define the default exported middleware function
export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    await auth.protect();
  }
});
