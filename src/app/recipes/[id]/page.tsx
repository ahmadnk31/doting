'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Recipe } from '@/types/recipe'
import { getRecipe } from '@/services/recipe-services'
import { useCartStore } from '@/store/useCartStore'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from 'lucide-react'

export default function RecipePage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const params = useParams()
  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await getRecipe(Number(params.id))
      setRecipe(recipeData)
    }
    fetchRecipe()
  }, [params.id])

  if (!recipe) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={recipe.image} alt={recipe.name} className="w-full h-auto rounded-lg" />
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>{recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <Button className="mt-4 w-full" onClick={() => addToCart({ id: recipe.id, name: recipe.name, quantity: 1, image: recipe.image, price: 9.99 })}>
            Add to Cart
          </Button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-4">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="mb-2">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
