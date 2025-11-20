import { useEffect, useState } from 'react';
import { AlertCircle, LogOut, Clock, Users, Star, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Tutor {
  id: string;
  full_name: string;
  email: string;
  bio: string;
  hourly_rate: number;
  university: string;
  degree: string;
  years_experience: number;
  verification_status: string;
  verified: boolean;
  rating: number;
  total_sessions: number;
  photo_url?: string;
}

export function TutorDashboard() {
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadTutorProfile();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      window.location.href = '/tutor-login';
    } else {
      setUser(data.session.user);
    }
  };

  const loadTutorProfile = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();

      if (!session?.user) {
        window.location.href = '/tutor-login';
        return;
      }

      const { data, error } = await supabase
        .from('tutors')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) {
        setError('Failed to load tutor profile');
        return;
      }

      if (!data) {
        setError('Tutor profile not found');
        return;
      }

      setTutor(data);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 mb-6">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Tutor profile not found</p>
        </div>
      </div>
    );
  }

  const isVerificationPending = tutor.verification_status === 'pending';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-gray-900">Tutor Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition bg-white px-4 py-2 rounded-xl border border-gray-200"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {isVerificationPending && (
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6 mb-8">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-900 mb-1">Verification Pending</h3>
                <p className="text-amber-800 text-sm">
                  Your account is under review. We're verifying your qualifications and credentials. This usually takes 2-3 business days. You'll receive an email once your account is verified.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">Hourly Rate</h3>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">£</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">£{tutor.hourly_rate}</p>
            <p className="text-xs text-gray-500 mt-2">Per hour</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">Total Sessions</h3>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{tutor.total_sessions}</p>
            <p className="text-xs text-gray-500 mt-2">Completed sessions</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-600">Rating</h3>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{tutor.rating.toFixed(1)}</p>
            <p className="text-xs text-gray-500 mt-2">Out of 5.0</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Full Name
                  </label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{tutor.full_name}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Email Address
                  </label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{tutor.email}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    University
                  </label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{tutor.university}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Qualification
                  </label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{tutor.degree}</p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Years of Experience
                  </label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{tutor.years_experience} years</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                  Biography
                </label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 leading-relaxed">{tutor.bio}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Account Status</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-1 ${isVerificationPending ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {isVerificationPending ? 'Verification Pending' : 'Verified'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {isVerificationPending
                        ? 'Your account is under review'
                        : 'Your account has been verified'}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200 my-4"></div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <Clock className="w-4 h-4 flex-shrink-0 text-blue-600" />
                    <span>Member since {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold rounded-xl transition">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
