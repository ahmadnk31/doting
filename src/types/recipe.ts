export type DifficultyLevel = "Easy" | "Medium" | "Hard";
export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Dessert";

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: DifficultyLevel;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: MealType[];
  price: number;
}

export interface RecipeResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}
