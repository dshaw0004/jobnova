-- Migration: 0013_add_ai_screening
-- Adds AI screening columns to jobs and job_applications tables.

ALTER TABLE jobs ADD COLUMN ai_screening_enabled INTEGER NOT NULL DEFAULT 0 CHECK (ai_screening_enabled IN (0, 1));
ALTER TABLE jobs ADD COLUMN ai_screening_prompt TEXT;

ALTER TABLE job_applications ADD COLUMN ai_screening_completed INTEGER NOT NULL DEFAULT 0 CHECK (ai_screening_completed IN (0, 1));
ALTER TABLE job_applications ADD COLUMN ai_screening_score INTEGER;
ALTER TABLE job_applications ADD COLUMN ai_screening_summary TEXT;
ALTER TABLE job_applications ADD COLUMN ai_screening_chat_history TEXT;
