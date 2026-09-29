CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  service VARCHAR(100) NOT NULL,
  destination VARCHAR(200),
  travel_date DATE,
  return_date DATE,
  passengers VARCHAR(40),
  trip_type VARCHAR(80),
  message TEXT,
  source VARCHAR(80) NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT enquiries_return_after_departure
    CHECK (return_date IS NULL OR travel_date IS NULL OR return_date >= travel_date)
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_email_idx ON enquiries (email);

CREATE TABLE IF NOT EXISTS transfer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  airport VARCHAR(160) NOT NULL,
  destination VARCHAR(200) NOT NULL,
  arrival_date DATE NOT NULL,
  arrival_time TIME,
  flight_number VARCHAR(32),
  passenger_count SMALLINT NOT NULL CHECK (passenger_count BETWEEN 1 AND 50),
  vehicle_type VARCHAR(100) NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS transfer_requests_created_at_idx ON transfer_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS transfer_requests_email_idx ON transfer_requests (email);

CREATE TABLE IF NOT EXISTS content_documents (
  document_key VARCHAR(80) PRIMARY KEY,
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
