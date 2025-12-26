
import React, { useState } from 'react';
import { generateBudgetRecipes } from '../services/geminiService';
import { Recipe, FoodStyle, UserPreferences, PlanType } from '../types';
import RecipeCard from './RecipeCard';
import { Language, translations } from '../translations';

interface BudgetSearchProps {
  onBack?: () => void;
  hideBack?: boolean;
  userPrefs?: UserPreferences;
  lang: Language;
  planType?: PlanType;
  onToggleSave?: (recipe: Recipe) => void;
  savedRecipes?: Recipe[];
}

const styles = Object.values(FoodStyle);

const BudgetSearch: React.FC<BudgetSearchProps> = ({ onBack, hideBack, userPrefs, lang, planType, onToggleSave, savedRecipes }) => {
  const t = translations[lang];
  const [budget, setBudget] = useState('150');
  const [selectedStyle, setSelectedStyle] = useState<FoodStyle>(FoodStyle.HOME);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await generateBudgetRecipes(budget, selectedStyle, userPrefs, lang, planType);
      setRecipes(result);
    } catch (err) {
      setError(t.error_occurred);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-emerald-100 dark:border-emerald-800">
          {t.budget_planning}
        </div>
        <h2 className="text-4xl font-black text-emerald-950 dark:text-white mb-3 tracking-tight leading-tight">
          {lang === 'tr' ? 'Cebinizi' : 'Smart'} <br/>
          <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">{lang === 'tr' ? 'Düşünen Menüler' : 'Budget Menus'}</span>
        </h2>
        <div className="flex justify-center gap-2 mb-2">
            <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Plan: {planType}</span>
        </div>
        {userPrefs && (userPrefs.allergies.length > 0 || userPrefs.diseases.length > 0) && (
          <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-4 bg-emerald-50 dark:bg-emerald-900/20 inline-block px-4 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
            {t.health_filters_active}
          </p>
        )}
      </div>

      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-white dark:bg-stone-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 dark:border-stone-700">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <div className="flex justify-between items-center mb-6">
                <label className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em]">{t.max_budget}</label>
                <div className="flex items-baseline gap-1 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{budget}</span>
                  <span className="text-sm font-bold text-emerald-600/60 dark:text-emerald-400/60">TL</span>
                </div>
              </div>
              <input type="range" min="50" max="1000" step="10" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full h-2.5 bg-stone-100 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
            </div>

            <div>
              <label className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em] block mb-6">{t.food_style}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {styles.map((style) => (
                  <button key={style} type="button" onClick={() => setSelectedStyle(style)} className={`px-4 py-4 rounded-2xl text-[11px] font-black transition-all border-2 ${selectedStyle === style ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-stone-50 dark:bg-stone-900 border-stone-100 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-emerald-200'}`}>{style}</button>
                ))}
              </div>
            </div>

            <button type="submit" disabled={loading} className={`w-full py-5 rounded-[1.5rem] font-black text-white transition-all shadow-xl ${loading ? 'bg-stone-300' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
              {loading ? t.analyzing : t.start_planning}
            </button>
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
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="max-w-4xl mx-auto bg-emerald-600 text-white p-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-900/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-black uppercase tracking-widest">{t.allergy_safe}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, idx) => (
              <RecipeCard 
                key={idx} 
                recipe={recipe} 
                isBudgetView={true} 
                lang={lang} 
                onToggleSave={onToggleSave}
                isSaved={savedRecipes?.some(r => r.name === recipe.name)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetSearch;
