CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE SCHEMA IF NOT EXISTS bus_mantra;
SET search_path TO bus_mantra, public;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin')),
  role_id UUID,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  is_system BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_role_permissions (
  role_id UUID NOT NULL REFERENCES admin_roles(id) ON DELETE CASCADE,
  module_key TEXT NOT NULL CHECK (module_key IN ('dashboard', 'fleet', 'services', 'destinations', 'sales', 'roles', 'admins')),
  can_view BOOLEAN NOT NULL DEFAULT FALSE,
  can_create BOOLEAN NOT NULL DEFAULT FALSE,
  can_edit BOOLEAN NOT NULL DEFAULT FALSE,
  can_delete BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (role_id, module_key)
);

ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS role_id UUID;
ALTER TABLE admin_users DROP CONSTRAINT IF EXISTS admin_users_role_id_fkey;
ALTER TABLE admin_users ADD CONSTRAINT admin_users_role_id_fkey
  FOREIGN KEY (role_id) REFERENCES admin_roles(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fleets (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  coach_type TEXT NOT NULL DEFAULT 'mini-coach',
  name TEXT NOT NULL,
  capacity TEXT NOT NULL,
  min_seats INTEGER NOT NULL,
  max_seats INTEGER NOT NULL,
  rate_per_km NUMERIC(10,2) NOT NULL,
  default_round_trip_km INTEGER,
  default_estimated_fare NUMERIC(10,2),
  is_popular BOOLEAN NOT NULL DEFAULT FALSE,
  image TEXT NOT NULL,
  gallery JSONB NOT NULL DEFAULT '[]',
  description TEXT NOT NULL,
  amenities JSONB NOT NULL DEFAULT '[]',
  features JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE fleets ADD COLUMN IF NOT EXISTS coach_type TEXT;
UPDATE fleets
SET coach_type = CASE
  WHEN id LIKE 'premium-coach%' OR slug LIKE 'premium-coach%' THEN 'premium-coach'
  WHEN id LIKE 'luxury-coach%' OR slug LIKE 'luxury-coach%' THEN 'luxury-coach'
  ELSE 'mini-coach'
END
WHERE coach_type IS NULL;
ALTER TABLE fleets ALTER COLUMN coach_type SET DEFAULT 'mini-coach';
ALTER TABLE fleets ALTER COLUMN coach_type SET NOT NULL;
ALTER TABLE fleets ADD COLUMN IF NOT EXISTS default_round_trip_km INTEGER;
ALTER TABLE fleets ADD COLUMN IF NOT EXISTS default_estimated_fare NUMERIC(10,2);

CREATE TABLE IF NOT EXISTS destinations (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  badge TEXT,
  route TEXT,
  description TEXT NOT NULL,
  gallery JSONB NOT NULL DEFAULT '[]',
  popular_places JSONB NOT NULL DEFAULT '[]',
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE destinations ADD COLUMN IF NOT EXISTS content JSONB NOT NULL DEFAULT '{}';

CREATE TABLE IF NOT EXISTS services (
  slug TEXT PRIMARY KEY,
  id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  mobile TEXT NOT NULL,
  passengers INTEGER NOT NULL CHECK (passengers > 0),
  pickup_point TEXT NOT NULL,
  destinations JSONB NOT NULL,
  departure_at TEXT NOT NULL,
  return_at TEXT,
  fleet_id TEXT REFERENCES fleets(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'new',
  estimated_fare NUMERIC(12,2),
  payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'deposit_paid', 'paid', 'refunded')),
  assigned_to UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  sales_notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS estimated_fare NUMERIC(12,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES admin_users(id) ON DELETE SET NULL;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS sales_notes TEXT NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('contact', 'vendor', 'service')),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT,
  payload JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new',
  assigned_to UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  expected_value NUMERIC(12,2),
  follow_up_at TIMESTAMPTZ,
  sales_notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES admin_users(id) ON DELETE SET NULL;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS expected_value NUMERIC(12,2);
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS follow_up_at TIMESTAMPTZ;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS sales_notes TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS sessions_token_hash_idx ON sessions(token_hash);
CREATE INDEX IF NOT EXISTS admin_sessions_token_hash_idx ON admin_sessions(token_hash);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_assigned_to_idx ON bookings(assigned_to);
CREATE INDEX IF NOT EXISTS inquiries_assigned_to_idx ON inquiries(assigned_to);
