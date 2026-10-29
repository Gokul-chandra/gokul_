import type { ReactNode } from "react";

export function DashboardShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {subtitle && <p className="mt-1 text-stone-400">{subtitle}</p>}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

export function StatusCard({
  title,
  body,
  state,
}: {
  title: string;
  body: string;
  state: "working" | "planned" | "pending-setup";
}) {
  const label = { working: "Working", planned: "Planned (next stage)", "pending-setup": "Pending setup" }[state];
  const color = {
    working: "border-emerald-400/30 text-emerald-300",
    planned: "border-stone-400/30 text-stone-300",
    "pending-setup": "border-orange-400/30 text-orange-300",
  }[state];
  return (
    <div className="card">
      <span className={`badge ${color}`}>{label}</span>
      <h2 className="mt-3 text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-stone-400">{body}</p>
    </div>
  );
}
