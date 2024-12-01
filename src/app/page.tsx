'use client'

import { useEffect, useState } from 'react'
import { Recipe } from '@/types/recipe'
import { SingleRecipe } from '@/components/single-recipe'
import { Cart } from '@/components/cart'
import { getRecipes, searchRecipes, getRecipesByTag, getRecipesByMealType, getRecipeTags } from '@/services/recipe-services'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useInView } from 'react-intersection-observer'

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [selectedMealType, setSelectedMealType] = useState('')
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()
  const [key, setKey] = useState(0)

  const fetchRecipes = async () => {
    let newRecipes
    if (searchQuery) {
      newRecipes = await searchRecipes(searchQuery)
    } else if (selectedTag) {
      newRecipes = await getRecipesByTag(selectedTag)
    } else if (selectedMealType) {
      newRecipes = await getRecipesByMealType(selectedMealType)
    } else {
      newRecipes = await getRecipes(10, page * 10)
    }
    
    if (newRecipes.recipes.length === 0) {
      setHasMore(false)
    } else {
      setRecipes(prevRecipes => [...prevRecipes, ...newRecipes.recipes])
      setPage(prevPage => prevPage + 1)
      const randomKey = Math.random()
      setKey(randomKey)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [searchQuery, selectedTag, selectedMealType])

  useEffect(() => {
    if (inView && hasMore) {
      fetchRecipes()
    }
  }, [inView])

    

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setRecipes([])
    setPage(0)
    setHasMore(true)
    fetchRecipes()
  }

  const handleTagChange = (value: string) => {
    setSelectedTag(value)
    setSelectedMealType('')
    setSearchQuery('')
    setRecipes([])
    setPage(0)
    setHasMore(true)
  }

  const handleMealTypeChange = (value: string) => {
    setSelectedMealType(value)
    setSelectedTag('')
    setSearchQuery('')
    setRecipes([])
    setPage(0)
    setHasMore(true)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Cart />
      <main className="container mx-auto py-8">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <Input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
        <div className="mb-8 flex gap-4">
          {
            recipes.length > 0 && (
                <>
                <Select onValueChange={handleTagChange} defaultValue={selectedTag}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all tags">All Tags</SelectItem>
              <SelectItem value="Italian">Italian</SelectItem>
              <SelectItem value="Mexican">Mexican</SelectItem>
              <SelectItem value="Asian">Asian</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleMealTypeChange} defaultValue={selectedMealType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Meal Types</SelectItem>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
            </SelectContent>
          </Select>
                </>
            )
          }
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe,index) => (
            <SingleRecipe key={key*index} recipe={recipe} />
          ))}
        </div>
        {hasMore && (
          <div ref={ref} className="flex justify-center mt-8">
            <Button variant="outline">Loading more...</Button>
          </div>
        )}
      </main>
    </div>
  )
}

