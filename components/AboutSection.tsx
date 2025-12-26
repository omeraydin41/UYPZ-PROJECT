import React from 'react';
import { Target, Globe, Trash2, Wallet, HeartPulse, Clock, Leaf, Cpu, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-24 bg-white relative scroll-mt-20 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-primary-50/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[600px] h-[600px] bg-stone-100/80 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider mb-4">
             <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
             {t('about.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 tracking-tight">
            {t('about.title')}
          </h2>
          <p className="text-lg text-stone-500 leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 space-y-6">
                <div className="prose prose-lg text-stone-600">
                    <p className="leading-relaxed">
                        {t('about.narrative1')}
                    </p>
                    <p className="leading-relaxed">
                        {t('about.narrative2')}
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                     <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                             <Cpu className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="text-sm">
                            <span className="block font-bold text-stone-900">AI Destekli</span>
                            <span className="text-stone-500">Gemini</span>
                        </div>
                     </div>
                </div>
            </div>

            <div className="order-1 lg:order-2 relative group">
                <div className="absolute inset-0 bg-primary-200 rounded-[2.5rem] rotate-3 group-hover:rotate-1 transition-transform duration-500"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white h-[400px] lg:h-[500px]">
                     <img 
                        src="https://image.pollinations.ai/prompt/futuristic%20sustainable%20kitchen%20warm%20lighting%20fresh%20vegetables%20digital%20interface%20hologram?width=800&height=1000&nologo=true" 
                        alt="Kiler Vision" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 p-8 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[
                    { icon: Trash2, color: "text-red-500", bg: "bg-red-50", label: t('about.stat1'), value: "-%65" },
                    { icon: Wallet, color: "text-green-600", bg: "bg-green-50", label: t('about.stat2'), value: "₺12K+" },
                    { icon: HeartPulse, color: "text-orange-500", bg: "bg-orange-50", label: t('about.stat3'), value: "%80" },
                    { icon: Clock, color: "text-blue-500", bg: "bg-blue-50", label: t('about.stat4'), value: "2.5 Sa" }
                 ].map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center group">
                        <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <span className="text-3xl font-black text-stone-900 mb-1 tracking-tight">{stat.value}</span>
                        <span className="text-sm font-medium text-stone-500 uppercase tracking-wide">{stat.label}</span>
                    </div>
                 ))}
            </div>
        </div>
      </div>
    </section>
  );
};
