import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { createSession } from "@/lib/session";
import { registerSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { fail, json, sameOrigin } from "@/lib/http";
import { dashboardPathFor } from "@/lib/auth";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail("Invalid origin", 403);
  if (!(await rateLimit(`register:${clientIp(req)}`, 5, 3600))) {
    return fail("Too many sign-up attempts. Try again later.", 429);
  }

  const body = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return fail("Please fix the highlighted fields.", 422, parsed.error.flatten().fieldErrors);
  }
  const { name, email, password, role, customerType } = parsed.data;

  const passwordHash = await bcrypt.hash(password, 12);
  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        role,
        ...(role === "CUSTOMER"
          ? { customerProfile: { create: { customerType: customerType ?? "INDIVIDUAL" } } }
          : { developerProfile: { create: { displayName: name } } }), // unpublished until the developer publishes
      },
      select: { id: true, role: true },
    });
    await createSession({ uid: user.id, role: user.role });
    return json({ ok: true, redirect: dashboardPathFor(user.role) }, 201);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      // Generic message avoids confirming which emails exist beyond what sign-up inherently reveals.
      return fail("An account with this email already exists. Try signing in.", 409);
    }
    console.error("register failed", e);
    return fail("Something went wrong. Please try again.", 500);
  }
}
