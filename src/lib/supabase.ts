import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Tutor = {
  id: string;
  full_name: string;
  email: string;
  photo_url: string | null;
  bio: string | null;
  hourly_rate: number;
  university: string | null;
  degree: string | null;
  years_experience: number;
  verified: boolean;
  rating: number;
  total_sessions: number;
  created_at: string;
  updated_at: string;
};

export type Subject = {
  id: string;
  name: string;
  icon: string;
  description: string | null;
  created_at: string;
};

export type TutorSubject = {
  id: string;
  tutor_id: string;
  subject_id: string;
  created_at: string;
};

export type Booking = {
  id: string;
  tutor_id: string;
  student_name: string;
  student_email: string;
  subject_id: string | null;
  session_date: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

export type Testimonial = {
  id: string;
  student_name: string;
  tutor_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};
