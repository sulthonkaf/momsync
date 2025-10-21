"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search, Clock, Users } from "lucide-react"

const recipes = [
  {
    id: 1,
    name: "Spinach and Feta Omelette",
    category: "Breakfast",
    prepTime: "15 min",
    servings: 2,
    calories: 280,
    nutrients: ["Folate", "Iron", "Protein"],
    ingredients: ["Eggs", "Spinach", "Feta Cheese", "Olive Oil"],
  },
  {
    id: 2,
    name: "Lentil and Vegetable Soup",
    category: "Lunch",
    prepTime: "30 min",
    servings: 4,
    calories: 220,
    nutrients: ["Folate", "Iron", "Fiber"],
    ingredients: ["Red Lentils", "Carrots", "Celery", "Onion", "Vegetable Broth"],
  },
  {
    id: 3,
    name: "Salmon with Broccoli",
    category: "Dinner",
    prepTime: "25 min",
    servings: 2,
    calories: 380,
    nutrients: ["Omega-3", "Calcium", "Protein"],
    ingredients: ["Salmon Fillet", "Broccoli", "Lemon", "Olive Oil"],
  },
  {
    id: 4,
    name: "Greek Yogurt Parfait",
    category: "Snack",
    prepTime: "5 min",
    servings: 1,
    calories: 180,
    nutrients: ["Calcium", "Protein", "Probiotics"],
    ingredients: ["Greek Yogurt", "Berries", "Granola", "Honey"],
  },
]

export default function RecipeLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snack"]

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Healthy Recipe Library</CardTitle>
        <CardDescription>Curated recipes for optimal maternal and child nutrition</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory !== cat ? "bg-transparent" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">{recipe.name}</p>
                  <p className="text-sm text-muted-foreground">{recipe.category}</p>
                </div>
                <Badge variant="outline">{recipe.calories} cal</Badge>
              </div>

              <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {recipe.prepTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {recipe.servings} servings
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs font-medium mb-1">Key Nutrients:</p>
                <div className="flex flex-wrap gap-1">
                  {recipe.nutrients.map((nutrient) => (
                    <Badge key={nutrient} variant="secondary" className="text-xs">
                      {nutrient}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full">View Full Recipe</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
