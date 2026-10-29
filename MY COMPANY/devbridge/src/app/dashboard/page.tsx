import { redirect } from "next/navigation";
import { getCurrentUser, dashboardPathFor } from "@/lib/auth";

export default async function DashboardRedirect() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  redirect(dashboardPathFor(user.role));
}
