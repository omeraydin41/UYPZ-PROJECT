import React, { useState } from 'react';
import { ChefHat, Instagram, Twitter, Linkedin, Facebook, Mail, ArrowRight, Check, Phone, MapPin } from 'lucide-react';
import { AboutModal } from './AboutModal';
import { HowItWorksModal } from './HowItWorksModal';
import { CorporateAboutModal } from './CorporateAboutModal';
import { CareersModal } from './CareersModal';
import { LegalModal, LegalDocType } from './LegalModal';

export const Footer: React.FC = () => {
  // Newsletter State
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  // Product Modals
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [howItWorksModalOpen, setHowItWorksModalOpen] = useState(false);

  // Corporate Modals
  const [corporateAboutModalOpen, setCorporateAboutModalOpen] = useState(false);
  const [careersModalOpen, setCareersModalOpen] = useState(false);

  // Legal Modal
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [selectedLegalDoc, setSelectedLegalDoc] = useState<LegalDocType>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate API call
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLegalDoc = (type: LegalDocType) => {
      setSelectedLegalDoc(type);
      setLegalModalOpen(true);
  };

  return (
    <>
      <footer className="bg-stone-50 border-t border-cream-200 pt-16 pb-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand & Newsletter */}
            <div className="col-span-1 md:col-span-1 space-y-8">
              <div>
                {/* Logo - Non-interactive */}
                <div className="flex items-center mb-6 cursor-default">
                  <ChefHat className="h-8 w-8 text-primary-600 mr-3" />
                  <span className="font-bold text-2xl text-stone-900 tracking-tight">
                    Kiler<span className="text-primary-600">.ai</span>
                  </span>
                </div>
                <p className="text-stone-500 text-sm leading-7">
                  Kiler.ai, mutfağınızdaki mevcut malzemeleri en verimli şekilde değerlendirmeniz, küresel gıda israfını haneden başlayarak önlemeniz ve sürdürülebilir sağlıklı beslenme alışkanlıkları kazanmanız için geliştirilmiş, yapay zeka destekli yeni nesil bir akıllı mutfak asistanıdır.
                </p>
              </div>

              {/* Newsletter Form - FUNCTIONAL */}
              <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                <h5 className="font-bold text-stone-800 text-base mb-3">Kiler.ai Haftalık E-Bülten Aboneliği</h5>
                <p className="text-stone-400 text-xs mb-4 leading-relaxed">
                  En yeni sürdürülebilir tarifler, gıda tasarruf ipuçları ve platform güncellemelerinden ilk siz haberdar olun.
                </p>
                {subscribed ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium animate-fade-in py-2 bg-green-50 rounded-xl px-4">
                    <Check className="w-4 h-4" />
                    Abonelik işleminiz başarıyla tamamlandı, teşekkürler!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input 
                      type="email" 
                      placeholder="E-posta adresiniz"
                      className="w-full pl-11 pr-12 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-100 transition-all placeholder:text-stone-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button 
                      type="submit"
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors cursor-pointer shadow-md"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="md:pl-8">
              <h4 className="font-bold text-stone-900 text-lg mb-6">Ürün Özellikleri</h4>
              <ul className="space-y-3 text-sm text-stone-500">
                <li>
                  <button 
                    onClick={() => setAboutModalOpen(true)}
                    className="hover:text-primary-600 transition-colors text-left focus:outline-none flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-primary-500 transition-colors"></span>
                    Hakkımızda & Vizyon
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setHowItWorksModalOpen(true)}
                    className="hover:text-primary-600 transition-colors text-left focus:outline-none flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-primary-500 transition-colors"></span>
                    Nasıl Çalışır?
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleScroll('demo')}
                    className="hover:text-primary-600 transition-colors text-left focus:outline-none flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-primary-500 transition-colors"></span>
                    Canlı Demo Deneyimi
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleScroll('pricing')}
                    className="hover:text-primary-600 transition-colors text-left focus:outline-none flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-primary-500 transition-colors"></span>
                    Paketler ve Fiyatlandırma
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-stone-900 text-lg mb-6">Kurumsal</h4>
              <ul className="space-y-3 text-sm text-stone-500">
                <li>
                    <button 
                        onClick={() => setCorporateAboutModalOpen(true)}
                        className="hover:text-primary-600 transition-colors text-left focus:outline-none flex items-center gap-2 group"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-primary-500 transition-colors"></span>
                        Şirket Profili
                    </button>
                </li>
                <li>
                     <button 
                        onClick={() => setCareersModalOpen(true)}
                        className="hover:text-primary-600 transition-colors text-left focus:outline-none flex items-center gap-2 group"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-primary-500 transition-colors"></span>
                        Kariyer Fırsatları
                    </button>
                </li>
                
                {/* Contact Info Section */}
                <li className="pt-6 mt-4 border-t border-cream-200">
                    <span className="font-bold text-stone-900 block mb-4">İletişim Kanalları</span>
                    
                    <div className="space-y-4">
                        <a href="tel:4442121" className="flex items-center gap-3 group bg-white p-3 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all">
                            <div className="p-2 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
                                <Phone className="w-4 h-4 text-primary-600" />
                            </div>
                            <span className="font-bold text-stone-800 group-hover:text-primary-700 transition-colors">444 2121</span>
                        </a>
                        
                        <a href="mailto:kiler@startech.com" className="flex items-center gap-3 group bg-white p-3 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all">
                             <div className="p-2 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
                                <Mail className="w-4 h-4 text-primary-600" />
                            </div>
                            <span className="font-medium text-stone-600 text-sm group-hover:text-primary-700 transition-colors">kiler@startech.com</span>
                        </a>

                        <a 
                            href="https://www.google.com/maps/search/?api=1&query=Davutpaşa+Kampüsü+Davutpaşa+Mah.+Davutpaşa+Caddesi+34220,+Esenler+/+İSTANBUL" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 group bg-white p-3 rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="p-2 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors mt-0.5">
                                <MapPin className="w-4 h-4 text-primary-600" />
                            </div>
                            <span className="text-xs text-stone-500 leading-relaxed group-hover:text-stone-700 transition-colors">
                                Davutpaşa Kampüsü Davutpaşa Mah. Davutpaşa Cad. 34220, Esenler / İSTANBUL
                            </span>
                        </a>
                    </div>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-stone-900 text-lg mb-6">Yasal Bilgilendirme</h4>
              <ul className="space-y-3 text-sm text-stone-500">
                <li>
                    <button onClick={() => openLegalDoc('privacy')} className="hover:text-primary-600 transition-colors text-left focus:outline-none flex items-center gap-2 group w-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-primary-500 transition-colors"></span>
                        Gizlilik Politikası
                    </button>
                </li>
                <li>
                    <button onClick={() => openLegalDoc('terms')} className="hover:text-primary-600 transition-colors text-left focus:outline-none flex items-center gap-2 group w-full">
                         <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-primary-500 transition-colors"></span>
                        Kullanım Koşulları ve Üyelik Sözleşmesi
                    </button>
                </li>
                <li>
                    <button onClick={() => openLegalDoc('kvkk')} className="hover:text-primary-600 transition-colors text-left focus:outline-none flex items-center gap-2 group w-full">
                         <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-primary-500 transition-colors"></span>
                        KVKK Aydınlatma Metni
                    </button>
                </li>
                <li>
                    <button onClick={() => openLegalDoc('cookies')} className="hover:text-primary-600 transition-colors text-left focus:outline-none flex items-center gap-2 group w-full">
                         <span className="w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-primary-500 transition-colors"></span>
                        Çerez (Cookie) Politikası
                    </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-cream-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <p className="text-stone-500 text-sm font-medium">
                © 2024 Kiler Teknoloji A.Ş. ve Star Tech Ventures iştirakidir. Tüm hakları saklıdır.
                </p>
                <p className="text-stone-400 text-xs mt-1">
                    Bu sitedeki materyallerin izinsiz kopyalanması, çoğaltılması veya dağıtılması yasaktır.
                </p>
            </div>
            
            {/* Social Media - Non-interactive */}
            <div className="flex space-x-4">
                {[
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: Twitter, label: "Twitter" },
                    { Icon: Linkedin, label: "LinkedIn" },
                    { Icon: Facebook, label: "Facebook" }
                ].map((social, idx) => (
                    <span 
                        key={idx} 
                        className="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center text-stone-400 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all cursor-default shadow-sm" 
                        aria-label={social.label}
                    >
                        <social.Icon className="w-5 h-5" />
                    </span>
                ))}
            </div>
          </div>
        </div>
      </footer>
      
      {/* Product Modals */}
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      <HowItWorksModal isOpen={howItWorksModalOpen} onClose={() => setHowItWorksModalOpen(false)} />
      
      {/* Corporate Modals */}
      <CorporateAboutModal isOpen={corporateAboutModalOpen} onClose={() => setCorporateAboutModalOpen(false)} />
      <CareersModal isOpen={careersModalOpen} onClose={() => setCareersModalOpen(false)} />

      {/* Legal Modal */}
      <LegalModal 
        isOpen={legalModalOpen} 
        onClose={() => setLegalModalOpen(false)} 
        docType={selectedLegalDoc} 
      />
    </>
  );
};