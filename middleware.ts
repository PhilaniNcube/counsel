import {  NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";

export async function middleware(request: NextRequest) {
  const supabase = createClient();
  // check if the user is logged in
  const {data:{user}} = await supabase.auth.getUser()


  // if the user is logged in, update the session
  if(user) return await updateSession(request);

  // if the url starts with /dashboard and the user is not logged in, redirect to the login page
  if(!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.nextUrl.origin);
   return NextResponse.redirect(loginUrl);
  };

  return NextResponse.next();

}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
