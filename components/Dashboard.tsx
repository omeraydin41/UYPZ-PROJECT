import React, { useState, useRef, useEffect } from 'react';
import { Activity, Heart, Utensils, Calendar, Sparkles, ChefHat, Loader2, ThumbsUp, MessageCircle, Save, AlertTriangle, Plus, X, Edit2, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '../types';
import { Button } from './Button';
import { generateRecipesFromIngredients } from '../services/geminiService';
import { DownloadAppModal } from './DownloadAppModal';
import { useLanguage } from '../context/LanguageContext';

interface DashboardProps {
  userName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userName = "Kullanıcı" }) => {
  const { t } = useLanguage();
  const [showGenerator, setShowGenerator] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const generatorRef = useRef<HTMLDivElement>(null);

  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [allergyInput, setAllergyInput] = useState('');
  const [allergies, setAllergies] = useState<string[]>(['Gluten']); 
  const [weight, setWeight] = useState<string>('78.5');
  const [height, setHeight] = useState<string>('182');
  const [allergyWarning, setAllergyWarning] = useState<string | null>(null);

  const calculateBMI = () => {
      const w = parseFloat(weight);
      const h_cm = parseFloat(height);
      if (w > 0 && h_cm > 0) {
          const h_m = h_cm / 100;
          return (w / (h_m * h_m)).toFixed(1);
      }
      return '--';
  };
  
  const bmi = calculateBMI();

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    setAllergyWarning(null);

    const input = inputValue.trim();
    if (!input) return;

    // Alerji kontrolü: Kullanıcının girdiği malzeme alerji listesinde var mı?
    const normalizedInput = input.toLowerCase();
    const isAllergen = allergies.some(allergy => {
        const normalizedAllergy = allergy.toLowerCase();
        return normalizedInput.includes(normalizedAllergy) || normalizedAllergy.includes(normalizedInput);
    });

    if (isAllergen) {
        setAllergyWarning(t('ui.allergyDetected'));
        return; // Alerjen ise listeye ekleme yapma
    }

    setIngredients(prev => [...prev, input]);
    setInputValue('');
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    try {
      const data = await generateRecipesFromIngredients(ingredients, allergies);
      setMyRecipes(prev => [...data, ...prev]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleGenerator = () => {
      setShowGenerator(!showGenerator);
      setAllergyWarning(null); // Mod kapatıldığında uyarıyı sıfırla
      if (!showGenerator) {
          setTimeout(() => generatorRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">{t('dashboard.welcome')}, {userName} 👋</h1>
            <p className="text-stone-500">{t('dashboard.greeting')}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-stone-600 bg-white px-4 py-2 rounded-xl border border-cream-200 shadow-sm">
            <Calendar className="w-4 h-4 text-primary-600" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <ChefHat className="w-6 h-6 text-white mb-4" />
                <h3 className="text-xl font-bold mb-2">{t('dashboard.chefMode')}</h3>
                <p className="text-primary-100 text-sm mb-6 leading-relaxed opacity-90">{t('dashboard.chefDesc')}</p>
                <button 
                    onClick={toggleGenerator}
                    className="w-full bg-white text-primary-800 py-3.5 rounded-xl font-bold text-sm hover:bg-cream-50 transition-all shadow-lg active:scale-95"
                >
                    {showGenerator ? t('dashboard.closeMode') : t('dashboard.newRecipe')}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-6 shadow-lg border border-stone-100">
              <div className="flex items-center gap-3 mb-8">
                  <Activity className="w-5 h-5 text-primary-600" />
                  <h2 className="font-bold text-lg text-stone-800">{t('dashboard.healthProfile')}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1 block">{t('dashboard.weight')}</label>
                  <div className="flex items-baseline gap-1 border-b-2 border-stone-100 pb-1">
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-transparent text-3xl font-black text-stone-800 outline-none" />
                    <span className="text-sm font-medium text-stone-400">{t('ui.kg')}</span>
                  </div>
                </div>
                <div>
                   <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1 block">{t('dashboard.height')}</label>
                   <div className="flex items-baseline gap-1 border-b-2 border-stone-100 pb-1">
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-transparent text-3xl font-black text-stone-800 outline-none" />
                    <span className="text-sm font-medium text-stone-400">{t('ui.cm')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mb-8">
                 <div className="flex-1 bg-primary-50 p-4 rounded-2xl text-center">
                   <span className="text-primary-600 text-[10px] uppercase font-bold tracking-wider block mb-1">{t('dashboard.bmi')}</span>
                   <div className="text-3xl font-black text-primary-700">{bmi}</div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-red-500 font-bold text-sm">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {t('dashboard.allergies')}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {allergies.map((allergy, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1 bg-stone-100 rounded-lg text-xs font-bold text-stone-600">
                            {allergy}
                            <button onClick={() => setAllergies(prev => prev.filter((_, i) => i !== idx))} className="ml-2 hover:text-red-500 transition-colors">&times;</button>
                        </span>
                    ))}
                </div>
                <input 
                    type="text" 
                    value={allergyInput}
                    onChange={(e) => setAllergyInput(e.target.value)}
                    placeholder={t('dashboard.addAllergy')}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl text-sm focus:border-primary-500 focus:bg-white transition-all outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && allergyInput.trim() && (setAllergies([...allergies, allergyInput.trim()]), setAllergyInput(''))}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {showGenerator && (
                <div ref={generatorRef} className="mb-8 bg-white rounded-[2rem] border border-primary-100 shadow-xl overflow-hidden animate-scale-in p-6">
                    <h2 className="font-bold text-xl text-primary-800 flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-primary-500" />
                        {t('dashboard.newRecipe')}
                    </h2>

                    {allergyWarning && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-bold animate-fade-in ring-2 ring-red-50">
                        <AlertOctagon className="w-5 h-5 flex-shrink-0" />
                        <span>{allergyWarning}</span>
                      </div>
                    )}

                    <form onSubmit={handleAddIngredient} className="flex gap-2 mb-6">
                        <input 
                          type="text" 
                          value={inputValue} 
                          onChange={(e) => {
                            setInputValue(e.target.value);
                            setAllergyWarning(null); // Yazmaya başlayınca uyarıyı kaldır
                          }} 
                          placeholder={t('demo.placeholder')} 
                          className={`flex-1 px-5 py-4 bg-stone-50 border rounded-2xl outline-none transition-all ${allergyWarning ? 'border-red-300 ring-2 ring-red-50' : 'border-stone-200 focus:border-primary-500 focus:bg-white'}`} 
                        />
                        <Button type="submit">{t('ui.add')}</Button>
                    </form>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {ingredients.map((ing, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg border border-primary-100 font-bold flex items-center gap-2">
                                {ing} <button onClick={() => removeIngredient(idx)} className="hover:text-red-500 transition-colors">&times;</button>
                            </span>
                        ))}
                    </div>
                    <Button onClick={handleGenerate} className="w-full" isLoading={loading} disabled={ingredients.length === 0}>{t('demo.generate')}</Button>
                </div>
            )}

            {myRecipes.length > 0 && (
                <div className="mb-10">
                    <h3 className="font-bold text-xl text-stone-800 mb-6 flex items-center gap-2">
                        <Save className="w-5 h-5 text-primary-600" /> {t('dashboard.myRecipes')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {myRecipes.map((recipe, idx) => <RecipeCard key={idx} recipe={recipe} index={idx} />)}
                    </div>
                </div>
            )}

            <div>
                <h2 className="font-bold text-xl text-stone-800 mb-6">{t('dashboard.communityTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 grayscale-[50%] pointer-events-none">
                    <div className="bg-white p-6 rounded-3xl border border-stone-100 h-40 flex items-center justify-center">...</div>
                    <div className="bg-white p-6 rounded-3xl border border-stone-100 h-40 flex items-center justify-center">...</div>
                </div>
                <div className="mt-8 text-center">
                    <button onClick={() => setIsDownloadModalOpen(true)} className="px-6 py-2.5 bg-white border border-stone-200 rounded-full text-stone-600 font-medium text-sm">
                        {t('dashboard.loadMore')}
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      <DownloadAppModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
    </div>
  );
};