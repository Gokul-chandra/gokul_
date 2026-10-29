import Link from "next/link";
import { getCurrentUser, dashboardPathFor } from "@/lib/auth";
import { MobileMenu } from "./MobileMenu";
import { LogoutButton } from "./LogoutButton";

export async function Navbar() {
  let user: Awaited<ReturnType<typeof getCurrentUser>> = null;
  try {
    user = await getCurrentUser();
  } catch {
    // Database or SESSION_SECRET not configured yet: render the public navbar.
  }

  const links = [
    { href: "/developers", label: "Find developers" },
    { href: "/#how-it-works", label: "How it works" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-600 text-sm font-bold text-ink-950">D</span>
          DevBridge
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-stone-300 transition hover:text-white">
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href={dashboardPathFor(user.role)} className="btn-ghost !py-2">Dashboard</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-stone-300 hover:text-white">Log in</Link>
              <Link href="/hire" className="btn-primary !py-2">I Need a Website</Link>
            </>
          )}
        </div>

        <MobileMenu links={links} loggedIn={!!user} dashboardHref={user ? dashboardPathFor(user.role) : undefined} />
      </nav>
    </header>
  );
}
