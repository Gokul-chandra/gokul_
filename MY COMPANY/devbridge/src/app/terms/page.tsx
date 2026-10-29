import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Terms of service" };

export default function Terms() {
  return (
    <LegalPage title="Terms of service">
      <h2>The service</h2>
      <p>DevBridge is a marketplace that helps customers and independent developers find each other. DevBridge is not a party to agreements between users and does not guarantee the quality, timing or outcome of any work.</p>
      <h2>Developers</h2>
      <ul>
        <li>Developers are independent and are not employees of DevBridge.</li>
        <li>Developers are not vetted by DevBridge at this stage. DevBridge does not guarantee projects or earnings.</li>
        <li>Developers set their own prices.</li>
      </ul>
      <h2>Fees</h2>
      <p>Basic accounts are free. If a platform fee applies to a completed paid project, it will be shown before a proposal is accepted. No hidden fees.</p>
      <h2>Academic integrity</h2>
      <p>Use DevBridge for legitimate learning support, collaboration and projects. You are responsible for following your institution&apos;s rules and disclosing assistance where required. Requests to impersonate a student or evade academic integrity rules are not allowed.</p>
      <h2>Disputes and refunds</h2>
      <p>Payment, refund and dispute rules will be published here before online payments are enabled.</p>
      <h2>Suspension</h2>
      <p>We may suspend accounts that break these terms or the Community Guidelines.</p>
    </LegalPage>
  );
}
