
import React, { useState, useRef, useEffect } from 'react';
import { UserAccount, PlanType, Recipe, UserPreferences } from '../types';
import { translations, Language, Theme } from '../translations';
import RecipeCard from './RecipeCard';
import ChatBot from './ChatBot';
import { generateDailyNutritionPlan, generateFoodHarmAnalysis } from '../services/geminiService';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  onHome: () => void;
  user: UserAccount | null;
  onRegisterClick: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  onPlanChange: (plan: PlanType) => void;
  onToggleSave?: (recipe: Recipe) => void;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  icon: string;
  category: string;
}

interface SocialFriend {
  id: number;
  name: string;
  avatar: string;
  gender: 'male' | 'female';
}

const Layout: React.FC<LayoutProps> = ({ 
  children, onLogout, onHome, user, onRegisterClick, 
  lang, onLanguageChange, theme, onThemeChange, onPlanChange, onToggleSave
}) => {
  const t = translations[lang];
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showNutritionPlanModal, setShowNutritionPlanModal] = useState(false);
  const [showHarmScanModal, setShowHarmScanModal] = useState(false);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [selectedSavedRecipe, setSelectedSavedRecipe] = useState<Recipe | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  
  const [userHeight, setUserHeight] = useState(user?.height || 170);
  const [userWeight, setUserWeight] = useState(user?.weight || 70);
  
  // Nutrition Plan States
  const [planCalorie, setPlanCalorie] = useState(2000);
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [activePrefs, setActivePrefs] = useState<UserPreferences | null>(null);

  // Harm Scan States
  const [foodInput, setFoodInput] = useState('');
  const [harmResult, setHarmResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const isGuest = user?.fullName === t.guest || user?.username === 'misafir';
  const currentPlan = user?.planType || 'Şef';

  const products: Product[] = [
    { id: 1, name: lang === 'tr' ? 'Sızma Organik Zeytinyağı' : 'Organic Extra Virgin Olive Oil', description: lang === 'tr' ? 'Soğuk sıkım, asit oranı düşük, %100 doğal ve kalp dostu.' : 'Cold pressed, low acidity, 100% natural and heart-friendly.', price: '450 TL', icon: '🫒', category: 'Gıda' },
    { id: 2, name: lang === 'tr' ? 'Anti-Bakteriyel Bambu Kesme Tahtası' : 'Anti-Bacterial Bamboo Cutting Board', description: lang === 'tr' ? 'Mutfak hijyeniniz için doğal koruma sağlar, bıçakları köreltmez.' : 'Provides natural protection for kitchen hygiene, won\'t dull knives.', price: '215 TL', icon: '🪵', category: 'Ekipman' },
    { id: 3, name: lang === 'tr' ? 'Yağsız Hava Fritözü (Air Fryer)' : 'Air Fryer', description: lang === 'tr' ? '%90 daha az yağ ile çıtır lezzetler hazırlayın.' : 'Prepare crispy flavors with 90% less oil.', price: '3.450 TL', icon: '🌬️', category: 'Pişirme' },
    { id: 4, name: lang === 'tr' ? 'Vakum Kapaklı Cam Saklama Seti' : 'Vacuum Glass Storage Set', description: lang === 'tr' ? 'Gıdaların tazeliğini ve besin değerini korur.' : 'Preserves food freshness and nutritional value.', price: '680 TL', icon: '🫙', category: 'Saklama' },
    { id: 5, name: lang === 'tr' ? 'Döküm Demir Izgara Tava' : 'Cast Iron Grill Pan', description: lang === 'tr' ? 'Yüksek ısıda mühürleme ve sağlıklı pişirim için ideal.' : 'Ideal for high-heat searing and healthy cooking.', price: '1.250 TL', icon: '🍳', category: 'Pişirme' },
    { id: 6, name: lang === 'tr' ? 'Smoothie Blender Seti' : 'Smoothie Blender Set', description: lang === 'tr' ? 'Taze meyve ve sebzelerden hızlı sağlık depoları oluşturun.' : 'Create quick health boosts from fresh fruits and vegetables.', price: '1.850 TL', icon: '🥤', category: 'Elektrikli' },
    { id: 7, name: lang === 'tr' ? 'Dijital Mutfak Tartısı' : 'Digital Kitchen Scale', description: lang === 'tr' ? 'Porsiyon kontrolü ve hassas tarif ölçümleri için.' : 'For portion control and precise recipe measurements.', price: '240 TL', icon: '⚖️', category: 'Pratik' },
    { id: 8, name: lang === 'tr' ? 'Su Arıtma Sürahisi' : 'Water Filter Pitcher', description: lang === 'tr' ? 'Klor ve ağır metalleri süzerek taze içme suyu sağlar.' : 'Provides fresh drinking water by filtering chlorine and heavy metals.', price: '520 TL', icon: '💧', category: 'Sağlık' },
    { id: 9, name: lang === 'tr' ? 'Seramik Bıçak Seti' : 'Ceramic Knife Set', description: lang === 'tr' ? 'Meyve ve sebzelerin vitamin değerini oksitlenmeden korur.' : 'Protects vitamin values of produce without oxidation.', price: '790 TL', icon: '🔪', category: 'Ekipman' },
    { id: 10, name: lang === 'tr' ? 'Doğal Probiyotik Yoğurt Makinesi' : 'Yogurt Maker', description: lang === 'tr' ? 'Evde katkısız ve probiyotik zengini yoğurtlar yapın.' : 'Make additive-free and probiotic-rich yogurts at home.', price: '1.100 TL', icon: '🍦', category: 'Sağlık' },
  ];

  const socialFriends: SocialFriend[] = [
    { id: 1, name: 'Burak Soylu', avatar: 'https://avatar.iran.liara.run/public/12', gender: 'male' },
    { id: 2, name: 'Emre Yıldız', avatar: 'https://avatar.iran.liara.run/public/33', gender: 'male' },
    { id: 3, name: 'Kerem Demir', avatar: 'https://avatar.iran.liara.run/public/44', gender: 'male' },
    { id: 4, name: 'Pelin Aydın', avatar: 'https://avatar.iran.liara.run/public/65', gender: 'female' },
    { id: 5, name: 'Gizem Aksoy', avatar: 'https://avatar.iran.liara.run/public/84', gender: 'female' },
    { id: 6, name: 'Damla Koç', avatar: 'https://avatar.iran.liara.run/public/98', gender: 'female' },
  ];

  const loadPrefs = () => {
    if (user) {
      const savedPrefs = localStorage.getItem(`prefs_${user.fullName}`);
      if (savedPrefs) {
        const parsed = JSON.parse(savedPrefs) as UserPreferences;
        setActivePrefs(parsed);
        setPlanCalorie(parsed.dailyCalorieGoal || 2000);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setUserHeight(user.height || 170);
      setUserWeight(user.weight || 70);
      loadPrefs();
    }
  }, [user]);

  useEffect(() => {
    if (showNutritionPlanModal) {
      loadPrefs();
    }
  }, [showNutritionPlanModal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculateBMI = () => {
    if (!userHeight || !userWeight) return 0;
    const heightInMeters = userHeight / 100;
    return parseFloat((userWeight / (heightInMeters * heightInMeters)).toFixed(1));
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: lang === 'tr' ? 'Zayıf' : 'Underweight', color: 'text-sky-500', bg: 'bg-sky-50 dark:bg-sky-900/20' };
    if (bmi < 25) return { label: lang === 'tr' ? 'Normal' : 'Normal', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' };
    if (bmi < 30) return { label: lang === 'tr' ? 'Fazla Kilolu' : 'Overweight', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' };
    return { label: lang === 'tr' ? 'Obez' : 'Obese', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' };
  };

  const vki = calculateBMI();
  const vkiStatus = getBMIStatus(vki);

  const getPlanIcon = (plan: PlanType) => {
    switch(plan) {
      case 'Şef': return '👨‍🍳';
      case 'Aile': return '👨‍👩‍👧‍👦';
      default: return '🥗';
    }
  };

  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    setGeneratedPlan('');
    try {
      const plan = await generateDailyNutritionPlan(planCalorie, activePrefs || undefined, lang);
      setGeneratedPlan(plan);
    } catch (error) {
      setGeneratedPlan(lang === 'tr' ? "Plan oluşturulurken bir hata oluştu." : "Error generating plan.");
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleHarmScan = async () => {
    if (!foodInput.trim()) return;
    setIsScanning(true);
    setHarmResult('');
    try {
      const result = await generateFoodHarmAnalysis(foodInput, lang);
      setHarmResult(result);
    } catch (error) {
      setHarmResult(lang === 'tr' ? "Analiz yapılamadı." : "Analysis failed.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleBuyRedirect = () => {
    window.open("https://www.trendyol.com/sr?q=mutfak%20aletleri&qt=mutfak%20aletleri&st=mutfak%20aletleri&os=1", "_blank");
  };

  const copyProfileLink = () => {
    const link = `https://kiler.app/profile/${user?.username || 'user'}`;
    navigator.clipboard.writeText(link).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-stone-900' : 'bg-stone-50'}`}>
      <header className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 shrink-0">
             <div className="flex items-center gap-2 cursor-pointer group" onClick={onHome}>
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-6">
                  <span className="text-white font-bold">K</span>
                </div>
                <h1 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 tracking-tight">{t.brand}</h1>
             </div>
             
             <button 
                onClick={() => setShowProductsModal(true)}
                className="ml-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-emerald-100 dark:hover:bg-emerald-900/40 active:scale-95 shadow-sm border border-emerald-100/50 dark:border-emerald-800/30"
             >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {t.products}
             </button>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-4">
            <button 
              onClick={() => setShowHarmScanModal(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-amber-900/10 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              {t.harm_scan}
            </button>

            <button 
              onClick={() => setShowNutritionPlanModal(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              {t.set_nutrition_plan}
            </button>

            <div className="relative" ref={menuRef}>
              <button onClick={() => setShowMenu(!showMenu)} className={`flex items-center gap-2 py-2 px-3 sm:px-4 rounded-xl transition-all border group ${showMenu ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 shadow-inner' : 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-100'}`}>
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white overflow-hidden shadow-sm">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div className="hidden lg:flex flex-col items-start leading-none text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 dark:text-emerald-200">{currentPlan}</span>
                  <span className="text-xs font-bold truncate max-w-[80px] dark:text-white">{user?.fullName || t.profile}</span>
                </div>
                <svg className={`w-3 h-3 opacity-40 dark:text-emerald-200 transition-transform ${showMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 py-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-stone-50 dark:border-stone-700 mb-1">
                    <p className="text-xs font-bold text-stone-900 dark:text-white">{user?.fullName}</p>
                    <p className="text-[10px] text-stone-400">{isGuest ? 'Guest Access' : `${currentPlan} Plan`}</p>
                  </div>
                  
                  <button onClick={() => { setShowMenu(false); setShowHarmScanModal(true); }} className="md:hidden w-full text-left px-4 py-2.5 text-sm font-bold text-amber-600 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">{t.harm_scan}</button>
                  <button onClick={() => { setShowMenu(false); setShowNutritionPlanModal(true); }} className="sm:hidden w-full text-left px-4 py-2.5 text-sm font-bold text-emerald-600 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">{t.set_nutrition_plan}</button>

                  {isGuest ? (
                    <button onClick={() => { setShowMenu(false); onRegisterClick(); }} className="w-full text-left px-4 py-3 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                      {t.register}
                    </button>
                  ) : (
                    <>
                      <button onClick={() => { setShowMenu(false); setShowProfileModal(true); }} className="w-full text-left px-4 py-2.5 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">{t.profile}</button>
                      <button onClick={() => { setShowMenu(false); setShowSettingsModal(true); }} className="w-full text-left px-4 py-2.5 text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">{t.settings}</button>
                      
                      <button onClick={() => { setShowMenu(false); setShowSocialModal(true); }} className="w-full text-left px-4 py-2.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors flex items-center justify-between group">
                        {t.add_friend}
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                      </button>

                      <div className="border-t border-stone-50 dark:border-stone-700 mt-1 pt-1">
                        <button onClick={() => { setShowMenu(false); onLogout(); }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">{t.logout}</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">{children}</main>

      {/* Social Modal (Add Friend) */}
      {showSocialModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowSocialModal(false)}>
          <div className="bg-white dark:bg-stone-800 w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-emerald-50 dark:border-stone-700 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
             <div className="p-8 border-b border-stone-100 dark:border-stone-700 flex items-center justify-between bg-emerald-50/20 dark:bg-emerald-900/10">
              <div>
                <h2 className="text-2xl font-black text-emerald-950 dark:text-emerald-100 uppercase tracking-tight">{t.add_friend}</h2>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-1">Share your kitchen experience</p>
              </div>
              <button onClick={() => setShowSocialModal(false)} className="p-3 bg-white dark:bg-stone-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl text-stone-400 transition-all border border-stone-200 dark:border-stone-600 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
              {/* Profile Link Section - Simplified as requested */}
              <section className="bg-emerald-50/30 dark:bg-emerald-900/10 p-10 rounded-[2.5rem] border border-emerald-100/50 dark:border-emerald-800/30 text-center">
                <div className="w-16 h-16 bg-white dark:bg-stone-800 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-sm border border-emerald-50 dark:border-stone-700">🔗</div>
                <h3 className="text-sm font-black text-emerald-950 dark:text-white uppercase tracking-widest mb-2">{t.my_profile_link}</h3>
                <p className="text-stone-500 text-xs mb-8">Profil linkini kopyalayarak arkadaşlarını mutfağına davet edebilirsin.</p>
                
                <div className="relative group max-w-xs mx-auto">
                   <button 
                    onClick={copyProfileLink}
                    className={`w-full py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${linkCopied ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20'}`}
                   >
                     {linkCopied ? (
                       <>
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                         {t.link_copied}
                       </>
                     ) : (
                       <>
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                         {t.copy_link}
                       </>
                     )}
                   </button>
                </div>
              </section>

              {/* Friend List Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.friend_list}</h3>
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">{t.friend_count.replace('{n}', socialFriends.length.toString())}</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {socialFriends.map((friend) => (
                    <div key={friend.id} className="group flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-700 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-stone-50 dark:bg-stone-800 p-0.5 border border-stone-100 dark:border-stone-700 overflow-hidden shadow-inner">
                          <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-stone-800 dark:text-stone-100">{friend.name}</p>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${friend.gender === 'male' ? 'bg-blue-400' : 'bg-pink-400'}`} />
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{friend.gender === 'male' ? (lang === 'tr' ? 'Erkek' : 'Male') : (lang === 'tr' ? 'Kadın' : 'Female')}</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-3 text-stone-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-2xl transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Products Modal */}
      {showProductsModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowProductsModal(false)}>
          <div className="bg-white dark:bg-stone-800 w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-stone-200 dark:border-stone-700 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
             <div className="p-8 border-b border-stone-100 dark:border-stone-700 flex items-center justify-between bg-emerald-50/30 dark:bg-stone-900/50">
              <div>
                <h2 className="text-2xl font-black text-emerald-950 dark:text-emerald-100 uppercase tracking-tight">{t.healthy_pantry_products}</h2>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-1">Premium Healthy Kitchen Selection</p>
              </div>
              <button onClick={() => setShowProductsModal(false)} className="p-3 bg-white dark:bg-stone-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl text-stone-400 transition-all border border-stone-200 dark:border-stone-600 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-stone-50/50 dark:bg-stone-900/30">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white dark:border-stone-700 shadow-sm hover:shadow-xl transition-all group flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 px-3 py-1 rounded-full">{product.category}</span>
                    </div>
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-stone-900 flex items-center justify-center text-4xl mb-6 shadow-sm border border-stone-100 dark:border-stone-700 group-hover:scale-110 transition-transform">
                      {product.icon}
                    </div>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white mb-2 leading-tight">{product.name}</h3>
                    <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 flex-1 line-clamp-3">{product.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-700">
                      <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{product.price}</span>
                      <button 
                        onClick={handleBuyRedirect}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-900/10"
                      >
                        {t.buy_now}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 text-center bg-white dark:bg-stone-800 border-t border-stone-100 dark:border-stone-700">
              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Tüm ürünler Kiler güvencesiyle denetlenmiş ve onaylanmıştır.</p>
            </div>
          </div>
        </div>
      )}

      {/* Harm Scan Modal */}
      {showHarmScanModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowHarmScanModal(false)}>
          <div className="bg-white dark:bg-stone-800 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-amber-50 dark:border-stone-700 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
             <div className="p-8 border-b border-stone-100 dark:border-stone-700 flex items-center justify-between bg-amber-50/30 dark:bg-amber-900/20">
              <div>
                <h2 className="text-2xl font-black text-amber-900 dark:text-amber-100">{t.harm_scan}</h2>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-1">{t.harm_scan_desc}</p>
              </div>
              <button onClick={() => setShowHarmScanModal(false)} className="p-3 bg-white dark:bg-stone-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl text-stone-400 transition-all border border-stone-200 dark:border-stone-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  value={foodInput} 
                  onChange={(e) => setFoodInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleHarmScan()}
                  placeholder={t.scan_placeholder}
                  className="w-full px-6 py-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-700 text-lg font-bold focus:border-amber-500 outline-none transition-all dark:text-white"
                />
                <button 
                  onClick={handleHarmScan}
                  disabled={isScanning || !foodInput.trim()}
                  className="w-full py-4 bg-amber-500 text-white font-black rounded-2xl shadow-xl hover:bg-amber-600 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t.scan_analyzing}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      {t.scan_btn}
                    </>
                  )}
                </button>
              </div>

              {harmResult && (
                <section className="bg-stone-50 dark:bg-stone-900/50 p-6 rounded-[2rem] border border-amber-100 dark:border-amber-900/30 animate-in fade-in slide-in-from-top-4">
                   <h3 className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em] mb-4">{t.scan_result_title}</h3>
                   <div className="text-xs font-mono whitespace-pre-wrap leading-relaxed text-stone-700 dark:text-stone-300">
                    {harmResult}
                   </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Nutrition Plan Modal */}
      {showNutritionPlanModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowNutritionPlanModal(false)}>
          <div className="bg-white dark:bg-stone-800 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-emerald-50 dark:border-stone-700 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
             <div className="p-8 border-b border-stone-100 dark:border-stone-700 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
              <div>
                <h2 className="text-2xl font-black text-emerald-950 dark:text-white">{t.daily_nutrition_plan}</h2>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-1">{t.nutrition_plan_desc}</p>
              </div>
              <button onClick={() => setShowNutritionPlanModal(false)} className="p-3 bg-white dark:bg-stone-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl text-stone-400 transition-all border border-stone-200 dark:border-stone-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {activePrefs && (activePrefs.allergies.length > 0 || activePrefs.diseases.length > 0) && (
                <section className="p-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <h3 className="text-[10px] font-black text-amber-800 dark:text-amber-400 uppercase tracking-widest">Aktif Sağlık Filtreleri</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activePrefs.allergies.map(a => (
                      <span key={a} className="px-2 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg text-[10px] font-bold">🛑 Alerji: {a}</span>
                    ))}
                    {activePrefs.diseases.map(d => (
                      <span key={d} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg text-[10px] font-bold">📋 Durum: {d}</span>
                    ))}
                  </div>
                  <p className="mt-2 text-[9px] text-amber-700/60 dark:text-amber-400/60 italic font-medium">Bu bileşenleri içermeyen bir plan oluşturulacaktır.</p>
                </section>
              )}

              <section className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-[2rem] border border-emerald-100 dark:border-emerald-800/30">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">{t.calorie_goal}</label>
                  <span className="text-lg font-black text-emerald-600">{planCalorie} kcal</span>
                </div>
                <input 
                  type="range" min="1200" max="4000" step="50" 
                  value={planCalorie} 
                  onChange={(e) => setPlanCalorie(parseInt(e.target.value))}
                  className="w-full h-2 bg-white dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <button 
                  onClick={handleGeneratePlan}
                  disabled={isGeneratingPlan}
                  className="w-full mt-6 py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isGeneratingPlan ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t.analyzing}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      {t.generate_daily_plan}
                    </>
                  )}
                </button>
              </section>

              {generatedPlan && (
                <section className="bg-stone-50 dark:bg-stone-900/50 p-6 rounded-[2rem] border border-stone-100 dark:border-stone-700 animate-in fade-in slide-in-from-top-4">
                   <div className="text-xs font-mono whitespace-pre-wrap leading-relaxed text-stone-700 dark:text-stone-300">
                    {generatedPlan}
                   </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Settings Modal */}
      {showSettingsModal && user && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md" onClick={() => setShowSettingsModal(false)}>
          <div className="bg-white dark:bg-stone-800 w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-emerald-50 dark:border-stone-700 relative flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="p-8 border-b border-stone-100 dark:border-stone-700 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
              <div>
                <h2 className="text-2xl font-black text-emerald-950 dark:text-white">{t.settings}</h2>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-1">App & Account Preferences</p>
              </div>
              <button onClick={() => setShowSettingsModal(false)} className="p-3 bg-white dark:bg-stone-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl text-stone-400 transition-all border border-stone-200 dark:border-stone-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              <section>
                <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">{t.appearance}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => onThemeChange('light')} className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold text-sm ${theme === 'light' ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-stone-100 dark:border-stone-700 dark:text-stone-300'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    {t.light}
                  </button>
                  <button onClick={() => onThemeChange('dark')} className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all font-bold text-sm ${theme === 'dark' ? 'border-emerald-500 bg-emerald-900/20 text-emerald-400' : 'border-stone-100 dark:border-stone-700 dark:text-stone-300'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    {t.dark}
                  </button>
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4">{t.manage_plan}</h3>
                <button 
                  onClick={() => setShowPlanModal(true)}
                  className="w-full p-6 rounded-3xl bg-emerald-600 text-white flex items-center justify-between group hover:scale-[1.02] transition-transform shadow-lg shadow-emerald-900/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                      {getPlanIcon(currentPlan)}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold opacity-70">{t.plan_current}</p>
                      <p className="text-lg font-black">{currentPlan === 'Standart' ? t.plan_basic : (currentPlan === 'Şef' ? t.plan_chef : t.plan_family)}</p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                </button>
              </section>
            </div>

            <div className="p-8 bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-700">
              <button onClick={() => setShowSettingsModal(false)} className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-all uppercase tracking-widest text-xs">{t.save}</button>
            </div>
          </div>
        </div>
      )}

      {/* Plan Selection Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setShowPlanModal(false)}>
          <div className="bg-white dark:bg-stone-800 w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-emerald-50 dark:border-stone-700 flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="p-10 border-b border-stone-100 dark:border-stone-700 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
              <div>
                <h2 className="text-3xl font-black text-emerald-950 dark:text-white">{t.select_plan}</h2>
                <p className="text-stone-400 text-sm font-medium mt-1">Size en uygun mutfak deneyimini seçin.</p>
              </div>
              <button onClick={() => setShowPlanModal(false)} className="p-4 rounded-2xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-400 dark:text-stone-300 hover:text-red-500 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col ${currentPlan === 'Standart' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-xl' : 'border-stone-100 dark:border-stone-700 bg-white dark:bg-stone-800'}`}>
                   <div className="text-3xl mb-4">🥗</div>
                   <h3 className="text-xl font-black text-stone-900 dark:text-white mb-2">{t.plan_basic}</h3>
                   <div className="mb-6">
                      <span className="text-2xl font-black text-stone-900 dark:text-white">{t.free}</span>
                   </div>
                   <p className="text-stone-500 dark:text-stone-400 text-sm mb-8 flex-1">{t.plan_basic_desc}</p>
                   <button 
                    disabled={currentPlan === 'Standart'}
                    onClick={() => { onPlanChange('Standart'); setShowPlanModal(false); }}
                    className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${currentPlan === 'Standart' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 cursor-default' : 'bg-stone-900 dark:bg-stone-700 text-white hover:bg-emerald-600'}`}
                   >
                     {currentPlan === 'Standart' ? t.plan_current : t.plan_select_btn}
                   </button>
                </div>

                <div className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col relative overflow-hidden ${currentPlan === 'Şef' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-xl' : 'border-stone-100 dark:border-stone-700 bg-white dark:bg-stone-800'}`}>
                   <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase">Popular</div>
                   <div className="text-3xl mb-4">👨‍🍳</div>
                   <h3 className="text-xl font-black text-stone-900 dark:text-white mb-2">{t.plan_chef}</h3>
                   <div className="mb-6 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-stone-900 dark:text-white">₺49</span>
                      <span className="text-xs text-stone-400 font-bold">/ {t.monthly}</span>
                   </div>
                   <p className="text-stone-500 dark:text-stone-400 text-sm mb-8 flex-1">{t.plan_chef_desc}</p>
                   <button 
                    disabled={currentPlan === 'Şef'}
                    onClick={() => { onPlanChange('Şef'); setShowPlanModal(false); }}
                    className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${currentPlan === 'Şef' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 cursor-default' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-900/20'}`}
                   >
                     {currentPlan === 'Şef' ? t.plan_current : t.plan_select_btn}
                   </button>
                </div>

                <div className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col ${currentPlan === 'Aile' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-xl' : 'border-stone-100 dark:border-stone-700 bg-white dark:bg-stone-800'}`}>
                   <div className="text-3xl mb-4">👨‍👩‍👧‍👦</div>
                   <h3 className="text-xl font-black text-stone-900 dark:text-white mb-2">{t.plan_family}</h3>
                   <div className="mb-6 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-stone-900 dark:text-white">₺89</span>
                      <span className="text-xs text-stone-400 font-bold">/ {t.monthly}</span>
                   </div>
                   <p className="text-stone-500 dark:text-stone-400 text-sm mb-8 flex-1">{t.plan_family_desc}</p>
                   <button 
                    disabled={currentPlan === 'Aile'}
                    onClick={() => { onPlanChange('Aile'); setShowPlanModal(false); }}
                    className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${currentPlan === 'Aile' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 cursor-default' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-900/20'}`}
                   >
                     {currentPlan === 'Aile' ? t.plan_current : t.plan_select_btn}
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showProfileModal && user && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-lg" onClick={() => setShowProfileModal(false)}>
          <div className="bg-white dark:bg-stone-800 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-emerald-50 dark:border-stone-700 relative flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className={`h-24 bg-emerald-600 relative overflow-hidden shrink-0`}>
              <button onClick={() => setShowProfileModal(false)} className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-all backdrop-blur-md z-20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-8 pb-10">
              <div className="-mt-12 relative z-10 text-center mb-8">
                <div className="w-24 h-24 bg-white dark:bg-stone-700 rounded-[2rem] mx-auto flex items-center justify-center shadow-xl border-4 border-white dark:border-stone-800 mb-4">
                  <div className={`w-20 h-20 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-3xl font-black`}>{user.fullName.charAt(0)}</div>
                </div>
                <h3 className="text-2xl font-black text-emerald-950 dark:text-white">{user.fullName}</h3>
                <p className="text-stone-400 font-medium text-sm">@{user.username}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-stone-50 dark:bg-stone-900 p-4 rounded-3xl border border-stone-100 dark:border-stone-700 text-left">
                  <div className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2">{t.height} (cm)</div>
                  <input type="number" value={userHeight} onChange={(e) => setUserHeight(parseInt(e.target.value) || 0)} className="w-full bg-transparent text-xl font-black text-stone-800 dark:text-white focus:outline-none focus:text-emerald-600 transition-colors" />
                </div>
                <div className="bg-stone-50 dark:bg-stone-900 p-4 rounded-3xl border border-stone-100 dark:border-stone-700 text-left">
                  <div className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2">{t.weight} (kg)</div>
                  <input type="number" value={userWeight} onChange={(e) => setUserWeight(parseInt(e.target.value) || 0)} className="w-full bg-transparent text-xl font-black text-stone-800 dark:text-white focus:outline-none focus:text-emerald-600 transition-colors" />
                </div>
              </div>

              <div className={`mb-10 p-6 rounded-[2rem] border-2 border-dashed ${vkiStatus.bg} border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between`}>
                <div className="text-left">
                  <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{t.bmi}</div>
                  <div className={`text-sm font-black uppercase tracking-widest ${vkiStatus.color}`}>{vkiStatus.label}</div>
                </div>
                <div className="text-4xl font-black text-emerald-900 dark:text-emerald-100">{vki > 0 ? vki : '--'}</div>
              </div>

              {/* Saved Recipes Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <h4 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    Kaydedilen Tariflerim
                   </h4>
                   <span className="text-[10px] font-bold text-stone-400 bg-stone-100 dark:bg-stone-700 px-2 py-0.5 rounded-full">{user.savedRecipes?.length || 0} Tarif</span>
                </div>

                {user.savedRecipes && user.savedRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {user.savedRecipes.map((recipe, index) => (
                      <div 
                        key={index}
                        onClick={() => {
                          setSelectedSavedRecipe(recipe);
                          setShowProfileModal(false);
                        }}
                        className="group flex items-center justify-between p-4 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-700 rounded-2xl hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-lg">
                            🥗
                          </div>
                          <div>
                            <p className="text-sm font-bold text-stone-800 dark:text-stone-100 group-hover:text-emerald-700 transition-colors">{recipe.name}</p>
                            <p className="text-[10px] text-stone-400">{recipe.prepTime} • {recipe.healthStats.calories} kcal</p>
                          </div>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onToggleSave && onToggleSave(recipe); }}
                          className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center bg-stone-50 dark:bg-stone-900/50 rounded-3xl border-2 border-dashed border-stone-100 dark:border-stone-800">
                    <div className="text-4xl mb-3 opacity-20">📖</div>
                    <p className="text-stone-400 text-xs font-medium">Henüz hiçbir tarif kaydetmediniz.</p>
                  </div>
                )}
              </div>

              <div className="mt-10">
                <button onClick={() => { alert(lang === 'tr' ? 'Kaydedildi' : 'Saved'); setShowProfileModal(false); }} className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-all">{t.save}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Kaydedilen Tarif Detay Modalı */}
      {selectedSavedRecipe && (
        <RecipeCard 
          recipe={selectedSavedRecipe} 
          lang={lang} 
          onToggleSave={onToggleSave}
          isSaved={true}
          initialShowDetails={true}
          onClose={() => setSelectedSavedRecipe(null)}
        />
      )}
      
      <footer className="bg-white dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-stone-400 text-xs">© 2024 {t.brand}</div>
      </footer>

      {/* Lahana Bot Entegrasyonu */}
      <ChatBot lang={lang} />
    </div>
  );
};

export default Layout;
