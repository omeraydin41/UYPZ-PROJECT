
import React, { useState, useMemo } from 'react';
import { generateIngredientRecipes } from '../services/geminiService';
import { Recipe, UserPreferences, PlanType } from '../types';
import RecipeCard from './RecipeCard';
import { translations, Language } from '../translations';

interface IngredientSearchProps {
  onBack?: () => void;
  hideBack?: boolean;
  userPrefs?: UserPreferences;
  lang: Language;
  planType?: PlanType;
  onToggleSave?: (recipe: Recipe) => void;
  savedRecipes?: Recipe[];
}

const IngredientSearch: React.FC<IngredientSearchProps> = ({ onBack, hideBack, userPrefs, lang, planType, onToggleSave, savedRecipes }) => {
  const t = translations[lang];
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const popular = lang === 'tr' 
    ? ["Yumurta", "Tavuk Göğsü", "Mantar", "Ispanak", "Kıyma", "Patates", "Yoğurt", "Nohut", "Domates"]
    : ["Egg", "Chicken Breast", "Mushroom", "Spinach", "Ground Beef", "Potato", "Yogurt", "Chickpeas", "Tomato"];

  const detectedAllergies = useMemo(() => {
    if (!userPrefs?.allergies || !ingredients) return [];
    const inputWords = ingredients.toLowerCase().split(/[,\s]+/).filter(w => w.length > 2);
    return userPrefs.allergies.filter(allergy => 
      inputWords.some(word => word.includes(allergy.toLowerCase()) || allergy.toLowerCase().includes(word))
    );
  }, [ingredients, userPrefs?.allergies]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!ingredients.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateIngredientRecipes(ingredients, userPrefs, lang, planType);
      setRecipes(result);
    } catch (err) {
      setError(t.error_occurred);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {!hideBack && onBack && (
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-stone-400 dark:text-stone-500 hover:text-emerald-600 transition-all text-sm font-bold group">
          <div className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 group-hover:bg-emerald-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </div>
          {t.back}
        </button>
      )}

      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-emerald-100 dark:border-emerald-800">
          {t.ai_analysis}
        </div>
        <h2 className="text-4xl font-black text-emerald-950 dark:text-white mb-3 tracking-tight leading-tight">{t.ingredients_title}</h2>
        <div className="flex justify-center gap-2 mb-2">
            <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Plan: {planType}</span>
        </div>
        {userPrefs && (userPrefs.allergies.length > 0 || userPrefs.diseases.length > 0) && (
          <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 inline-block px-4 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">{t.health_filters_active}</p>
        )}
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        {detectedAllergies.length > 0 && (
          <div className="mb-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-4 flex items-center gap-4">
            <div className="bg-red-500 text-white p-2 rounded-xl"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
            <div>
              <p className="text-red-800 dark:text-red-400 text-xs font-black uppercase tracking-wide">{t.allergy_warning}</p>
              <p className="text-red-600 dark:text-red-300 text-sm font-medium">{t.allergy_notice} ({detectedAllergies.join(', ')})</p>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-stone-800 p-2 rounded-[2rem] shadow-xl border border-emerald-50 dark:border-stone-700">
          <form onSubmit={handleSubmit} className="relative">
            <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder={t.input_placeholder} className="w-full h-40 px-8 py-8 rounded-[1.75rem] border-0 focus:outline-none focus:ring-0 bg-transparent text-stone-700 dark:text-white text-lg placeholder:text-stone-300 dark:placeholder:text-stone-600" disabled={loading} />
            <div className="p-4 bg-stone-50/50 dark:bg-stone-900/50 rounded-b-[1.75rem] border-t border-stone-100 dark:border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {popular.map((item) => (
                  <button key={item} type="button" onClick={() => setIngredients(c => c ? `${c}, ${item}` : item)} className="px-3 py-1.5 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-[11px] font-bold text-stone-500 dark:text-stone-400 hover:border-emerald-300 transition-all">+ {item}</button>
                ))}
              </div>
              <button type="submit" disabled={loading || !ingredients.trim()} className={`w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-white uppercase tracking-widest text-xs transition-all shadow-lg ${loading || !ingredients.trim() ? 'bg-stone-300' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/20'}`}>{loading ? t.analyzing : t.get_recipes}</button>
            </div>
          </form>
        </div>
      </div>

      {userPrefs && userPrefs.dailyCalorieGoal > 0 && recipes.length > 0 && (
        <div className="max-w-4xl mx-auto mb-8 animate-in fade-in slide-in-from-top-2">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl flex items-center gap-3">
            <span className="text-xl">🍏</span>
            <p className="text-sm font-bold text-blue-700 dark:text-blue-300">
              {t.calorie_compliance.replace('{goal}', userPrefs.dailyCalorieGoal.toString())}
            </p>
          </div>
        </div>
      )}

      {recipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, idx) => (
            <RecipeCard 
              key={idx} 
              recipe={recipe} 
              hideWarning={true} 
              lang={lang} 
              onToggleSave={onToggleSave}
              isSaved={savedRecipes?.some(r => r.name === recipe.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientSearch;
