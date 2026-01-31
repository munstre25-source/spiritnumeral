# Top Numerology Sites vs Spirit Numeral – Benchmark & Recommendations

**Sources:** Numerologist.com, Numerology.com, Number Teller, Numerology Science, Numastra, Affinity Numerology, World Numerology, Astro-Seek (2024 patterns).

---

## What Top Sites Do That We Can Adopt

### 1. **Free daily number by email** (high impact)
- **Them:** Numerology.com, Affinity Numerology, World Numerology offer **free personalized daily number emails** (by birth date). Strong lead magnet.
- **Us:** We have a generic newsletter signup (“Weekly angel number insights”) and an offer-based popup; no “daily number by email” framing.
- **Recommendation:** Reframe signup as **“Get your free daily number by email”** on homepage and footer. Optionally collect birth date for “personalized daily” messaging (store in metadata; can use for future daily emails).

### 2. **“Your personal number today” (birth-date based)** (high impact)
- **Them:** Many sites show “Your number today” or “Daily forecast” based on **personal day number** (birth date + today).
- **Us:** We have “Today’s Angel Number” (same number for everyone) and full personal-day pages, but no prominent **“Your number today”** block that uses the visitor’s birth date.
- **Recommendation:** Add a small **“Your personal number today”** block on the homepage: optional birth date input → compute personal day number → show number + link to `/personal-day/[number]`. Increases relevance and time on site.

### 3. **Footer newsletter with clear value** (medium impact)
- **Them:** Footer signup with copy like “Free daily number” or “Personalized readings by email.”
- **Us:** NewsletterSignup exists but isn’t used in the footer; footer has no email signup.
- **Recommendation:** Add NewsletterSignup to the footer with **“Get your free daily number by email”** (and optional birth date). Use same `/api/subscribe`; optionally pass `source: 'footer_daily'` and `metadata: { birthDate }`.

### 4. **Multiple numerology systems** (medium impact, later)
- **Them:** Pythagorean, Chaldean, sometimes Kabbalah or Lo Shu Grid.
- **Us:** Life path, name numerology (expression, soul-urge, personality), angel numbers, personal year/month/day, pinnacle, etc. – likely Pythagorean. No Chaldean, no Lo Shu.
- **Recommendation:** Consider adding **Chaldean name numerology** (different letter values, “destiny/heart/dream” numbers) and/or a **Lo Shu Grid** tool as differentiators later.

### 5. **Lucky numbers / colors** (low impact, later)
- **Them:** Some sites (e.g. Numerology Science) offer lucky numbers and colors by life path or date.
- **Us:** Not present.
- **Recommendation:** Optional content or small widget (e.g. “Lucky number for your life path”) for engagement.

### 6. **SEO & content**
- **Them:** Single H1, longer guides, internal links, keyword-rich titles/descriptions.
- **Us:** Already doing metadata, FAQ schema, sitemap, internal links; GSC-driven optimizations in place.
- **Recommendation:** Keep auditing key pages for one H1, word count, and internal links; no urgent change.

### 7. **Trust / social proof** (later)
- **Them:** Testimonials, “as seen in,” user counts.
- **Us:** Minimal.
- **Recommendation:** Add a short testimonials or “as seen in” section when you have assets.

---

## Implemented in This Pass

1. **“Daily number by email” framing** – Homepage block + footer signup with copy “Get your free daily number by email” and optional birth date (stored in subscribe metadata).
2. **Footer newsletter** – NewsletterSignup added to Footer with daily-number value prop.
3. **“Your personal number today”** – Homepage widget: optional birth date → personal day number → link to meaning.
4. **Daily email cron** – Vercel Cron calls `GET /api/cron/daily-number` daily at 6:00 UTC. Sends today’s angel number + (if stored) personal day number to subscribers with `source: 'daily_number'`. Set `CRON_SECRET` in Vercel env and ensure `RESEND_API_KEY` and `RESEND_FROM` are set.

---

## Not Implemented (Backlog)

- Chaldean name numerology page/tool.
- Lo Shu Grid calculator.
- Lucky number/color by life path (widget or page).
- Testimonials or “as seen in” section.
