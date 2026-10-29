# DevBridge

A marketplace where customers hire independent developers for websites and web apps. Built for Indian students, colleges, startups, small businesses and freelancers. Currency: INR (₹). Language: English (Hindi planned).

**Status: Stage 1 of 7 (foundation).** See "What works / what doesn't" below. Nothing is faked: unfinished features are labelled *Planned* or *Pending setup* in the UI.

## Stack
Next.js 15 (App Router, TypeScript) · Tailwind CSS · PostgreSQL · Prisma · cookie sessions (signed JWT via `jose`, httpOnly) · bcryptjs · Zod.

## Run locally
Requires Node 20+ and a PostgreSQL database (local, Neon, Supabase or Railway).

```bash
npm install
cp .env.example .env          # then fill in DATABASE_URL and SESSION_SECRET
npx prisma migrate dev --name init   # creates the tables (generates the first migration)
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='a-long-password-12+' npm run db:seed
npm run dev                   # http://localhost:3000
```

Generate a session secret: `openssl rand -base64 48`.

Optional demo data (labelled `[DEMO]`, no reviews or stats): `SEED_DEMO=true npm run db:seed`. Remove before launch: `DELETE FROM "User" WHERE "isDemo" = true;`

## What works (Stage 1)
- Homepage, role entry pages (`/hire`, `/work`), responsive dark UI, mobile menu
- Registration and login for customers and developers; admin is created only via seed, never self-registered
- Role-based dashboards; every dashboard page re-checks the role from the database
- Developer search with skill/language, category, budget, availability filters and pagination (DB-backed)
- Rate limiting (Postgres-backed) on login and registration, same-origin check on mutating routes, security headers
- Full relational schema for all planned features
- Privacy, terms, guidelines and support pages (starter drafts; get legal review)

## Not built yet
| Stage | Scope |
|---|---|
| 2 | Project brief wizard, drafts/edit/cancel/delete, secure file uploads, status tracker |
| 3 | Developer profile and pricing management, listings, proposals and comparison |
| 4 | Project-linked chat (SSE), read receipts, notifications, block/report |
| 5 | Admin moderation, reports, disputes, audit log UI |
| 6 | Verified-completion reviews, invoices, Razorpay, plans, sponsored listings |
| 7 | Account deletion flow, password reset email, deployment hardening |

## External services (accounts required)
| Service | Needed for | Cost |
|---|---|---|
| PostgreSQL host (Neon / Supabase / Railway) | Required now | Free tiers exist |
| Email provider (Resend, SES…) | Password reset, verification (Stage 7) | Free tiers exist |
| S3 / Cloudflare R2 | File uploads (Stage 2) | Pay-as-you-go |
| Razorpay | Payments (Stage 6), after merchant KYC | Per-transaction fees |
| Voice/video provider (Daily, Twilio…) | Calls | Paid; not integrated |
| Anthropic API | Optional AI brief assistant | Paid |

## Deploy
Vercel or any Node host. Set `DATABASE_URL`, `SESSION_SECRET`, `APP_URL`; run `npx prisma migrate deploy` on release. Never commit `.env`.

## Security notes
Passwords hashed with bcrypt (cost 12). Sessions are httpOnly, SameSite=Lax cookies. Authorization is enforced server-side per request, not by the UI. Prisma parameterizes queries; React escapes output. Remaining items (upload validation, per-object IDOR checks on projects/messages) arrive with the stages that add those features.
