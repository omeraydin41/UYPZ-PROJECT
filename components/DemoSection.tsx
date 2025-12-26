
import React, { useState, useRef } from 'react';
import { generateRecipesFromIngredients } from '../services/geminiService';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';
import { Button } from './Button';
import { Search, Loader2, Lock, Sparkles, ChefHat, Plus, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const DemoSection: React.FC = () => {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Split by comma if user pasted a list, or just add single
    const newItems = inputValue.split(',').map(i => i.trim()).filter(i => i.length > 0);
    setIngredients(prev => [...prev, ...newItems]);
    setInputValue('');
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setRecipes(null);
    try {
      const data = await generateRecipesFromIngredients(ingredients);
      setRecipes(data);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error(error);
      alert("Error generating recipes.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="demo" className="py-24 bg-stone-50 relative scroll-mt-20 overflow-hidden">
       {/* Ambient Background */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white to-transparent -z-10"></div>
       <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-[100px] -z-10"></div>
       <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm text-stone-600 text-xs font-bold uppercase tracking-wider mb-6">
             <ChefHat className="w-3.5 h-3.5 text-primary-600" />
             <span>{t('demo.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-6 tracking-tight">
            {t('demo.title1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-primary-500">{t('demo.title2')}</span>
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            {t('demo.subtitle')}
          </p>
        </div>

        {/* Control Panel / Interaction Area */}
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2.5rem] p-3 shadow-2xl shadow-stone-200/50 border border-white">
                <div className="bg-stone-50/50 rounded-[2rem] border border-stone-100 p-6 md:p-10 relative overflow-hidden">
                    
                    {/* Input Label */}
                    <div className="flex items-center justify-between mb-6">
                        <label className="text-sm font-bold text-stone-800 uppercase tracking-wide flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-accent" />
                            {t('demo.inputLabel')}
                        </label>
                        <span className="text-xs font-medium text-stone-400 bg-white px-2 py-1 rounded-md border border-stone-100">
                            AI Model: Gemini 2.5 Flash
                        </span>
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleAddIngredient} className="relative mb-6 group">
                        <div className="flex items-center bg-white border-2 border-stone-200 rounded-2xl overflow-hidden focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-100/50 transition-all shadow-sm">
                            <input
                                id="recipe-input"
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={t('demo.placeholder')}
                                className="flex-1 px-6 py-5 outline-none text-lg text-stone-800 placeholder:text-stone-300 font-medium bg-transparent"
                            />
                            <button 
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="px-6 py-5 bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-primary-600 font-bold transition-colors border-l border-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus className="w-6 h-6" />
                            </button>
                        </div>
                    </form>

                    {/* Ingredients List */}
                    <div className="min-h-[80px] bg-white rounded-2xl border border-stone-100 p-4 mb-8 flex flex-wrap content-start gap-2 shadow-inner">
                        {ingredients.length === 0 && (
                            <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm italic gap-2 py-4">
                                <Search className="w-4 h-4 opacity-50" />
                                {t('demo.empty')}
                            </div>
                        )}
                        {ingredients.map((ing, idx) => (
                            <span key={idx} className="inline-flex items-center bg-primary-50 text-primary-800 pl-3 pr-2 py-1.5 rounded-xl text-sm font-bold border border-primary-100 shadow-sm animate-scale-in group">
                                {ing}
                                <button 
                                    onClick={() => removeIngredient(idx)}
                                    className="ml-2 p-0.5 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </span>
                        ))}
                    </div>

                    {/* Action Button */}
                    <Button 
                        onClick={handleGenerate} 
                        disabled={ingredients.length === 0 || loading}
                        className="w-full rounded-xl py-5 text-lg shadow-xl shadow-primary-600/20 hover:shadow-primary-600/30 hover:-translate-y-0.5 transition-all" 
                        size="lg"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {t('demo.generate')}...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                {t('demo.generate')} <Sparkles className="w-5 h-5 fill-current" />
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div>

        {/* Loading State */}
        {loading && (
           <div className="mt-20 flex flex-col items-center justify-center text-center animate-pulse">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6 border border-stone-100">
                <ChefHat className="w-8 h-8 text-primary-500 animate-bounce" />
             </div>
             <h3 className="text-xl font-bold text-stone-800 mb-2">{t('demo.loadingTitle')}</h3>
             <p className="text-stone-500">{t('demo.loadingSub')}</p>
           </div>
        )}

        {/* Results Grid */}
        {recipes && (
          <div ref={resultsRef} className="mt-24 animate-fade-in-up">
             <div className="flex items-center justify-between mb-10 px-2">
                <div>
                    <h3 className="text-3xl font-bold text-stone-900">{t('demo.resultsTitle')}</h3>
                    <p className="text-stone-500 mt-1">{t('demo.resultsSub')}</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {recipes.map((recipe, idx) => (
                 <RecipeCard key={idx} recipe={recipe} index={idx} />
               ))}
               
               {/* Premium Gate Card - Modern Bento Style */}
               <div className="group relative overflow-hidden bg-stone-900 rounded-[2rem] p-8 flex flex-col justify-between text-white shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer text-center">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary-600/30 transition-colors"></div>
                  
                  <div className="relative z-10 flex flex-col h-full items-center justify-center">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/10">
                          <Lock className="w-8 h-8 text-accent" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3">{t('demo.more')}</h3>
                      <p className="text-stone-300 text-sm leading-relaxed mb-8 max-w-[200px]">
                        {t('demo.premium')}
                      </p>
                      
                      <Button 
                        onClick={scrollToPricing}
                        variant="secondary" 
                        className="w-full bg-accent text-stone-900 hover:bg-yellow-400 border-none font-bold rounded-xl"
                      >
                        {t('demo.upgrade')}
                      </Button>
                  </div>
               </div>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};
