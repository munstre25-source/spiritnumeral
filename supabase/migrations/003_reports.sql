-- Orders / reports tracking for paid PDFs
CREATE TABLE IF NOT EXISTS reports (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  product TEXT NOT NULL, -- 'blueprint' | 'relationship'
  inputs JSONB NOT NULL, -- e.g., {numbers:[111,222], birthdays:[...], quiz:{...}}
  price_cents INT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending | generated | delivered | failed
  download_url TEXT,
  order_id TEXT, -- Lemon Squeezy order or checkout id
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_email ON reports(email);
CREATE INDEX IF NOT EXISTS idx_reports_order ON reports(order_id);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Service role full access
CREATE POLICY "Service role can manage reports" ON reports
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'reports_set_updated_at'
  ) THEN
    CREATE TRIGGER reports_set_updated_at
    BEFORE UPDATE ON reports
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();
  END IF;
END;
$$;
