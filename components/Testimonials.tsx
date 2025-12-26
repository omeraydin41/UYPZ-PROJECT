import React from 'react';
import { Testimonial } from '../types';
import { Star, Quote, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  
  const testimonialItems: Testimonial[] = t('testimonials.items') || [];

  return (
    <section id="testimonials" className="py-24 bg-stone-50 scroll-mt-20 overflow-hidden relative">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm text-stone-600 text-xs font-bold uppercase tracking-wider mb-6">
             <BadgeCheck className="w-3.5 h-3.5 text-primary-600" />
             <span>{t('testimonials.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-stone-600">
            {t('testimonials.subtitle')}
          </p>
        </div>
      </div>

      {/* Marquee Container with Gradient Mask */}
      <div className="relative w-full">
         
         <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-gradient-to-r from-stone-50 to-transparent z-20 pointer-events-none"></div>
         <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-gradient-to-l from-stone-50 to-transparent z-20 pointer-events-none"></div>

         <div className="flex w-max gap-6 animate-marquee py-4 hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {[...testimonialItems, ...testimonialItems].map((t_item, i) => (
                <div key={`row1-${i}`} className="w-[350px] md:w-[450px] bg-white p-8 rounded-[2rem] border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-shadow flex flex-col relative group">
                    <Quote className="absolute top-8 right-8 w-10 h-10 text-primary-100 fill-primary-50 group-hover:text-primary-200 transition-colors" />
                    
                    <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, starIndex) => (
                            <Star 
                                key={starIndex} 
                                className={`w-4 h-4 ${starIndex < 5 ? 'text-accent fill-accent' : 'text-stone-200'}`} 
                            />
                        ))}
                    </div>
                    
                    <p className="text-stone-700 text-base md:text-lg leading-relaxed mb-8 flex-1">"{t_item.content}"</p>
                    
                    <div className="flex items-center gap-4 pt-6 border-t border-stone-50">
                        <div className="relative">
                            <img src={`https://i.pravatar.cc/150?u=${t_item.id}`} alt={t_item.name} className="w-12 h-12 rounded-full object-cover ring-4 ring-stone-50" />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <BadgeCheck className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-stone-900">{t_item.name}</h4>
                            <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">{t_item.role}</p>
                        </div>
                    </div>
                </div>
            ))}
         </div>
      </div>
    </section>
  );
};