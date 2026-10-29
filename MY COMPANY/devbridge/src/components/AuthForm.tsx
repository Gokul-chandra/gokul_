"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { customerTypeLabels, customerTypes } from "@/lib/validation";

type Props = { mode: "login" | "register"; role?: "CUSTOMER" | "DEVELOPER"; next?: string };

export function AuthForm({ mode, role = "CUSTOMER", next }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setFieldErrors({});
    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> =
      mode === "login"
        ? { email: form.get("email"), password: form.get("password") }
        : {
            name: form.get("name"),
            email: form.get("email"),
            password: form.get("password"),
            role,
            customerType: role === "CUSTOMER" ? form.get("customerType") : undefined,
            acceptTerms: form.get("acceptTerms") === "on",
          };

    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setFieldErrors(data.fields ?? {});
        setBusy(false);
        return;
      }
      const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
      router.push(safeNext ?? data.redirect ?? "/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Check your connection and try again.");
      setBusy(false);
    }
  }

  const err = (k: string) =>
    fieldErrors[k]?.[0] ? <p className="mt-1 text-xs text-rose-300" role="alert">{fieldErrors[k]![0]}</p> : null;

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {error && (
        <div role="alert" className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      {mode === "register" && (
        <div>
          <label htmlFor="name" className="label">Full name</label>
          <input id="name" name="name" className="input" autoComplete="name" required />
          {err("name")}
        </div>
      )}

      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" className="input" autoComplete="email" required />
        {err("email")}
      </div>

      <div>
        <label htmlFor="password" className="label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="input"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
        />
        {mode === "register" && <p className="mt-1 text-xs text-stone-400">At least 10 characters, with a letter and a number.</p>}
        {err("password")}
      </div>

      {mode === "register" && role === "CUSTOMER" && (
        <div>
          <label htmlFor="customerType" className="label">I am a…</label>
          <select id="customerType" name="customerType" className="input" defaultValue="STUDENT">
            {customerTypes.map((t) => (
              <option key={t} value={t}>{customerTypeLabels[t]}</option>
            ))}
          </select>
        </div>
      )}

      {mode === "register" && (
        <div>
          <label className="flex items-start gap-3 text-sm text-stone-300">
            <input type="checkbox" name="acceptTerms" className="mt-1 h-4 w-4 accent-gold-500" />
            <span>
              I agree to the <Link href="/terms" className="underline">Terms</Link>,{" "}
              <Link href="/privacy" className="underline">Privacy Policy</Link> and{" "}
              <Link href="/guidelines" className="underline">Community Guidelines</Link>.
            </span>
          </label>
          {err("acceptTerms")}
        </div>
      )}

      <button type="submit" disabled={busy} className="btn-primary w-full">
        {busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
      </button>

      <p className="text-center text-xs text-stone-400">
        Password reset by email is <span className="text-orange-300">pending setup</span> (no email provider configured yet).
      </p>
    </form>
  );
}
