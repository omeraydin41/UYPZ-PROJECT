import React from 'react';
import { Button } from './Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Focus input after scroll
      setTimeout(() => {
        const input = document.getElementById('recipe-input');
        if (input) {
          input.focus({ preventScroll: true });
        }
      }, 600);
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wide mb-8 animate-fade-in-up shadow-sm border border-primary-200">
            <Sparkles className="w-3.5 h-3.5" />
            Kiler - Akıllı Tarif Platformu
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.1] mb-6">
            Evindeki Malzemelerle <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
              Akıllı Yemekler Keşfet
            </span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium text-stone-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Kiler, elinizdeki malzemeleri yapay zekâ ile analiz ederek
            israfı azaltan, bütçe dostu ve sağlıklı tarifler sunan akıllı tarif platformudur.
          </h2>

          <p className="text-base md:text-lg text-stone-500 mb-10 leading-relaxed max-w-2xl mx-auto">
            Ne pişireceğinizi düşünmek zorunda kalmadan, mutfağınızdaki malzemeleri en verimli şekilde değerlendirin.
            <span className="font-semibold text-primary-600"> Kiler, hem cebinizi hem sağlığınızı korur.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="w-full sm:w-auto group rounded-2xl shadow-primary-500/25 shadow-xl" onClick={scrollToDemo}>
              Ücretsiz Dene
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-primary-200/40 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-cream-200/60 rounded-full blur-2xl -z-10 animate-float" />
      </div>
    </section>
  );
};