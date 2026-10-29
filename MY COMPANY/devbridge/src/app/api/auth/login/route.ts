import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession } from "@/lib/session";
import { loginSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { fail, json, sameOrigin } from "@/lib/http";
import { dashboardPathFor } from "@/lib/auth";

// Compared against when the email is unknown, so response time doesn't reveal account existence.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("Invalid origin", 403);

  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return fail("Enter a valid email and password.", 422);
  const { email, password } = parsed.data;

  const ip = clientIp(req);
  const allowed =
    (await rateLimit(`login:ip:${ip}`, 20, 900)) && (await rateLimit(`login:email:${email}`, 8, 900));
  if (!allowed) return fail("Too many attempts. Try again in a few minutes.", 429);

  const user = await db.user.findUnique({
    where: { email },
    select: { id: true, role: true, status: true, passwordHash: true },
  });
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok || user.status !== "ACTIVE") {
    return fail("Incorrect email or password.", 401);
  }

  await createSession({ uid: user.id, role: user.role });
  return json({ ok: true, redirect: dashboardPathFor(user.role) });
}
