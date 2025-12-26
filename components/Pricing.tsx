import React, { useState } from 'react';
import { Button } from './Button';
import { Check, Sparkles, ChefHat, Users } from 'lucide-react';
import { PricingPlan } from '../types';
import { PaymentModal } from './PaymentModal';
import { useLanguage } from '../context/LanguageContext';

export const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plans: PricingPlan[] = [
    {
      name: t('pricing.free'),
      price: "0",
      period: "∞",
      features: ["3 tarif/gün", "Temel analiz"],
      buttonText: t('pricing.ctaFree'),
      isPopular: false
    },
    {
      name: t('pricing.pro'),
      price: "49.90",
      period: "mo",
      features: ["Sınırsız tarif", "Makro analiz", "Alerji filtresi"],
      buttonText: t('pricing.ctaPro'),
      isPopular: true
    },
    {
      name: t('pricing.family'),
      price: "89.90",
      period: "mo",
      features: ["5 Kullanıcı", "Haftalık plan", "7/24 AI Desteği"],
      buttonText: t('pricing.ctaFamily'),
      isPopular: false
    }
  ];

  const handlePlanClick = (plan: PricingPlan) => {
    if (plan.price === "0") {
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSelectedPlan(plan);
      setIsModalOpen(true);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-cream-50 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase mb-3 block">{t('pricing.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800">{t('pricing.title')}</h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">{t('pricing.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => {
            const isMiddle = index === 1;
            return (
              <div key={plan.name} onClick={() => handlePlanClick(plan)} className={`relative rounded-3xl p-8 transition-all bg-white shadow-lg cursor-pointer hover:scale-105 ${isMiddle ? 'border-2 border-primary-500' : 'border border-stone-100'}`}>
                {isMiddle && <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">{t('pricing.popular')}</div>}
                <h3 className="text-xl font-bold text-stone-800 mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6"><span className="text-4xl font-black">₺{plan.price}</span><span className="text-stone-400 text-sm">/{plan.period}</span></div>
                <div className="space-y-4 mb-8">
                  {plan.features.map((f, i) => <div key={i} className="flex items-center gap-3 text-sm text-stone-600"><Check className="w-4 h-4 text-primary-500" /> {f}</div>)}
                </div>
                <Button variant={isMiddle ? 'primary' : 'outline'} className="w-full">{plan.buttonText}</Button>
              </div>
            );
          })}
        </div>
      </div>
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} plan={selectedPlan} />
    </section>
  );
};
