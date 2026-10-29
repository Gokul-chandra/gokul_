import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export const metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div className="card">
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="mb-6 mt-1 text-sm text-stone-400">Log in to your DevBridge account.</p>
        <AuthForm mode="login" next={next} />
        <p className="mt-6 text-center text-sm text-stone-400">
          New here? <Link href="/hire" className="text-gold-300 underline">Hire a developer</Link> or{" "}
          <Link href="/work" className="text-gold-300 underline">join as a developer</Link>.
        </p>
      </div>
    </section>
  );
}
