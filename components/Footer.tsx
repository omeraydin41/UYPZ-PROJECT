import React, { useState } from 'react';
import { ChefHat, Instagram, Twitter, Linkedin, Facebook, Mail, ArrowRight, Check, Phone, MapPin, Send, Globe, ShieldCheck, Heart } from 'lucide-react';
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
      <footer className="bg-white pt-24 pb-12 relative overflow-hidden">
        
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-100 via-primary-400 to-primary-100 opacity-50"></div>

        {/* Background Ambient Effects - Subtle Light Theme */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cream-100/50 rounded-full blur-[100px] pointer-events-none translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary-50/50 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Upper Section: Brand & Newsletter Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-20 items-center">
            
            {/* Brand Column */}
            <div className="space-y-8">
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-50 rounded-2xl border border-primary-100 shadow-sm">
                    <ChefHat className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <span className="font-extrabold text-3xl tracking-tight text-stone-900 leading-none block">
                        Kiler<span className="text-primary-600">.ai</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Akıllı Mutfak Asistanı</span>
                  </div>
               </div>
               
               <p className="text-stone-500 text-lg leading-relaxed max-w-md font-medium">
                 Mutfağınızdaki malzemeleri lezzete, atıkları tasarrufa dönüştüren teknoloji. Geleceğin mutfağını bugünden tasarlıyoruz.
               </p>
               
               <div className="flex items-center gap-4">
                  {[
                      { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/atknn05/" },
                      { Icon: Twitter, label: "Twitter", href: "#" },
                      { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/%C3%B6mer-ayd%C4%B1n-907035294/" },
                      { Icon: Facebook, label: "Facebook", href: "#" }
                  ].map((social, idx) => (
                      <a 
                          key={idx} 
                          href={social.href}
                          target={social.href.startsWith('http') ? "_blank" : undefined}
                          rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                          className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-900 hover:border-stone-900 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                          onClick={(e) => { if (social.href === '#') e.preventDefault(); }}
                      >
                          <social.Icon className="w-5 h-5" />
                      </a>
                  ))}
               </div>
            </div>

            {/* Newsletter Card - Modern Integrated Look */}
            <div className="bg-cream-50 rounded-[2.5rem] p-8 md:p-10 border border-stone-100 relative overflow-hidden group hover:shadow-lg transition-shadow duration-500">
                {/* Abstract Shape */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-100 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-primary-600">
                            <Mail className="w-5 h-5" />
                         </div>
                         <h5 className="text-stone-900 font-bold text-xl">Lezzetli Haberler</h5>
                    </div>
                    
                    <p className="text-stone-600 mb-8 max-w-md leading-relaxed">
                        Haftalık en popüler tarifler, sürdürülebilirlik ipuçları ve özellik güncellemeleri için aramıza katılın.
                    </p>

                    {subscribed ? (
                        <div className="flex items-center gap-3 text-green-700 font-bold bg-green-100/50 py-4 px-6 rounded-2xl border border-green-200 animate-fade-in">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                            Abonelik başarılı! Hoş geldiniz.
                        </div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="email" 
                                placeholder="E-posta adresiniz..."
                                className="flex-1 bg-white border border-stone-200 text-stone-800 rounded-xl px-6 py-4 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-50 transition-all placeholder:text-stone-400 shadow-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button 
                                type="submit"
                                className="bg-stone-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-stone-200 hover:shadow-primary-500/20 active:scale-95"
                            >
                                Abone Ol <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    )}
                    <p className="mt-4 text-xs text-stone-400 font-medium ml-1">
                        * Spam göndermiyoruz. İstediğiniz zaman ayrılabilirsiniz.
                    </p>
                </div>
            </div>
          </div>

          {/* Links Grid - Clean & Minimal */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 mb-20 border-t border-stone-100 pt-16">
             
             {/* Column 1 */}
             <div className="flex flex-col gap-6">
                <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Ürün</h4>
                <ul className="space-y-4">
                    {[
                        { label: "Hakkımızda", action: () => setAboutModalOpen(true) },
                        { label: "Nasıl Çalışır?", action: () => setHowItWorksModalOpen(true) },
                        { label: "Canlı Demo", action: () => handleScroll('demo') },
                        { label: "Fiyatlandırma", action: () => handleScroll('pricing') }
                    ].map((item, idx) => (
                        <li key={idx}>
                            <button onClick={item.action} className="text-stone-500 hover:text-primary-600 font-medium text-sm transition-colors text-left">
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
             </div>

             {/* Column 2 */}
             <div className="flex flex-col gap-6">
                <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Kurumsal</h4>
                <ul className="space-y-4">
                    {[
                        { label: "Şirket Profili", action: () => setCorporateAboutModalOpen(true) },
                        { label: "Kariyer", action: () => setCareersModalOpen(true) },
                        { label: "Blog", action: () => handleScroll('blog') },
                        { label: "Basın Kiti", action: () => {} }
                    ].map((item, idx) => (
                        <li key={idx}>
                            <button onClick={item.action} className="text-stone-500 hover:text-primary-600 font-medium text-sm transition-colors text-left">
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
             </div>

             {/* Column 3 */}
             <div className="flex flex-col gap-6">
                <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider">Yasal</h4>
                <ul className="space-y-4">
                    {[
                        { label: "Gizlilik Politikası", type: 'privacy' },
                        { label: "Kullanım Koşulları", type: 'terms' },
                        { label: "KVKK Aydınlatma", type: 'kvkk' },
                        { label: "Çerez Politikası", type: 'cookies' }
                    ].map((item, idx) => (
                        <li key={idx}>
                            <button onClick={() => openLegalDoc(item.type as LegalDocType)} className="text-stone-500 hover:text-primary-600 font-medium text-sm transition-colors text-left">
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
             </div>

             {/* Column 4 */}
             <div className="flex flex-col gap-6">
                <h4 className="font-bold text-stone-900 text-sm uppercase tracking-wider">İletişim</h4>
                <ul className="space-y-5">
                    <li>
                        <a href="tel:4442121" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span className="text-stone-600 text-sm font-medium group-hover:text-stone-900">444 21 21</span>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:kiler@startech.com" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                <Send className="w-4 h-4" />
                            </div>
                            <span className="text-stone-600 text-sm font-medium group-hover:text-stone-900">kiler@startech.com</span>
                        </a>
                    </li>
                    <li>
                         <a 
                            href="https://www.google.com/maps" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-start gap-3 group"
                        >
                            <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors mt-1">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <span className="text-stone-600 text-sm font-medium group-hover:text-stone-900 leading-snug">
                                Davutpaşa Kampüsü<br/> Esenler / İSTANBUL
                            </span>
                        </a>
                    </li>
                </ul>
             </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-stone-100">
             <div className="flex flex-col sm:flex-row items-center gap-2 text-stone-400 text-xs font-medium">
                <span className="font-bold text-stone-600">&copy; 2024 Kiler Teknoloji A.Ş.</span>
                <span className="hidden sm:inline text-stone-300">•</span>
                <span>Tüm hakları saklıdır.</span>
                <span className="hidden sm:inline text-stone-300">•</span>
                <span className="flex items-center gap-1">
                    Made with <Heart className="w-3 h-3 text-red-400 fill-current" /> by Star Tech
                </span>
             </div>
             
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 rounded-full border border-stone-100 text-stone-500 text-xs font-bold">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Türkçe (TR)</span>
                </div>
                <div className="flex items-center gap-2 text-stone-400 text-xs font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Güvenli Ödeme</span>
                </div>
             </div>
          </div>

        </div>
      </footer>
      
      {/* Product Modals - Same Functionality */}
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