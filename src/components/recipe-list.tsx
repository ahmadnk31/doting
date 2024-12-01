'use client'
import { Recipe } from '@/types/recipe'
import { SingleRecipe } from './single-recipe'

interface RecipeListProps {
  recipes: Recipe[];
}

export function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <SingleRecipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

