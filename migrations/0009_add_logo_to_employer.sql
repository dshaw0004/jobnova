-- Migration: 0009_add_logo_to_employer
-- Add logo_url column to employer_profiles to support logo upload.
ALTER TABLE employer_profiles ADD COLUMN logo_url TEXT;
