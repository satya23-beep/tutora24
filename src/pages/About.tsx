import { Target, Heart, Shield, Users, BookOpen, TrendingUp } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-6">About Tutora24</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make expert university tutoring accessible, affordable, and
            effective for every student.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To connect university students with qualified tutors who can provide personalized
                academic support in key subjects, helping them achieve their full potential.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <p className="text-gray-600">
                Quality education, academic integrity, student success, and building lasting
                relationships between tutors and learners are at the core of everything we do.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
              <p className="text-gray-600">
                Every tutor is thoroughly vetted and verified. We ensure safe, professional, and
                effective tutoring experiences for all our students.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-900">Our Story</h2>
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Tutora24 was founded in northern Italy by two friends, Fayaz Ahmed and Satyajeet Malla, who personally experienced the
              challenges of finding quality academic support during their studies. They saw talented
              students struggling not because they lacked ability, but because they lacked access
              to the right guidance at the right time.
            </p>
            <p>
              We created Tutora24 to solve this problem. Our platform connects students with
              expert tutors who have deep knowledge in subjects like Physics, Mathematics,
              Economics, Computer Science, Medicine, and Engineering. Each tutor brings real-world
              academic experience and a passion for teaching.
            </p>
    
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
            Why Students Choose Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Experts</h3>
              <p className="text-gray-600">
                All tutors are verified university graduates or current postgraduate students with
                proven expertise in their subjects.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Flexible Learning</h3>
              <p className="text-gray-600">
                Choose between online or in-person sessions. Schedule lessons that fit your
                timetable and learning preferences.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Proven Results</h3>
              <p className="text-gray-600">
                Our students report an average grade improvement of 15% and increased confidence
                in their subject knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Ready to Excel in Your Studies?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of university students who have transformed their academic performance
            with Tutora24.
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Find Your Tutor Today
          </button>
        </div>
      </section>
    </div>
  );
}
