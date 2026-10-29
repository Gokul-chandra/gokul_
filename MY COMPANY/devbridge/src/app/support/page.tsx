import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Support" };

export default function Support() {
  return (
    <LegalPage title="Support">
      <p>Support contact: <strong>set SUPPORT_EMAIL here before launch</strong> (pending setup).</p>
      <p>For account deletion, data requests, reports or disputes, contact support from the email on your account.</p>
    </LegalPage>
  );
}
