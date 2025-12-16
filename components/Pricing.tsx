import React, { useState } from 'react';
import { Button } from './Button';
import { Check, Sparkles, ChefHat, Users } from 'lucide-react';
import { PricingPlan } from '../types';
import { PaymentModal } from './PaymentModal';

const plans: PricingPlan[] = [
  {
    name: "Başlangıç",
    price: "0",
    period: "sonsuza kadar",
    features: [
      "Günlük 3 tarif oluşturma",
      "Temel malzeme analizi",
      "Standart tarif detayları",
      "Reklamlı kullanım"
    ],
    buttonText: "Ücretsiz Başla",
    isPopular: false
  },
  {
    name: "Gurme Şef",
    price: "49.90",
    period: "aylık",
    features: [
      "Sınırsız tarif oluşturma",
      "Detaylı makro/besin analizi",
      "Vegan/Glutensiz filtreler",
      "Akıllı alışveriş listesi",
      "Reklamsız deneyim",
    ],
    buttonText: "Premium'a Geç",
    isPopular: true
  },
  {
    name: "Aile Paketi",
    price: "89.90",
    period: "aylık",
    features: [
      "Her şey dahil (5 Kullanıcı)",
      "Haftalık yemek planlayıcı",
      "Çocuklara özel tarifler",
      "7/24 Diyetisyen AI desteği",
      "Stok takip sistemi"
    ],
    buttonText: "Aileyi Dahil Et",
    isPopular: false
  }
];

export const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanClick = (plan: PricingPlan) => {
    if (plan.price === "0") {
      // For free plan, maybe scroll to demo or login
      document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSelectedPlan(plan);
      setIsModalOpen(true);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-cream-50 relative overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase mb-3 block">Uygun Fiyatlandırma</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800">Mutfağınıza Yatırım Yapın</h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Dışarıdan yemek söylemeyi azalttığınızda Premium üyeliğimiz kendini ilk haftadan amorti eder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => {
            const isMiddle = index === 1;
            return (
              <div 
                key={plan.name} 
                className={`
                  relative rounded-3xl p-8 transition-all duration-300 group flex flex-col
                  cursor-pointer
                  hover:z-30 hover:scale-105 md:hover:scale-110 hover:shadow-2xl hover:bg-white hover:border-primary-500 hover:border-2
                  ${isMiddle 
                    ? 'z-20 bg-white border-2 border-primary-500 shadow-xl scale-105 md:scale-105' 
                    : 'z-10 bg-white/60 backdrop-blur-sm border border-stone-100 shadow-lg scale-100'
                  }
                `}
                onClick={() => handlePlanClick(plan)}
              >
                {isMiddle && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-wide shadow-lg flex items-center gap-2 z-40 transition-transform group-hover:scale-110">
                    <Sparkles className="w-4 h-4" /> En Popüler
                  </div>
                )}

                {index === 2 && (
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                )}
                
                <div className="mb-6">
                  {index === 0 && <ChefHat className="w-10 h-10 text-stone-400 mb-4 group-hover:text-primary-600 transition-colors" />}
                  {index === 1 && <Sparkles className="w-10 h-10 text-primary-500 mb-4" />}
                  {index === 2 && <Users className="w-10 h-10 text-accent mb-4" />}
                  
                  <h3 className="text-xl font-bold text-stone-800">{plan.name}</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-4xl font-extrabold text-stone-900 group-hover:text-primary-600 transition-colors">₺{plan.price}</span>
                    <span className="text-stone-500 ml-2 text-sm font-medium">/{plan.period}</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className={`p-1 rounded-full mr-3 flex-shrink-0 transition-colors ${isMiddle ? 'bg-primary-100 text-primary-700' : 'bg-stone-100 text-stone-500 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-stone-600 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={isMiddle ? 'primary' : 'outline'} 
                  className={`w-full rounded-xl py-6 transition-all mt-auto
                    ${isMiddle 
                       ? 'shadow-primary-500/30' 
                       : 'hover:bg-primary-600 hover:text-white hover:border-transparent group-hover:border-primary-200'
                    }`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      
      <PaymentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </section>
  );
};