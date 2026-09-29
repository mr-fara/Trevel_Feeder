ALTER TABLE enquiries
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

ALTER TABLE transfer_requests
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'enquiries_status_valid') THEN
    ALTER TABLE enquiries ADD CONSTRAINT enquiries_status_valid
      CHECK (status IN ('new', 'contacted', 'confirmed', 'closed'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'transfer_requests_status_valid') THEN
    ALTER TABLE transfer_requests ADD CONSTRAINT transfer_requests_status_valid
      CHECK (status IN ('new', 'confirmed', 'completed', 'cancelled'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS enquiries_status_created_at_idx ON enquiries (status, created_at DESC);
CREATE INDEX IF NOT EXISTS transfer_requests_status_created_at_idx ON transfer_requests (status, created_at DESC);
