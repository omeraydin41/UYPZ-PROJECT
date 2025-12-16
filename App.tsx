import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { HowItWorks } from './components/HowItWorks';
import { DemoSection } from './components/DemoSection';
import { BlogSection } from './components/BlogSection';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';

type ViewState = 'landing' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>('Kullanıcı');

  const handleLoginSuccess = (name?: string) => {
    setIsLoggedIn(true);
    if (name) {
      setUserName(name);
    }
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('Kullanıcı');
    setCurrentView('landing');
  };

  const handleNavigateHome = () => {
    if (isLoggedIn) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('landing');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-primary-100 selection:text-primary-900">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLoginSuccess={handleLoginSuccess} 
        onLogout={handleLogout}
        onLogoClick={handleNavigateHome}
        userName={userName}
      />
      
      <main>
        {currentView === 'landing' ? (
          <>
            <Hero />
            <AboutSection />
            <HowItWorks />
            <DemoSection />
            <BlogSection />
            <Testimonials />
            <Pricing />
          </>
        ) : (
          <Dashboard userName={userName} />
        )}
      </main>
      
      {currentView === 'landing' && <Footer />}
    </div>
  );
};

export default App;