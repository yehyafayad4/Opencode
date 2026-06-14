export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  healthGoals: string[];
  dietaryPreferences: string[];
  activityLevel: string;
  createdAt: string;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: string; // ISO string
  addedDate: string;
  imageUrl?: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface MealSuggestion {
  id: string;
  title: string;
  imageUrl: string;
  prepTime: number; // minutes
  cookTime: number;
  difficulty: string;
  servings: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
  };
  ingredients: Array<{
    foodId: string;
    quantity: number;
    unit: string;
  }>;
  instructions: string[];
  tags: string[]; // e.g., ['high-protein', 'low-calorie', 'quick']
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetDays: number[]; // [0,2,4] for Mon/Wed/Fri (0 is Sunday)
  streak: number;
  bestStreak: number;
  completedToday: boolean;
  icon: string;
  color: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
}

export interface InsightsData {
  period: 'weekly' | 'monthly';
  nutrition: {
    avgCalories: number;
    macroBreakdown: { protein: number; carbs: number; fat: number };
    trend: 'up' | 'down' | 'stable';
  };
  habits: {
    completionRate: number;
    activeStreaks: number;
  };
  foodWaste: {
    itemsSaved: number;
    co2Saved: number; // kg
    moneySaved: number; // in local currency
  };
}

export interface ConnectedApp {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  lastSynced?: string; // ISO string
}