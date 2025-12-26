import React from 'react';
import { ScanBarcode, Sparkles, ChefHat, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      id: "01",
      icon: <ScanBarcode className="w-8 h-8 text-primary-600" />,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc')
    },
    {
      id: "02",
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      title: t('howItWorks.step2Title'),
      description: t('howItWorks.step2Desc')
    },
    {
      id: "03",
      icon: <ChefHat className="w-8 h-8 text-primary-600" />,
      title: t('howItWorks.step3Title'),
      description: t('howItWorks.step3Desc')
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-cream-50 scroll-mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block mb-3">
             <span className="py-1 px-3 rounded-full bg-white border border-stone-200 text-xs font-bold text-stone-500 uppercase tracking-wider shadow-sm">
               {t('howItWorks.badge')}
             </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">
            {t('howItWorks.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">{t('howItWorks.title2')}</span>
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] border-t-2 border-dashed border-primary-200 -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center text-center relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-6xl font-black text-stone-900/5 group-hover:text-primary-100">{step.id}</span>
                </div>
                <div className="w-24 h-24 rounded-2xl bg-cream-50 border border-stone-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-50 group-hover:border-primary-100 transition-all duration-300 shadow-inner relative">
                  <div className="relative z-10">
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="md:hidden absolute -bottom-12 left-1/2 -translate-x-1/2 text-stone-300">
                      <ArrowRight className="w-6 h-6 rotate-90" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-primary-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {step.description}
                </p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-primary-500 group-hover:w-1/2 transition-all duration-500 rounded-full opacity-80"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
