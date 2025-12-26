
import React, { useState, useRef, useEffect } from 'react';
import { AppView, UserPreferences, PlanType, Recipe } from '../types';
import IngredientSearch from './IngredientSearch';
import BudgetSearch from './BudgetSearch';
import { translations, Language } from '../translations';
import RecipeCard from './RecipeCard';
import { generateGroceryList } from '../services/geminiService';

interface DashboardProps {
  userName: string;
  setView: (view: AppView) => void;
  lang: Language;
  planType: PlanType;
  onToggleSave: (recipe: Recipe) => void;
  savedRecipes: Recipe[];
}

const wheelItems = [
  { name: "Sızma Zeytinyağı", type: "food", color: "#10b981" },
  { name: "Air Fryer", type: "tool", color: "#f59e0b" },
  { name: "Organik Bal", type: "food", color: "#3b82f6" },
  { name: "Bambu Kesme Tahtası", type: "tool", color: "#8b5cf6" },
  { name: "Kaya Tuzu", type: "food", color: "#ec4899" },
  { name: "Dijital Tartı", type: "tool", color: "#06b6d4" },
  { name: "Granola Paketi", type: "food", color: "#f43f5e" },
  { name: "Blender Seti", type: "tool", color: "#14b8a6" },
  { name: "Hindistan Cevizi Yağı", type: "food", color: "#f97316" },
  { name: "Şef Bıçağı", type: "tool", color: "#6366f1" }
];

const friendsData = [
  {
    name: "Burak Soylu",
    status: "Gurme Şef",
    recipe: {
      name: "Fit Izgara Köfte",
      summary: "Yağsız kıyma ve bol yeşillikle hazırlanan, protein deposu bir akşam yemeği.",
      prepTime: "25 dk",
      healthStats: {
        calories: "380",
        protein: "32g",
        carbs: "8g",
        fat: "22g",
        fiber: "3g",
        sugar: "1g",
        sodium: "550mg",
        vitamins: ["B12", "Demir"],
        healthScore: 8,
        glycemicIndex: 'Düşük' as const,
        comment: "Kırmızı et sevenler için sağlıklı bir alternatif."
      },
      detailedIngredients: ["250g Yağsız Dana Kıyma", "1 adet Soğan", "Maydanoz", "Baharatlar"],
      instructions: ["Kıymayı yoğurun.", "Şekil verip ızgarada pişirin.", "Yanında bol salata ile servis edin."],
      warnings: []
    }
  },
  {
    name: "Pelin Aydın",
    status: "Beslenme Uzmanı",
    recipe: {
      name: "Avokadolu Smoothie",
      summary: "Sağlıklı yağlar ve vitaminlerle dolu, ferahlatıcı bir içecek.",
      prepTime: "5 dk",
      healthStats: {
        calories: "280",
        protein: "4g",
        carbs: "18g",
        fat: "24g",
        fiber: "9g",
        sugar: "6g",
        sodium: "15mg",
        vitamins: ["E", "K", "C"],
        healthScore: 10,
        glycemicIndex: 'Düşük' as const,
        comment: "Cilt sağlığı ve enerji için harika bir seçim."
      },
      detailedIngredients: ["Yarım Avokado", "1 bardak Ispanak", "Yarım Muz", "Badem Sütü"],
      instructions: ["Tüm malzemeleri blendera atın.", "Pürüzsüz olana kadar karıştırın."],
      warnings: ["Badem sütü içerir."]
    }
  },
  {
    name: "Gizem Aksoy",
    status: "Vegan Mutfak",
    recipe: {
      name: "Mercimek Köftesi",
      summary: "Geleneksel bir lezzetin hafif ve sağlıklı yorumu.",
      prepTime: "45 dk",
      healthStats: {
        calories: "250",
        protein: "12g",
        carbs: "45g",
        fat: "4g",
        fiber: "15g",
        sugar: "3g",
        sodium: "400mg",
        vitamins: ["Folat", "Magnezyum"],
        healthScore: 9,
        glycemicIndex: 'Orta' as const,
        comment: "Bitkisel protein ve lif kaynağı."
      },
      detailedIngredients: ["1 su bardağı Kırmızı Mercimek", "Yarım su bardağı İnce Bulgur", "Salça", "Yeşillikler"],
      instructions: ["Mercimeği haşlayın.", "Bulguru ekleyip demlendirin.", "Kavrulmuş soğan ve salça ile karıştırıp şekil verin."],
      warnings: ["Gluten içerir (bulgur)."]
    }
  },
  {
    name: "Emre Yıldız",
    status: "Ev Şefi",
    recipe: {
      name: "Zencefilli Tavuk",
      summary: "Bağışıklık dostu, hafif acılı ve aromatik tavuk sote.",
      prepTime: "20 dk",
      healthStats: {
        calories: "320",
        protein: "28g",
        carbs: "5g",
        fat: "14g",
        fiber: "2g",
        sugar: "0g",
        sodium: "450mg",
        vitamins: ["C", "B6"],
        healthScore: 8,
        glycemicIndex: 'Düşük' as const,
        comment: "Kış ayları için ideal bir protein öğünü."
      },
      detailedIngredients: ["200g Tavuk Göğsü", "Zencefil", "Sarımsak", "Kırmızı Biber"],
      instructions: ["Tavukları küp doğrayın.", "Zencefil ve sarımsakla soteleyin."],
      warnings: []
    }
  }
];

const SmartRefrigerator: React.FC<{ lang: Language }> = ({ lang }) => {
  const [budget, setBudget] = useState(300);
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateGroceryList(budget, lang);
      setList(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openOrderLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="relative mt-24 mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      {/* Fridge Header / Top Bezel */}
      <div className="max-w-5xl mx-auto bg-stone-200 dark:bg-stone-700 h-12 rounded-t-[3rem] border-b border-stone-300 dark:border-stone-600 flex items-center justify-center relative">
         <div className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-[0.5em] px-8 bg-stone-200 dark:bg-stone-700">KILER AI</div>
      </div>

      {/* Main Fridge Body */}
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-x border-stone-200 dark:border-stone-700 flex flex-col md:flex-row min-h-[700px] overflow-hidden">
        
        {/* Left Door - Controls & Freezer Area */}
        <div className="flex-1 p-8 md:p-12 border-r border-stone-200 dark:border-stone-700 relative group">
          <div className="absolute top-1/4 right-0 w-2.5 h-1/2 bg-gradient-to-r from-stone-300 to-stone-200 dark:from-stone-600 dark:to-stone-500 rounded-l-full shadow-md translate-x-1/2 z-20 transition-transform group-hover:scale-y-105"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-blue-900/20">🧊</div>
              <div>
                <h3 className="text-2xl font-black text-stone-900 dark:text-white uppercase tracking-tighter">BUZDOLABI</h3>
                <p className="text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">AKILLI YÖNETİM</p>
              </div>
            </div>

            <div className="space-y-10 flex-1">
              <div className="bg-white dark:bg-stone-900 p-8 rounded-[2.5rem] shadow-sm border border-stone-200 dark:border-stone-800">
                <div className="flex justify-between items-center mb-6">
                  <label className="text-xs font-black text-stone-400 uppercase tracking-widest">ALIŞVERİŞ BÜTÇESİ</label>
                  <span className="text-3xl font-black text-blue-600">{budget} TL</span>
                </div>
                <input 
                  type="range" min="100" max="2000" step="50" 
                  value={budget} 
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full h-4 bg-stone-100 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-10"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-900/20 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : "MARKETE GİT"}
                </button>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[2.5rem] border border-amber-100 dark:border-amber-900/20 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 text-6xl opacity-10">💡</div>
                <h4 className="text-[10px] font-black text-amber-800 dark:text-amber-400 uppercase tracking-widest mb-3">ALIŞVERİŞ STRATEJİSİ</h4>
                <p className="text-amber-900/80 dark:text-amber-200/70 text-sm font-medium leading-relaxed italic">
                  {list ? list.strategy : "Bütçeni en verimli şekilde kullanmak için temel protein ve mevsim sebzelerine odaklanan bir sepet hazırlayacağız."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Door - Digital Smart Screen Area */}
        <div className="flex-1 p-8 md:p-12 relative group bg-white/30 dark:bg-black/10">
          <div className="absolute top-1/4 left-0 w-2.5 h-1/2 bg-gradient-to-l from-stone-300 to-stone-200 dark:from-stone-600 dark:to-stone-500 rounded-r-full shadow-md -translate-x-1/2 z-20 transition-transform group-hover:scale-y-105"></div>
          
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-stone-900 dark:bg-black rounded-[3rem] p-8 md:p-10 border-[10px] border-stone-800 dark:border-stone-950 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
               
               {list ? (
                 <div className="relative z-10 h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">SMART GROCERY</span>
                        <h4 className="text-lg font-black text-white uppercase tracking-tight">ÖNERİLEN SEPET</h4>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/30">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                         <span className="text-[9px] font-black text-emerald-500 uppercase">GÜNCEL FİYAT</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2 mb-8">
                      {list.items.map((item: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group/item">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-white group-hover/item:text-blue-400 transition-colors">{item.name}</span>
                            <span className="text-[10px] font-bold text-stone-500 uppercase">{item.amount}</span>
                          </div>
                          <span className="text-sm font-black text-blue-400">{item.price} TL</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/10 space-y-2">
                       <div className="flex justify-between items-center opacity-60">
                          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">TOPLAM</span>
                          <span className="text-sm font-black text-white">{list.totalSpent} TL</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">KALAN PARA ÜSTÜ</span>
                          <span className="text-2xl font-black text-emerald-500">{list.remaining} TL</span>
                       </div>
                    </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-20">
                    <div className="text-7xl mb-6 grayscale brightness-150">📱</div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Ekranı Aktifleştirmek İçin Bütçe Belirleyin</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-stone-100 dark:bg-stone-900 p-8 rounded-b-[3rem] border-x border-b border-stone-200 dark:border-stone-700 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button onClick={() => openOrderLink('https://trendyolgo.com/')} className="flex items-center justify-center gap-3 py-5 px-6 rounded-2xl bg-[#ff6000] text-white font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-orange-900/20 cursor-pointer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Trendyol_Logo.png" alt="Trendyol" className="h-4 invert" />
            Trendyol Go
          </button>
          <button onClick={() => openOrderLink('https://getir.com/')} className="flex items-center justify-center gap-3 py-5 px-6 rounded-2xl bg-[#5d3ebc] text-white font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-purple-900/20 cursor-pointer">
            <span className="text-xl">🛵</span>
            Getir
          </button>
          <button onClick={() => openOrderLink('https://www.migros.com.tr/')} className="flex items-center justify-center gap-3 py-5 px-6 rounded-2xl bg-white text-[#ff6600] border-2 border-[#ff6600] font-black text-xs uppercase tracking-widest hover:bg-orange-50 active:scale-95 transition-all shadow-xl cursor-pointer">
            <span className="text-xl">🍊</span>
            Migros Sanal Market
          </button>
        </div>
      </div>
    </div>
  );
};

const WheelOfFortune: React.FC<{ lang: Language }> = ({ lang }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{ name: string; code: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);
    setCopied(false);
    const extraRounds = 8 + Math.floor(Math.random() * 5);
    const stopAt = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (extraRounds * 360) + stopAt;
    setRotation(totalRotation);
    setTimeout(() => {
      setIsSpinning(false);
      const segmentDegrees = 360 / wheelItems.length;
      const normalizedRotation = totalRotation % 360;
      const originAngleAtPointer = (270 - normalizedRotation + 360) % 360;
      const index = Math.floor(originAngleAtPointer / segmentDegrees);
      const selectedItem = wheelItems[index];
      const randomCode = Math.random().toString(36).substring(2, 12).toUpperCase();
      setResult({ name: selectedItem.name, code: randomCode });
    }, 6000);
  };

  const copyCode = () => {
    if (result) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative py-16 px-8 md:px-12 rounded-[3rem] bg-white dark:bg-stone-800 overflow-hidden shadow-xl border border-stone-100 dark:border-stone-700">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 bg-emerald-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-300 rounded-full blur-[120px]"></div>
      </div>
      <div className="relative z-10 text-center mb-12">
        <h3 className="text-3xl font-black text-stone-900 dark:text-white uppercase tracking-tighter drop-shadow-sm">
          {lang === 'tr' ? 'MUTFAK ŞANS ÇARKI' : 'KITCHEN LUCKY WHEEL'}
        </h3>
        <p className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-1.5 rounded-full inline-block">
          {lang === 'tr' ? '6 Saniye Boyunca Şansını Çevir!' : 'Spin Your Luck for 6 Seconds!'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 shrink-0">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
             <div className="w-8 h-10 bg-emerald-600 dark:bg-emerald-500 rounded-b-full clip-path-triangle rotate-180"></div>
          </div>
          <div className="w-full h-full rounded-full border-[12px] border-stone-50 dark:border-stone-700 shadow-[0_0_80px_rgba(16,185,129,0.1)] relative overflow-hidden transition-transform duration-[6000ms] cubic-bezier(0.15, 0, 0, 1)" style={{ transform: `rotate(${rotation}deg)` }}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {wheelItems.map((item, i) => {
                const startAngle = i * (360 / wheelItems.length);
                const endAngle = (i + 1) * (360 / wheelItems.length);
                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);
                return (
                  <g key={i}>
                    <path d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`} fill={item.color} stroke="rgba(255,255,255,0.15)" strokeWidth="0.2" />
                    <text x="75" y="50" fill="white" fontSize="3" fontWeight="900" textAnchor="middle" transform={`rotate(${startAngle + 18}, 50, 50)`} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.name}</text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-stone-800 rounded-full z-10 shadow-xl flex items-center justify-center border-[6px] border-emerald-50 dark:border-stone-700">
               <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-xl">🎁</span>
               </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm flex items-center justify-center min-h-[300px]">
          {result ? (
            <div className="w-full p-8 bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-2xl border-2 border-emerald-500/30 animate-in zoom-in-95 text-center">
              <div className="flex justify-center gap-1 mb-4"><span className="animate-bounce text-2xl">✨</span><span className="animate-bounce [animation-delay:0.2s] text-2xl">🏆</span><span className="animate-bounce [animation-delay:0.4s] text-2xl">✨</span></div>
              <h4 className="text-emerald-600 font-black uppercase text-xs tracking-[0.2em] mb-2 leading-tight">{lang === 'tr' ? 'Tebrikler indirim kodu kazandınız!' : 'Congratulations! You won a discount code!'}</h4>
              <p className="text-stone-900 dark:text-white font-black text-lg mb-6 leading-tight">{result.name}</p>
              <div className="bg-stone-50 dark:bg-stone-800 p-6 rounded-3xl border border-stone-100 dark:border-stone-700 relative">
                 <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">{result.name} İndirim Kodu</div>
                 <div className="text-xl font-black text-emerald-600 tracking-[0.1em] font-mono select-all overflow-hidden text-ellipsis whitespace-nowrap px-2">{result.code}</div>
                 <button onClick={copyCode} className={`mt-4 w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white shadow-lg' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}>{copied ? (lang === 'tr' ? 'KOPYALANDI!' : 'COPIED!') : (lang === 'tr' ? 'KODU KOPYALA' : 'COPY CODE')}</button>
              </div>
              <p className="mt-4 text-[9px] text-stone-400 font-bold uppercase tracking-widest leading-relaxed">{lang === 'tr' ? `*Trendyol'da ${result.name} alımında geçerli özel kod.` : `*Special code for ${result.name} on Trendyol.`}</p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center opacity-30 grayscale p-8 border-4 border-dashed border-stone-100 dark:border-stone-700 rounded-[2.5rem]">
               <div className="text-6xl mb-4">🎰</div>
               <p className="text-xs font-black uppercase tracking-widest text-stone-400">{lang === 'tr' ? 'Çarkı Çevir Hediyeni Gör!' : 'Spin the Wheel to see your gift!'}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-12 w-full">
        <button onClick={spinWheel} disabled={isSpinning} className={`px-24 py-5 rounded-full font-black text-xl uppercase tracking-widest transition-all shadow-xl active:scale-95 border-b-4 ${isSpinning ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-default' : 'bg-emerald-600 text-white border-emerald-800 hover:bg-emerald-700 hover:-translate-y-1'}`}>
          {isSpinning ? (lang === 'tr' ? 'DÖNÜYOR...' : 'SPINNING...') : (lang === 'tr' ? 'ÇEVİR!' : 'SPIN!')}
        </button>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ userName, lang, planType, onToggleSave, savedRecipes }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'ingredient' | 'budget'>('ingredient');
  const [showPrefs, setShowPrefs] = useState(false);
  const [selectedSocialRecipe, setSelectedSocialRecipe] = useState<Recipe | null>(null);
  
  const [prefs, setPrefs] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem(`prefs_${userName}`);
    return saved ? JSON.parse(saved) : { diseases: [], allergies: [], dailyCalorieGoal: 2000 };
  });

  const [tempAllergy, setTempAllergy] = useState('');
  const [tempDisease, setTempDisease] = useState('');

  const commonAllergies = lang === 'tr' ? ["Gluten", "Süt", "Yumurta", "Kuruyemiş", "Deniz Ürünleri", "Soya", "Yer Fıstığı", "Mısır"] : ["Gluten", "Dairy", "Eggs", "Tree Nuts", "Seafood", "Soy", "Peanuts", "Corn"];
  const commonDiseases = lang === 'tr' ? ["Diyabet", "Tansiyon", "Çölyak", "Kolesterol", "Gastrit", "İnsülin Direnci", "Reflü"] : ["Diabetes", "Hypertension", "Celiac", "Cholesterol", "Gastritis", "Insulin Resistance", "GERD"];

  const savePrefs = () => {
    localStorage.setItem(`prefs_${userName}`, JSON.stringify(prefs));
    setShowPrefs(false);
  };

  const addItem = (type: 'allergies' | 'diseases', value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (prefs[type].some(item => item.toLowerCase() === trimmed.toLowerCase())) return;
    setPrefs({ ...prefs, [type]: [...prefs[type], trimmed] });
    if (type === 'allergies') setTempAllergy('');
    else setTempDisease('');
  };

  const removeItem = (type: 'allergies' | 'diseases', value: string) => {
    setPrefs({ ...prefs, [type]: prefs[type].filter(i => i !== value) });
  };

  // Sosyal akış için veriyi çoğaltıyoruz (Sonsuz kaydırma etkisi için)
  const repeatedFriends = [...friendsData, ...friendsData, ...friendsData, ...friendsData];

  return (
    <div className="animate-in fade-in duration-700 space-y-16 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-emerald-950 dark:text-white">{t.welcome} {userName} ✨</h2>
          <p className="text-stone-500 dark:text-stone-400 mt-1">{t.what_to_cook}</p>
        </div>
        <button onClick={() => setShowPrefs(true)} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-bold text-xs hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm group">
          <svg className="w-4 h-4 text-emerald-500 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          {t.manage_prefs}
        </button>
      </div>

      {/* Friends' Recipes Section - Marquee Scrolling */}
      <section className="pt-8 border-t border-stone-100 dark:border-stone-800 overflow-hidden">
        <div className="flex items-center justify-between mb-8 px-2">
          <div>
            <h3 className="text-xl font-black text-emerald-950 dark:text-white uppercase tracking-tight">{t.friends_recipes}</h3>
            <p className="text-stone-500 dark:text-stone-400 text-sm">{t.friends_subtitle}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-900/10">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            LIVE STREAM
          </div>
        </div>

        <div className="relative group">
          {/* Fading Edge Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-50 dark:from-stone-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-stone-50 dark:from-stone-900 to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-6 animate-scroll whitespace-nowrap py-4 hover:pause-scroll transition-all">
            {repeatedFriends.map((friend, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedSocialRecipe(friend.recipe)}
                className="inline-block min-w-[320px] bg-white dark:bg-stone-800 p-6 rounded-[2.5rem] border border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-2xl transition-all cursor-pointer group/card active:scale-95"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <h4 className="text-sm font-black text-stone-900 dark:text-white group-hover/card:text-emerald-600 transition-colors uppercase tracking-tight">@{friend.name.split(' ')[0].toLowerCase()}</h4>
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{friend.status}</span>
                  </div>
                  <div className="px-2 py-1 bg-stone-50 dark:bg-stone-900 rounded-lg text-[9px] font-black text-stone-400 uppercase tracking-tighter">Az Önce</div>
                </div>
                
                <div className="bg-stone-50 dark:bg-stone-900 rounded-[2rem] p-5 border border-stone-100 dark:border-stone-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-20">🍳</div>
                  <h5 className="text-sm font-bold text-stone-800 dark:text-stone-100 leading-tight mb-4 whitespace-normal">{friend.recipe.name}</h5>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5">
                       <span className="text-emerald-500 text-sm">★</span>
                       <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{friend.recipe.healthStats.healthScore}/10 Skor</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={(e) => { e.stopPropagation(); onToggleSave(friend.recipe); }} className={`p-2 rounded-xl transition-all ${savedRecipes.some(r => r.name === friend.recipe.name) ? 'text-emerald-600 scale-110' : 'text-stone-300 hover:text-emerald-500'}`}>
                         <svg className="w-5 h-5" fill={savedRecipes.some(r => r.name === friend.recipe.name) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                         </svg>
                      </button>
                      <button className="text-stone-300 hover:text-red-500 transition-colors p-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div>
        <div className="flex p-1.5 bg-stone-100 dark:bg-stone-800 rounded-2xl mb-10 w-full max-w-2xl mx-auto">
          <button onClick={() => setActiveTab('ingredient')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'ingredient' ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-400 shadow-sm' : 'text-stone-50 dark:text-stone-400'}`}>{t.ingredient_search}</button>
          <button onClick={() => setActiveTab('budget')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'budget' ? 'bg-white dark:bg-stone-700 text-emerald-700 dark:text-emerald-400 shadow-sm' : 'text-stone-50 dark:text-stone-400'}`}>{t.budget_search}</button>
        </div>
        <div>
          {activeTab === 'ingredient' ? (
            <IngredientSearch hideBack userPrefs={prefs} lang={lang} planType={planType} onToggleSave={onToggleSave} savedRecipes={savedRecipes} />
          ) : (
            <BudgetSearch hideBack userPrefs={prefs} lang={lang} planType={planType} onToggleSave={onToggleSave} savedRecipes={savedRecipes} />
          )}
        </div>
      </div>

      <section><WheelOfFortune lang={lang} /></section>
      <section><SmartRefrigerator lang={lang} /></section>

      {selectedSocialRecipe && (
        <RecipeCard 
          recipe={selectedSocialRecipe} 
          lang={lang} 
          onToggleSave={onToggleSave}
          isSaved={savedRecipes.some(r => r.name === selectedSocialRecipe.name)}
          initialShowDetails={true}
          onClose={() => setSelectedSocialRecipe(null)}
        />
      )}

      {showPrefs && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-stone-800 w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-emerald-50 dark:border-stone-700 flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-stone-100 dark:border-stone-700 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
              <div>
                <h2 className="text-2xl font-black text-emerald-950 dark:text-white">{t.health_prefs}</h2>
                <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest mt-1">{t.health_filters_active}</p>
              </div>
              <button onClick={() => setShowPrefs(false)} className="p-3 bg-white dark:bg-stone-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl text-stone-400 transition-all border border-stone-200 dark:border-stone-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              <section>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.calorie_goal}</label>
                  <span className="text-sm font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">{prefs.dailyCalorieGoal} kcal</span>
                </div>
                <input type="range" min="1200" max="4000" step="50" value={prefs.dailyCalorieGoal} onChange={(e) => setPrefs({...prefs, dailyCalorieGoal: parseInt(e.target.value)})} className="w-full h-2 bg-stone-100 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
              </section>
              <section>
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-3">{t.allergies}</label>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={tempAllergy} onChange={(e) => setTempAllergy(e.target.value)} placeholder={lang === 'tr' ? 'Örn: Fıstık, Süt...' : 'e.g. Peanut, Milk...'} className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-700 text-sm focus:border-emerald-500 outline-none dark:text-white" onKeyPress={(e) => e.key === 'Enter' && addItem('allergies', tempAllergy)} />
                  <button onClick={() => addItem('allergies', tempAllergy)} className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg></button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {commonAllergies.map(item => (<button key={item} onClick={() => addItem('allergies', item)} className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-700/50 text-[10px] font-bold text-stone-500 dark:text-stone-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 transition-all border border-transparent hover:border-emerald-200">+ {item}</button>))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {prefs.allergies.map(item => (<span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold border border-red-100 dark:border-red-900/30 animate-in zoom-in-90">{item}<button onClick={() => removeItem('allergies', item)} className="hover:text-red-800"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button></span>))}
                </div>
              </section>
              <section>
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-3">{t.diseases}</label>
                <div className="flex gap-2 mb-3">
                  <input type="text" value={tempDisease} onChange={(e) => setTempDisease(e.target.value)} placeholder={lang === 'tr' ? 'Örn: Diyabet, Tansiyon...' : 'e.g. Diabetes, Hypertension...'} className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-700 text-sm focus:border-emerald-500 outline-none dark:text-white" onKeyPress={(e) => e.key === 'Enter' && addItem('diseases', tempDisease)} />
                  <button onClick={() => addItem('diseases', tempDisease)} className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg></button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {commonDiseases.map(item => (<button key={item} onClick={() => addItem('diseases', item)} className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-700/50 text-[10px] font-bold text-stone-500 dark:text-stone-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 transition-all border border-transparent hover:border-amber-200">+ {item}</button>))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {prefs.diseases.map(item => (<span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-100 dark:border-amber-900/30 animate-in zoom-in-90">{item}<button onClick={() => removeItem('diseases', item)} className="hover:text-amber-800"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg></button></span>))}
                </div>
              </section>
            </div>
            <div className="p-8 bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-700">
              <button onClick={savePrefs} className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-700 transition-all uppercase tracking-widest text-xs">{t.save}</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.5); }
        .clip-path-triangle { clip-path: polygon(50% 0%, 0% 100%, 100% 100%); }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .hover\:pause-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
