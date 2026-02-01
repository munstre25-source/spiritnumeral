# PsychicOz Affiliate Approach — Documentation

Documentation of our PsychicOz affiliate strategy: what we did, how it works, and revenue potential.

---

## 1. Overview: The Affiliate Approach

**Primary monetization:** PsychicOz is the **100% primary call-to-action** across the site. We promote three offers, chosen by context:

| Offer | Use when | Link |
|-------|----------|------|
| **psychic_love** | Love, twin flame, soulmate, breakup, compatibility, compare, angel-number-love | Love/relationship psychics |
| **psychic_career** | Money, career, manifestation, personal year/month/day, pinnacle, name numerology, celebrity numerology | Career/forecast psychics |
| **psychic_tarot** | Everything else (meaning hub, angel number library, dreams, warning, biblical, etc.) | Tarot/numerology psychics |

**What we don’t push as primary:** No site-wide header bar, no competing PDF/Blueprint CTAs in content. The **$17 Blueprint** is not promoted; the **$7 Quick Report** appears only as a secondary, **exit-intent** offer (“Before you go”).

**Why this approach:** Numerology and angel-number traffic is **emotion-first** (love, timing, clarity). PsychicOz fits that intent (live reading, “first 3 minutes free”) and avoids the friction of paid PDFs as the main CTA. We keep one primary CTA so users aren’t split between multiple products.

---

## 2. What We’ve Done

### 2.1 Removals and Demotions

- **PsychicTopBar removed** — No site-wide header CTA bar.
- **Calculator demoted** — “Calculate Now” moved into “Tools & Resources” as “Life Path Calculator”; hero CTA is PsychicOz first, “Or calculate your life path” as secondary link.
- **Blueprint ($17) removed from promotions** — Not in scroll popup, exit intent, or in-content CTAs.
- **Quick Report ($7)** — Only as **exit-intent** modal (“Before you go — Get your Quick Number Report $7”). No inline QuickReportUpsell blocks in content.

### 2.2 Primary CTA Placements (PsychicOz)

- **Hero (home)** — Main button: PsychicOz CTA (context: tarot for `/`). Trust line: “No credit card required · Instant insight.” Secondary: “Or calculate your life path.”
- **Contextual blocks after content/results** — `<PsychicPromo>` appears:
  - After calculator results (compatibility, number comparison, angel quiz, name numerology, personal timing).
  - After main content on meaning pages, twin-flame, soulmate, breakup, compatibility, money, dreams, manifestation, personal year/month/day, pinnacle, maturity, celebrity numerology, etc.
  - After the main content on blog posts; **mid-article** on long posts (after 2nd `##` section) plus end-of-article.
- **Scroll popup** — At **60% scroll**, once per session, max once per 7 days. PsychicOz offer; trust line “No credit card required · Instant insight.”
- **Footer** — PsychicOz link in footer (no band above footer; we use contextual blocks only).

### 2.3 Route → Offer Mapping

- **Love:** `/twin-flame`, `/soulmate`, `/breakup`, `/compatibility`, `/compare`, `/angel-number-love/*` → **psychic_love**
- **Career / money:** `/money`, `/manifestation/*`, `/angel-number-career/*`, `/personal-year`, `/personal-month`, `/personal-day`, `/pinnacle`, `/maturity-number`, `/name-numerology`, `/celebrity-numerology` → **psychic_career**
- **Default:** `/meaning/*`, `/dreams`, `/warning`, `/why-am-i-seeing`, `/biblical-meaning`, home, etc. → **psychic_tarot**

Defined in `src/lib/offers.ts` (`psychicRouteMap`, `resolvePsychicOffer`).

### 2.4 Copy and Emotion-First Optimization

- **Trust line under CTAs:** “No credit card required · Instant insight” (reduces friction; no “psychic” or pricing in the line).
- **Button copy A/B on emotional pages:** On home, love, twin flame, soulmate, breakup, compatibility, compare, and single angel-number pages we A/B test:
  - **Control:** “Try 3 free minutes →”
  - **Variants:** “Reveal my number →”, “Unlock my number →”, “See what it means →” (configurable in admin).
- **No “psychic” in button text** — Copy stays curiosity/guidance-led (“Reveal my number”, “Try 3 free minutes”) to match pSEO/numerology intent.
- **Definition pages** — CTA appears **after** content (e.g. angel number index, life path); we don’t put CTA above the fold on pure definition pages.

### 2.5 A/B Control Panel (Admin)

- **Table:** `ab_experiments` in Supabase (see `supabase/migrations/006_ab_experiments.sql`).
- **Admin UI:** Dashboard → **A/B Tests** section:
  - **Clicks by variant** — Aggregated from `cta_click` with `metadata.ctaVariant` (e.g. control, reveal, unlock, see_what).
  - **Clicks by placement (label)** — Hero Psychic, Psychic After Content, Psychic Mid-Article, Psychic Scroll Popup, etc.
  - **Edit Psychic CTA** — Add/remove/edit variants (id + copy), set control, enable/disable experiment, save. Changes apply site-wide for emotional pages (config fetched from `/api/ab-config?key=psychic_cta`).
- **Session-stable assignment** — Each user gets one variant per session (`sessionStorage`); we track which variant they saw so we can compare performance.

### 2.6 Tracking

- **Event:** `cta_click`
- **Payload:** `product` (psychic_love | psychic_career | psychic_tarot), `path`, `metadata.label` (e.g. Hero Psychic, Psychic After Content, Psychic Mid-Article, Psychic Scroll Popup), and on emotional pages `metadata.ctaVariant`.
- **Storage:** `analytics_events` in Supabase; admin stats aggregate by product, path, label, and variant.
- **Use:** Compare which placements and which button copy drive the most clicks; optimize from admin and A/B panel.

### 2.7 Technical Summary

| Area | Implementation |
|------|----------------|
| Offer resolution | `src/lib/offers.ts` — `resolvePsychicOffer(pathname)` |
| Components | `PsychicPromo`, `HomeHeroPsychicCTA`, `EmailCapture` (scroll popup) |
| A/B config | `GET /api/ab-config?key=psychic_cta` (public); `GET/PATCH /api/admin/ab` (admin) |
| Assignment | `src/lib/ab-config.ts` — `useAbConfig()`, `getAssignedVariant()` |
| Emotional paths | `isEmotionalPath()` in `offers.ts`; A/B only on those routes |

---

## 3. Revenue Potential

### 3.1 How PsychicOz Affiliate Typically Works

- **Model:** CPA (cost per acquisition) and/or revenue share. We send traffic to PsychicOz; they track signups/payments via our affiliate IDs (`a_aid`, `a_bid` in URLs).
- **Our levers:** Volume of **qualified clicks** (high-intent numerology/angel-number users) and **conversion quality** (placement and copy that attract users likely to try a reading).
- **We do not see** individual conversions or payouts in our app; those are in the affiliate dashboard (PsychicOz). We only see our own **clicks** (and optionally postbacks if they provide them).

### 3.2 What We Control to Maximize Revenue

1. **Traffic** — SEO and content (angel numbers, life path, love, career, timing) to grow sessions and page views.
2. **Click-through rate (CTR)** — Placement and copy:
   - Contextual CTAs after results/content (not in header).
   - Emotion-first copy (“Reveal my number”, “No credit card required · Instant insight”).
   - A/B testing button copy and measuring by variant/label in admin.
3. **Relevance** — Sending the right offer per page (love vs career vs tarot) so users land on the most relevant PsychicOz flow.
4. **Volume of touchpoints** — Hero, post-content, mid-article on long posts, scroll popup — without being intrusive (one popup per 7 days, no site-wide bar).

### 3.3 Rough Revenue Potential (Illustrative)

- **Assumptions (example only):** 50k monthly sessions, 2% CTA click rate → 1,000 outbound clicks/month. If the affiliate pays $2–5 CPA per qualified signup and 5–10% of clicks convert to signup → 50–100 signups/month → **$100–500/month** at $2 CPA; **$250–1,250** at $5 CPA. Actuals depend on your traffic, PsychicOz terms, and conversion rates.
- **Upside:** Better CTR (copy/placement/A/B) and more traffic directly increase clicks; better relevance (love/career/tarot routing) can improve conversion on their side and sometimes commission tiers.

### 3.4 How to Use the Data We Have

- **Admin → A/B Tests:** Compare **clicks by variant** and **by label**. Double down on variants and placements that get more clicks; consider turning off underperformers or reallocating placement.
- **Admin → Psychic (3):** See clicks by **product** (love/career/tarot) and **top pages**. Use this to prioritize content and ensure high-traffic pages have a clear CTA.
- **Optional:** If PsychicOz offers conversion or revenue postbacks, we can store them and report revenue per path/label/variant in admin.

---

## 4. Quick Reference

| Topic | Where |
|-------|--------|
| Offer definitions & routing | `src/lib/offers.ts` |
| Emotional paths & A/B copy options | `src/lib/offers.ts` (`isEmotionalPath`, `EMOTIONAL_CTA_OPTIONS`) |
| A/B config fetch & assignment | `src/lib/ab-config.ts` |
| CTA components | `PsychicPromo`, `HomeHeroPsychicCTA`, `EmailCapture` |
| Admin A/B panel | Admin dashboard → A/B Tests |
| CTR / copy ideas | `docs/CTR_CONVERSION_IDEAS.md` |
| Migration for A/B experiments | `supabase/migrations/006_ab_experiments.sql` |

---

*Last updated: reflects PsychicOz-as-primary approach, emotion-first copy, A/B control panel, and removal of site-wide bar and in-content PDF CTAs.*
