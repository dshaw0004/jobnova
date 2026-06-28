-- Migration: 0004_create_employer_profiles
-- Stores company and representative details for verified employers.
-- References the users table via a foreign key.

CREATE TABLE IF NOT EXISTS employer_profiles (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id             INTEGER NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,

  -- Company Details
  company_name        TEXT,
  company_type        TEXT,
  industry_type       TEXT,

  -- Representative Details
  executive_name      TEXT,
  executive_phone     TEXT,

  -- Company Information & Location
  description         TEXT,
  address             TEXT,
  pincode             TEXT,
  country             TEXT NOT NULL DEFAULT 'India',
  state               TEXT,
  city                TEXT,

  -- Approval/Status tracking
  is_approved         INTEGER NOT NULL DEFAULT 0 CHECK (is_approved IN (0, 1)),

  created_at          TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_employer_profiles_user_id ON employer_profiles (user_id);
