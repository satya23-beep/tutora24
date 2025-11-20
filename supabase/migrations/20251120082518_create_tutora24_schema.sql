/*
  # Tutora24 Platform Schema

  1. New Tables
    - `subjects`
      - `id` (uuid, primary key)
      - `name` (text) - Subject name (e.g., Physics, Mathematics)
      - `icon` (text) - Emoji or icon identifier
      - `description` (text) - Subject description
      - `created_at` (timestamptz)
    
    - `tutors`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key -> auth.users)
      - `full_name` (text) - Tutor's full name
      - `email` (text, unique) - Contact email
      - `photo_url` (text) - Profile photo URL
      - `bio` (text) - Short biography
      - `hourly_rate` (numeric) - Rate in currency
      - `university` (text) - University affiliation
      - `degree` (text) - Degree/qualification
      - `years_experience` (integer) - Years of teaching experience
      - `verified` (boolean) - Verification status
      - `verification_status` (text) - 'pending', 'verified', 'rejected'
      - `rating` (numeric) - Average rating (0-5)
      - `total_sessions` (integer) - Total completed sessions
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `tutor_subjects`
      - `id` (uuid, primary key)
      - `tutor_id` (uuid, foreign key -> tutors)
      - `subject_id` (uuid, foreign key -> subjects)
      - `created_at` (timestamptz)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `tutor_id` (uuid, foreign key -> tutors)
      - `student_name` (text)
      - `student_email` (text)
      - `subject_id` (uuid, foreign key -> subjects)
      - `session_date` (timestamptz)
      - `status` (text) - pending, confirmed, completed, cancelled
      - `notes` (text)
      - `created_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `student_name` (text)
      - `tutor_id` (uuid, foreign key -> tutors)
      - `rating` (integer) - 1-5 stars
      - `comment` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access on verified tutors and subjects
    - Add policies for authenticated tutors to manage their own profiles
    - Add policies for public to create bookings

  3. Important Notes
    - All tables use UUID primary keys with automatic generation
    - Timestamps default to now()
    - Numeric fields for ratings and prices
    - Junction table for many-to-many tutor-subject relationship
    - user_id links tutors to auth.users for authentication
*/

CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text DEFAULT '📚',
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tutors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  photo_url text,
  bio text,
  hourly_rate numeric(10, 2) NOT NULL,
  university text,
  degree text,
  years_experience integer DEFAULT 0,
  verified boolean DEFAULT false,
  verification_status text DEFAULT 'pending',
  rating numeric(3, 2) DEFAULT 0,
  total_sessions integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tutor_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid REFERENCES tutors(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tutor_id, subject_id)
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid REFERENCES tutors(id) ON DELETE CASCADE,
  student_name text NOT NULL,
  student_email text NOT NULL,
  subject_id uuid REFERENCES subjects(id),
  session_date timestamptz,
  status text DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  tutor_id uuid REFERENCES tutors(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view subjects"
  ON subjects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view verified tutors"
  ON tutors FOR SELECT
  TO public
  USING (verified = true AND verification_status = 'verified');

CREATE POLICY "Tutors can view own profile"
  ON tutors FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Tutors can update own profile"
  ON tutors FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Tutors can insert own profile"
  ON tutors FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view tutor subjects"
  ON tutor_subjects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their bookings"
  ON bookings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

INSERT INTO subjects (name, icon, description) VALUES
  ('Physics', '⚛️', 'Classical mechanics, quantum physics, thermodynamics, and more'),
  ('Mathematics', '📐', 'Calculus, algebra, statistics, discrete math, and applied mathematics'),
  ('Economics', '📊', 'Microeconomics, macroeconomics, econometrics, and business economics'),
  ('Management', '💼', 'Business strategy, operations, leadership, and organizational behavior'),
  ('Computer Science', '💻', 'Programming, algorithms, data structures, AI, and software engineering'),
  ('Medicine', '⚕️', 'Anatomy, physiology, pharmacology, and clinical sciences'),
  ('Engineering', '⚙️', 'Mechanical, electrical, civil, and chemical engineering'),
  ('Chemistry', '🧪', 'Organic, inorganic, physical chemistry, and biochemistry')
ON CONFLICT DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_tutors_user_id ON tutors(user_id);
CREATE INDEX IF NOT EXISTS idx_tutors_verified ON tutors(verified, verification_status);
CREATE INDEX IF NOT EXISTS idx_tutor_subjects_tutor_id ON tutor_subjects(tutor_id);
CREATE INDEX IF NOT EXISTS idx_tutor_subjects_subject_id ON tutor_subjects(subject_id);