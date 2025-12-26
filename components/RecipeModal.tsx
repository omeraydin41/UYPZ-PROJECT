import React from 'react';
import { X, Clock, Flame, BarChart2, ChefHat, CheckCircle2, ListChecks, Info } from 'lucide-react';
import { Recipe } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
  imageUrl: string;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, recipe, imageUrl }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in flex flex-col md:flex-row border border-white/20">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-stone-800 shadow-md transition-all border border-stone-100 hover:scale-110 active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Sidebar */}
        <div className="w-full md:w-1/3 h-64 md:h-auto relative bg-cream-100">
            <img 
                src={imageUrl} 
                alt={recipe.name} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10" />
            
            <div className="absolute bottom-6 left-6 text-white md:hidden">
                <h3 className="text-2xl font-bold leading-tight drop-shadow-lg">{recipe.name}</h3>
            </div>
        </div>

        {/* Right: Content Area */}
        <div className="w-full md:w-2/3 overflow-y-auto bg-white">
            <div className="p-8 md:p-12">
                {/* Header */}
                <div className="hidden md:block mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <ChefHat className="w-5 h-5 text-primary-600" />
                        <span className="text-primary-600 font-bold text-xs uppercase tracking-widest">{t('demo.resultsTitle')}</span>
                    </div>
                    <h2 className="text-3xl font-black text-stone-900 leading-tight">
                        {recipe.name}
                    </h2>
                </div>

                <p className="text-stone-500 italic mb-8 leading-relaxed border-l-4 border-primary-200 pl-4 bg-stone-50 py-3 rounded-r-xl">
                    "{recipe.description}"
                </p>

                {/* Quick Info Bar */}
                <div className="grid grid-cols-3 gap-4 mb-10 pb-8 border-b border-stone-100">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1.5 text-stone-400 mb-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{t('nav.howItWorks')}</span>
                        </div>
                        <span className="font-bold text-stone-800">{recipe.cookingTime}</span>
                    </div>
                    <div className="text-center border-x border-stone-100">
                        <div className="flex items-center justify-center gap-1.5 text-stone-400 mb-1">
                            <Flame className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{t('dashboard.calories')}</span>
                        </div>
                        <span className="font-bold text-stone-800">{recipe.calories} kcal</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1.5 text-stone-400 mb-1">
                            <BarChart2 className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{recipe.difficulty}</span>
                        </div>
                        <span className="font-bold text-stone-800">{t('pricing.free')}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Ingredients */}
                    <div>
                        <h4 className="flex items-center gap-2 text-stone-900 font-bold mb-5">
                            <ListChecks className="w-5 h-5 text-primary-600" />
                            {t('ui.allIngredients')}
                        </h4>
                        <ul className="space-y-3">
                            {recipe.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-start gap-3 text-stone-600 text-sm bg-stone-50 p-3 rounded-xl border border-stone-100 hover:border-primary-100 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 flex-shrink-0" />
                                    {ing}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Macro Breakdown */}
                    <div>
                        <h4 className="flex items-center gap-2 text-stone-900 font-bold mb-5">
                            <Info className="w-5 h-5 text-primary-600" />
                            {t('ui.macros')}
                        </h4>
                        <div className="space-y-4 bg-stone-50 p-6 rounded-[2rem] border border-stone-100">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-stone-500">Protein</span>
                                <span className="font-bold text-stone-800 bg-white px-3 py-1 rounded-lg border border-stone-200">{recipe.protein}g</span>
                            </div>
                            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-primary-500 h-full rounded-full" style={{ width: '40%' }}></div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-stone-500">Carbs</span>
                                <span className="font-bold text-stone-800 bg-white px-3 py-1 rounded-lg border border-stone-200">{recipe.carbs}g</span>
                            </div>
                            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-accent h-full rounded-full" style={{ width: '35%' }}></div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-stone-500">Fat</span>
                                <span className="font-bold text-stone-800 bg-white px-3 py-1 rounded-lg border border-stone-200">{recipe.fat}g</span>
                            </div>
                            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-400 h-full rounded-full" style={{ width: '25%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preparation Steps */}
                <div className="mt-12 pt-10 border-t border-stone-100">
                    <h4 className="flex items-center gap-2 text-stone-900 font-extrabold text-xl mb-8">
                        <CheckCircle2 className="w-6 h-6 text-primary-600" />
                        {t('ui.preparation')}
                    </h4>
                    <div className="space-y-8">
                        {recipe.steps.map((step, i) => (
                            <div key={i} className="flex gap-5 group">
                                <div className="flex-shrink-0 w-10 h-10 bg-primary-50 text-primary-700 font-black rounded-xl border border-primary-100 flex items-center justify-center shadow-sm group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                                    {i + 1}
                                </div>
                                <div className="pt-1.5">
                                    <p className="text-stone-600 text-sm md:text-base leading-relaxed group-hover:text-stone-900 transition-colors">
                                        {step}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 p-6 bg-primary-50 rounded-[2rem] border border-primary-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-primary-600 shadow-sm">
                            <Flame className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-primary-400">Özet</span>
                            <span className="font-bold text-primary-900 text-sm">Şimdiden afiyet olsun!</span>
                        </div>
                    </div>
                    <button 
                      onClick={onClose}
                      className="px-6 py-2 bg-white text-primary-700 font-bold text-sm rounded-xl border border-primary-100 hover:bg-primary-100 transition-all active:scale-95"
                    >
                        Anladım
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};