import React from 'react';
import { X, Target, Zap, Globe, ShieldCheck } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in flex flex-col md:flex-row overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full text-stone-500 hover:text-stone-900 transition-all shadow-sm border border-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image & Key Stats */}
        <div className="w-full md:w-2/5 bg-stone-900 relative flex flex-col text-white">
            <div className="absolute inset-0 opacity-60">
                <img 
                    src="https://image.pollinations.ai/prompt/modern%20culinary%20technology%20laboratory%20clean%20minimalist%20chefs%20and%20data%20scientists%20working%20together?width=600&height=1000&nologo=true" 
                    alt="Kiler Teknoloji Laboratuvarı" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
            
            <div className="relative z-10 mt-auto p-8 space-y-6">
                <div>
                    <h3 className="text-3xl font-bold mb-2">Kiler<span className="text-primary-500">.ai</span></h3>
                    <p className="text-stone-300 text-sm font-medium leading-relaxed">
                        Mutfak alışkanlıklarını yapay zeka ile yeniden tanımlayan teknoloji girişimi.
                    </p>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-500/20 rounded-lg">
                            <Target className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                            <span className="block text-xs text-stone-400 uppercase tracking-wider">Hedef</span>
                            <span className="font-bold text-sm">%0 Gıda İsrafı</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-primary-500/20 rounded-lg">
                            <Globe className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                            <span className="block text-xs text-stone-400 uppercase tracking-wider">Kapsam</span>
                            <span className="font-bold text-sm">Global Mutfak Verisi</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-3/5 p-8 md:p-12 bg-white">
            <span className="text-primary-600 font-bold text-xs uppercase tracking-widest mb-4 block">Kurumsal Profil</span>
            <h2 className="text-3xl font-bold text-stone-900 mb-6">Geleceğin Sürdürülebilir Mutfak Ekosistemi</h2>
            
            <div className="space-y-6 text-stone-600 leading-relaxed text-sm md:text-base">
                <p>
                    <strong className="text-stone-800">Kiler Platformu</strong>, evsel gıda tüketim süreçlerini optimize etmek, israfı kaynağında önlemek ve hane halkı ekonomisine katkı sağlamak amacıyla geliştirilmiş ileri teknoloji bir yazılım çözümüdür.
                </p>
                <p>
                    Geleneksel tarif uygulamalarının aksine, Kiler <strong className="text-stone-800">"Türetim Ekonomisi"</strong> modelini benimser. Geliştirdiğimiz özgün <em className="italic">Generative AI (Üretken Yapay Zeka)</em> algoritmaları, kullanıcıların stok verilerini anlık olarak işleyerek, mevcut kaynaklarla oluşturulabilecek en verimli, besleyici ve ekonomik reçeteleri saniyeler içerisinde sentezler.
                </p>
                <p>
                   Misyonumuz sadece "yemek tarifi vermek" değil; veri odaklı bir yaklaşımla küresel gıda krizine mikro ölçekte teknolojik bir çözüm sunmaktır. Bu doğrultuda, kullanıcılarımızın satın alma davranışlarını analiz ederek daha bilinçli tüketim alışkanlıkları kazanmalarına rehberlik ediyoruz.
                </p>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-100 grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <h4 className="font-bold text-stone-900 text-sm">Teknolojik Altyapı</h4>
                    </div>
                    <p className="text-xs text-stone-500">
                        Google Gemini tabanlı NLP modelleri ve gerçek zamanlı besin değeri hesaplama motoru.
                    </p>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-4 h-4 text-green-600" />
                        <h4 className="font-bold text-stone-900 text-sm">Veri Güvenliği</h4>
                    </div>
                    <p className="text-xs text-stone-500">
                        KVKK ve GDPR standartlarına tam uyumlu, uçtan uca şifrelenmiş kişisel veri yönetimi.
                    </p>
                </div>
            </div>
            
            <div className="mt-8 text-right">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/B%C3%BCy%C3%BCk%C5%9Fehir_Belediyesi_Logo.svg/2048px-B%C3%BCy%C3%BCk%C5%9Fehir_Belediyesi_Logo.svg.png" alt="" className="h-0 opacity-0" /> {/* Placeholder/Fix for spacing */}
                <p className="text-xs text-stone-400 font-mono">
                    Kiler Teknoloji A.Ş. &copy; 2024 - İstanbul, TR
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};