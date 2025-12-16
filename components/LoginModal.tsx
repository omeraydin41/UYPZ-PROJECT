import React, { useState, useEffect } from 'react';
import { X, Lock, LogIn, User, UserPlus, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name?: string) => void;
}

type ModalView = 'login' | 'register';

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [view, setView] = useState<ModalView>('login');
  
  // Form States
  const [fullName, setFullName] = useState(''); // For registration only (Real Name)
  const [username, setUsername] = useState(''); // Replaces Email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset states when modal is closed or opened
  useEffect(() => {
    if (isOpen) {
      setView('login');
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFullName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setIsLoading(false);
  };

  const switchView = (newView: ModalView) => {
    setError(null);
    setView(newView);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validation logic for Registration
    if (view === 'register') {
      if (password !== confirmPassword) {
        setError('Şifreler birbiriyle eşleşmiyor.');
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Şifre en az 6 karakter olmalıdır.');
        setIsLoading(false);
        return;
      }
      if (username.length < 3) {
        setError('Kullanıcı adı en az 3 karakter olmalıdır.');
        setIsLoading(false);
        return;
      }
    }

    // Simulate API call for Login or Register
    setTimeout(() => {
      setIsLoading(false);
      // Pass the username to be used in the greeting
      onLoginSuccess(username);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in-up transition-all duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
            {view === 'login' ? (
              <LogIn className="w-6 h-6 text-orange-600" />
            ) : (
              <UserPlus className="w-6 h-6 text-orange-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {view === 'login' ? 'Tekrar Hoş Geldiniz' : 'Aramıza Katılın'}
          </h2>
          <p className="text-slate-500 mt-2">
            {view === 'login' 
              ? 'Kullanıcı adınızla giriş yapın.' 
              : 'Hemen ücretsiz hesap oluşturun ve tarifleri keşfedin.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-2 border border-red-100 animate-fade-in">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Registration Only Field: Full Name */}
          {view === 'register' && (
             <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <label className="block text-sm font-medium text-slate-700 mb-1">İsim Soyisim</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="Adınız Soyadınız"
                />
              </div>
            </div>
          )}

          {/* Username Field (Replaces Email) */}
          <div className="animate-fade-in-up" style={{ animationDelay: '50ms' }}>
            <label className="block text-sm font-medium text-slate-700 mb-1">Kullanıcı Adı</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="Kullanıcı adınızı giriniz"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <label className="block text-sm font-medium text-slate-700 mb-1">Şifre</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            {view === 'login' && (
              <div className="flex justify-end mt-1">
                <a href="#" className="text-xs text-orange-600 hover:text-orange-700 font-medium">Şifremi Unuttum</a>
              </div>
            )}
          </div>

          {/* Registration Only Field: Confirm Password */}
          {view === 'register' && (
            <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <label className="block text-sm font-medium text-slate-700 mb-1">Şifreyi Tekrarla</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full mt-6" size="lg" isLoading={isLoading}>
            {view === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {view === 'login' ? (
            <>
              Hesabınız yok mu?{' '}
              <button 
                onClick={() => switchView('register')} 
                className="text-orange-600 font-bold hover:underline focus:outline-none"
              >
                Ücretsiz Kayıt Olun
              </button>
            </>
          ) : (
             <>
              Zaten hesabınız var mı?{' '}
              <button 
                onClick={() => switchView('login')} 
                className="text-orange-600 font-bold hover:underline focus:outline-none"
              >
                Giriş Yapın
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};