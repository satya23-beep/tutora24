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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity group"
          >
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-black text-sm">T24</span>
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-black tracking-tight text-gray-950 leading-none">TUTORA24</span>
              <span className="text-xs text-gray-500 font-medium tracking-wide">Tutoring Platform</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center space-x-0.5">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-3.5 py-2 rounded-xl font-medium text-xs transition-all duration-200 ${
                  currentPage === item.page
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-2.5">
            <button
              onClick={() => onNavigate('register')}
              className="text-gray-700 px-4 py-2 rounded-xl font-semibold text-xs hover:bg-gray-100/80 transition-colors border border-gray-200/80"
            >
              BECOME A TUTOR
            </button>
            <button
              onClick={() => onNavigate('tutors')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-xl font-semibold text-xs hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              START FREE TRIAL
            </button>
          </div>

          <button
            className="lg:hidden p-2 hover:bg-gray-100/60 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200/50 animate-in fade-in duration-200">
          <div className="container mx-auto px-6 py-3">
            <div className="flex flex-col space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    currentPage === item.page
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col space-y-2 mt-3 pt-3 border-t border-gray-200/50">
              <button
                onClick={() => {
                  onNavigate('register');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100/80 transition-colors border border-gray-200/80"
              >
                BECOME A TUTOR
              </button>
              <button
                onClick={() => {
                  onNavigate('tutors');
                  setMobileMenuOpen(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-blue-200 transition-all duration-200"
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
