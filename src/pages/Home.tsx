import { useState, useEffect } from 'react';
import { BookOpen, Users, Star, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { supabase, Tutor, Subject, Testimonial } from '../lib/supabase';

type HomeProps = {
  onNavigate: (page: string) => void;
};

export function Home({ onNavigate }: HomeProps) {
  const [featuredTutors, setFeaturedTutors] = useState<Tutor[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [tutorSubjects, setTutorSubjects] = useState<Record<string, string[]>>({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [tutorsRes, subjectsRes, testimonialsRes, tutorSubjectsRes] = await Promise.all([
      supabase.from('tutors').select('*').eq('verified', true).limit(6),
      supabase.from('subjects').select('*'),
      supabase.from('testimonials').select('*').limit(4),
      supabase.from('tutor_subjects').select('tutor_id, subject_id, subjects(name)'),
    ]);

    if (tutorsRes.data) setFeaturedTutors(tutorsRes.data);
    if (subjectsRes.data) setSubjects(subjectsRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);

    if (tutorSubjectsRes.data) {
      const mapping: Record<string, string[]> = {};
      tutorSubjectsRes.data.forEach((ts: any) => {
        if (!mapping[ts.tutor_id]) mapping[ts.tutor_id] = [];
        if (ts.subjects?.name) mapping[ts.tutor_id].push(ts.subjects.name);
      });
      setTutorSubjects(mapping);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                Expert University Tutoring Made Simple
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with verified tutors in Physics, Mathematics, Economics, Computer Science, and more.
                Start your free trial today and excel in your studies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onNavigate('tutors')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
                >
                  <span>Find Your Tutor</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
                >
                  Start Free Trial
                </button>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Verified tutors only</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">5,000+</div>
                      <div className="text-gray-600">Verified Tutors</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">50,000+</div>
                      <div className="text-gray-600">Students Helped</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                      <Star className="w-8 h-8 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">4.9/5</div>
                      <div className="text-gray-600">Average Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
            Popular University Subjects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subjects.slice(0, 8).map((subject) => (
              <button
                key={subject.id}
                onClick={() => onNavigate('tutors')}
                className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{subject.icon}</div>
                <h3 className="font-bold text-gray-900">{subject.name}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4 text-gray-900">Featured Tutors</h2>
            <p className="text-gray-600 text-lg">
              Meet some of our top-rated university tutors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  {tutor.photo_url ? (
                    <img
                      src={tutor.photo_url}
                      alt={tutor.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-blue-600">
                        {tutor.full_name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-xl text-gray-900">{tutor.full_name}</h3>
                    <div className="flex items-center space-x-1 bg-amber-50 px-2 py-1 rounded">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-bold text-gray-900">{tutor.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{tutor.university}</p>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">{tutor.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutorSubjects[tutor.id]?.slice(0, 2).map((subject, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-2xl font-black text-gray-900">£{tutor.hourly_rate}</div>
                      <div className="text-xs text-gray-500">per hour</div>
                    </div>
                    <button
                      onClick={() => onNavigate('tutors')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('tutors')}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition"
            >
              View All Tutors
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Browse & Search</h3>
              <p className="text-gray-600">
                Search our database of verified university tutors. Filter by subject, rate, university, and availability.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Book a Session</h3>
              <p className="text-gray-600">
                Review tutor profiles, read reviews, and book your first session. Start with a free trial to find your perfect match.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Learn & Excel</h3>
              <p className="text-gray-600">
                Attend your sessions online or in-person. Track your progress and achieve your academic goals with expert guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
              What Students Say
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 text-sm">{testimonial.comment}</p>
                  <p className="font-bold text-gray-900">{testimonial.student_name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to Start Your Free Trial?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of university students getting expert help. No credit card required.
          </p>
          <button
            onClick={() => onNavigate('pricing')}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition inline-flex items-center space-x-2"
          >
            <Clock className="w-5 h-5" />
            <span>Start Free Trial Now</span>
          </button>
        </div>
      </section>
    </div>
  );
}
