import React from 'react';
import { Recipe } from '../types';
import { Clock, BarChart2, Flame } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from './Button';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index }) => {
  const data = [
    { name: 'Protein', value: recipe.protein, color: '#3eb47e' }, // Primary Green
    { name: 'Karbonhidrat', value: recipe.carbs, color: '#E9C46A' }, // Accent Yellow
    { name: 'Yağ', value: recipe.fat, color: '#F87171' }, // Soft Red
  ];

  // Use a prompt-based image generator for more relevant results
  const encodedName = encodeURIComponent(`delicious food photography ${recipe.name}, restaurant quality, soft lighting`);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedName}?width=600&height=400&nologo=true&seed=${index}`;

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-cream-200 group">
      <div className="relative h-56 overflow-hidden bg-cream-200">
        <img 
          src={imageUrl}
          alt={recipe.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // Fallback if AI image fails
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${index}/600/400`;
          }}
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
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                recipe.difficulty === 'Kolay' ? 'bg-green-50 text-green-700 border-green-100' :
                recipe.difficulty === 'Orta' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                'bg-red-50 text-red-700 border-red-100'
            }`}>
                {recipe.difficulty}
            </span>
        </div>

        <p className="text-sm text-stone-600 mb-6 line-clamp-2 leading-relaxed">{recipe.description}</p>
        
        <div className="mt-auto">
           {/* Nutrition Mini Chart - Redesigned */}
           <div className="flex items-center justify-between mb-5 bg-cream-50 p-4 rounded-2xl border border-cream-100">
             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="font-bold text-stone-800 text-sm">{recipe.calories} kcal</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                    <BarChart2 className="w-4 h-4 text-primary-500" />
                    <span>Makrolar</span>
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
                   <Tooltip 
                      formatter={(value: number, name: string) => [`${value}g`, name]}
                      contentStyle={{ fontSize: '10px', padding: '4px', borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   />
                 </PieChart>
               </ResponsiveContainer>
             </div>
           </div>

           <div className="mb-4">
             <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Ana Malzemeler</h4>
             <div className="flex flex-wrap gap-1.5">
               {recipe.ingredients.slice(0, 3).map((ing, i) => (
                 <span key={i} className="text-xs bg-white text-stone-600 px-2.5 py-1.5 rounded-lg border border-stone-100 shadow-sm">
                   {ing}
                 </span>
               ))}
               {recipe.ingredients.length > 3 && (
                 <span className="text-xs text-stone-400 px-1 py-1">+{recipe.ingredients.length - 3}</span>
               )}
             </div>
           </div>

           <Button variant="outline" size="sm" className="w-full text-xs rounded-xl border-primary-200 hover:border-primary-300 hover:bg-primary-50 text-primary-700">
             Tarifi Detaylı Gör
           </Button>
        </div>
      </div>
    </div>
  );
};