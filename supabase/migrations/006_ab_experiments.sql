-- A/B experiment config: CTA variants (e.g. Psychic CTA on emotional pages).
-- Admin can edit variants and control from the admin panel; app reads via GET /api/ab-config.

CREATE TABLE IF NOT EXISTS ab_experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  variants JSONB NOT NULL DEFAULT '[]'::jsonb,
  control_id TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ab_experiments_key ON ab_experiments(key);
CREATE INDEX IF NOT EXISTS idx_ab_experiments_enabled ON ab_experiments(enabled);

ALTER TABLE ab_experiments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage ab_experiments" ON ab_experiments
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'ab_experiments_set_updated_at') THEN
    CREATE TRIGGER ab_experiments_set_updated_at
    BEFORE UPDATE ON ab_experiments
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;
END;
$$;

-- Seed: Psychic CTA experiment (emotional pages)
INSERT INTO ab_experiments (key, name, variants, control_id, enabled)
VALUES (
  'psychic_cta',
  'Psychic CTA (emotional pages)',
  '[
    {"id": "control", "copy": "Try 3 free minutes →"},
    {"id": "reveal", "copy": "Reveal my number →"},
    {"id": "unlock", "copy": "Unlock my number →"},
    {"id": "see_what", "copy": "See what it means →"}
  ]'::jsonb,
  'control',
  true
)
ON CONFLICT (key) DO NOTHING;
