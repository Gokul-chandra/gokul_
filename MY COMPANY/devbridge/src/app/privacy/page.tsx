import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Privacy policy" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy">
      <p>This policy explains what DevBridge collects and why.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Account data: name, email, role and a hashed password (we never store your password in plain text).</li>
        <li>Profile and project content you choose to submit, and messages between you and other users on a project.</li>
        <li>Basic technical data such as IP address, used for security and rate limiting.</li>
      </ul>
      <h2>What we do not do</h2>
      <ul>
        <li>We do not store card details. Payments are not enabled yet.</li>
        <li>We do not show your email address or phone number publicly by default.</li>
        <li>We do not sell your personal data.</li>
      </ul>
      <h2>Your choices</h2>
      <p>You can request correction or deletion of your account and data from the support contact. Account deletion is being built; until then deletion requests are handled manually.</p>
      <h2>Contact</h2>
      <p>Replace this with your registered grievance/contact address before launch.</p>
    </LegalPage>
  );
}
