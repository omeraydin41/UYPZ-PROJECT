
import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { translations, Language } from '../translations';

interface RecipeCardProps {
  recipe: Recipe;
  isBudgetView?: boolean;
  hideWarning?: boolean;
  lang: Language;
  onToggleSave?: (recipe: Recipe) => void;
  isSaved?: boolean;
  initialShowDetails?: boolean;
  onClose?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  isBudgetView, 
  hideWarning, 
  lang, 
  onToggleSave, 
  isSaved,
  initialShowDetails = false,
  onClose
}) => {
  const t = translations[lang];
  const [showDetails, setShowDetails] = useState(initialShowDetails);

  useEffect(() => {
    document.body.style.overflow = showDetails ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showDetails]);

  const handleClose = () => {
    setShowDetails(false);
    if (onClose) onClose();
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-500';
    if (score >= 5) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const shouldShowWarning = recipe.warnings && recipe.warnings.length > 0 && !isBudgetView && !hideWarning;

  return (
    <>
      {/* Kart Görünümü - Sadece initialShowDetails false ise render edilir */}
      {!initialShowDetails && (
        <div className="bg-white dark:bg-stone-800 rounded-[2rem] border border-stone-100 dark:border-stone-700 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {onToggleSave && (
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleSave(recipe); }}
                className={`p-2.5 rounded-xl backdrop-blur-md transition-all active:scale-90 border ${isSaved ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white/80 dark:bg-stone-700/80 border-stone-200 dark:border-stone-600 text-stone-400 hover:text-emerald-600'}`}
              >
                <svg className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            )}
          </div>

          {shouldShowWarning && (
            <div className="absolute top-4 left-4 z-10 animate-pulse">
              <div className="bg-red-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg uppercase">
                {t.critical_warning}
              </div>
            </div>
          )}

          <div className="p-7">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 pr-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${getScoreColor(recipe.healthStats.healthScore)}`}></div>
                  <span className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">{t.health_score}: {recipe.healthStats.healthScore}/10</span>
                </div>
                <h3 className="text-xl font-black text-stone-900 dark:text-white leading-tight group-hover:text-emerald-700 transition-colors">{recipe.name}</h3>
              </div>
              <span className="shrink-0 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border border-emerald-100 dark:border-emerald-800">
                {recipe.prepTime}
              </span>
            </div>
            <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed mb-6 line-clamp-2">{recipe.summary}</p>
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div className="bg-stone-50 dark:bg-stone-900 p-2 rounded-xl text-center">
                <div className="text-[8px] text-stone-400 font-black uppercase">{t.calories}</div>
                <div className="text-xs font-black text-stone-800 dark:text-stone-200">{recipe.healthStats.calories}</div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-xl text-center">
                <div className="text-[8px] text-emerald-600/60 font-black uppercase">{t.protein.substring(0,3)}</div>
                <div className="text-xs font-black text-emerald-700 dark:text-emerald-400">{recipe.healthStats.protein}</div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-xl text-center">
                <div className="text-[8px] text-amber-600/60 font-black uppercase">{t.fiber.substring(0,3)}</div>
                <div className="text-xs font-black text-amber-700 dark:text-amber-400">{recipe.healthStats.fiber}</div>
              </div>
              <div className="bg-stone-50 dark:bg-stone-900 p-2 rounded-xl text-center">
                <div className="text-[8px] text-stone-400 font-black uppercase">{t.gi}</div>
                <div className="text-xs font-black text-stone-800 dark:text-stone-200">{recipe.healthStats.glycemicIndex}</div>
              </div>
            </div>
          </div>
          <button onClick={() => setShowDetails(true)} className="w-full py-5 bg-stone-900 dark:bg-stone-700 text-white font-black text-xs hover:bg-emerald-600 transition-all uppercase tracking-[0.2em] mt-auto">{t.view_recipe}</button>
        </div>
      )}

      {/* Detay Modalı */}
      {showDetails && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-emerald-950/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-stone-800 w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
            <div className="px-8 py-8 border-b border-stone-100 dark:border-stone-700 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50 relative">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <div className={`px-3 py-1 rounded-full text-[10px] font-black text-white ${getScoreColor(recipe.healthStats.healthScore)} uppercase`}>
                    {t.health_score}: {recipe.healthStats.healthScore}/10
                  </div>
                  {shouldShowWarning && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full">{t.critical_warning}</span>
                  )}
                </div>
                <h2 className="text-3xl font-black text-emerald-950 dark:text-white leading-tight mb-1">{recipe.name}</h2>
              </div>
              <div className="flex items-center gap-3">
                {onToggleSave && (
                   <button 
                    onClick={() => onToggleSave(recipe)}
                    className={`p-3 rounded-2xl border transition-all active:scale-90 ${isSaved ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white dark:bg-stone-700 border-stone-200 dark:border-stone-600 text-stone-400 hover:text-emerald-600'}`}
                  >
                    <svg className="w-6 h-6" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                )}
                <button onClick={handleClose} className="p-3 rounded-2xl bg-white dark:bg-stone-700 border border-stone-200 dark:border-stone-600 text-stone-400 dark:text-stone-300 hover:text-red-500 transition-all shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white dark:bg-stone-800">
              {shouldShowWarning && (
                <div className="mb-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-6 flex gap-4">
                  <div className="bg-red-500 text-white w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-red-900 dark:text-red-400 font-black text-sm uppercase mb-1">{t.critical_warning}</h4>
                    <ul className="text-red-700 dark:text-red-300 text-sm list-disc list-inside">
                      {recipe.warnings.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                  <section>
                    <h4 className="text-sm font-black text-emerald-900 dark:text-emerald-100 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      {t.ingredients}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {recipe.detailedIngredients.map((ing, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-700">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-sm text-stone-600 dark:text-stone-300 font-medium">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h4 className="text-sm font-black text-emerald-900 dark:text-emerald-100 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                      {t.instructions}
                    </h4>
                    <div className="space-y-6">
                      {recipe.instructions.map((step, idx) => (
                        <div key={idx} className="flex gap-5 group">
                          <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-sm font-black border border-emerald-100 dark:border-emerald-800">{idx + 1}</div>
                          <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed pt-2 font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
                <div className="lg:col-span-4 space-y-8">
                  <div className="bg-stone-50 dark:bg-stone-900 rounded-[2.5rem] p-8 border border-stone-100 dark:border-stone-700">
                    <h4 className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-widest mb-6 text-center">{t.nutritional_analysis}</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white dark:bg-stone-800 rounded-2xl shadow-sm">
                        <span className="text-xs font-bold text-stone-400 uppercase">{t.energy}</span>
                        <span className="text-sm font-black text-stone-800 dark:text-stone-100">{recipe.healthStats.calories} kcal</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         {[{l: t.protein, v: recipe.healthStats.protein}, {l: t.carbs, v: recipe.healthStats.carbs}, {l: t.fat, v: recipe.healthStats.fat}, {l: t.fiber, v: recipe.healthStats.fiber}].map((st, i) => (
                            <div key={i} className="p-3 bg-white dark:bg-stone-800 rounded-2xl shadow-sm text-center">
                              <span className="block text-[10px] font-bold text-stone-400 uppercase">{st.l}</span>
                              <span className="text-sm font-black text-stone-700 dark:text-stone-200">{st.v}</span>
                            </div>
                         ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-[2rem] border border-emerald-100 dark:border-emerald-800">
                    <h5 className="text-[10px] font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest mb-2">{t.dietitian_note}</h5>
                    <p className="text-emerald-900/70 dark:text-emerald-200/70 text-sm italic">"{recipe.healthStats.comment}"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-stone-50 dark:bg-stone-900 border-t border-stone-100 dark:border-stone-700 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button onClick={() => window.print()} className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 py-3 px-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 bg-white dark:bg-stone-800 transition-all uppercase tracking-widest">
                {t.print}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeCard;
