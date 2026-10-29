import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata = { title: "I Need a Website" };

export default function HirePage() {
  return (
    <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-2">
      <div>
        <p className="badge">For customers</p>
        <h1 className="mt-4 text-4xl font-extrabold text-white">Describe what you need. Get proposals.</h1>
        <ul className="mt-6 space-y-3 text-stone-300">
          <li>• Post a project brief for free: college projects, portfolios, business sites, stores, web apps.</li>
          <li>• Compare proposals on price, timeline and experience.</li>
          <li>• Any platform fee is shown to you before you accept a proposal.</li>
        </ul>
        <p className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-stone-400">
          Doing college work? Follow your institution&apos;s rules and disclose help where required. DevBridge is for learning
          support, collaboration and legitimate projects, not for impersonating a student.
        </p>
      </div>
      <div className="card">
        <h2 className="mb-4 text-xl font-bold text-white">Create a customer account</h2>
        <AuthForm mode="register" role="CUSTOMER" />
        <p className="mt-4 text-center text-sm text-stone-400">
          Already registered? <Link href="/login" className="text-gold-300 underline">Log in</Link>
        </p>
      </div>
    </section>
  );
}
