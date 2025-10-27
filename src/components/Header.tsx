import { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';

type HeaderProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', page: 'home' },
    { label: 'FIND TUTORS', page: 'tutors' },
    { label: 'BECOME A TUTOR', page: 'register' },
    { label: 'PRICING', page: 'pricing' },
    { label: 'ABOUT', page: 'about' },
    { label: 'CONTACT', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 hover:opacity-80 transition"
        >
          <GraduationCap className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
          <span className="text-3xl font-black tracking-tight text-gray-800">TUTORA24</span>
        </button>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`font-bold transition ${
                currentPage === item.page
                  ? 'text-blue-600'
                  : 'text-gray-800 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => onNavigate('register')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            START FREE TRIAL
          </button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-bold ${
                  currentPage === item.page ? 'text-blue-600' : 'text-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('register');
                setMobileMenuOpen(false);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold w-full"
            >
              START FREE TRIAL
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
