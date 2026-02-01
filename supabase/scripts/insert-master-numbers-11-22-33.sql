-- Insert master numbers 11, 22, 33 into timing_cycles and name_numbers so
-- Personal Year/Month/Day and Name Numerology result pages never 404.
-- Run once in Supabase SQL Editor (or: psql $DATABASE_URL -f insert-master-numbers-11-22-33.sql)
-- Uses ON CONFLICT DO NOTHING so safe to run multiple times.

-- =============================================================================
-- TIMING_CYCLES (personal_year, personal_month, personal_day for 11, 22, 33)
-- =============================================================================

INSERT INTO timing_cycles (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personal_year', 11, 'Personal Year 11 highlights intuition and illumination in a 12-month cycle. Use this window to set intentions, notice repeating signals, and commit to one aligned action.', ARRAY['visionary', 'inspired', 'sensitive'], ARRAY['nervous tension', 'self-doubt', 'overwhelm'], 'In love, this number leans into intuition and illumination. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects intuition and illumination. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO timing_cycles (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personal_year', 22, 'Personal Year 22 highlights master builder and legacy in a 12-month cycle. Use this window to set intentions, notice repeating signals, and commit to one aligned action.', ARRAY['practical visionary', 'organized', 'influential'], ARRAY['pressure to perform', 'perfectionism', 'overextension'], 'In love, this number leans into master builder and legacy. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master builder and legacy. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO timing_cycles (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personal_year', 33, 'Personal Year 33 highlights master teacher and compassion in a 12-month cycle. Use this window to set intentions, notice repeating signals, and commit to one aligned action.', ARRAY['healing presence', 'service-minded', 'uplifting'], ARRAY['burnout', 'boundary issues', 'idealism'], 'In love, this number leans into master teacher and compassion. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master teacher and compassion. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO timing_cycles (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personal_month', 11, 'Personal Month 11 highlights intuition and illumination in a 30-day focus. Use this window to set intentions, notice repeating signals, and commit to one aligned action.', ARRAY['visionary', 'inspired', 'sensitive'], ARRAY['nervous tension', 'self-doubt', 'overwhelm'], 'In love, this number leans into intuition and illumination. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects intuition and illumination. Choose roles where your natural pattern is an advantage, not a compromise.', 'Treat this 30-day focus as a focused experiment. Keep one promise to yourself each week.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO timing_cycles (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personal_month', 22, 'Personal Month 22 highlights master builder and legacy in a 30-day focus. Use this window to set intentions, notice repeating signals, and commit to one aligned action.', ARRAY['practical visionary', 'organized', 'influential'], ARRAY['pressure to perform', 'perfectionism', 'overextension'], 'In love, this number leans into master builder and legacy. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master builder and legacy. Choose roles where your natural pattern is an advantage, not a compromise.', 'Treat this 30-day focus as a focused experiment. Keep one promise to yourself each week.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO timing_cycles (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personal_month', 33, 'Personal Month 33 highlights master teacher and compassion in a 30-day focus. Use this window to set intentions, notice repeating signals, and commit to one aligned action.', ARRAY['healing presence', 'service-minded', 'uplifting'], ARRAY['burnout', 'boundary issues', 'idealism'], 'In love, this number leans into master teacher and compassion. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master teacher and compassion. Choose roles where your natural pattern is an advantage, not a compromise.', 'Treat this 30-day focus as a focused experiment. Keep one promise to yourself each week.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO timing_cycles (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personal_day', 11, 'Personal Day 11 highlights intuition and illumination in a 24-hour rhythm. Use this window to set intentions, notice repeating signals, and commit to one aligned action.', ARRAY['visionary', 'inspired', 'sensitive'], ARRAY['nervous tension', 'self-doubt', 'overwhelm'], 'In love, this number leans into intuition and illumination. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects intuition and illumination. Choose roles where your natural pattern is an advantage, not a compromise.', 'Treat this 24-hour rhythm as a focused experiment. Keep one promise to yourself each week.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO timing_cycles (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personal_day', 22, 'Personal Day 22 highlights master builder and legacy in a 24-hour rhythm. Use this window to set intentions, notice repeating signals, and commit to one aligned action.', ARRAY['practical visionary', 'organized', 'influential'], ARRAY['pressure to perform', 'perfectionism', 'overextension'], 'In love, this number leans into master builder and legacy. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master builder and legacy. Choose roles where your natural pattern is an advantage, not a compromise.', 'Treat this 24-hour rhythm as a focused experiment. Keep one promise to yourself each week.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO timing_cycles (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personal_day', 33, 'Personal Day 33 highlights master teacher and compassion in a 24-hour rhythm. Use this window to set intentions, notice repeating signals, and commit to one aligned action.', ARRAY['healing presence', 'service-minded', 'uplifting'], ARRAY['burnout', 'boundary issues', 'idealism'], 'In love, this number leans into master teacher and compassion. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master teacher and compassion. Choose roles where your natural pattern is an advantage, not a compromise.', 'Treat this 24-hour rhythm as a focused experiment. Keep one promise to yourself each week.')
ON CONFLICT (type, number) DO NOTHING;

-- =============================================================================
-- NAME_NUMBERS (expression, soul_urge, personality for 11, 22, 33)
-- =============================================================================

INSERT INTO name_numbers (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('expression', 11, 'Expression (Destiny) Number 11 centers on intuition and illumination. It describes how your talents show in the world and how you can align choices with this pattern. When you honor this number, you move faster with less friction and feel more grounded in your direction.', ARRAY['visionary', 'inspired', 'sensitive'], ARRAY['nervous tension', 'self-doubt', 'overwhelm'], 'In love, this number leans into intuition and illumination. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects intuition and illumination. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO name_numbers (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('expression', 22, 'Expression (Destiny) Number 22 centers on master builder and legacy. It describes how your talents show in the world and how you can align choices with this pattern. When you honor this number, you move faster with less friction and feel more grounded in your direction.', ARRAY['practical visionary', 'organized', 'influential'], ARRAY['pressure to perform', 'perfectionism', 'overextension'], 'In love, this number leans into master builder and legacy. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master builder and legacy. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO name_numbers (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('expression', 33, 'Expression (Destiny) Number 33 centers on master teacher and compassion. It describes how your talents show in the world and how you can align choices with this pattern. When you honor this number, you move faster with less friction and feel more grounded in your direction.', ARRAY['healing presence', 'service-minded', 'uplifting'], ARRAY['burnout', 'boundary issues', 'idealism'], 'In love, this number leans into master teacher and compassion. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master teacher and compassion. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO name_numbers (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('soul_urge', 11, 'Soul Urge (Heart''s Desire) 11 centers on intuition and illumination. It describes what your inner self truly wants and how you can align choices with this pattern. When you honor this number, you move faster with less friction and feel more grounded in your direction.', ARRAY['visionary', 'inspired', 'sensitive'], ARRAY['nervous tension', 'self-doubt', 'overwhelm'], 'In love, this number leans into intuition and illumination. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects intuition and illumination. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO name_numbers (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('soul_urge', 22, 'Soul Urge (Heart''s Desire) 22 centers on master builder and legacy. It describes what your inner self truly wants and how you can align choices with this pattern. When you honor this number, you move faster with less friction and feel more grounded in your direction.', ARRAY['practical visionary', 'organized', 'influential'], ARRAY['pressure to perform', 'perfectionism', 'overextension'], 'In love, this number leans into master builder and legacy. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master builder and legacy. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO name_numbers (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('soul_urge', 33, 'Soul Urge (Heart''s Desire) 33 centers on master teacher and compassion. It describes what your inner self truly wants and how you can align choices with this pattern. When you honor this number, you move faster with less friction and feel more grounded in your direction.', ARRAY['healing presence', 'service-minded', 'uplifting'], ARRAY['burnout', 'boundary issues', 'idealism'], 'In love, this number leans into master teacher and compassion. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master teacher and compassion. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO name_numbers (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personality', 11, 'Personality Number 11 centers on intuition and illumination. It describes the impression you give others and how you can align choices with this pattern. When you honor this number, you move faster with less friction and feel more grounded in your direction.', ARRAY['visionary', 'inspired', 'sensitive'], ARRAY['nervous tension', 'self-doubt', 'overwhelm'], 'In love, this number leans into intuition and illumination. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects intuition and illumination. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO name_numbers (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personality', 22, 'Personality Number 22 centers on master builder and legacy. It describes the impression you give others and how you can align choices with this pattern. When you honor this number, you move faster with less friction and feel more grounded in your direction.', ARRAY['practical visionary', 'organized', 'influential'], ARRAY['pressure to perform', 'perfectionism', 'overextension'], 'In love, this number leans into master builder and legacy. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master builder and legacy. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;

INSERT INTO name_numbers (type, number, meaning, strengths, challenges, love, career, advice)
VALUES
  ('personality', 33, 'Personality Number 33 centers on master teacher and compassion. It describes the impression you give others and how you can align choices with this pattern. When you honor this number, you move faster with less friction and feel more grounded in your direction.', ARRAY['healing presence', 'service-minded', 'uplifting'], ARRAY['burnout', 'boundary issues', 'idealism'], 'In love, this number leans into master teacher and compassion. Build trust by naming needs clearly and choosing consistency over mixed signals.', 'Career flow improves when your work reflects master teacher and compassion. Choose roles where your natural pattern is an advantage, not a compromise.', 'Protect your energy, keep your routines simple, and commit to one meaningful project at a time.')
ON CONFLICT (type, number) DO NOTHING;
