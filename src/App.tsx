import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { FindTutors } from './pages/FindTutors';
import { Register } from './pages/Register';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { StudentLogin } from './pages/StudentLogin';
import { TutorLogin } from './pages/TutorLogin';
import { TutorDashboard } from './pages/TutorDashboard';

type Page = 'home' | 'tutors' | 'register' | 'about' | 'pricing' | 'contact' | 'student-login' | 'tutor-login' | 'tutor-dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const path = window.location.pathname.slice(1) || 'home';
    const pageMap: Record<string, Page> = {
      '': 'home',
      'home': 'home',
      'find-tutors': 'tutors',
      'tutors': 'tutors',
      'register': 'register',
      'about': 'about',
      'pricing': 'pricing',
      'contact': 'contact',
      'student-login': 'student-login',
      'tutor-login': 'tutor-login',
      'tutor-dashboard': 'tutor-dashboard',
    };

    const page = pageMap[path] || 'home';
    setCurrentPage(page);
  }, []);

  const handleNavigate = (page: string) => {
    const pageMap: Record<string, Page> = {
      'home': 'home',
      'tutors': 'tutors',
      'register': 'register',
      'about': 'about',
      'pricing': 'pricing',
      'contact': 'contact',
      'student-login': 'student-login',
      'tutor-login': 'tutor-login',
      'tutor-dashboard': 'tutor-dashboard',
    };

    const newPage = pageMap[page] || 'home';
    setCurrentPage(newPage);

    const path = newPage === 'home' ? '/' : `/${page}`;
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showHeaderFooter = !['student-login', 'tutor-login', 'tutor-dashboard'].includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'tutors':
        return <FindTutors />;
      case 'register':
        return <Register />;
      case 'about':
        return <About />;
      case 'pricing':
        return <Pricing onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact />;
      case 'student-login':
        return <StudentLogin />;
      case 'tutor-login':
        return <TutorLogin />;
      case 'tutor-dashboard':
        return <TutorDashboard />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {showHeaderFooter && <Header currentPage={currentPage} onNavigate={handleNavigate} />}
      <main className="flex-1">{renderPage()}</main>
      {showHeaderFooter && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

export default App;
