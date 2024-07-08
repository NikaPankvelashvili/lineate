import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { getSession } from "@auth0/nextjs-auth0/edge";

function isPathProtected(pathName: string) {
  const protectedRoutes = [
    "/profile",
    "/cart",
    "/checkout",
    "/admin"
  ];

  for (const route of protectedRoutes) {
    if (pathName.startsWith(route)) {
      return true;
    }
  }
  return false;
}

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const session = await getSession(request, response);

  const pathName = request.nextUrl.pathname;

  if (!session?.user && isPathProtected(pathName))
    return NextResponse.redirect(new URL("/api/auth/login", request.nextUrl));

  // if (!session?.user?.role.includes("admin") && pathName.startsWith("/admin"))
  //   return NextResponse.redirect(new URL("/", request.nextUrl));

  const I18nMiddleware = createI18nMiddleware({
    locales: ["en", "ka"],
    defaultLocale: "en",
    urlMappingStrategy: "rewrite",
  });

  return I18nMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt).*)",
  ],
};