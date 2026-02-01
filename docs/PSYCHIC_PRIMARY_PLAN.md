# PsychicOz as Primary CTA – Plan & Execution

**Goal:** Make the 3 PsychicOz offers (love, career, tarot) the primary conversion focus site-wide. PDFs (Quick Report $7, Blueprint $17) become secondary and appear only on exit intent.

---

## 1. Hierarchy

| Priority | Offer | Placement |
|----------|--------|-----------|
| **Primary** | PsychicOz (love / career / tarot) | Band above footer, sticky bar, scroll popup, footer CTA |
| **Secondary** | Quick Report $7, Blueprint $17 | Exit-intent modal only; small footer link |

---

## 2. PsychicOz Placements (Primary)

1. **PsychicPromoBand** – Full-width band above the footer on every page. Benefit-led copy, one clear CTA. Contextual offer (love/career/tarot) by pathname.
2. **StickyPsychicBar** – Slim bar (bottom on mobile, bottom or side on desktop) that appears after user scrolls ~30%. Single CTA: “Get a reading →” (contextual link). Dismissible; respects session.
3. **Scroll popup** – Reuse existing EmailCapture trigger (e.g. 60% scroll). **Content = PsychicOz** (not PDF). “Want one clear answer? Try 3 free minutes with a psychic.”
4. **Footer** – Keep PsychicPromo block; add PsychicOz link in Company row. No PDF as main CTA here.

---

## 3. PDF Placements (Secondary / Exit Intent)

1. **ExitIntentPdf** – Modal that **only** triggers on exit intent (mouse leaving viewport top). Copy: “Before you go — get your Quick Number Report ($7) or full Blueprint ($17).” Links to `/quick-report` and `/quiz`. Show once per session.
2. **Footer** – One small text link: “PDF reports ($7 / $17)” so PDF is still discoverable but not competing with PsychicOz.

---

## 4. Page-Level Changes

- **Remove** all inline `<QuickReportUpsell />` blocks from content (topic pages, number pages, blog, compatibility, etc.). This removes duplicate CTAs and makes PsychicOz the only in-content CTA.
- **Keep** one small “PDF report” link in footer for users who prefer a report over a reading.

---

## 5. Conversion Details for PsychicOz

- **Copy:** Emphasize “First 3 minutes free,” “one clear answer,” “trusted psychics,” “personal reading.”
- **Context:** Love pages → psychic_love; money/career/timing → psychic_career; everything else → psychic_tarot.
- **Tracking:** All PsychicOz clicks already fire `cta_click` with `product: psychic_love | psychic_career | psychic_tarot` for admin analytics.

---

## 6. Files Touched

- `src/components/PsychicPromo.tsx` – Add `variant="band"` for prominent band; keep default for footer.
- **New:** `src/components/PsychicPromoBand.tsx` – Full-width primary CTA band.
- **New:** `src/components/StickyPsychicBar.tsx` – Sticky bar after scroll.
- **New:** `src/components/ExitIntentPdf.tsx` – Exit-intent-only PDF modal.
- `src/components/EmailCapture.tsx` – Popup content switched to PsychicOz (scroll/exit trigger).
- `src/components/RootShell.tsx` – Add PsychicPromoBand above Footer; add StickyPsychicBar; add ExitIntentPdf.
- `src/components/Footer.tsx` – Keep PsychicPromo; add small PDF link in footer.
- **Remove** `QuickReportUpsell` from all page files (list from grep); keep component for exit modal / footer link.

---

## 7. Execution Checklist

- [x] Plan doc
- [x] PsychicPromoBand + RootShell
- [x] StickyPsychicBar
- [x] EmailCapture → PsychicOz content
- [x] ExitIntentPdf modal
- [x] Remove QuickReportUpsell from all pages
- [x] Footer: small PDF link
