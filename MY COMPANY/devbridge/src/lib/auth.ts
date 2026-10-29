import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { db } from "./db";
import { readSession } from "./session";

/** Loads the current user from the DB on every call, so role/status changes apply immediately. */
export async function getCurrentUser() {
  const session = await readSession();
  if (!session) return null;
  const user = await db.user.findUnique({
    where: { id: session.uid },
    select: { id: true, email: true, name: true, role: true, status: true },
  });
  if (!user || user.status !== "ACTIVE") return null;
  return user;
}

/** Server-side guard for pages. Authorization always uses the DB role, never client input. */
export async function requireRole(...roles: Role[]) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!roles.includes(user.role)) redirect("/dashboard");
  return user;
}

export function dashboardPathFor(role: Role) {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "DEVELOPER":
      return "/developer";
    default:
      return "/customer";
  }
}
