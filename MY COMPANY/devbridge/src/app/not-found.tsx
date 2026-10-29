import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="badge">404</p>
      <h1 className="mt-4 text-3xl font-bold text-white">Page not found</h1>
      <p className="mt-2 text-stone-400">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="btn-primary mt-6">Back to home</Link>
    </section>
  );
}
