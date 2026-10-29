import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Community guidelines" };

export default function Guidelines() {
  return (
    <LegalPage title="Community guidelines">
      <ul>
        <li>Be honest about your skills, prices and timelines. Do not post fake reviews or fake profiles.</li>
        <li>Be respectful. Harassment, abuse and discrimination are not tolerated.</li>
        <li>Do not ask for or offer payment outside agreed terms in order to avoid scams, and never share OTPs or card details.</li>
        <li>Do not post scam listings or misleading guarantees.</li>
        <li>Do not use DevBridge to cheat, impersonate a student or evade academic integrity rules.</li>
        <li>Report suspicious behaviour with the report option; use block to stop contact.</li>
      </ul>
    </LegalPage>
  );
}
