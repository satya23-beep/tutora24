import { useState, useEffect } from 'react';
import { Search, Star, Filter } from 'lucide-react';
import { supabase, Tutor, Subject } from '../lib/supabase';

export function FindTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tutorSubjects, setTutorSubjects] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [maxRate, setMaxRate] = useState(100);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [tutorsRes, subjectsRes, tutorSubjectsRes] = await Promise.all([
      supabase.from('tutors').select('*').eq('verified', true).order('rating', { ascending: false }),
      supabase.from('subjects').select('*').order('name'),
      supabase.from('tutor_subjects').select('tutor_id, subject_id, subjects(name)'),
    ]);

    if (tutorsRes.data) setTutors(tutorsRes.data);
    if (subjectsRes.data) setSubjects(subjectsRes.data);

    if (tutorSubjectsRes.data) {
      const mapping: Record<string, string[]> = {};
      tutorSubjectsRes.data.forEach((ts: any) => {
        if (!mapping[ts.tutor_id]) mapping[ts.tutor_id] = [];
        if (ts.subjects?.name) mapping[ts.tutor_id].push(ts.subjects.name);
      });
      setTutorSubjects(mapping);
    }
  }

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch =
      tutor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.university?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      !selectedSubject ||
      tutorSubjects[tutor.id]?.some((s) =>
        s.toLowerCase().includes(selectedSubject.toLowerCase())
      );

    const matchesRate = tutor.hourly_rate <= maxRate;

    return matchesSearch && matchesSubject && matchesRate;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-black text-white mb-6 text-center">Find Your Perfect Tutor</h1>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-4 flex items-center space-x-4">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, subject, or university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-lg"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-bold flex items-center space-x-2 hover:bg-blue-200 transition"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-600"
                >
                  <option value="">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.name}>
                      {subject.icon} {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Max Rate: £{maxRate}/hr
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={maxRate}
                  onChange={(e) => setMaxRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSubject('');
                    setMaxRate(100);
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-bold text-gray-900">{filteredTutors.length}</span> tutors found
          </p>
        </div>

        {filteredTutors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No tutors found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('');
                setMaxRate(100);
              }}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutors.map((tutor) => (
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

                  <p className="text-sm text-blue-600 font-semibold mb-1">{tutor.degree}</p>
                  <p className="text-sm text-gray-600 mb-3">{tutor.university}</p>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">{tutor.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutorSubjects[tutor.id]?.map((subject, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500 mb-4">
                    {tutor.years_experience} years experience • {tutor.total_sessions} sessions completed
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-2xl font-black text-gray-900">£{tutor.hourly_rate}</div>
                      <div className="text-xs text-gray-500">per hour</div>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
