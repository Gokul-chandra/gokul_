import { NextResponse } from "next/server";

export function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function fail(message: string, status = 400, fields?: Record<string, string[] | undefined>) {
  return NextResponse.json({ error: message, fields }, { status });
}

/**
 * CSRF defence in depth for cookie-authenticated mutating routes: require same-origin.
 * Behind a reverse proxy (Vercel, Nginx) the public host arrives in x-forwarded-host, so accept either.
 */
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const hosts = [req.headers.get("x-forwarded-host"), req.headers.get("host")]
    .filter((h): h is string => !!h)
    .map((h) => h.split(",")[0].trim());
  return hosts.includes(originHost);
}
