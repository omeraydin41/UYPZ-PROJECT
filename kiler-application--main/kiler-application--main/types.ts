
export interface UserPreferences {
  diseases: string[];
  allergies: string[];
  dailyCalorieGoal: number;
}

export interface Recipe {
  name: string;
  summary: string;
  prepTime: string;
  healthStats: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sugar: string;
    sodium: string;
    vitamins: string[];
    healthScore: number; // 1-10 scale
    glycemicIndex: 'Düşük' | 'Orta' | 'Yüksek';
    comment: string;
  };
  detailedIngredients: string[];
  instructions: string[];
  warnings: string[]; // Alerjen veya sağlık uyarıları
  cost?: string;
  costReason?: string;
}

export type PlanType = 'Standart' | 'Şef' | 'Aile';

export interface UserAccount {
  fullName: string;
  email: string;
  username: string;
  password: string; 
  planType: PlanType;
  joinDate: string;
  preferences?: UserPreferences;
  height?: number; // cm
  weight?: number; // kg
  savedRecipes?: Recipe[];
}

export type AppView = 'login' | 'dashboard' | 'ingredient-search' | 'budget-search';

export enum FoodStyle {
  HOME = 'Ev yemeği',
  FIT = 'Fit / Diyet',
  VEGAN = 'Vegan / Vejetaryen',
  PRACTICAL = 'Pratik / Hızlı',
  STUDENT = 'Öğrenci dostu',
  TRADITIONAL = 'Geleneksel Türk mutfağı',
  WORLD = 'Dünya mutfağı'
}
