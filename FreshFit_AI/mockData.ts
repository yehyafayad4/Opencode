import { User, FoodItem, MealSuggestion, Habit, GroceryItem, InsightsData, ConnectedApp } from './types';

// Mock User
export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  healthGoals: ['weight loss', 'muscle gain', 'better sleep'],
  dietaryPreferences: ['balanced', 'high-protein'],
  activityLevel: 'moderately active',
  createdAt: '2023-01-15T08:30:00Z'
};

// Mock Food Items
export const mockFridgeItems: FoodItem[] = [
  {
    id: 'food-1',
    name: 'Chicken Breast',
    quantity: 2,
    unit: 'pieces',
    category: 'protein',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days
    addedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    nutrition: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6
    }
  },
  {
    id: 'food-2',
    name: 'Broccoli',
    quantity: 1,
    unit: 'head',
    category: 'vegetables',
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days
    addedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    nutrition: {
      calories: 55,
      protein: 4,
      carbs: 11,
      fat: 0.6
    }
  },
  {
    id: 'food-3',
    name: 'Eggs',
    quantity: 12,
    unit: 'count',
    category: 'dairy',
    expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days
    addedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    nutrition: {
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11
    }
  },
  {
    id: 'food-4',
    name: 'Milk',
    quantity: 1,
    unit: 'liter',
    category: 'dairy',
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day (expiring soon)
    addedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    nutrition: {
      calories: 42,
      protein: 3.4,
      carbs: 5,
      fat: 1
    }
  },
  {
    id: 'food-5',
    name: 'Quinoa',
    quantity: 500,
    unit: 'grams',
    category: 'grains',
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
    addedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    nutrition: {
      calories: 368,
      protein: 14,
      carbs: 64,
      fat: 6
    }
  },
  {
    id: 'food-6',
    name: 'Spinach',
    quantity: 200,
    unit: 'grams',
    category: 'vegetables',
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
    addedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    nutrition: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4
    }
  }
];

// Mock Meal Suggestions
export const mockMealSuggestions: MealSuggestion[] = [
  {
    id: 'meal-1',
    title: 'High-Protein Chicken Stir Fry',
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzYyMjZ8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc3RpciUyZnJ5fGVufDB8fHx8MTY4MzYyNjU4OA&ixlib=rb-4.0.3&q=80&w=400',
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    servings: 2,
    nutrition: {
      calories: 420,
      protein: 35,
      carbs: 30,
      fat: 18,
      fiber: 5,
      sugar: 6
    },
    ingredients: [
      { foodId: 'food-1', quantity: 2, unit: 'pieces' },
      { foodId: 'food-2', quantity: 1, unit: 'head' },
      { foodId: 'food-6', quantity: 100, unit: 'grams' }
    ],
    instructions: [
      'Slice chicken breast into strips',
      'Chop broccoli and spinach',
      'Heat oil in pan and cook chicken until browned',
      'Add vegetables and stir-fry for 5 minutes',
      'Season with soy sauce and garlic',
      'Serve hot with quinoa on the side'
    ],
    tags: ['high-protein', 'quick', 'low-carb']
  },
  {
    id: 'meal-2',
    title: 'Egg and Veggie Breakfast Scramble',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzYyMjZ8MHwxfHNlYXJjaHwxfHxlZyUyMHNjcmFtYmxlfGVufDB8fHx8MTY4MzYyNjU4OA&ixlib=rb-4.0.3&q=80&w=400',
    prepTime: 5,
    cookTime: 10,
    difficulty: 'easy',
    servings: 1,
    nutrition: {
      calories: 320,
      protein: 22,
      carbs: 15,
      fat: 18,
      fiber: 4,
      sugar: 3
    },
    ingredients: [
      { foodId: 'food-3', quantity: 3, unit: 'count' },
      { foodId: 'food-2', quantity: 0.5, unit: 'head' },
      { foodId: 'food-6', quantity: 50, unit: 'grams' }
    ],
    instructions: [
      'Whisk eggs in a bowl',
      'Chop broccoli and spinach',
      'Heat pan and sauté vegetables until tender',
      'Pour eggs over vegetables and scramble',
      'Cook until eggs are set',
      'Season with salt and pepper'
    ],
    tags: ['high-protein', 'breakfast', 'low-calorie']
  },
  {
    id: 'meal-3',
    title: 'Quinoa Power Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzYyMjZ8MHwxfHNlYXJjaHwxfHxxdWlub2ElMjBib3d8ZW58MHx8fHwxNjgzNjI2NTg4&ixlib=rb-4.0.3&q=80&w=400',
    prepTime: 5,
    cookTime: 15,
    difficulty: 'medium',
    servings: 2,
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 55,
      fat: 12,
      fiber: 8,
      sugar: 4
    },
    ingredients: [
      { foodId: 'food-5', quantity: 200, unit: 'grams' },
      { foodId: 'food-2', quantity: 0.5, unit: 'head' },
      { foodId: 'food-6', quantity: 100, unit: 'grams' }
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Steam broccoli until tender-crisp',
      'Sauté spinach with garlic until wilted',
      'Combine quinoa, broccoli, and spinach in a bowl',
      'Top with sliced chicken if desired',
      'Drizzle with lemon-tahini dressing'
    ],
    tags: ['vegetarian', 'high-fiber', 'balanced']
  }
];

// Mock Habits
export const mockHabits: Habit[] = [
  {
    id: 'habit-1',
    title: 'Morning Workout',
    description: '30 minutes of exercise to start the day',
    frequency: 'daily',
    targetDays: [1, 2, 3, 4, 5], // Mon-Fri
    streak: 5,
    bestStreak: 12,
    completedToday: true,
    icon: 'dumbbell',
    color: '#0066FF'
  },
  {
    id: 'habit-2',
    title: 'Drink 8 Glasses Water',
    description: 'Stay hydrated throughout the day',
    frequency: 'daily',
    targetDays: [0, 1, 2, 3, 4, 5, 6], // Every day
    streak: 3,
    bestStreak: 7,
    completedToday: false,
    icon: 'water',
    color: '#00C853'
  },
  {
    id: 'habit-3',
    title: 'Meal Prep Sunday',
    description: 'Prepare healthy meals for the week',
    frequency: 'weekly',
    targetDays: [0], // Sunday
    streak: 2,
    bestStreak: 4,
    completedToday: false,
    icon: 'food',
    color: '#FF6B35'
  },
  {
    id: 'habit-4',
    title: 'Mindfulness Meditation',
    description: '10 minutes of daily meditation',
    frequency: 'daily',
    targetDays: [0, 1, 2, 3, 4, 5, 6], // Every day
    streak: 1,
    bestStreak: 3,
    completedToday: true,
    icon: 'mindfulness',
    color: '#9D4EDD'
  }
];

// Mock Grocery Items
export const mockGroceryItems: GroceryItem[] = [
  {
    id: 'grocery-1',
    name: 'Avocados',
    quantity: 3,
    unit: 'pieces',
    category: 'produce',
    checked: false
  },
  {
    id: 'grocery-2',
    name: 'Greek Yogurt',
    quantity: 1,
    unit: 'container',
    category: 'dairy',
    checked: false
  },
  {
    id: 'grocery-3',
    name: 'Almonds',
    quantity: 200,
    unit: 'grams',
    category: 'snacks',
    checked: true
  }
];

// Mock Insights Data
export const mockInsightsData: InsightsData = {
  period: 'weekly',
  nutrition: {
    avgCalories: 2150,
    macroBreakdown: { protein: 30, carbs: 40, fat: 30 },
    trend: 'stable'
  },
  habits: {
    completionRate: 75,
    activeStreaks: 2
  },
  foodWaste: {
    itemsSaved: 12,
    co2Saved: 8.5, // kg
    moneySaved: 45 // dollars
  }
};

// Mock Connected Apps
export const mockConnectedApps: ConnectedApp[] = [
  {
    id: 'apple-health',
    name: 'Apple Health',
    icon: 'apple',
    color: '#000000',
    connected: false,
    lastSynced: undefined
  },
  {
    id: 'google-fit',
    name: 'Google Fit',
    icon: 'fitness-center',
    color: '#4285F4',
    connected: false,
    lastSynced: undefined
  },
  {
    id: 'samsung-health',
    name: 'Samsung Health',
    icon: 'watch',
    color: '#1428A0',
    connected: false,
    lastSynced: undefined
  },
  {
    id: 'whoop',
    name: 'WHOOP',
    icon: 'heart-pulse',
    color: '#AA103A',
    connected: false,
    lastSynced: undefined
  },
  {
    id: 'garmin',
    name: 'Garmin Connect',
    icon: 'navigation',
    color: '#0079BF',
    connected: false,
    lastSynced: undefined
  },
  {
    id: 'zepp',
    name: 'Zepp/Amazfit',
    icon: 'watch',
    color: '#FF6B35',
    connected: false,
    lastSynced: undefined
  },
  {
    id: 'myfitnesspal',
    name: 'MyFitnessPal',
    icon: 'utensils',
    color: '#008000',
    connected: false,
    lastSynced: undefined
  }
];