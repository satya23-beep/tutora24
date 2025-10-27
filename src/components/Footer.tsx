import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

type FooterProps = {
  onNavigate: (page: string) => void;
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-black">TUTORA24</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting university students with expert tutors in key academic subjects.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@tutora24.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+44 20 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">FOR STUDENTS</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => onNavigate('tutors')} className="hover:text-white transition">
                  Find Tutors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition">
                  Free Trial
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition">
                  How It Works
                </button>
              </li>
              <li>
                <button className="hover:text-white transition">Success Stories</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">FOR TUTORS</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => onNavigate('register')} className="hover:text-white transition">
                  Become a Tutor
                </button>
              </li>
              <li>
                <button className="hover:text-white transition">Tutor Resources</button>
              </li>
              <li>
                <button className="hover:text-white transition">Payment Info</button>
              </li>
              <li>
                <button className="hover:text-white transition">Guidelines</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">COMPANY</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition">
                  Contact
                </button>
              </li>
              <li>
                <button className="hover:text-white transition">Privacy Policy</button>
              </li>
              <li>
                <button className="hover:text-white transition">Terms of Service</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Tutora24. All rights reserved. Empowering students to excel academically.</p>
        </div>
      </div>
    </footer>
  );
}
