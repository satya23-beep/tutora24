import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type HeaderProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', page: 'home' },
    { label: 'FIND TUTORS', page: 'tutors' },
    { label: 'PRICING', page: 'pricing' },
    { label: 'ABOUT', page: 'about' },
    { label: 'CONTACT', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 hover:opacity-90 transition group"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition">
                <span className="text-white font-black text-lg">T24</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-black tracking-tight text-gray-900 leading-none">TUTORA24</span>
              <span className="text-xs text-gray-500 font-semibold tracking-wide">Expert University Tutoring</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  currentPage === item.page
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => onNavigate('register')}
              className="text-gray-700 px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition border border-gray-200"
            >
              BECOME A TUTOR
            </button>
            <button
              onClick={() => onNavigate('tutors')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-700 transition shadow-sm"
            >
              START FREE TRIAL
            </button>
          </div>

          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg font-semibold text-sm transition ${
                    currentPage === item.page
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  onNavigate('register');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 px-5 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition border border-gray-200"
              >
                BECOME A TUTOR
              </button>
              <button
                onClick={() => {
                  onNavigate('tutors');
                  setMobileMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition shadow-sm"
              >
                START FREE TRIAL
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
