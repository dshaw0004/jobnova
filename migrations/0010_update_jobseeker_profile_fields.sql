-- Migration: 0010_update_jobseeker_profile_fields
-- Adds skills, photo_url, resume_url, and resume_name columns to jobseeker_profiles

ALTER TABLE jobseeker_profiles ADD COLUMN skills TEXT;
ALTER TABLE jobseeker_profiles ADD COLUMN photo_url TEXT;
ALTER TABLE jobseeker_profiles ADD COLUMN resume_url TEXT;
ALTER TABLE jobseeker_profiles ADD COLUMN resume_name TEXT;
