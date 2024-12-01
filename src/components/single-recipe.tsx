'use client'
import { Recipe } from '../types/recipe'
import { useCartStore } from '../store/useCartStore'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star } from 'lucide-react'
import Link from 'next/link'
import { useToast } from "@/hooks/use-toast"
import { useEffect } from 'react'


interface SingleRecipeProps {
  recipe: Recipe;
}

export function SingleRecipe({ recipe }: SingleRecipeProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const {toast} = useToast()
 
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
        <CardDescription>{recipe.cuisine} cuisine</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={`/recipes/${recipe.id}`}>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img src={recipe.image} alt={recipe.name} className="object-cover w-full h-full" />
          </div>
        </Link>
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
          {recipe.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Badge>{recipe.difficulty}</Badge>
          <span className="ml-2">{recipe.caloriesPerServing} cal/serving</span>
        </div>
        <Button onClick={() => {
          addToCart({ id: recipe.id, name: recipe.name, quantity: 1, image: recipe.image, price: 9.99 })
          toast({
            title:'Added to cart',
            description: `${recipe.name} has been added to your cart`,
          })
          }}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
