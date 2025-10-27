import { useState, useEffect } from 'react';
import { GraduationCap, Upload, CheckCircle } from 'lucide-react';
import { supabase, Subject } from '../lib/supabase';

export function Register() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    degree: '',
    yearsExperience: '',
    hourlyRate: '',
    bio: '',
    selectedSubjects: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadSubjects();
  }, []);

  async function loadSubjects() {
    const { data } = await supabase.from('subjects').select('*').order('name');
    if (data) setSubjects(data);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleSubject = (subjectId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(subjectId)
        ? prev.selectedSubjects.filter((id) => id !== subjectId)
        : [...prev.selectedSubjects, subjectId],
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Application Submitted Successfully!
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Thank you for your interest in becoming a Tutora24 tutor. We'll review your
              application and contact you within 2-3 business days.
            </p>
            <p className="text-gray-600 mb-8">
              You'll receive an email at <span className="font-bold">{formData.email}</span> with
              next steps.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">Become a Tutor</h1>
            <p className="text-gray-600 text-lg">
              Join our community of expert tutors and help students excel in their studies
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">Benefits of Joining Tutora24:</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>✓ Set your own hourly rate and schedule</li>
              <li>✓ Access to thousands of university students</li>
              <li>✓ Flexible online and in-person tutoring options</li>
              <li>✓ Secure payment processing and support</li>
              <li>✓ Build your professional tutoring profile</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="Dr. John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="john.smith@university.ac.uk"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  University <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="Oxford University"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Degree/Qualification <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="PhD in Physics"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Years of Experience <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Hourly Rate (£) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="20"
                  max="200"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                  placeholder="45"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Subjects You Can Teach <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    type="button"
                    onClick={() => toggleSubject(subject.id)}
                    className={`border-2 rounded-lg p-3 text-center transition ${
                      formData.selectedSubjects.includes(subject.id)
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{subject.icon}</div>
                    <div className="text-xs font-semibold">{subject.name}</div>
                  </button>
                ))}
              </div>
              {formData.selectedSubjects.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">Select at least one subject</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Biography <span className="text-red-600">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-600"
                placeholder="Tell students about your teaching experience, qualifications, and approach..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.bio.length} characters</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Profile Photo (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                <input type="file" accept="image/*" className="hidden" />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-start space-x-3">
                <input type="checkbox" required className="mt-1" />
                <span className="text-sm text-gray-700">
                  I confirm that all information provided is accurate and I agree to Tutora24's{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={formData.selectedSubjects.length === 0}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
