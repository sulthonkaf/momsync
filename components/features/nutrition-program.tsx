"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Utensils, ShoppingCart } from "lucide-react"

const nutritionAnalysis = {
  folate: { current: 350, recommended: 600, unit: "mcg", status: "low" },
  iron: { current: 18, recommended: 27, unit: "mg", status: "normal" },
  calcium: { current: 800, recommended: 1000, unit: "mg", status: "low" },
  protein: { current: 65, recommended: 71, unit: "g", status: "normal" },
}

const recommendations = [
  {
    id: 1,
    nutrient: "Folate",
    issue: "Low intake detected",
    recommendation: "Add more leafy greens, legumes, and fortified cereals",
    recipes: ["Spinach Salad", "Lentil Soup", "Broccoli Pasta"],
    supplements: ["Folic Acid 400mcg daily"],
  },
  {
    id: 2,
    nutrient: "Calcium",
    issue: "Below recommended levels",
    recommendation: "Increase dairy products or fortified alternatives",
    recipes: ["Yogurt Parfait", "Cheese Omelette", "Milk-based Smoothie"],
    supplements: ["Calcium Citrate 500mg twice daily"],
  },
]

export default function NutritionProgram() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Nutrition Analysis</CardTitle>
          <CardDescription>Based on your health journal and AI analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(nutritionAnalysis).map(([nutrient, data]) => (
              <div key={nutrient} className="p-3 border border-border rounded-lg">
                <p className="text-sm font-medium capitalize">{nutrient}</p>
                <p className="text-lg font-bold mt-1">
                  {data.current}
                  <span className="text-xs text-muted-foreground ml-1">{data.unit}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Target: {data.recommended}
                  {data.unit}
                </p>
                <Badge variant={data.status === "low" ? "destructive" : "default"} className="mt-2 text-xs">
                  {data.status === "low" ? "Low" : "Normal"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {recommendations.map((rec) => (
        <Card key={rec.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              {rec.nutrient}: {rec.issue}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertDescription>{rec.recommendation}</AlertDescription>
            </Alert>

            <div>
              <p className="font-medium text-sm mb-2 flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                Recommended Recipes
              </p>
              <div className="space-y-2">
                {rec.recipes.map((recipe) => (
                  <div key={recipe} className="p-2 bg-muted rounded-lg flex justify-between items-center">
                    <span className="text-sm">{recipe}</span>
                    <Button size="sm" variant="ghost">
                      View Recipe
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium text-sm mb-2">Recommended Supplements</p>
              <div className="space-y-2">
                {rec.supplements.map((supplement) => (
                  <div
                    key={supplement}
                    className="p-2 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center"
                  >
                    <span className="text-sm">{supplement}</span>
                    <Button size="sm" className="gap-1">
                      <ShoppingCart className="h-4 w-4" />
                      Order
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
