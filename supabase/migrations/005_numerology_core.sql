-- Core numerology meanings for name numbers, timing cycles, and lifecycle numbers

CREATE TABLE IF NOT EXISTS name_numbers (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL, -- expression | soul_urge | personality
  number INT NOT NULL,
  meaning TEXT NOT NULL,
  strengths TEXT[] NOT NULL,
  challenges TEXT[] NOT NULL,
  love TEXT NOT NULL,
  career TEXT NOT NULL,
  advice TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (type, number)
);

CREATE TABLE IF NOT EXISTS timing_cycles (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL, -- personal_year | personal_month | personal_day
  number INT NOT NULL,
  meaning TEXT NOT NULL,
  strengths TEXT[] NOT NULL,
  challenges TEXT[] NOT NULL,
  love TEXT NOT NULL,
  career TEXT NOT NULL,
  advice TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (type, number)
);

CREATE TABLE IF NOT EXISTS lifecycle_numbers (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL, -- pinnacle | challenge | maturity | birthday | karmic_debt
  number INT NOT NULL,
  meaning TEXT NOT NULL,
  strengths TEXT[] NOT NULL,
  challenges TEXT[] NOT NULL,
  love TEXT NOT NULL,
  career TEXT NOT NULL,
  advice TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (type, number)
);

CREATE INDEX IF NOT EXISTS idx_name_numbers_type ON name_numbers(type);
CREATE INDEX IF NOT EXISTS idx_timing_cycles_type ON timing_cycles(type);
CREATE INDEX IF NOT EXISTS idx_lifecycle_numbers_type ON lifecycle_numbers(type);

ALTER TABLE name_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE timing_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifecycle_numbers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage name_numbers" ON name_numbers
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage timing_cycles" ON timing_cycles
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role can manage lifecycle_numbers" ON lifecycle_numbers
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- updated_at trigger reuse from prior migration (set_updated_at)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'name_numbers_set_updated_at'
  ) THEN
    CREATE TRIGGER name_numbers_set_updated_at
    BEFORE UPDATE ON name_numbers
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'timing_cycles_set_updated_at'
  ) THEN
    CREATE TRIGGER timing_cycles_set_updated_at
    BEFORE UPDATE ON timing_cycles
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'lifecycle_numbers_set_updated_at'
  ) THEN
    CREATE TRIGGER lifecycle_numbers_set_updated_at
    BEFORE UPDATE ON lifecycle_numbers
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;
END;
$$;
