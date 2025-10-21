"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, AlertCircle, Utensils, TrendingUp, CheckCircle } from "lucide-react"

export default function StuntingEducation() {
  const educationModules = [
    {
      id: 1,
      title: "What is Stunting?",
      description: "Understanding stunting, its causes, and long-term effects on child development",
      duration: "5 min read",
      icon: AlertCircle,
    },
    {
      id: 2,
      title: "Prevention During Pregnancy",
      description: "Nutrition and health practices to prevent stunting before birth",
      duration: "8 min read",
      icon: BookOpen,
    },
    {
      id: 3,
      title: "Nutrition for Growth",
      description: "Essential nutrients and foods for healthy child development",
      duration: "10 min read",
      icon: Utensils,
    },
    {
      id: 4,
      title: "Growth Monitoring",
      description: "How to track your child's growth and identify early warning signs",
      duration: "7 min read",
      icon: TrendingUp,
    },
  ]

  const warningSignsData = [
    { age: "0-6 months", signs: "Not gaining weight, poor feeding, lethargy" },
    { age: "6-12 months", signs: "Slow growth, delayed milestones, frequent infections" },
    { age: "1-2 years", signs: "Height below normal, thin appearance, developmental delays" },
    { age: "2-3 years", signs: "Short stature, poor appetite, behavioral issues" },
  ]

  const nutritionTips = [
    { category: "Protein", items: ["Eggs", "Fish", "Chicken", "Legumes", "Dairy"] },
    { category: "Vegetables", items: ["Leafy greens", "Orange vegetables", "Tomatoes", "Broccoli"] },
    { category: "Fruits", items: ["Bananas", "Oranges", "Papayas", "Avocados"] },
    { category: "Grains", items: ["Brown rice", "Whole wheat", "Oats", "Fortified cereals"] },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Stunting Prevention Education
        </h2>
        <p className="text-muted-foreground mt-2">
          Learn about stunting prevention, nutrition, and healthy child development
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="modules" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="warning-signs">Warning Signs</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition Guide</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Learning Modules */}
        <TabsContent value="modules" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationModules.map((module) => {
              const Icon = module.icon
              return (
                <Card key={module.id} className="hover:shadow-md transition">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">{module.duration}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                    <Button className="w-full">Start Learning</Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Warning Signs */}
        <TabsContent value="warning-signs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Early Warning Signs by Age
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {warningSignsData.map((item, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="font-semibold text-primary mb-2">{item.age}</div>
                    <p className="text-sm text-muted-foreground">{item.signs}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-semibold text-orange-900">
                  If you notice any of these signs, consult a healthcare provider immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nutrition Guide */}
        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Essential Foods for Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nutritionTips.map((group, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="font-semibold text-primary mb-3">{group.category}</div>
                    <div className="space-y-2">
                      {group.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-semibold text-primary">
                  Tip: Provide a variety of foods from all groups daily for optimal nutrition.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                Download Stunting Prevention Guide (PDF)
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                Watch: Nutrition for Healthy Growth (Video)
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                Growth Chart Reference (Printable)
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                Contact a Nutritionist
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                Join Community Support Group
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
