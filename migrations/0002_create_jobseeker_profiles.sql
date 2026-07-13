-- Migration: 0002_create_jobseeker_profiles
-- Stores all extracted profile data for a jobseeker gathered by the AI interviewer.
-- References the users table via a foreign key.

CREATE TABLE IF NOT EXISTS jobseeker_profiles (
  id                    INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id               INTEGER NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,

  -- Personal Information
  full_name             TEXT,
  phone                 TEXT,
  location              TEXT,

  -- Self Introduction
  about_self            TEXT,

  -- Academic Information (stored as JSON for flexibility: degree, institution, year, grade)
  academic_info         TEXT,   -- JSON array of academic records

  -- Professional Information (stored as JSON: company, role, duration, description)
  professional_info     TEXT,   -- JSON array of work experience records

  -- Interview Evaluation Data
  sector                TEXT,   -- e.g. "Software Engineering", "Finance", "Healthcare"
  sector_reason         TEXT,   -- Answer to "Why did you choose this sector?"
  team_scenario_answer  TEXT,   -- Answer to team collaboration scenario question

  -- Profile completeness tracking (0-100)
  completeness_score    INTEGER NOT NULL DEFAULT 0,

  -- Onboarding state
  onboarding_skipped    INTEGER NOT NULL DEFAULT 0 CHECK (onboarding_skipped IN (0, 1)),
  onboarding_completed  INTEGER NOT NULL DEFAULT 0 CHECK (onboarding_completed IN (0, 1)),

  -- Profile details & documents
  skills                TEXT,
  photo_url             TEXT,
  resume_url            TEXT,
  resume_name           TEXT,

  created_at            TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at            TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_jobseeker_profiles_user_id ON jobseeker_profiles (user_id);
