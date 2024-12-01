import { Recipe, RecipeResponse } from '../types/recipe'

const BASE_URL = 'https://dummyjson.com/recipes'

export async function getRecipes(limit = 10, skip = 0): Promise<RecipeResponse> {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`)
  return await response.json()
}

export async function getRecipe(id: number): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/${id}`)
  return await response.json()
}
export async function getRecipeTags(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/tags`)
    return await response.json()
    }
export async function searchRecipes(query: string): Promise<RecipeResponse> {
  const response = await fetch(`${BASE_URL}/search?q=${query}`)
  return await response.json()
}

export async function getRecipesByTag(tag: string): Promise<RecipeResponse> {
  const response = await fetch(`${BASE_URL}/tag/${tag}`)
  return await response.json()
}

export async function getRecipesByMealType(mealType: string): Promise<RecipeResponse> {
  const response = await fetch(`${BASE_URL}/meal-type/${mealType}`)
  return await response.json()
}
