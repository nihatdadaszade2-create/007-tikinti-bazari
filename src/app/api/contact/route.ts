import { NextResponse } from "next/server";
import { cleanContact, validateContact } from "@/lib/contact";
import { isContactBackendConfigured, saveContactMessage } from "@/lib/contact-server";

/**
 * POST /api/contact
 * Spam protection: honeypot field, minimum fill time, per-IP rate limit,
 * body-size cap and server-side validation/sanitisation.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // best-effort, per server instance

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  if (!isContactBackendConfigured()) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const raw = await req.text();
  if (raw.length > 5000) return NextResponse.json({ ok: false, code: "too_large" }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Honeypot filled or form submitted implausibly fast → pretend nothing happened to the bot, store nothing.
  const startedAt = Number(body.startedAt);
  if (body.website || !Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return NextResponse.json({ ok: false, code: "rejected" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });

  const input = cleanContact(body);
  const errors = validateContact(input);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });

  try {
    await saveContactMessage(input);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] save failed", err);
    return NextResponse.json({ ok: false, code: "server_error" }, { status: 502 });
  }
}
