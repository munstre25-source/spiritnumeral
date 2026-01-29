# Core numerology content (name, timing, lifecycle)

This adds three new numerology areas:
- Name numerology (Expression, Soul Urge, Personality)
- Timing cycles (Personal Year, Personal Month, Personal Day)
- Lifecycle (Pinnacles, Challenges, Maturity, Birthday, Karmic Debt)

## Generate normalized content

This creates a structured JSON file (draft content, editable):

```bash
node scripts/normalize_numerology.js
```

Output: `data/normalized/numerology_content.json`

## Apply migration

Run the Supabase migration:

```bash
supabase db push
```

Or run the SQL file:
`supabase/migrations/005_numerology_core.sql`

## Import into Supabase

```bash
node scripts/import-numerology-core.js
```

## Pages added

- `/name-numerology` + `/name-numerology/[type]/[number]`
- `/personal-year`, `/personal-month`, `/personal-day` + `/[type]/[number]`
- `/pinnacle`, `/challenge`, `/maturity-number`, `/birthday-number`, `/karmic-debt` + number pages

## Notes
- If you want to replace the generated copy with your own, update the JSON and re-run the import script.
