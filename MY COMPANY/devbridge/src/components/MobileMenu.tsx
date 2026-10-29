"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoutButton } from "./LogoutButton";

type Props = {
  links: { href: string; label: string }[];
  loggedIn: boolean;
  dashboardHref?: string;
};

export function MobileMenu({ links, loggedIn, dashboardHref }: Props) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white"
      >
        <span aria-hidden>{open ? "✕" : "☰"}</span>
      </button>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full animate-fadeUp border-b border-white/10 bg-ink-900 px-4 py-4 shadow-xl">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} className="block rounded-lg px-3 py-3 text-stone-200 hover:bg-white/5">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-2">
            {loggedIn ? (
              <>
                <Link href={dashboardHref ?? "/dashboard"} onClick={close} className="btn-ghost">Dashboard</Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/hire" onClick={close} className="btn-primary">I Need a Website</Link>
                <Link href="/work" onClick={close} className="btn-ghost">I&apos;m a Developer</Link>
                <Link href="/login" onClick={close} className="btn-ghost">Log in</Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
