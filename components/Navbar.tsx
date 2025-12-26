import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChefHat, User, LogOut, ChevronDown, Globe } from 'lucide-react';
import { Button } from './Button';
import { LoginModal } from './LoginModal';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../constants/translations';

interface NavbarProps {
  isLoggedIn?: boolean;
  onLoginSuccess?: (name?: string) => void;
  onLogout?: () => void;
  onLogoClick?: () => void;
  userName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isLoggedIn = false, 
  onLoginSuccess = (_name?: string) => {}, 
  onLogout = () => {},
  onLogoClick = () => {},
  userName
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);

  const handleRegister = (newUser: any) => {
    setRegisteredUsers(prev => [...prev, newUser]);
  };

  const navLinks = [
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.howItWorks'), href: "#how-it-works" },
    { name: t('nav.demo'), href: "#demo" },
    { name: t('nav.blog'), href: "#blog" },
    { name: t('nav.testimonials'), href: "#testimonials" },
    { name: t('nav.pricing'), href: "#pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -60% 0px', 
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const sectionId = link.href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [navLinks]);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isLoggedIn) {
       setIsOpen(false);
       onLogout(); 
       return;
    }
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const scrollToDemo = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('recipe-input');
        if (input) {
          input.focus({ preventScroll: true });
        }
      }, 600);
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out border-b
          ${scrolled 
            ? 'bg-white/90 backdrop-blur-xl border-stone-200/60 shadow-sm py-0' 
            : 'bg-transparent border-transparent py-2'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer group" 
              onClick={() => onLogoClick()}
            >
              <div className="bg-gradient-to-tr from-primary-100 to-primary-50 p-2.5 rounded-2xl mr-3 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-primary-100/50">
                <ChefHat className="h-7 w-7 text-primary-600" />
              </div>
              <span className="font-bold text-xl tracking-tight text-stone-800">
                Kiler<span className="text-primary-600">.ai</span>
              </span>
            </div>

            <div className="hidden md:flex items-center bg-stone-100/50 p-1.5 rounded-full border border-stone-200/50 backdrop-blur-sm">
              {!isLoggedIn && navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    className={`
                      relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                      ${isActive 
                        ? 'text-primary-700 bg-white shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] ring-1 ring-black/5 scale-100' 
                        : 'text-stone-500 hover:text-stone-900 hover:bg-stone-200/50'
                      }
                    `}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {link.name}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                      )}
                    </span>
                  </a>
                );
              })}
            </div>
              
            <div className="flex items-center gap-3 ml-4">
                <div className="hidden md:flex items-center gap-3">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center gap-3 text-sm font-medium text-stone-700 bg-white border border-stone-200 pr-4 pl-1 py-1 rounded-full shadow-sm">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center text-primary-700">
                          <User className="w-4 h-4" />
                        </div>
                        <span>{userName || t('nav.account')}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => onLogout()} className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full w-10 h-10 p-0 flex items-center justify-center">
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" className="!px-5 text-stone-600 hover:text-primary-700 hover:bg-primary-50/50" onClick={() => setIsLoginOpen(true)}>{t('nav.login')}</Button>
                      <Button variant="primary" size="sm" className="rounded-xl shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all hover:-translate-y-0.5" onClick={() => scrollToDemo()}>{t('nav.freeTrial')}</Button>
                    </>
                  )}
                </div>

                <div className="md:hidden flex items-center">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-stone-600 hover:text-primary-600 focus:outline-none p-2.5 bg-white rounded-xl border border-stone-200 shadow-sm active:scale-95 transition-all"
                  >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-stone-200 shadow-xl px-4 py-6 flex flex-col space-y-3 animate-fade-in-up origin-top">
            {!isLoggedIn && navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  style={{ animationDelay: `${idx * 50}ms` }}
                  className={`
                    flex items-center justify-between p-4 rounded-2xl transition-all duration-300 animate-fade-in-up
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700 font-bold border border-primary-100 shadow-sm translate-x-2' 
                      : 'text-stone-600 hover:text-primary-600 hover:bg-stone-50 font-medium'
                    }
                  `}
                  onClick={(e) => handleScrollToSection(e, link.href)}
                >
                  <span className="flex items-center gap-3">
                     {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary-600"></div>}
                     {link.name}
                  </span>
                  {isActive && <ChefHat className="w-4 h-4 opacity-50" />}
                </a>
              );
            })}
            <div className="pt-4 mt-2 border-t border-stone-100 flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
               {isLoggedIn ? (
                 <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 rounded-xl py-4" onClick={() => { onLogout(); setIsOpen(false); }}>
                   <LogOut className="w-5 h-5 mr-3" />
                   {t('nav.logout')}
                 </Button>
               ) : (
                 <div className="grid grid-cols-2 gap-3">
                   <Button variant="ghost" className="w-full rounded-xl border border-stone-200" onClick={() => { setIsLoginOpen(true); setIsOpen(false); }}>{t('nav.login')}</Button>
                   <Button variant="primary" className="w-full rounded-xl shadow-md" onClick={() => { scrollToDemo(); setIsOpen(false); }}>{t('nav.freeTrial')}</Button>
                 </div>
               )}
            </div>
          </div>
        )}
      </nav>
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        registeredUsers={registeredUsers}
        onRegister={handleRegister}
        onLoginSuccess={(name) => {
          setIsLoginOpen(false);
          onLoginSuccess(name);
        }}
      />
    </>
  );
};