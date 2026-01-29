-- Analytics events table for page views, CTA clicks, checkouts, and delivery
CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT,
  event_type TEXT NOT NULL, -- page_view | cta_click | checkout_start | order_created | pdf_sent
  path TEXT,
  referrer TEXT,
  product TEXT, -- blueprint | relationship | wealth
  metadata JSONB,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_product ON analytics_events(product);
CREATE INDEX IF NOT EXISTS idx_analytics_events_path ON analytics_events(path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage analytics events" ON analytics_events
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
