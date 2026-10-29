import { requireRole } from "@/lib/auth";
import { DashboardShell, StatusCard } from "@/components/DashboardShell";

export const metadata = { title: "Developer dashboard" };

export default async function DeveloperDashboard() {
  const user = await requireRole("DEVELOPER");
  return (
    <DashboardShell title={`Hello, ${user.name.split(" ")[0]}`} subtitle="Your developer dashboard">
      <StatusCard state="working" title="Account & login" body="Signed in with a developer role. An unpublished profile record was created at sign-up." />
      <StatusCard state="planned" title="Profile & pricing" body="Skills, samples, availability and your own pricing model. Stage 3." />
      <StatusCard state="planned" title="Service listings" body="Create, publish, pause and delete listings. Stage 3." />
      <StatusCard state="planned" title="Project requests & proposals" body="Browse requests, ask questions, send proposals. Stage 3." />
      <StatusCard state="planned" title="Messages" body="Project-linked private chat. Stage 4." />
      <StatusCard state="pending-setup" title="Ratings" body="Shown only after verified completed projects. None exist yet." />
    </DashboardShell>
  );
}
