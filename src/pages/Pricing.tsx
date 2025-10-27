import { Check, Clock, Star, CreditCard } from 'lucide-react';

type PricingProps = {
  onNavigate: (page: string) => void;
};

export function Pricing({ onNavigate }: PricingProps) {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with a free trial session. No credit card required. Only pay for what you need.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="text-center mb-6">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-black mb-2">Free Trial</h3>
                <div className="text-4xl font-black text-gray-900 mb-2">£0</div>
                <p className="text-gray-600">30-minute session</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">One free 30-minute trial session</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Access to all subjects</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Meet your tutor before committing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">No credit card required</span>
                </li>
              </ul>
              <button
                onClick={() => onNavigate('tutors')}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition"
              >
                Start Free Trial
              </button>
            </div>

            <div className="bg-blue-600 text-white border-2 border-blue-700 rounded-2xl p-8 transform scale-105 shadow-2xl">
              <div className="absolute top-0 right-0 bg-amber-400 text-gray-900 px-4 py-1 rounded-bl-lg rounded-tr-xl font-bold text-sm">
                MOST POPULAR
              </div>
              <div className="text-center mb-6">
                <Star className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-black mb-2">Pay As You Go</h3>
                <div className="text-4xl font-black mb-2">£25-60</div>
                <p className="text-blue-100">per hour (varies by tutor)</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Book individual sessions anytime</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Choose from 5,000+ verified tutors</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Flexible scheduling</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Online or in-person options</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-white mt-1 flex-shrink-0" />
                  <span>Full refund if not satisfied</span>
                </li>
              </ul>
              <button
                onClick={() => onNavigate('tutors')}
                className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Find a Tutor
              </button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="text-center mb-6">
                <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-black mb-2">Packages</h3>
                <div className="text-4xl font-black text-gray-900 mb-2">Save 15%</div>
                <p className="text-gray-600">on bulk sessions</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Buy 10+ sessions and save</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Priority booking with your tutor</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Dedicated support team</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Progress tracking and reports</span>
                </li>
              </ul>
              <button
                onClick={() => onNavigate('tutors')}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition"
              >
                View Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">How does the free trial work?</h3>
              <p className="text-gray-600">
                Simply browse our tutors, select one that matches your needs, and book a free
                30-minute trial session. No credit card is required. This gives you a chance to
                meet your tutor and see if they're the right fit before committing to paid
                sessions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">How much do tutors charge?</h3>
              <p className="text-gray-600">
                Tutor rates typically range from £25 to £60 per hour, depending on their
                qualifications, experience, and subject expertise. Each tutor sets their own rate,
                which is clearly displayed on their profile.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit and debit cards, as well as PayPal. All payments are
                processed securely through our platform. You only pay after your session is
                confirmed.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">Can I get a refund?</h3>
              <p className="text-gray-600">
                Yes. If you're not satisfied with a session, contact us within 24 hours and we'll
                provide a full refund. We want to ensure you have the best learning experience
                possible.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">
                How do online tutoring sessions work?
              </h3>
              <p className="text-gray-600">
                Online sessions are conducted via video call using your preferred platform (Zoom,
                Google Meet, etc.). Your tutor will share their screen, use digital whiteboards,
                and provide materials just like an in-person session.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-2">Can I change tutors?</h3>
              <p className="text-gray-600">
                Absolutely. You're free to try different tutors until you find the perfect match.
                There are no contracts or commitments. Each session is booked individually.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Start Your Free Trial Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            No credit card required. No commitment. Just great tutoring.
          </p>
          <button
            onClick={() => onNavigate('tutors')}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Browse Tutors
          </button>
        </div>
      </section>
    </div>
  );
}
