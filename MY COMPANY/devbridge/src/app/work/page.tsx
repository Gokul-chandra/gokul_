import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata = { title: "I'm a Developer" };

export default function WorkPage() {
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-2">
      <div>
        <p className="badge">For developers</p>
        <h1 className="mt-4 text-4xl font-extrabold text-white">Set your own prices. Send your own proposals.</h1>
        <ul className="mt-6 space-y-3 text-stone-300">
          <li>• Free basic account with a public profile and service listings.</li>
          <li>• You choose fixed, hourly, starting-from or custom-quote pricing.</li>
          <li>• Ratings appear only after verified completed projects.</li>
        </ul>
        <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-stone-400">
          DevBridge does not guarantee projects or earnings. Developers are not vetted by DevBridge at this stage, and
          profiles are not labelled as verified.
        </p>
      </div>
      <div className="card">
        <h2 className="mb-4 text-xl font-bold text-white">Create a developer account</h2>
        <AuthForm mode="register" role="DEVELOPER" />
        <p className="mt-4 text-center text-sm text-stone-400">
          Already registered? <Link href="/login" className="text-gold-300 underline">Log in</Link>
        </p>
      </div>
    </section>
  );
}
