import "server-only";

/**
 * Server-side contact form destination. Credentials live in server-only env vars
 * (never NEXT_PUBLIC_), so they are never shipped to the browser.
 *
 * Supported today: Supabase table `contact_messages` (see supabase/schema.sql).
 */
export function isContactBackendConfigured(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function saveContactMessage(data: { name: string; phone: string; message: string }): Promise<void> {
  const url = process.env.SUPABASE_URL!.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const res = await fetch(`${url}/rest/v1/contact_messages`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status}`);
}
