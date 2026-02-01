-- List angel numbers 0-9999 that are missing from angel_numbers (would 404 on /meaning/angel-number/N).
-- Run in Supabase SQL Editor. No writes; safe to run anytime.
-- To get a count of missing: use the second query.

-- All missing numbers (0-9999)
SELECT s.n AS missing_number
FROM generate_series(0, 9999) AS s(n)
WHERE NOT EXISTS (
  SELECT 1 FROM angel_numbers a WHERE a.number = s.n
)
ORDER BY s.n;

-- Quick summary (run this first to see if anything is missing):
SELECT
  (SELECT COUNT(*) FROM angel_numbers) AS existing_in_db,
  10000 AS expected_total,
  (SELECT COUNT(*) FROM generate_series(0, 9999) AS s(n) WHERE NOT EXISTS (SELECT 1 FROM angel_numbers a WHERE a.number = s.n)) AS missing_count;
