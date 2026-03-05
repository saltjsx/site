import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import type { ShortLink } from "@/lib/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function middleware(req: NextRequest) {
  const slug = req.nextUrl.pathname.slice(1);
  if (!slug) return NextResponse.next();

  const link = await redis.get<ShortLink>(`link:${slug}`);
  if (link) {
    return NextResponse.redirect(link.url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Only run on root-level paths that could be short links.
     * Exclude Next.js internals, static files, API routes, and known pages.
     */
    "/((?!_next|api|favicon\\.ico|.*\\..*|shortener|blog|about|links|twitter|github|youtube|discord|portal).*)",
  ],
};
