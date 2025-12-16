import React, { useState, useRef } from 'react';
import { generateRecipesFromIngredients } from '../services/geminiService';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';
import { Button } from './Button';
import { Search, Loader2, Lock } from 'lucide-react';

export const DemoSection: React.FC = () => {
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
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Şef Sensin, Asistanın Yapay Zekâ</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Dolabındaki malzemeleri aşağıya ekle. Yapay zekâmız saniyeler içinde sana özel tarifler oluştursun.
            <span className="block mt-2 text-sm text-primary-600 font-bold">Bu bir demo sürümüdür.</span>
          </p>
        </div>

        {/* Interaction Area */}
        <div className="max-w-3xl mx-auto bg-cream-50 rounded-3xl shadow-xl shadow-stone-200/50 border border-white p-6 md:p-8 relative z-20">
          <form onSubmit={handleAddIngredient} className="relative mb-6">
            <div className="flex items-center border-2 border-cream-200 rounded-2xl overflow-hidden focus-within:border-primary-400 focus-within:ring-4 focus-within:ring-primary-100 transition-all bg-white">
              <input
                id="recipe-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Örn: Yumurta, Domates, Soğan..."
                className="flex-1 px-4 py-4 outline-none text-stone-800 placeholder:text-stone-400 bg-transparent"
              />
              <button 
                type="submit"
                className="px-6 py-4 bg-cream-100 text-stone-600 hover:bg-cream-200 font-semibold transition-colors border-l border-cream-200"
              >
                Ekle
              </button>
            </div>
          </form>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8 min-h-[40px]">
            {ingredients.length === 0 && (
              <span className="text-stone-400 text-sm italic py-1">Henüz malzeme eklenmedi...</span>
            )}
            {ingredients.map((ing, idx) => (
              <span key={idx} className="inline-flex items-center bg-white text-primary-700 px-3 py-1.5 rounded-full text-sm font-medium border border-primary-200 shadow-sm animate-fade-in">
                {ing}
                <button 
                  onClick={() => removeIngredient(idx)}
                  className="ml-2 hover:text-red-500 focus:outline-none transition-colors"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={ingredients.length === 0 || loading}
            className="w-full rounded-2xl shadow-primary-500/20" 
            size="lg"
          >
            {loading ? 'Tarifler Hazırlanıyor...' : 'Tarifleri Göster'}
            {!loading && <Search className="ml-2 w-5 h-5" />}
          </Button>
        </div>

        {/* Results Area */}
        {loading && (
           <div className="mt-16 flex flex-col items-center justify-center text-stone-400 animate-pulse">
             <Loader2 className="w-12 h-12 animate-spin text-primary-500 mb-4" />
             <p>Yapay zekâ malzemelerini analiz ediyor...</p>
           </div>
        )}

        {recipes && (
          <div ref={resultsRef} className="mt-20">
             <h3 className="text-2xl font-bold text-stone-900 mb-8 text-center">Senin İçin Seçtiklerimiz</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {recipes.map((recipe, idx) => (
                 <RecipeCard key={idx} recipe={recipe} index={idx} />
               ))}
               
               {/* Premium Gate Card */}
               <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl shadow-xl overflow-hidden flex flex-col text-center p-6 text-white relative group cursor-pointer hover:shadow-2xl transition-all">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-accent"></div>
                  <div className="mb-6 mt-4 flex justify-center">
                    <div className="p-4 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <Lock className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Daha Fazla Tarif?</h3>
                  <p className="text-stone-300 text-sm mb-6">
                    Premium üyeler her aramada 10+ tarif, kalori takibi ve alışveriş listesi özelliklerine erişir.
                  </p>
                  <Button variant="primary" className="mt-auto w-full bg-accent text-stone-900 hover:bg-yellow-400 border-none">
                    Premium'a Geç
                  </Button>
               </div>
             </div>
          </div>
        )}
      </div>
    </section>
  );
};