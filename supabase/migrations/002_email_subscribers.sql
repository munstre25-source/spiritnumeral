-- Create email_subscribers table for lead capture
CREATE TABLE IF NOT EXISTS email_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'popup',
  metadata JSONB, -- Stores quiz answers, suggested numbers, etc.
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_source ON email_subscribers(source);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_active ON email_subscribers(is_active);

-- Enable RLS
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow insert from service role (API) only
CREATE POLICY "Service role can insert subscribers" ON email_subscribers
  FOR INSERT TO service_role
  WITH CHECK (true);

-- Allow select from service role only
CREATE POLICY "Service role can select subscribers" ON email_subscribers
  FOR SELECT TO service_role
  USING (true);

-- Allow update from service role only
CREATE POLICY "Service role can update subscribers" ON email_subscribers
  FOR UPDATE TO service_role
  USING (true);
