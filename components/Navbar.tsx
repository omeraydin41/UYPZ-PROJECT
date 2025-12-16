import React, { useState } from 'react';
import { Menu, X, ChefHat, User, LogOut } from 'lucide-react';
import { Button } from './Button';
import { LoginModal } from './LoginModal';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const navLinks = [
    { name: "Hakkımızda", href: "#about" },
    { name: "Nasıl Çalışır?", href: "#how-it-works" },
    { name: "Ön İzleme", href: "#demo" },
    { name: "Blog", href: "#blog" },
    { name: "Yorumlar", href: "#testimonials" },
    { name: "Fiyatlandırma", href: "#pricing" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isLoggedIn) {
       setIsOpen(false);
       onLogout(); 
       return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
      <nav className="fixed w-full z-50 bg-cream-50/80 backdrop-blur-md border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onLogoClick()}>
              <div className="bg-primary-100 p-2.5 rounded-xl mr-3">
                <ChefHat className="h-7 w-7 text-primary-600" />
              </div>
              <span className="font-bold text-xl tracking-tight text-stone-800">
                Kiler<span className="text-primary-600">.ai</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {!isLoggedIn && navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-stone-600 hover:text-primary-600 font-medium transition-colors text-sm cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
                    <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                      <User className="w-5 h-5" />
                    </div>
                    <span>{userName || 'Hesabım'}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onLogout()} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="w-4 h-4 mr-2" />
                    Çıkış Yap
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="!px-3 text-stone-600 hover:text-primary-700" onClick={() => setIsLoginOpen(true)}>Giriş Yap</Button>
                  <Button variant="primary" size="sm" className="rounded-xl shadow-primary-500/20 shadow-lg" onClick={() => scrollToDemo()}>Ücretsiz Dene</Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-stone-600 hover:text-primary-600 focus:outline-none p-2"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-cream-50 border-b border-cream-200 shadow-lg p-4 flex flex-col space-y-4">
            {!isLoggedIn && navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-stone-600 hover:text-primary-600 font-medium block p-3 rounded-xl hover:bg-white cursor-pointer"
                onClick={(e) => handleScroll(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-cream-200 flex flex-col gap-3">
               {isLoggedIn ? (
                 <Button variant="ghost" className="w-full justify-start text-red-500" onClick={() => { onLogout(); setIsOpen(false); }}>
                   <LogOut className="w-4 h-4 mr-2" />
                   Çıkış Yap
                 </Button>
               ) : (
                 <>
                   <Button variant="ghost" className="w-full justify-start" onClick={() => { setIsLoginOpen(true); setIsOpen(false); }}>Giriş Yap</Button>
                   <Button variant="primary" className="w-full" onClick={() => { scrollToDemo(); setIsOpen(false); }}>Ücretsiz Dene</Button>
                 </>
               )}
            </div>
          </div>
        )}
      </nav>
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={(name) => {
          setIsLoginOpen(false);
          onLoginSuccess(name);
        }}
      />
    </>
  );
};