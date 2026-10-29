import { destroySession } from "@/lib/session";
import { fail, json, sameOrigin } from "@/lib/http";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("Invalid origin", 403);
  await destroySession();
  return json({ ok: true });
}
