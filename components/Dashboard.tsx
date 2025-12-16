import React, { useState, useRef } from 'react';
import { Activity, Heart, Utensils, Calendar, Sparkles, ChefHat, Loader2, ThumbsUp, MessageCircle, Save, AlertTriangle, Plus, X, Edit2, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { RecipeCard } from './RecipeCard';
import { Recipe } from '../types';
import { Button } from './Button';
import { generateRecipesFromIngredients } from '../services/geminiService';
import { DownloadAppModal } from './DownloadAppModal';

interface DashboardProps {
  userName?: string;
}

// Extended type for Community Recipe
interface CommunityRecipe extends Recipe {
    authorName: string;
    authorAvatar: string;
    likes: number;
}

// Mock Data for Community Recipes with strict gendered avatars
const communityRecipes: CommunityRecipe[] = [
  {
    name: "Köz Patlıcanlı Ali Nazik",
    description: "Evdeki patlıcanları değerlendirmenin en kral yolu. Yoğurtlu taban üzerine kıymalı sos.",
    cookingTime: "40 dk",
    difficulty: "Orta",
    calories: 520,
    protein: 28,
    carbs: 15,
    fat: 35,
    ingredients: ["Patlıcan", "Kıyma", "Süzme Yoğurt", "Sarımsak", "Tereyağı"],
    steps: [],
    authorName: "Selin Yılmaz",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    likes: 124
  },
  {
    name: "Muzlu Yulaf Lapası",
    description: "Sabahları acele edenler için şekersiz, enerji deposu bir kahvaltı.",
    cookingTime: "10 dk",
    difficulty: "Kolay",
    calories: 280,
    protein: 10,
    carbs: 45,
    fat: 6,
    ingredients: ["Yulaf", "Süt", "Muz", "Tarçın", "Ceviz"],
    steps: [],
    authorName: "Burak Demir",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    likes: 89
  },
  {
    name: "Tavuklu Sezar Salatası",
    description: "Bayat ekmekleri kruton yaparak değerlendirdim, sosu ise tamamen ev yapımı.",
    cookingTime: "20 dk",
    difficulty: "Kolay",
    calories: 380,
    protein: 32,
    carbs: 12,
    fat: 22,
    ingredients: ["Tavuk Göğsü", "Marul", "Bayat Ekmek", "Parmesan", "Zeytinyağı"],
    steps: [],
    authorName: "Zeynep Kaya",
    authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    likes: 215
  },
  {
      name: "Fırında Baharatlı Karnabahar",
      description: "Karnabaharı sevmeyenlere bile yediren o efsane tarif.",
      cookingTime: "35 dk",
      difficulty: "Kolay",
      calories: 150,
      protein: 8,
      carbs: 18,
      fat: 7,
      ingredients: ["Karnabahar", "Zerdeçal", "Kimyon", "Zeytinyağı"],
      steps: [],
      authorName: "Murat Öztürk",
      authorAvatar: "https://randomuser.me/api/portraits/men/86.jpg",
      likes: 56
  }
];

export const Dashboard: React.FC<DashboardProps> = ({ userName = "Kullanıcı" }) => {
  // AI Generator States
  const [showGenerator, setShowGenerator] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [ingredientWarning, setIngredientWarning] = useState<string | null>(null);
  const generatorRef = useRef<HTMLDivElement>(null);

  // Modal State
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Health & Allergy States
  const [allergyInput, setAllergyInput] = useState('');
  const [allergies, setAllergies] = useState<string[]>(['Gluten', 'Fıstık']); 
  
  // Editable Stats State - Height in CM
  const [weight, setWeight] = useState<string>('78.5');
  const [height, setHeight] = useState<string>('182');

  // Dynamic BMI Calculation
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

  // Helper to check for allergy conflict
  const checkAllergyConflict = (ingredient: string): boolean => {
    return allergies.some(allergy => 
        ingredient.toLowerCase().includes(allergy.toLowerCase()) || 
        allergy.toLowerCase().includes(ingredient.toLowerCase())
    );
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIngredientWarning(null);
    const newItemsRaw = inputValue.split(',').map(i => i.trim()).filter(i => i.length > 0);
    
    // Check allergies before adding
    const conflictItem = newItemsRaw.find(item => checkAllergyConflict(item));

    if (conflictItem) {
        setIngredientWarning(`Dikkat! "${conflictItem}" alerji listenizdeki bir maddeyle eşleşiyor.`);
    }

    setIngredients(prev => [...prev, ...newItemsRaw]);
    setInputValue('');
  };

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index));
    setIngredientWarning(null);
  };

  // Allergy Handlers
  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allergyInput.trim()) return;
    if (!allergies.includes(allergyInput.trim())) {
        setAllergies(prev => [...prev, allergyInput.trim()]);
    }
    setAllergyInput('');
  };

  const removeAllergy = (index: number) => {
    setAllergies(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setIngredientWarning(null);
    try {
      // Pass allergies to the AI prompt here
      const data = await generateRecipesFromIngredients(ingredients, allergies);
      setMyRecipes(prev => [...data, ...prev]);
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const toggleGenerator = () => {
      setShowGenerator(!showGenerator);
      if (!showGenerator) {
          setTimeout(() => {
              generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
      }
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">Hoş Geldin, {userName} 👋</h1>
            <p className="text-stone-500">Bugün sağlıklı beslenmek için harika bir gün!</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-stone-600 bg-white px-4 py-2 rounded-xl border border-cream-200 shadow-sm">
            <Calendar className="w-4 h-4 text-primary-600" />
            <span>{new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Health Stats & Actions */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-[2rem] p-6 text-white shadow-xl shadow-primary-900/10 transition-transform hover:scale-[1.01] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                        <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                </div>
                <h3 className="text-xl font-bold mb-2">Şef Modunu Aç</h3>
                <p className="text-primary-100 text-sm mb-6 leading-relaxed opacity-90">Dolabındaki malzemeleri söyle, yapay zeka sana özel menü hazırlasın.</p>
                <button 
                    onClick={toggleGenerator}
                    className="w-full bg-white text-primary-800 py-3.5 rounded-xl font-bold text-sm hover:bg-cream-50 transition-all shadow-lg shadow-black/5 flex items-center justify-center gap-2 active:scale-95"
                >
                    {showGenerator ? 'Modu Kapat' : 'Yeni Tarif Oluştur'}
                </button>
              </div>
            </div>

            {/* Redesigned Health Profile Card - Modernized */}
            <div className="bg-white rounded-[2rem] p-6 shadow-lg shadow-stone-200/40 border border-stone-100 flex flex-col h-auto relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-primary-50 p-2 rounded-xl">
                        <Activity className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg text-stone-800 leading-none">Sağlık Kimliğim</h2>
                        <span className="text-[10px] text-stone-400 font-medium tracking-wide uppercase">Kişisel Veriler</span>
                    </div>
                </div>
                <div className="group cursor-pointer">
                    <div className="p-2 rounded-full hover:bg-stone-50 transition-colors text-stone-400 group-hover:text-primary-600">
                         <Edit2 className="w-4 h-4" />
                    </div>
                </div>
              </div>

              {/* Stats Grid - Modern Clean Inputs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                
                {/* Weight Input */}
                <div className="group relative">
                  <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1 block group-focus-within:text-primary-600 transition-colors">Kilo</label>
                  <div className="flex items-baseline gap-1 border-b-2 border-stone-100 group-focus-within:border-primary-400 transition-colors pb-1">
                    <input 
                        type="number" 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-transparent text-3xl font-black text-stone-800 outline-none p-0 m-0 placeholder-stone-200"
                        step="0.1"
                        min="20"
                        max="300"
                    />
                    <span className="text-sm font-medium text-stone-400 mb-1">kg</span>
                  </div>
                </div>

                {/* Height Input */}
                <div className="group relative">
                   <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider mb-1 block group-focus-within:text-primary-600 transition-colors">Boy</label>
                   <div className="flex items-baseline gap-1 border-b-2 border-stone-100 group-focus-within:border-primary-400 transition-colors pb-1">
                    <input 
                        type="number" 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full bg-transparent text-3xl font-black text-stone-800 outline-none p-0 m-0 placeholder-stone-200"
                        step="1" 
                        min="50"
                        max="250"
                    />
                    <span className="text-sm font-medium text-stone-400 mb-1">cm</span>
                  </div>
                </div>
              </div>
              
              {/* BMI & Goals Row */}
              <div className="flex gap-4 mb-8">
                 {/* BMI Display */}
                 <div className="flex-1 bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-4 rounded-2xl flex flex-col justify-center items-center relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-10 h-10 bg-primary-100 rounded-bl-full opacity-50"></div>
                   <span className="text-primary-600 text-[10px] uppercase font-bold tracking-wider mb-1">VKI İndeksi</span>
                   <div className="text-3xl font-black text-primary-700 tracking-tight">{bmi}</div>
                </div>

                {/* Mini Goal Chart */}
                 <div className="flex-1 bg-stone-50 border border-stone-100 p-4 rounded-2xl flex flex-col justify-center">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-stone-500 uppercase">Kalori</span>
                      <span className="text-[10px] font-bold text-stone-800">65%</span>
                   </div>
                   <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-stone-800 h-full rounded-full w-[65%]"></div>
                   </div>
                   <p className="text-[10px] text-stone-400 mt-2 text-right">1450 kcal</p>
                </div>
              </div>

              {/* Allergies Section - Modernized */}
              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-3">
                     <div className="p-1.5 bg-red-50 rounded-lg">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                     </div>
                     <h4 className="font-bold text-sm text-stone-800">Alerjen Yönetimi</h4>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {allergies.map((allergy, idx) => (
                        <span key={idx} className="group inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-stone-200 text-stone-600 shadow-sm hover:border-red-200 hover:text-red-600 transition-all">
                            {allergy}
                            <button onClick={() => removeAllergy(idx)} className="ml-2 text-stone-300 group-hover:text-red-500 focus:outline-none transition-colors">
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                    {allergies.length === 0 && (
                        <div className="w-full py-2 text-center border border-dashed border-stone-200 rounded-xl">
                            <span className="text-xs text-stone-400">Henüz alerji eklenmedi.</span>
                        </div>
                    )}
                </div>

                <form onSubmit={handleAddAllergy} className="relative group">
                    <input 
                        type="text" 
                        value={allergyInput}
                        onChange={(e) => setAllergyInput(e.target.value)}
                        placeholder="Yeni alerjen ekle..."
                        className="w-full pl-4 pr-10 py-3 bg-stone-50 border border-stone-100 group-hover:border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-100 focus:border-primary-300 outline-none transition-all placeholder:text-stone-400 font-medium text-stone-700"
                    />
                    <button 
                        type="submit"
                        className="absolute right-2 top-2 p-1.5 bg-white text-stone-400 hover:text-primary-600 rounded-lg shadow-sm border border-stone-100 hover:border-primary-200 transition-all disabled:opacity-50 active:scale-95"
                        disabled={!allergyInput.trim()}
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: AI Generator & Community Hub */}
          <div className="lg:col-span-2">
            
            {/* AI Generator Section (Collapsible) */}
            {showGenerator && (
                <div ref={generatorRef} className="mb-8 bg-white rounded-[2rem] border border-primary-100 shadow-xl shadow-primary-900/5 overflow-hidden animate-scale-in">
                    <div className="p-6 bg-gradient-to-r from-primary-50 to-white border-b border-primary-100 flex justify-between items-center">
                        <h2 className="font-bold text-xl text-primary-800 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary-500" />
                            AI Tarif Oluşturucu
                        </h2>
                         {allergies.length > 0 && (
                            <span className="text-xs font-medium text-primary-600 bg-primary-100 px-3 py-1 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Alerji Kontrolü Aktif
                            </span>
                        )}
                    </div>
                    
                    <div className="p-6">
                        {/* Ingredient Warning Alert */}
                        {ingredientWarning && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-fade-in text-sm text-red-700">
                                <AlertOctagon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold block mb-1">Alerji Uyarısı!</span>
                                    {ingredientWarning}
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleAddIngredient} className="relative mb-6">
                            <div className="flex items-center border-2 border-stone-100 rounded-2xl overflow-hidden focus-within:border-primary-400 focus-within:ring-4 focus-within:ring-primary-50 transition-all bg-stone-50 focus-within:bg-white">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Malzeme ekle (örn: Yumurta, Mantar...)"
                                className="flex-1 px-5 py-4 outline-none text-stone-800 placeholder:text-stone-400 bg-transparent font-medium"
                            />
                            <button 
                                type="submit"
                                className="px-8 py-4 bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-800 font-bold transition-colors border-l border-stone-200"
                            >
                                Ekle
                            </button>
                            </div>
                        </form>

                        <div className="flex flex-wrap gap-2 mb-8 min-h-[40px] p-4 bg-stone-50/50 rounded-2xl border border-stone-100 border-dashed">
                            {ingredients.length === 0 && (
                            <span className="text-stone-400 text-sm italic py-1 w-full text-center">Henüz malzeme eklenmedi...</span>
                            )}
                            {ingredients.map((ing, idx) => {
                                const isConflict = checkAllergyConflict(ing);
                                return (
                                    <span key={idx} className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border transition-all shadow-sm
                                        ${isConflict 
                                            ? 'bg-red-50 text-red-700 border-red-200 ring-2 ring-red-100' 
                                            : 'bg-white text-stone-700 border-stone-200'
                                        }`}
                                    >
                                        {isConflict && <AlertTriangle className="w-3 h-3 mr-1.5 text-red-500" />}
                                        {ing}
                                        <button onClick={() => removeIngredient(idx)} className={`ml-2 hover:opacity-100 opacity-60 ${isConflict ? 'text-red-500' : 'text-stone-400 hover:text-red-500'}`}>&times;</button>
                                    </span>
                                );
                            })}
                        </div>

                        <Button 
                            onClick={handleGenerate} 
                            disabled={ingredients.length === 0 || loading}
                            className="w-full py-4 text-lg rounded-2xl shadow-primary-500/20 hover:shadow-primary-500/30 transition-all"
                        >
                            {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : 'Tarifleri Oluştur'}
                        </Button>
                    </div>
                </div>
            )}

            {/* Persisted User Recipes - Always visible if there are recipes */}
            {myRecipes.length > 0 && (
                <div className="mb-10 animate-fade-in-up">
                    <div className="flex items-center gap-2 mb-6 px-1">
                        <div className="p-2 bg-primary-100 rounded-lg">
                            <Save className="w-5 h-5 text-primary-600" />
                        </div>
                        <h3 className="font-bold text-xl text-stone-800">Senin Oluşturdukların</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {myRecipes.map((recipe, idx) => (
                            <RecipeCard key={`my-gen-${idx}`} recipe={recipe} index={idx} />
                        ))}
                    </div>
                    <div className="my-8 border-t border-cream-200"></div>
                </div>
            )}

            {/* Community Hub Section */}
            <div>
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                         <div className="p-2 bg-accent/20 rounded-lg">
                             <Utensils className="w-5 h-5 text-yellow-700" />
                         </div>
                        <h2 className="font-bold text-xl text-stone-800">
                            Arkadaşların Neler Oluşturdu?
                        </h2>
                    </div>
                    <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200 uppercase tracking-wide">Topluluk</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {communityRecipes.map((recipe, index) => {
                        // Generate realistic image for community recipe
                        const encodedName = encodeURIComponent(`professional food photography ${recipe.name}, michelin star plating, high resolution`);
                        const imageUrl = `https://image.pollinations.ai/prompt/${encodedName}?width=600&height=400&nologo=true&seed=${index + 100}`;

                        return (
                            <div key={index} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 overflow-hidden group">
                                {/* Community Header */}
                                <div className="p-4 flex items-center justify-between border-b border-stone-50">
                                    <div className="flex items-center gap-3">
                                        <img src={recipe.authorAvatar} alt={recipe.authorName} className="w-8 h-8 rounded-full ring-2 ring-primary-100" />
                                        <span className="text-sm font-bold text-stone-700">{recipe.authorName}</span>
                                    </div>
                                    <button className="text-stone-400 hover:text-red-500 transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Image Area */}
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={imageUrl} 
                                        alt={recipe.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                    />
                                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {recipe.cookingTime}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-stone-800 mb-2 leading-tight group-hover:text-primary-600 transition-colors">{recipe.name}</h3>
                                    <p className="text-stone-500 text-sm line-clamp-2 mb-4">{recipe.description}</p>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                                        <div className="flex gap-2">
                                            <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-md border border-green-100 font-medium">
                                                {recipe.calories} kcal
                                            </span>
                                             <span className="text-xs px-2 py-1 bg-orange-50 text-orange-700 rounded-md border border-orange-100 font-medium">
                                                {recipe.difficulty}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-stone-400 text-xs font-medium">
                                            <span className="flex items-center gap-1 hover:text-primary-600 cursor-pointer">
                                                <ThumbsUp className="w-4 h-4" /> {recipe.likes}
                                            </span>
                                             <span className="flex items-center gap-1 hover:text-primary-600 cursor-pointer">
                                                <MessageCircle className="w-4 h-4" /> 4
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="mt-8 text-center">
                    <button 
                        onClick={() => setIsDownloadModalOpen(true)}
                        className="px-6 py-2.5 bg-white border border-stone-200 rounded-full text-stone-600 font-medium text-sm hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm"
                    >
                        Daha Fazla Yükle
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <DownloadAppModal 
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
};