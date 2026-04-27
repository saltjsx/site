import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  service?: "logo" | "product" | null;
  logoType?: "svg" | "brandkit" | null;
  productType?: "landing" | "dashboard" | null;
  extraIterations?: number;
  extraPages?: number;
  brief?: string;
  contactMethod?: "discord" | "email" | null;
  contact?: string;
};

function clamp(n: unknown, max: number) {
  const v = typeof n === "number" && Number.isFinite(n) ? Math.floor(n) : 0;
  return Math.max(0, Math.min(max, v));
}

function trimStr(s: unknown, max: number) {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

function computeTotal(p: Payload) {
  let total = 0;
  if (p.service === "logo") {
    if (p.logoType === "svg") total += 75;
    if (p.logoType === "brandkit") total += 100;
    total += clamp(p.extraIterations, 20) * 10;
  } else if (p.service === "product") {
    if (p.productType === "landing") total += 250 + clamp(p.extraPages, 20) * 25;
    if (p.productType === "dashboard") total += 500;
  }
  return total;
}

function describePackage(p: Payload) {
  if (p.service === "logo") {
    if (p.logoType === "svg") return "svg logo only · $75";
    if (p.logoType === "brandkit") return "brand kit · $100";
    return "logo design";
  }
  if (p.service === "product") {
    if (p.productType === "landing") {
      const extra = clamp(p.extraPages, 20);
      return extra > 0
        ? `landing page · $250 + ${extra} extra page(s) · +$${extra * 25}`
        : "landing page · $250";
    }
    if (p.productType === "dashboard") return "product / dashboard · $500";
    return "product design";
  }
  return "—";
}

export async function POST(request: Request) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { error: "webhook not configured" },
      { status: 500 },
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (body.contactMethod !== "discord") {
    return NextResponse.json(
      { error: "discord submissions only" },
      { status: 400 },
    );
  }

  const name = trimStr(body.name, 80);
  const contact = trimStr(body.contact, 80);
  const brief = trimStr(body.brief, 1500);

  if (!name || !contact || brief.length < 10) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const total = computeTotal(body);
  const pkg = describePackage(body);
  const userId = process.env.DISCORD_NOTIFY_USER_ID;

  const fields = [
    { name: "name", value: name, inline: true },
    { name: "discord", value: contact, inline: true },
    { name: "package", value: pkg, inline: false },
    { name: "total", value: `$${total} usd`, inline: true },
  ];

  if (body.service === "logo") {
    const extra = clamp(body.extraIterations, 20);
    fields.push({
      name: "iterations",
      value: extra > 0 ? `2 included + ${extra} extra` : "2 included",
      inline: true,
    });
  }

  fields.push({ name: "brief", value: brief, inline: false });

  const embed = {
    title: "new quote request",
    color: 0x0c50ff,
    fields,
    timestamp: new Date().toISOString(),
    footer: { text: "saltjsx.com/quote" },
  };

  const discordPayload = {
    content: userId ? `<@${userId}> new quote request` : "new quote request",
    embeds: [embed],
    allowed_mentions: userId ? { users: [userId] } : { parse: [] },
  };

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(discordPayload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { error: "discord rejected request", detail: text.slice(0, 200) },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
