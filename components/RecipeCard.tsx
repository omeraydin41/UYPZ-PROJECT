import React, { useState } from 'react';
import { Recipe } from '../types';
import { Clock, BarChart2, Flame } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Button } from './Button';
import { useLanguage } from '../context/LanguageContext';
import { RecipeModal } from './RecipeModal';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index }) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = [
    { name: 'Protein', value: recipe.protein, color: '#3eb47e' },
    { name: 'Carbs', value: recipe.carbs, color: '#E9C46A' },
    { name: 'Fat', value: recipe.fat, color: '#F87171' },
  ];

  const encodedName = encodeURIComponent(`delicious food photography ${recipe.name}, restaurant quality, soft lighting`);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedName}?width=600&height=400&nologo=true&seed=${index}`;

  return (
    <>
      <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-cream-200 group">
        <div className="relative h-56 overflow-hidden bg-cream-200">
          <img 
            src={imageUrl}
            alt={recipe.name} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-primary-800 shadow-sm flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary-600" />
            {recipe.cookingTime}
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-xl text-stone-800 leading-tight">{recipe.name}</h3>
          </div>
          
          <div className="flex gap-2 mb-4">
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold border bg-primary-50 text-primary-700 border-primary-100">
                  {recipe.difficulty}
              </span>
          </div>

          <p className="text-sm text-stone-600 mb-6 line-clamp-2 leading-relaxed">{recipe.description}</p>
          
          <div className="mt-auto">
             <div className="flex items-center justify-between mb-5 bg-cream-50 p-4 rounded-2xl border border-cream-100">
               <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Flame className="w-4 h-4 text-orange-400" />
                      <span className="font-bold text-stone-800 text-sm">{recipe.calories} kcal</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                      <BarChart2 className="w-4 h-4 text-primary-500" />
                      <span>{t('ui.macros')}</span>
                  </div>
               </div>
               
               <div className="h-14 w-14 relative">
                 <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                     <Pie
                       data={data}
                       cx="50%"
                       cy="50%"
                       innerRadius={18}
                       outerRadius={26}
                       paddingAngle={3}
                       dataKey="value"
                       stroke="none"
                     >
                       {data.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                     </Pie>
                   </PieChart>
                 </ResponsiveContainer>
               </div>
             </div>

             <div className="mb-4">
               <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">{t('ui.mainIngredients')}</h4>
               <div className="flex flex-wrap gap-1.5">
                 {recipe.ingredients.slice(0, 3).map((ing, i) => (
                   <span key={i} className="text-xs bg-white text-stone-600 px-2.5 py-1.5 rounded-lg border border-stone-100 shadow-sm">
                     {ing}
                   </span>
                 ))}
               </div>
             </div>

             <Button 
                onClick={() => setIsModalOpen(true)}
                variant="outline" 
                size="sm" 
                className="w-full text-xs rounded-xl border-primary-200 hover:border-primary-300 hover:bg-primary-50 text-primary-700"
             >
               {t('ui.viewDetail')}
             </Button>
          </div>
        </div>
      </div>

      <RecipeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        recipe={recipe} 
        imageUrl={imageUrl}
      />
    </>
  );
};