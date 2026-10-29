import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { DeveloperSearchForm } from "@/components/DeveloperSearchForm";

export const metadata = { title: "Find developers" };
export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;

function variants(term: string) {
  const t = term.trim();
  if (!t) return [];
  return Array.from(new Set([t, t.toLowerCase(), t.toUpperCase(), t[0].toUpperCase() + t.slice(1).toLowerCase()]));
}

export default async function DevelopersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; budget?: string; availability?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);
  const budgetRupees = sp.budget ? Number.parseInt(sp.budget, 10) : NaN;

  const and: Prisma.DeveloperProfileWhereInput[] = [];
  if (sp.q) {
    const v = variants(sp.q.slice(0, 60));
    and.push({ OR: [{ skills: { hasSome: v } }, { languages: { hasSome: v } }, { frameworks: { hasSome: v } }] });
  }
  if (sp.availability === "AVAILABLE" || sp.availability === "LIMITED") and.push({ availability: sp.availability });
  if (sp.category || Number.isFinite(budgetRupees)) {
    and.push({
      listings: {
        some: {
          status: "PUBLISHED",
          ...(sp.category ? { category: { slug: sp.category } } : {}),
          ...(Number.isFinite(budgetRupees) ? { priceMinPaise: { lte: budgetRupees * 100 } } : {}),
        },
      },
    });
  }

  const where: Prisma.DeveloperProfileWhereInput = { published: true, user: { status: "ACTIVE" }, AND: and };

  let categories: { slug: string; name: string }[] = [];
  let total = 0;
  let devs: Awaited<ReturnType<typeof fetchDevs>> = [];
  let dbError = false;

  async function fetchDevs() {
    return db.developerProfile.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        displayName: true,
        bio: true,
        skills: true,
        experienceLevel: true,
        availability: true,
        user: { select: { isDemo: true } },
      },
    });
  }

  try {
    [categories, total, devs] = await Promise.all([
      db.category.findMany({ where: { active: true }, orderBy: { name: "asc" }, select: { slug: true, name: true } }),
      db.developerProfile.count({ where }),
      fetchDevs(),
    ]);
  } catch {
    dbError = true;
  }

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const qs = (p: number) => {
    const u = new URLSearchParams();
    for (const [k, v] of Object.entries(sp)) if (v && k !== "page") u.set(k, v);
    u.set("page", String(p));
    return `/developers?${u.toString()}`;
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-white">Find developers</h1>
      <p className="mt-1 text-stone-400">
        Profiles are created by developers themselves. DevBridge does not currently verify skills or identity.
      </p>
      <div className="mt-6">
        <DeveloperSearchForm categories={categories} values={sp} />
      </div>

      {dbError ? (
        <p className="mt-8 rounded-xl border border-orange-400/30 bg-orange-500/10 p-4 text-orange-200">
          Database not connected yet (pending setup). Set DATABASE_URL and run migrations, see the README.
        </p>
      ) : devs.length === 0 ? (
        <div className="card mt-8 text-center">
          <p className="text-lg font-semibold text-white">No developers match yet</p>
          <p className="mt-1 text-sm text-stone-400">Try removing a filter. The platform is new and the developer list is still growing.</p>
          <Link href="/developers" className="btn-ghost mt-4">Clear filters</Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-stone-400">{total} developer{total === 1 ? "" : "s"} found</p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devs.map((d) => (
              <li key={d.id} className="card">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-semibold text-white">{d.displayName}</h2>
                  {d.user.isDemo && <span className="badge border-orange-400/30 text-orange-300">Demo</span>}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-stone-400">{d.bio || "No introduction yet."}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {d.skills.slice(0, 5).map((s) => <span key={s} className="badge">{s}</span>)}
                </div>
                <p className="mt-3 text-xs text-stone-400">
                  {d.experienceLevel.toLowerCase()} · {d.availability.toLowerCase()} · no ratings yet
                </p>
              </li>
            ))}
          </ul>
          {pages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination">
              {page > 1 && <Link href={qs(page - 1)} className="btn-ghost">Previous</Link>}
              <span className="text-sm text-stone-400">Page {page} of {pages}</span>
              {page < pages && <Link href={qs(page + 1)} className="btn-ghost">Next</Link>}
            </nav>
          )}
        </>
      )}
    </section>
  );
}
