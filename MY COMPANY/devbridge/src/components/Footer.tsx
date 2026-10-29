import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink-900/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-lg font-bold text-white">DevBridge</p>
          <p className="mt-2 max-w-xs text-sm text-stone-400">
            A marketplace connecting people who need websites with independent developers. DevBridge does not
            currently verify developers&apos; skills or identity.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Platform</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-400">
            <li><Link href="/developers" className="hover:text-white">Find developers</Link></li>
            <li><Link href="/hire" className="hover:text-white">Hire a developer</Link></li>
            <li><Link href="/work" className="hover:text-white">Work as a developer</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Legal &amp; support</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-400">
            <li><Link href="/privacy" className="hover:text-white">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of service</Link></li>
            <li><Link href="/guidelines" className="hover:text-white">Community guidelines</Link></li>
            <li><Link href="/support" className="hover:text-white">Support</Link></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} DevBridge. Early-stage platform.
      </p>
    </footer>
  );
}
