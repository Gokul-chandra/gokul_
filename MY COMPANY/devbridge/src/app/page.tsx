import Link from "next/link";
import { db } from "@/lib/db";
import { DeveloperSearchForm } from "@/components/DeveloperSearchForm";

export const dynamic = "force-dynamic";

const faqs = [
  ["Is DevBridge free?", "Creating an account, posting a project and sending proposals is free. If a platform fee ever applies to a paid project, it is shown before you accept a proposal. There are no hidden charges."],
  ["Are developers verified?", "Not at this stage. Developers create their own profiles and DevBridge does not vet their skills or identity. Review portfolios and proposals carefully before choosing."],
  ["Can I get help with a college project?", "Yes, for learning, planning, debugging, code review and collaboration. Follow your institution's rules and disclose assistance where required. DevBridge is not for impersonating a student or evading academic integrity rules."],
  ["How do payments work?", "Online payments are pending setup. Until a payment gateway is connected after merchant onboarding, agree payment terms directly and carefully. DevBridge never stores card details."],
  ["Are ratings real?", "Ratings appear only after a verified completed project, written by that project's customer. There are none yet."],
];

const steps = [
  ["Describe your project", "Use the guided brief to explain pages, features, style and budget."],
  ["Compare proposals", "Developers send price, scope, timeline and deliverables for you to compare."],
  ["Discuss and choose", "Ask questions in a private, project-linked chat, then pick who to work with."],
  ["Track and review", "Follow the status from posted to completed, then review after completion."],
];

export default async function Home() {
  let categories: { slug: string; name: string }[] = [];
  let featured: { id: string; displayName: string; skills: string[]; user: { isDemo: boolean } }[] = [];
  try {
    [categories, featured] = await Promise.all([
      db.category.findMany({ where: { active: true }, orderBy: { name: "asc" }, select: { slug: true, name: true } }),
      db.developerProfile.findMany({
        where: { published: true, user: { status: "ACTIVE" } },
        orderBy: { updatedAt: "desc" },
        take: 3,
        select: { id: true, displayName: true, skills: true, user: { select: { isDemo: true } } },
      }),
    ]);
  } catch {
    // Database not configured yet; the page still renders with empty states.
  }

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-16 text-center sm:px-6 sm:pt-24">
        <p className="badge animate-fadeUp">For students, startups, small businesses and developers in India</p>
        <h1 className="mx-auto mt-6 max-w-3xl animate-fadeUp text-4xl font-extrabold leading-tight text-white sm:text-6xl">
          Your Idea. <span className="gradient-text">The Right Developer.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-stone-300">
          Post what you need, compare proposals from independent developers, and work together in one place.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/hire" className="btn-primary w-full sm:w-auto">I Need a Website</Link>
          <Link href="/work" className="btn-ghost w-full sm:w-auto">I&apos;m a Developer</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-labelledby="search-h">
        <h2 id="search-h" className="sr-only">Search developers</h2>
        <DeveloperSearchForm categories={categories} />
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="cats-h">
        <h2 id="cats-h" className="text-2xl font-bold text-white">Project categories</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.length === 0 ? (
            <p className="text-sm text-stone-400">Categories appear once the database is set up and seeded.</p>
          ) : (
            categories.map((c) => (
              <Link key={c.slug} href={`/developers?category=${c.slug}`} className="badge !px-4 !py-2 text-sm hover:bg-white/10">
                {c.name}
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="feat-h">
        <h2 id="feat-h" className="text-2xl font-bold text-white">Featured developers</h2>
        {featured.length === 0 ? (
          <div className="card mt-5">
            <p className="text-stone-300">No published developer profiles yet.</p>
            <p className="mt-1 text-sm text-stone-400">Be one of the first. <Link href="/work" className="text-gold-300 underline">Create a developer profile</Link>.</p>
          </div>
        ) : (
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {featured.map((d) => (
              <li key={d.id} className="card">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{d.displayName}</p>
                  {d.user.isDemo && <span className="badge border-orange-400/30 text-orange-300">Demo</span>}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">{d.skills.slice(0, 4).map((s) => <span key={s} className="badge">{s}</span>)}</div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 text-xs text-stone-400">Most recently updated profiles. Not ranked, not endorsed, not verified by DevBridge.</p>
      </section>

      <section id="how-it-works" className="mx-auto mt-20 max-w-6xl scroll-mt-24 px-4 sm:px-6" aria-labelledby="how-h">
        <h2 id="how-h" className="text-2xl font-bold text-white">How it works</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="card">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 text-sm font-bold text-ink-950">{i + 1}</span>
              <h3 className="mt-3 font-semibold text-white">{t}</h3>
              <p className="mt-1 text-sm text-stone-400">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="rev-h">
        <h2 id="rev-h" className="text-2xl font-bold text-white">Reviews</h2>
        <div className="card mt-5">
          <p className="text-stone-300">No reviews yet.</p>
          <p className="mt-1 text-sm text-stone-400">Reviews appear here only after customers complete real projects on DevBridge.</p>
        </div>
      </section>

      <section id="faq" className="mx-auto mt-20 max-w-3xl scroll-mt-24 px-4 sm:px-6" aria-labelledby="faq-h">
        <h2 id="faq-h" className="text-2xl font-bold text-white">FAQ</h2>
        <div className="mt-5 space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="card group !p-0">
              <summary className="cursor-pointer list-none px-6 py-4 font-medium text-white marker:hidden">{q}</summary>
              <p className="px-6 pb-5 text-sm text-stone-400">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6">
        <div className="card bg-gradient-to-br from-gold-500/15 to-gold-700/10 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to start?</h2>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/hire" className="btn-primary">I Need a Website</Link>
            <Link href="/work" className="btn-ghost">I&apos;m a Developer</Link>
          </div>
        </div>
      </section>
    </>
  );
}
