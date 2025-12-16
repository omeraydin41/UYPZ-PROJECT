import React from 'react';
import { Refrigerator, Sparkles, ChefHat } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Refrigerator className="w-8 h-8 text-orange-600" />,
      title: "Malzemelerini Gir",
      description: "Dolabında ne varsa, son kullanma tarihi yaklaşanlar dahil, listeye ekle."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-orange-600" />,
      title: "AI Tarif Üretsin",
      description: "Yapay zekâ şefimiz, elindeki malzemelerle yapabileceğin en lezzetli tarifleri saniyeler içinde oluştursun."
    },
    {
      icon: <ChefHat className="w-8 h-8 text-orange-600" />,
      title: "Pişir ve Keyfini Çıkar",
      description: "Adım adım talimatlarla yemeğini hazırla, israfı önle ve lezzetin tadına var."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Nasıl Çalışır?</h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Karmaşık yemek kitaplarına veya saatlerce tarif aramaya son. Sadece 3 adımda mutfağınızda harikalar yaratın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-orange-100 -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-orange-100 relative bg-white">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-sm font-bold text-slate-400 shadow-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
