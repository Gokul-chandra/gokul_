import type { ReactNode } from "react";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-2 rounded-lg border border-orange-400/30 bg-orange-500/10 p-3 text-sm text-orange-200">
        Starter draft for the MVP. Have a qualified lawyer review and adapt this before launching to the public
        (including IT Act 2000 and DPDP Act 2023 obligations).
      </p>
      <div className="mt-6 space-y-4 text-stone-300 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
        {children}
      </div>
    </article>
  );
}
