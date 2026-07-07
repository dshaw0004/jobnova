-- Add cover_letter and application_deadline columns
ALTER TABLE job_applications ADD COLUMN cover_letter TEXT;
ALTER TABLE jobs ADD COLUMN application_deadline TEXT;
