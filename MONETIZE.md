# Monetization Blueprint (Lemon Squeezy + Resend + Supabase)

## What was implemented

- **Paid products (2 SKUs)**
  - Personal Blueprint PDF — `$17`
  - Relationship Report PDF — `$29`
- **Checkout creation API**: `src/app/api/checkout/route.ts`
  - Accepts `product` (`blueprint` | `relationship`) + metadata.
  - Creates a Lemon Squeezy checkout and returns the hosted URL.
- **Webhook processor**: `src/app/api/lemonsqueezy/webhook/route.ts`
  - Verifies signature.
  - On `order_created`, builds personalized PDF, emails it, and records the report.
- **PDF generation**: `src/lib/pdf/report.ts`
  - Uses live Supabase angel-number data.
  - Personalizes with name, focus, feeling, time horizon, relationship status, challenge, compatibility, numbers, birthdays.
- **Email delivery**: `src/lib/email.ts` (Resend)
  - Sends PDF as attachment from `RESEND_FROM`.
- **DB tracking**: `supabase/migrations/003_reports.sql`
  - `reports` table (email, product, inputs, price_cents, status, order_id, download_url placeholder).
- **Front-end CTAs wired to paid flow**
  - Compare tool: `src/components/NumberComparison.tsx`
  - Compatibility calculator: `src/components/CompatibilityCalculator.tsx`
  - Quiz result screen: `src/components/AngelNumberQuiz.tsx`
  - Each collects optional personalization fields and opens Lemon checkout.

## How the loop works (end to end)
1) **User engages tool**
   - Compare, Compatibility, or Quiz generates numbers/compatibility.
   - Optional inputs collected: name, focus, feeling, time horizon, relationship status (rel flows), challenge, email (in quiz).
2) **Checkout creation**
   - Front-end calls `/api/checkout` with product + metadata.
   - API calls Lemon Squeezy → returns hosted checkout URL → user pays.
3) **Webhook**
   - Lemon fires `order_created` → `/api/lemonsqueezy/webhook`.
   - Signature verified with `LEMONSQUEEZY_SIGNING_SECRET`.
4) **PDF generation**
   - Build personalized PDF via `generateReportPdf`:
     - Pull angel-number content from Supabase.
     - Inject personalization sections (focus, feeling, time horizon, relationship status, challenge).
5) **Email delivery**
   - Resend sends PDF attachment to buyer email.
6) **Persistence**
   - Insert row into `reports` (status `pending` → `delivered`).
   - `order_id` and metadata stored for analytics/follow-up.

## Environment variables (must set in production)
- `LEMONSQUEEZY_API_KEY`
- `LEMONSQUEEZY_STORE_ID`
- `LEMON_VARIANT_BLUEPRINT`
- `LEMON_VARIANT_RELATIONSHIP`
- `LEMON_VARIANT_WEALTH`
- `LEMON_VARIANT_BUNDLE` (optional, for bundle checkout)
- `LEMONSQUEEZY_SIGNING_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM` (e.g., reports@spiritnumeral.com)
- `NEXT_PUBLIC_SITE_URL`
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## Deployment checklist
1) Run migration: `supabase/migrations/003_reports.sql` (or `supabase db push`).
2) Set env vars above in your hosting platform.
3) Configure Lemon Squeezy webhook to: `https://<your-domain>/api/lemonsqueezy/webhook` (enable order events).
4) Test flow:
   - Hit `/api/checkout` with sample metadata → pay → verify email with PDF.
   - Check Supabase `reports` table for status `delivered`.
5) Order support:
   - `/order-status` lets customers check and resend their PDFs.

## Optional next tweaks
- Add a “Personalization is optional” tooltip near inputs.
- Add GA/Pixel events on checkout start and webhook success.
- Store PDF in Supabase Storage and email link + attachment for redundancy.
