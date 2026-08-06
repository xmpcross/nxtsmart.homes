import { NextRequest, NextResponse } from "next/server";
import { LEGACY_POST_ID_REDIRECTS } from "@/lib/legacyRedirects";
import { RETIRED_POST_REDIRECTS } from "@/lib/retiredPosts";

const SITE_ORIGIN = "https://nxtsmart.homes";

const EXACT_REDIRECTS: Record<string, string> = {
  // Retired draft. Its layout is now the homepage, so send it there rather than
  // 404 — it was noindex, but anyone holding the link should still land somewhere.
  "/home-draft-2": "/",
  "/contact-us": "/contact",
  "/about-us-find-the-top-smart-home-devices-expert-guides": "/about",
  "/privacy-policy": "/legal/privacy",
  "/terms-of-use": "/legal/terms",
  "/category/how-to-guides": "/how-to-guides",
  "/category/informative-articles": "/informative-articles",
  "/category/product-comparisons": "/product-comparisons",
  "/category/product-reviews": "/product-reviews",
  "/category/smart-home-automation": "/smart-home-automation",
  "/category/smart-home-devices": "/smart-home-devices",
  "/category/smart-home-energy": "/smart-home-energy",
  "/category/smart-home-entertainment": "/smart-home-entertainment",
  "/category/smart-home-integration": "/smart-home-integration",
  "/category/smart-home-security": "/smart-home-security",
  "/category/top-rated": "/top-rated",
};

const GONE_PATHS = new Set([
  "/category/coupons-and-deals",
  "/category/uncategorized",
  "/checkout",
  "/shop",
  "/wishlist",
  "/compare-products",
  "/ccpa-california-consumer-privacy-act",
  "/dmca-protect-your-rights",
]);

function cleanPath(pathname: string) {
  if (pathname !== "/" && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function redirectTo(request: NextRequest, target: string) {
  const url = new URL(target, SITE_ORIGIN);
  if (request.nextUrl.search) url.search = "";
  return NextResponse.redirect(url, 301);
}

function gone() {
  return new NextResponse("Gone", { status: 410, headers: { "content-type": "text/plain; charset=utf-8" } });
}

export function middleware(request: NextRequest) {
  const pathname = cleanPath(request.nextUrl.pathname);
  if (request.nextUrl.pathname !== pathname) return redirectTo(request, pathname);

  if (pathname === "/" && request.nextUrl.searchParams.has("p")) {
    const target = LEGACY_POST_ID_REDIRECTS[request.nextUrl.searchParams.get("p") as keyof typeof LEGACY_POST_ID_REDIRECTS];
    return target ? redirectTo(request, target) : gone();
  }

  const exactTarget = EXACT_REDIRECTS[pathname];
  if (exactTarget) return redirectTo(request, exactTarget);
  const retiredTarget = RETIRED_POST_REDIRECTS[pathname];
  if (retiredTarget) return redirectTo(request, retiredTarget);

  if (pathname.startsWith("/author/") && pathname !== "/author/kspellman") return redirectTo(request, "/about");
  if (pathname.startsWith("/product-category/smart-home")) return redirectTo(request, "/smart-home-devices");
  if (pathname.startsWith("/product-tag/")) return gone();
  if (GONE_PATHS.has(pathname)) return gone();

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)"],
};
