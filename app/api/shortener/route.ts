import { NextRequest, NextResponse } from "next/server";
import { redis, type ShortLink } from "@/lib/redis";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function checkAuth(req: NextRequest) {
  const password = req.headers.get("x-password");
  return password === process.env.SHORTENER_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  const keys = await redis.keys("link:*");
  if (keys.length === 0) return NextResponse.json([]);

  const pipeline = redis.pipeline();
  for (const key of keys) {
    pipeline.get(key);
  }
  const results = await pipeline.exec<ShortLink[]>();

  const links = results
    .filter(Boolean)
    .sort((a, b) => b.createdAt - a.createdAt);

  return NextResponse.json(links);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  const { slug, url } = await req.json();

  if (!slug || !url) {
    return NextResponse.json(
      { error: "slug and url are required" },
      { status: 400 }
    );
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { error: "slug must be lowercase alphanumeric with hyphens" },
      { status: 400 }
    );
  }

  const existing = await redis.get(`link:${slug}`);
  if (existing) {
    return NextResponse.json(
      { error: "slug already exists" },
      { status: 409 }
    );
  }

  const link: ShortLink = { slug, url, createdAt: Date.now() };
  await redis.set(`link:${slug}`, link);

  return NextResponse.json(link, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  const { slug } = await req.json();
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  await redis.del(`link:${slug}`);
  return NextResponse.json({ ok: true });
}
