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
      - `full_name` (text) - Tutor's full name
      - `email` (text, unique) - Contact email
      - `photo_url` (text) - Profile photo URL
      - `bio` (text) - Short biography
      - `hourly_rate` (numeric) - Rate in currency
      - `university` (text) - University affiliation
      - `degree` (text) - Degree/qualification
      - `years_experience` (integer) - Years of teaching experience
      - `verified` (boolean) - Verification status
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
    - Add policies for public read access on tutors and subjects
    - Add policies for authenticated users to create bookings
    - Add policies for tutors to manage their profiles

  3. Important Notes
    - All tables use UUID primary keys with automatic generation
    - Timestamps default to now()
    - Numeric fields for ratings and prices
    - Junction table for many-to-many tutor-subject relationship
*/

-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text DEFAULT '📚',
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create tutors table
CREATE TABLE IF NOT EXISTS tutors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  photo_url text,
  bio text,
  hourly_rate numeric(10, 2) NOT NULL,
  university text,
  degree text,
  years_experience integer DEFAULT 0,
  verified boolean DEFAULT false,
  rating numeric(3, 2) DEFAULT 0,
  total_sessions integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tutor_subjects junction table
CREATE TABLE IF NOT EXISTS tutor_subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id uuid REFERENCES tutors(id) ON DELETE CASCADE,
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tutor_id, subject_id)
);

-- Create bookings table
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

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  tutor_id uuid REFERENCES tutors(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Subjects policies (public read)
CREATE POLICY "Anyone can view subjects"
  ON subjects FOR SELECT
  TO public
  USING (true);

-- Tutors policies (public read for verified tutors)
CREATE POLICY "Anyone can view verified tutors"
  ON tutors FOR SELECT
  TO public
  USING (verified = true);

CREATE POLICY "Tutors can update own profile"
  ON tutors FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Tutor subjects policies (public read)
CREATE POLICY "Anyone can view tutor subjects"
  ON tutor_subjects FOR SELECT
  TO public
  USING (true);

-- Bookings policies
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view their bookings"
  ON bookings FOR SELECT
  TO public
  USING (true);

-- Testimonials policies (public read)
CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

-- Insert sample subjects
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

-- Insert sample tutors
INSERT INTO tutors (full_name, email, photo_url, bio, hourly_rate, university, degree, years_experience, verified, rating, total_sessions) VALUES
  ('Dr. Sarah Mitchell', 'sarah.mitchell@example.com', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', 'PhD in Physics from Oxford. Specializing in quantum mechanics and thermodynamics. 8 years of university teaching experience.', 45.00, 'Oxford University', 'PhD in Physics', 8, true, 4.9, 234),
  ('Prof. James Chen', 'james.chen@example.com', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400', 'Mathematics professor with expertise in calculus and linear algebra. Patient and results-oriented teaching style.', 40.00, 'Cambridge University', 'PhD in Mathematics', 10, true, 4.8, 312),
  ('Dr. Emily Rodriguez', 'emily.rodriguez@example.com', 'https://images.pexels.com/photos/3727464/pexels-photo-3727464.jpeg?auto=compress&cs=tinysrgb&w=400', 'Economics specialist with industry experience. Expert in econometrics and financial economics.', 50.00, 'LSE', 'PhD in Economics', 6, true, 5.0, 189),
  ('Mark Thompson', 'mark.thompson@example.com', 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400', 'Senior software engineer and CS educator. Specializing in algorithms, data structures, and Python programming.', 55.00, 'Imperial College', 'MSc Computer Science', 7, true, 4.9, 267),
  ('Dr. Lisa Wang', 'lisa.wang@example.com', 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400', 'Medical school instructor with clinical experience. Expert in anatomy, physiology, and medical biochemistry.', 60.00, 'Kings College London', 'MD, PhD', 9, true, 4.8, 156),
  ('David Kumar', 'david.kumar@example.com', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', 'Mechanical engineering expert with research background. Passionate about making complex concepts simple.', 42.00, 'UCL', 'PhD in Engineering', 5, true, 4.7, 198),
  ('Prof. Anna Kowalski', 'anna.kowalski@example.com', 'https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=400', 'Business management consultant and educator. MBA from top business school with 12 years of experience.', 48.00, 'London Business School', 'MBA, MSc Management', 12, true, 4.9, 421),
  ('Dr. Robert Taylor', 'robert.taylor@example.com', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400', 'Chemistry researcher and tutor. Specializing in organic chemistry and lab techniques.', 38.00, 'University of Manchester', 'PhD in Chemistry', 4, true, 4.6, 143)
ON CONFLICT DO NOTHING;

-- Link tutors to subjects (get IDs dynamically)
DO $$
DECLARE
  physics_id uuid;
  math_id uuid;
  econ_id uuid;
  mgmt_id uuid;
  cs_id uuid;
  med_id uuid;
  eng_id uuid;
  chem_id uuid;
BEGIN
  SELECT id INTO physics_id FROM subjects WHERE name = 'Physics';
  SELECT id INTO math_id FROM subjects WHERE name = 'Mathematics';
  SELECT id INTO econ_id FROM subjects WHERE name = 'Economics';
  SELECT id INTO mgmt_id FROM subjects WHERE name = 'Management';
  SELECT id INTO cs_id FROM subjects WHERE name = 'Computer Science';
  SELECT id INTO med_id FROM subjects WHERE name = 'Medicine';
  SELECT id INTO eng_id FROM subjects WHERE name = 'Engineering';
  SELECT id INTO chem_id FROM subjects WHERE name = 'Chemistry';

  -- Dr. Sarah Mitchell - Physics, Mathematics
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, physics_id FROM tutors WHERE email = 'sarah.mitchell@example.com'
  ON CONFLICT DO NOTHING;
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, math_id FROM tutors WHERE email = 'sarah.mitchell@example.com'
  ON CONFLICT DO NOTHING;

  -- Prof. James Chen - Mathematics
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, math_id FROM tutors WHERE email = 'james.chen@example.com'
  ON CONFLICT DO NOTHING;

  -- Dr. Emily Rodriguez - Economics, Mathematics
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, econ_id FROM tutors WHERE email = 'emily.rodriguez@example.com'
  ON CONFLICT DO NOTHING;
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, math_id FROM tutors WHERE email = 'emily.rodriguez@example.com'
  ON CONFLICT DO NOTHING;

  -- Mark Thompson - Computer Science, Mathematics
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, cs_id FROM tutors WHERE email = 'mark.thompson@example.com'
  ON CONFLICT DO NOTHING;
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, math_id FROM tutors WHERE email = 'mark.thompson@example.com'
  ON CONFLICT DO NOTHING;

  -- Dr. Lisa Wang - Medicine, Chemistry
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, med_id FROM tutors WHERE email = 'lisa.wang@example.com'
  ON CONFLICT DO NOTHING;
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, chem_id FROM tutors WHERE email = 'lisa.wang@example.com'
  ON CONFLICT DO NOTHING;

  -- David Kumar - Engineering, Physics, Mathematics
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, eng_id FROM tutors WHERE email = 'david.kumar@example.com'
  ON CONFLICT DO NOTHING;
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, physics_id FROM tutors WHERE email = 'david.kumar@example.com'
  ON CONFLICT DO NOTHING;
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, math_id FROM tutors WHERE email = 'david.kumar@example.com'
  ON CONFLICT DO NOTHING;

  -- Prof. Anna Kowalski - Management, Economics
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, mgmt_id FROM tutors WHERE email = 'anna.kowalski@example.com'
  ON CONFLICT DO NOTHING;
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, econ_id FROM tutors WHERE email = 'anna.kowalski@example.com'
  ON CONFLICT DO NOTHING;

  -- Dr. Robert Taylor - Chemistry
  INSERT INTO tutor_subjects (tutor_id, subject_id)
  SELECT id, chem_id FROM tutors WHERE email = 'robert.taylor@example.com'
  ON CONFLICT DO NOTHING;
END $$;

-- Insert sample testimonials
INSERT INTO testimonials (student_name, tutor_id, rating, comment)
SELECT 'Alex Johnson', id, 5, 'Dr. Mitchell is an exceptional physics tutor! She made quantum mechanics so much easier to understand. Highly recommend!'
FROM tutors WHERE email = 'sarah.mitchell@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (student_name, tutor_id, rating, comment)
SELECT 'Sophie Williams', id, 5, 'Prof. Chen helped me ace my calculus exam. His teaching style is clear and patient. Worth every penny!'
FROM tutors WHERE email = 'james.chen@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (student_name, tutor_id, rating, comment)
SELECT 'Michael Brown', id, 5, 'Dr. Rodriguez has incredible expertise in economics. She helped me understand complex theories with real-world examples.'
FROM tutors WHERE email = 'emily.rodriguez@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (student_name, tutor_id, rating, comment)
SELECT 'Emma Davis', id, 4, 'Mark is a great programming tutor. Helped me with algorithms and data structures for my CS degree.'
FROM tutors WHERE email = 'mark.thompson@example.com'
ON CONFLICT DO NOTHING;
