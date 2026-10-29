import { requireRole } from "@/lib/auth";
import { db } from "@/lib/db";
import { DashboardShell, StatusCard } from "@/components/DashboardShell";

export const metadata = { title: "Admin" };

export default async function AdminDashboard() {
  await requireRole("ADMIN"); // customers and developers are redirected away
  const [users, projects] = await Promise.all([db.user.count(), db.project.count()]);
  return (
    <DashboardShell title="Admin" subtitle="Admin-only area">
      <StatusCard state="working" title="Registered users" body={`${users} account(s) in the database.`} />
      <StatusCard state="working" title="Projects" body={`${projects} project(s) in the database.`} />
      <StatusCard state="planned" title="Moderation, reports, disputes" body="Stage 5." />
      <StatusCard state="planned" title="Audit log viewer" body="AuditLog table exists; actions are logged from Stage 5." />
      <StatusCard state="planned" title="Commissions & settings" body="Stage 5 / 6." />
    </DashboardShell>
  );
}
