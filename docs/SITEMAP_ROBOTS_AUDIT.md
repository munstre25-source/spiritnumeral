# Sitemap & robots.txt Audit

**Date:** 2025  
**Scope:** `public/robots.txt`, `src/lib/utils/sitemap.ts`, `src/app/sitemap.xml/route.ts`, `src/app/sitemap/[id]/route.ts`

---

## GSC “0 Discovered URLs” (Feb 2026)

**Symptom:** Google Search Console shows the sitemap index (`https://spiritnumeral.com/sitemap.xml`) as **Success** but **0 Discovered URLs** and **0 Indexed URLs**.

**Root cause:** The sitemap index was returning **zero `<sitemap>` entries**. That happens when `totalChunks === 0`, i.e. when `getAllSitemapUrls()` was treated as returning an empty list. In practice this was caused by:

1. **Static optimization** — Next.js can pre-render Route Handlers at build time when they don’t use dynamic APIs. If the sitemap was cached at build (or on an early request), the cached response could be an index with no child sitemaps, so GSC reported 0 discovered URLs.
2. **Empty index** — When `urls.length === 0`, `totalChunks = Math.ceil(0 / 25000) = 0`, so the index XML had no `<sitemap>` elements. GSC counts “discovered URLs” from that index; with no entries it stays 0.

**Fixes applied:**

- **`export const dynamic = 'force-dynamic'`** in both `src/app/sitemap.xml/route.ts` and `src/app/sitemap/[id]/route.ts` so the sitemap is always generated at **request time**, never cached empty at build.
- **Index always has ≥1 entry:** `totalChunks = Math.max(1, Math.ceil(urls.length / CHUNK_SIZE))` so the index always lists at least one child sitemap (`/sitemap/0.xml`).
- **Chunk 0 fallback when URL list is empty:** If `getAllSitemapUrls()` ever returns no URLs, `/sitemap/0.xml` now returns a minimal `<urlset>` with the homepage so GSC still discovers at least one URL instead of 404.

**What to do after deploy:** Resubmit `https://spiritnumeral.com/sitemap.xml` in GSC and allow a few days for recrawl. You should see discovered URLs increase (one per child sitemap in the index, then URLs from each child).

---

## Summary

- **robots.txt** is in good shape: correct Sitemap URL, sensible disallows. A few optional tweaks below.
- **Sitemap** is well structured (index + chunked URL sets, valid XML, good cache headers). A few gaps and one edge case to fix.

---

## robots.txt

**Location:** `public/robots.txt`  
**Served at:** `https://spiritnumeral.com/robots.txt`

### What’s good

- **User-agent: *** and **Allow: /** — crawl allowed by default.
- **Sitemap:** points to `https://spiritnumeral.com/sitemap.xml`, which matches the App Router route `src/app/sitemap.xml/route.ts`.
- **Disallow** for **/api/**, **/_next/**, **/admin/** — appropriate for backend, build assets, and admin.

### Suggestions

1. **Allow: /** — Optional. Many crawlers allow by default; you can keep it for clarity or remove it.
2. **Optional Disallow for user/checkout flows** — To save crawl budget, you can add:
   - `Disallow: /profile/` (page is noindex)
   - `Disallow: /order-status/`
   - `Disallow: /thank-you/`
   - `Disallow: /cancelled/`
   Only add these if you’re sure these paths should never be indexed or prioritized for crawling.
3. **Single canonical domain** — Ensure production always redirects to one host (e.g. `https://spiritnumeral.com`) so the Sitemap URL in robots stays correct.

---

## Sitemap implementation

**Index:** `GET /sitemap.xml` → `src/app/sitemap.xml/route.ts`  
**Chunked URL sets:** `GET /sitemap/0.xml`, `/sitemap/1.xml`, … → `src/app/sitemap/[id]/route.ts`  
**URL source:** `getAllSitemapUrls()` in `src/lib/utils/sitemap.ts`

### What’s good

- **Sitemap index** — Correct use of `<sitemapindex>` and chunked sitemaps; chunk size 25,000 is under the 50,000 limit.
- **XML** — Valid `urlset`/`sitemapindex`, `xmlEscape()` used for URLs and `lastmod` present.
- **Headers** — `Content-Type: application/xml` and `Cache-Control` with `s-maxage` and `stale-while-revalidate` are appropriate.
- **Coverage** — Static pages, blog posts/categories, life-path, angel numbers (0–9999) and all theme variants, name numerology, timing cycles, pinnacle/challenge/maturity/birthday/karmic-debt are included and match existing routes.

### Issues and fixes

1. **Missing static pages (fixed)**  
   These public, indexable pages existed in the app but were not in the sitemap:
   - `/contact`
   - `/privacy`
   - `/terms`  
   They have been added to the static list in `sitemap.ts`.

2. **Out-of-range chunk (fixed)**  
   Requesting e.g. `/sitemap/99.xml` when only a few chunks exist previously returned an empty `<urlset>`. The sitemap `[id]` route now returns **404** when the chunk index is out of range or the slice is empty, so crawlers don’t get empty sitemaps.

3. **Profile in sitemap**  
   `/profile` is in the sitemap but the page uses `robots: 'noindex'`. That’s valid (crawlers can crawl and then respect noindex). If you want to minimize crawl of noindex pages, you can remove `/profile` from the static list in `sitemap.ts`; otherwise leaving it is fine.

4. **lastmod**  
   All URLs share the same `lastmod` (time when `getAllSitemapUrls()` runs). Acceptable; per-URL lastmod can be added later for static files or CMS-backed content if needed.

---

## URL coverage check

| Route pattern | In sitemap | Notes |
|---------------|------------|--------|
| `/`, `/about`, `/calculator`, etc. | ✅ | Static list |
| `/contact`, `/privacy`, `/terms` | ✅ | Added in this audit |
| `/blog`, `/blog/[slug]`, `/blog/category/[slug]` | ✅ | Slugs and categories enumerated |
| `/meaning`, `/meaning/angel-number`, `/meaning/life-path` | ✅ | Plus life-path-1..9 |
| Angel number themes 0–9999 | ✅ | meaning, why-am-i-seeing, warning, twin-flame, love, career, manifestation, biblical, money, soulmate, pregnancy, breakup, dreams |
| Name numerology | ✅ | expression/soul-urge/personality × 1–9, 11, 22, 33 |
| Personal year/month/day, pinnacle, challenge, maturity, birthday, karmic-debt | ✅ | Correct ranges |
| `/profile`, `/admin`, `/api/*`, checkout flows | ✅ | Profile in sitemap but noindex; admin/api disallowed in robots; checkout not in sitemap |

---

## Recommendations

1. **Keep** the current robots.txt Sitemap URL and Disallow rules; add optional Disallow for profile/checkout paths only if you want to reduce crawl of those URLs.
2. **Keep** the sitemap index + chunked design and cache headers.
3. **Optional:** Remove `/profile` from the sitemap if you prefer not to suggest it to crawlers.
4. **Optional:** Add per-URL `lastmod` later for key sections (e.g. blog, meaning) if you have that data.
5. **Verify** in Google Search Console that `sitemap.xml` and the listed chunk URLs are discovered and processed without errors.
