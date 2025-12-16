import React from 'react';
import { X, ScanBarcode, Cpu, ChefHat, ArrowRight } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      id: "01",
      icon: <ScanBarcode className="w-6 h-6 text-primary-600" />,
      title: "Veri Girişi & Stok Analizi",
      desc: "Kullanıcı, buzdolabındaki malzemeleri manuel olarak veya barkod tarama (mobil app) yöntemiyle sisteme girer. Algoritmamız, malzemeleri besin gruplarına göre kategorize eder."
    },
    {
      id: "02",
      icon: <Cpu className="w-6 h-6 text-accent" />,
      title: "Gemini AI İşleme Motoru",
      desc: "Google Gemini tabanlı yapay zeka modelimiz, girilen malzemelerle oluşturulabilecek milyonlarca kombinasyonu tarar. Tat uyumu, pişirme teknikleri ve besin dengesini hesaplar."
    },
    {
      id: "03",
      icon: <ChefHat className="w-6 h-6 text-orange-500" />,
      title: "Kişiselleştirilmiş Reçete",
      desc: "Sistem, eldeki malzemeleri maksimum verimle kullanacak, israfı önleyen ve kullanıcının diyet tercihlerine (vegan, glutensiz vb.) uygun 3 alternatif reçete sunar."
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-scale-in flex flex-col lg:flex-row overflow-hidden border border-white/20">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full text-stone-500 hover:text-stone-900 transition-all shadow-sm border border-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Visuals */}
        <div className="w-full lg:w-5/12 bg-stone-900 relative flex flex-col text-white overflow-hidden">
             <div className="absolute inset-0 opacity-70">
                <img 
                    src="https://image.pollinations.ai/prompt/futuristic%20holographic%20kitchen%20interface%20ai%20analyzing%20vegetables%20data%20visualization%20blue%20and%20green%20tones?width=600&height=1000&nologo=true" 
                    alt="AI Mutfak Analizi" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>
            
            <div className="relative z-10 mt-auto p-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-xs font-mono mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
                    SYSTEM_ACTIVE
                </div>
                <h3 className="text-3xl font-bold mb-3 leading-tight">Teknolojik <br/> Mutfak Devrimi</h3>
                <p className="text-stone-300 text-sm leading-relaxed opacity-90">
                    Geleneksel yemek pişirme süreçlerini, veri bilimi ve üretken yapay zeka ile optimize ediyoruz.
                </p>
            </div>
        </div>

        {/* Right Side: Process Steps */}
        <div className="w-full lg:w-7/12 p-8 md:p-12 bg-white flex flex-col justify-center">
            <div className="mb-8">
                <span className="text-primary-600 font-bold text-xs uppercase tracking-widest mb-2 block">Süreç Mimarisi</span>
                <h2 className="text-3xl font-bold text-stone-900">Kiler Nasıl Çalışır?</h2>
            </div>

            <div className="space-y-8 relative">
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-stone-100 -z-10"></div>

                {steps.map((step, index) => (
                    <div key={index} className="flex gap-6 group">
                        <div className="relative flex-shrink-0 w-14 h-14 bg-white border border-stone-100 rounded-2xl shadow-sm flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-primary-200 group-hover:shadow-md transition-all duration-300">
                            {step.icon}
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-stone-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {step.id}
                            </div>
                        </div>
                        <div className="pt-1">
                            <h4 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-primary-700 transition-colors">{step.title}</h4>
                            <p className="text-stone-600 text-sm leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 pt-6 border-t border-stone-100 flex items-center justify-between">
                <p className="text-xs text-stone-400 font-medium">
                    * Ortalama işlem süresi: 1.2 saniye
                </p>
                <button onClick={onClose} className="text-sm font-bold text-stone-900 flex items-center gap-2 hover:gap-3 transition-all">
                    Sistemi Keşfet <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};