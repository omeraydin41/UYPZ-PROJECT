import React from 'react';
import { X, Building2, Rocket, Cpu, Network, Globe } from 'lucide-react';

interface CorporateAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CorporateAboutModal: React.FC<CorporateAboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-scale-in flex flex-col lg:flex-row overflow-hidden border border-white/10">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Brand Identity */}
        <div className="w-full lg:w-4/12 bg-indigo-950 relative flex flex-col text-white p-10 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                        <Building2 className="w-8 h-8 text-indigo-300" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Star Tech</h2>
                        <span className="text-indigo-300 text-xs font-medium uppercase tracking-[0.2em]">Ventures</span>
                    </div>
                </div>

                <div className="mt-auto space-y-6">
                    <h3 className="text-3xl font-bold leading-tight">
                        Yarını Bugünden <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Kodluyoruz.</span>
                    </h3>
                    <p className="text-indigo-200 text-sm leading-relaxed">
                        Star Tech; yapay zeka, finansal teknolojiler ve sürdürülebilir enerji alanlarında faaliyet gösteren global bir teknoloji holdingidir.
                    </p>
                </div>
            </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full lg:w-8/12 bg-stone-50 p-8 md:p-12">
            <div className="mb-8">
                <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-3 block">Vizyonumuz</span>
                <h2 className="text-3xl font-bold text-stone-900 mb-4">Teknolojinin Sınırlarını Genişletmek</h2>
                <p className="text-stone-600 text-lg leading-relaxed">
                    Kiler.ai, <strong className="text-stone-900">Star Tech Ventures</strong> bünyesinde geliştirilen inovatif projelerden sadece biridir. Amacımız, insan hayatına dokunan her alanda veri odaklı, ölçeklenebilir ve çevre dostu dijital çözümler üretmektir.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all group">
                    <Cpu className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-stone-900 mb-1">Yapay Zeka & Robotik</h4>
                    <p className="text-xs text-stone-500">Otonom sistemler ve NLP modelleri üzerine Ar-Ge laboratuvarları.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all group">
                    <Network className="w-8 h-8 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-stone-900 mb-1">FinTech Çözümleri</h4>
                    <p className="text-xs text-stone-500">Blokzincir tabanlı ödeme sistemleri ve dijital bankacılık altyapıları.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all group">
                    <Globe className="w-8 h-8 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-stone-900 mb-1">Green Energy Tech</h4>
                    <p className="text-xs text-stone-500">Akıllı şebeke yönetimi ve karbon ayak izi takip yazılımları.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all group">
                    <Rocket className="w-8 h-8 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-stone-900 mb-1">Start-up Kuluçka</h4>
                    <p className="text-xs text-stone-500">Erken aşama teknoloji girişimlerine tohum yatırım ve mentorluk.</p>
                </div>
            </div>

            <div className="pt-6 border-t border-stone-200 flex justify-between items-center">
                <p className="text-xs text-stone-400">
                    Merkez: Silikon Vadisi, CA & Teknopark İstanbul
                </p>
                <button className="text-sm font-bold text-indigo-700 hover:text-indigo-900 transition-colors">
                    Yatırımcı İlişkileri &rarr;
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};