"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-white">Something went wrong</h1>
      <p className="mt-2 text-stone-400">Please try again. If it keeps happening, contact support.</p>
      <button type="button" onClick={reset} className="btn-primary mt-6">Try again</button>
    </section>
  );
}
