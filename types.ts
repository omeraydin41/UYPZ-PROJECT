export interface Ingredient {
  id: string;
  name: string;
}

export interface Recipe {
  name: string;
  description: string;
  cookingTime: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  steps: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}
