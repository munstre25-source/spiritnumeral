# CTR & conversion: emotion-first CTA optimization

Quick reference for PsychicOz affiliate CTAs and what’s implemented.

## Implemented (emotion-first)

### Upgrade #1 – Microcopy under the button

- **Trust line everywhere**: “No credit card required · Instant insight”
- **Where**: PsychicPromo, HomeHeroPsychicCTA, EmailCapture (scroll popup)
- **Why**: Reduces fear, improves clicks on cold traffic; no psychic/money language.

### Upgrade #2 – Button copy (A/B on emotional pages)

- **Emotional pages**: Home, twin-flame, soulmate, breakup, compatibility, compare, angel-number-love, single angel number (`/meaning/angel-number/[number]`).
- **A/B**: 50% “Try 3 free minutes →” (control), 50% “Reveal my number →” (curiosity, best for SEO). Session-stable via `sessionStorage` so one user sees one variant.
- **Tracking**: `metadata.ctaVariant` = `'control' | 'reveal'` on `cta_click` so you can compare performance in admin/stats.
- **Non-emotional pages**: Always “Try 3 free minutes →” (no psychic/money language in button).

### Placement

- **Above the fold**: Hero CTA on home with trust line + secondary “Or calculate your life path” (unchanged).
- **After emotional sections**: PsychicPromo after Love / Twin Flame / Timing / angel number content (already in place).
- **Definition pages**: CTA only after content (e.g. /meaning/angel-number index, /meaning/life-path). No CTA above the fold on pure definition pages.
- **Long blog posts**: Second CTA mid-article (after 2nd `##` section) with label “Psychic Mid-Article”, plus “Psychic After Content” at the end.

### What we did not change

- No “psychic” in CTA button copy.
- No money or pricing in CTA.
- Secondary calculator link on home kept.
- CTA stays safe + intriguing, not salesy.

---

## Already in place

- **Contextual placement**: PsychicPromo after results/content (no header/site-wide bar).
- **Route-aware offers**: Love → psychic_love, career/money → psychic_career, rest → psychic_tarot.
- **Scroll popup**: PsychicOz at 60% scroll, once per session, max once per 7 days; trust line “No credit card required · Instant insight”.
- **Exit intent**: Quick Report $7 (PDF) only.
- **Tracking**: `cta_click` with `product`, `path`, `metadata.label`, and on emotional pages `metadata.ctaVariant`.

---

## Ideas to test next

- **Scroll popup trigger**: A/B 50% vs 70% scroll.
- **Exit intent**: A/B PsychicOz vs Quick Report.
- **Social proof**: “Rated 4.8/5” or “Join 50k+ readers” under CTA if PsychicOz provides it.
- **More CTA variants**: “Unlock my number →”, “See what it means →” (in `EMOTIONAL_CTA_OPTIONS` in `offers.ts`; currently A/B uses “Reveal my number” vs control).

Use admin/stats to compare `label` and `ctaVariant` and iterate.
