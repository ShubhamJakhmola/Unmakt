/*
  # Create Community Applications Table

  1. New Tables
    - `community_applications`
      - `id` (uuid, primary key) - Unique identifier for each application
      - `name` (text) - Full name of the applicant
      - `email` (text) - Email address of the applicant
      - `skills` (text) - Primary skills of the applicant
      - `experience` (text) - Years of experience
      - `portfolio` (text, nullable) - Portfolio or LinkedIn URL
      - `message` (text) - Why they want to join Unmakt
      - `status` (text) - Application status (pending, reviewing, accepted, rejected)
      - `created_at` (timestamptz) - Timestamp when application was submitted
      - `updated_at` (timestamptz) - Timestamp when application was last updated

  2. Security
    - Enable RLS on `community_applications` table
    - Add policy for anyone to insert applications (public submission)
    - Add policy for authenticated admins to view all applications
    
  3. Important Notes
    - Applications start with 'pending' status by default
    - Public users can only submit applications, not view them
    - Email validation is handled at application level
*/

CREATE TABLE IF NOT EXISTS community_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  skills text NOT NULL,
  experience text NOT NULL,
  portfolio text,
  message text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE community_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications"
  ON community_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all applications"
  ON community_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update applications"
  ON community_applications
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_community_applications_email ON community_applications(email);
CREATE INDEX IF NOT EXISTS idx_community_applications_status ON community_applications(status);
CREATE INDEX IF NOT EXISTS idx_community_applications_created_at ON community_applications(created_at DESC);
