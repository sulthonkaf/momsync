"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Utensils, Plus, Edit2, Trash2, Download } from "lucide-react"
import { useState } from "react"

interface InterventionPlan {
  id: string
  patientName: string
  age: number
  status: "normal" | "at-risk" | "stunted"
  mealPlans: number
  interventionDays: number
  progress: number
  lastUpdated: string
}

interface MealPlan {
  id: string
  date: string
  meals: {
    breakfast: string
    lunch: string
    dinner: string
    snacks: string
  }
  calories: number
  protein: number
  notes: string
}

export default function StuntingManagement() {
  const [interventions, setInterventions] = useState<InterventionPlan[]>([
    {
      id: "1",
      patientName: "Bayi Budi",
      age: 24,
      status: "at-risk",
      mealPlans: 3,
      interventionDays: 45,
      progress: 65,
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      patientName: "Bayi Citra",
      age: 30,
      status: "stunted",
      mealPlans: 5,
      interventionDays: 90,
      progress: 42,
      lastUpdated: "2024-01-14",
    },
  ])

  const [mealPlans, setMealPlans] = useState<MealPlan[]>([
    {
      id: "1",
      date: "2024-01-15",
      meals: {
        breakfast: "Fortified porridge with eggs and milk",
        lunch: "Chicken with vegetables and rice",
        dinner: "Fish with sweet potato and greens",
        snacks: "Peanut butter with banana",
      },
      calories: 1800,
      protein: 65,
      notes: "High protein diet for growth recovery",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-50 border-green-200"
      case "at-risk":
        return "bg-yellow-50 border-yellow-200"
      case "stunted":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-600">Normal</Badge>
      case "at-risk":
        return <Badge className="bg-yellow-600">At Risk</Badge>
      case "stunted":
        return <Badge className="bg-red-600">Stunted</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Interventions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{interventions.length}</p>
            <p className="text-xs text-muted-foreground">Patients under management</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Meal Plans Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{interventions.reduce((sum, i) => sum + i.mealPlans, 0)}</p>
            <p className="text-xs text-muted-foreground">Total plans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Math.round(interventions.reduce((sum, i) => sum + i.progress, 0) / interventions.length)}%
            </p>
            <p className="text-xs text-muted-foreground">Intervention success</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stunted Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {interventions.filter((i) => i.status === "stunted").length}
            </p>
            <p className="text-xs text-muted-foreground">Require intensive care</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="interventions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        {/* Interventions Tab */}
        <TabsContent value="interventions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Stunting Intervention Plans</h3>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Intervention
            </Button>
          </div>

          <div className="space-y-4">
            {interventions.map((intervention) => (
              <Card key={intervention.id} className={`border ${getStatusColor(intervention.status)}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{intervention.patientName}</CardTitle>
                      <CardDescription>Age: {intervention.age} months</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(intervention.status)}
                      <Button size="sm" variant="ghost">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Meal Plans</p>
                      <p className="text-2xl font-bold">{intervention.mealPlans}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Days in Program</p>
                      <p className="text-2xl font-bold">{intervention.interventionDays}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Updated</p>
                      <p className="text-sm font-medium">{intervention.lastUpdated}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium">Intervention Progress</p>
                      <span className="text-sm font-semibold">{intervention.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${intervention.progress}%` }}
                      />
                    </div>
                  </div>

                  {intervention.status !== "normal" && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertTriangle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        {intervention.status === "stunted"
                          ? "Intensive nutritional intervention required. Schedule follow-up within 2 weeks."
                          : "Monitor closely. Implement preventive meal plans to avoid progression."}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Create Meal Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Meal Plans Tab */}
        <TabsContent value="meal-plans" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Nutritional Meal Plans</h3>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Meal Plan
            </Button>
          </div>

          <div className="space-y-4">
            {mealPlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        Meal Plan - {plan.date}
                      </CardTitle>
                      <CardDescription>Customized nutrition intervention</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-semibold mb-2">Breakfast</p>
                      <p className="text-sm text-muted-foreground">{plan.meals.breakfast}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-semibold mb-2">Lunch</p>
                      <p className="text-sm text-muted-foreground">{plan.meals.lunch}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-semibold mb-2">Dinner</p>
                      <p className="text-sm text-muted-foreground">{plan.meals.dinner}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-semibold mb-2">Snacks</p>
                      <p className="text-sm text-muted-foreground">{plan.meals.snacks}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-3 bg-accent/10 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Daily Calories</p>
                      <p className="text-lg font-bold">{plan.calories}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Protein (g)</p>
                      <p className="text-lg font-bold">{plan.protein}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                  </div>

                  {plan.notes && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Notes</p>
                      <p className="text-sm text-blue-800">{plan.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Guidelines Tab */}
        <TabsContent value="guidelines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Stunting Management Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Nutritional Requirements</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Protein: 1.5-2g per kg body weight daily</li>
                    <li>• Calories: 100-120 kcal per kg body weight</li>
                    <li>• Micronutrients: Iron, zinc, vitamin A, B12</li>
                    <li>• Calcium: 500-600mg daily for bone development</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Recommended Foods</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Protein sources: Eggs, fish, chicken, legumes, nuts</li>
                    <li>• Fortified cereals and grains</li>
                    <li>• Dairy products: Milk, yogurt, cheese</li>
                    <li>• Fruits and vegetables: Orange, green, and red varieties</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Monitoring Schedule</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Weekly: Weight and height measurements</li>
                    <li>• Bi-weekly: Dietary compliance assessment</li>
                    <li>• Monthly: Growth velocity analysis</li>
                    <li>• Quarterly: Comprehensive nutritional assessment</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg bg-accent/5">
                  <h4 className="font-semibold mb-2">Red Flags for Referral</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• No weight gain after 4 weeks of intervention</li>
                    <li>• Persistent diarrhea or malabsorption</li>
                    <li>• Signs of micronutrient deficiency</li>
                    <li>• Developmental delays or behavioral changes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
