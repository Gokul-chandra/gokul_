import { requireRole } from "@/lib/auth";
import { DashboardShell, StatusCard } from "@/components/DashboardShell";

export const metadata = { title: "Customer dashboard" };

export default async function CustomerDashboard() {
  const user = await requireRole("CUSTOMER");
  return (
    <DashboardShell title={`Hello, ${user.name.split(" ")[0]}`} subtitle="Your customer dashboard">
      <StatusCard state="working" title="Account & login" body="You are signed in with a customer role. Role checks run on the server." />
      <StatusCard state="planned" title="Post a project" body="Guided brief wizard, drafts, edit, cancel and delete. Stage 2." />
      <StatusCard state="planned" title="Proposals & comparison" body="Compare price, timeline and experience. Stage 3." />
      <StatusCard state="planned" title="Messages & notifications" body="Project-linked private chat. Stage 4." />
      <StatusCard state="pending-setup" title="Reference file uploads" body="Needs a storage bucket (S3 / R2) configured. Stage 2." />
      <StatusCard state="pending-setup" title="Voice / video calls" body="No call provider integrated." />
    </DashboardShell>
  );
}
