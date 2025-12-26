import React, { useState, useEffect } from 'react';
import { X, Lock, LogIn, User, UserPlus, AlertCircle, Mail, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../context/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name?: string) => void;
  onRegister: (user: any) => void;
  registeredUsers: any[];
}

type ModalView = 'login' | 'register';

export const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  onRegister, 
  registeredUsers 
}) => {
  const { t } = useLanguage();
  const [view, setView] = useState<ModalView>('login');
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setView('login');
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setSuccessMessage(null);
    setIsLoading(false);
  };

  const switchView = (newView: ModalView) => {
    setError(null);
    setSuccessMessage(null);
    setView(newView);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    if (view === 'register') {
      if (password !== confirmPassword) {
        setError(t('loginModal.errorMismatch'));
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        setError(t('loginModal.errorLength'));
        setIsLoading(false);
        return;
      }
      if (username.length < 3) {
        setError(t('loginModal.errorUsername'));
        setIsLoading(false);
        return;
      }
      if (registeredUsers.some(u => u.username === username)) {
        setError(t('loginModal.errorExists'));
        setIsLoading(false);
        return;
      }

      // Simulate a small delay for registration
      setTimeout(() => {
        onRegister({ fullName, email, username, password });
        setIsLoading(false);
        setSuccessMessage(t('loginModal.successRegister'));
        
        // Switch to login after a short delay
        setTimeout(() => {
            setView('login');
            setPassword('');
            setConfirmPassword('');
            setSuccessMessage(null);
        }, 1500);
      }, 800);

    } else {
      setTimeout(() => {
        const foundUser = registeredUsers.find(u => u.username === username && u.password === password);
        if (foundUser) {
          setIsLoading(false);
          onLoginSuccess(foundUser.username);
          onClose();
        } else {
          setIsLoading(false);
          setError(t('loginModal.errorInvalid'));
        }
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-scale-in transition-all duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-2xl mb-4 border border-primary-100">
            {view === 'login' ? <LogIn className="w-6 h-6 text-primary-600" /> : <UserPlus className="w-6 h-6 text-primary-600" />}
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {view === 'login' ? t('loginModal.loginTitle') : t('loginModal.registerTitle')}
          </h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            {view === 'login' ? t('loginModal.loginDesc') : t('loginModal.registerDesc')}
          </p>
        </div>

        {(error || successMessage) && (
          <div className={`mb-4 p-4 text-xs rounded-xl flex items-start gap-3 border animate-fade-in font-medium ${error ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
            {error ? <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
            <span className="flex-1">{error || successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'register' && (
             <>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 ml-1">{t('loginModal.fullName')}</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-50 focus:border-primary-500 focus:bg-white outline-none transition-all placeholder:text-stone-300 text-sm font-medium" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 ml-1">{t('loginModal.email')}</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-50 focus:border-primary-500 focus:bg-white outline-none transition-all placeholder:text-stone-300 text-sm font-medium" />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 ml-1">{t('loginModal.username')}</label>
            <div className="relative group">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-50 focus:border-primary-500 focus:bg-white outline-none transition-all placeholder:text-stone-300 text-sm font-medium" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 ml-1">{t('loginModal.password')}</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-50 focus:border-primary-500 focus:bg-white outline-none transition-all placeholder:text-stone-300 text-sm font-medium" />
            </div>
          </div>

          {view === 'register' && (
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5 ml-1">{t('loginModal.confirmPassword')}</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary-50 focus:border-primary-500 focus:bg-white outline-none transition-all placeholder:text-stone-300 text-sm font-medium" />
              </div>
            </div>
          )}

          <Button type="submit" className="w-full mt-6 py-4 rounded-xl shadow-lg shadow-primary-500/20 font-bold transition-all hover:scale-[1.02] active:scale-[0.98]" size="lg" isLoading={isLoading}>
            {view === 'login' ? t('loginModal.submitLogin') : t('loginModal.submitRegister')}
          </Button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500 border-t border-slate-100 pt-6">
          {view === 'login' ? (
            <>
              {t('loginModal.noAccount')}{' '}
              <button onClick={() => switchView('register')} className="text-primary-600 font-extrabold hover:text-primary-700 focus:outline-none transition-colors">
                {t('loginModal.registerLink')}
              </button>
            </>
          ) : (
             <>
              {t('loginModal.hasAccount')}{' '}
              <button onClick={() => switchView('login')} className="text-primary-600 font-extrabold hover:text-primary-700 focus:outline-none transition-colors">
                {t('loginModal.loginLink')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};