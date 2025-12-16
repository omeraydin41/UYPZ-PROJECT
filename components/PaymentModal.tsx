import React, { useState } from 'react';
import { X, CreditCard, Calendar, Lock, User, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { PricingPlan } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, plan }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !plan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    }, 2000);
  };

  const isFamilyPlan = plan.name.includes('Aile');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in border border-white/20">
        
        {/* Decorative Header Background */}
        <div className={`absolute top-0 left-0 w-full h-32 ${isFamilyPlan ? 'bg-accent' : 'bg-primary-600'} opacity-10 pointer-events-none`}></div>
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${isFamilyPlan ? 'bg-accent' : 'bg-primary-400'} opacity-20 -translate-y-1/2 translate-x-1/2`}></div>

        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 bg-white/50 hover:bg-white rounded-full text-stone-500 hover:text-stone-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pt-10">
          
          {isSuccess ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-2">Ödeme Başarılı!</h3>
              <p className="text-stone-600">
                <span className="font-bold text-primary-600">{plan.name}</span> üyeliğiniz aktif edildi.
              </p>
            </div>
          ) : (
            <>
              {/* Plan Summary Card */}
              <div className="relative mb-8 mt-2">
                <div className={`w-full aspect-[1.586/1] rounded-2xl p-6 flex flex-col justify-between text-white shadow-lg shadow-stone-200 transition-colors duration-500
                  ${isFamilyPlan 
                    ? 'bg-gradient-to-br from-accent to-yellow-500' 
                    : 'bg-gradient-to-br from-primary-600 to-primary-800'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-semibold tracking-wider">
                      AKILLI TARİF CARD
                    </div>
                    <ShieldCheck className="w-6 h-6 opacity-80" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white/80 text-xs font-medium uppercase tracking-widest">Plan</p>
                    <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                    <p className="text-white/90 font-medium">₺{plan.price} / {plan.period}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/50"></div>
                      <div className="w-2 h-2 rounded-full bg-white/50"></div>
                      <div className="w-2 h-2 rounded-full bg-white/50"></div>
                      <div className="w-2 h-2 rounded-full bg-white/50"></div>
                    </div>
                    <CreditCard className="w-8 h-8 opacity-80" />
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Kart Üzerindeki İsim</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="AD SOYAD"
                      className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:bg-white outline-none transition-all placeholder:text-stone-300 font-medium text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Kart Numarası</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:bg-white outline-none transition-all placeholder:text-stone-300 font-medium text-stone-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Son Kul. Tarihi</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                      <input
                        type="text"
                        required
                        placeholder="AA/YY"
                        maxLength={5}
                        className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:bg-white outline-none transition-all placeholder:text-stone-300 font-medium text-stone-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">CVC</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                      <input
                        type="text"
                        required
                        placeholder="123"
                        maxLength={3}
                        className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:bg-white outline-none transition-all placeholder:text-stone-300 font-medium text-stone-800"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className={`w-full mt-4 py-4 rounded-xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${isFamilyPlan ? 'bg-accent text-stone-900 hover:bg-yellow-400' : ''}`}
                  size="lg" 
                  isLoading={isLoading}
                >
                  {isLoading ? 'İşleniyor...' : `₺${plan.price} Öde ve Başla`}
                </Button>

                <div className="text-center">
                  <span className="text-xs text-stone-400 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    256-bit SSL ile güvenli ödeme
                  </span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
