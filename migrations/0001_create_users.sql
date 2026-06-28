-- Migration: 0001_create_users
-- Creates the core authentication table for all users (jobseekers).

CREATE TABLE IF NOT EXISTS users (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT    NOT NULL UNIQUE,
  password   TEXT    NOT NULL,  -- bcrypt/scrypt hash
  role       TEXT    NOT NULL DEFAULT 'jobseeker' CHECK (role IN ('jobseeker', 'employer', 'admin')),
  created_at TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
