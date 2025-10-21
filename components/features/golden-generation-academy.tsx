"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { Play, Lock } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Nutrition for Healthy Pregnancy",
    phase: "Pregnancy",
    duration: "4 weeks",
    lessons: 12,
    completed: 8,
    status: "In Progress",
    topics: ["Macronutrients", "Micronutrients", "Meal Planning", "Supplements"],
  },
  {
    id: 2,
    title: "Breastfeeding Essentials",
    phase: "Postpartum",
    duration: "3 weeks",
    lessons: 10,
    completed: 0,
    status: "Locked",
    topics: ["Latch Techniques", "Supply Management", "Common Issues", "Nutrition"],
  },
  {
    id: 3,
    title: "Baby Development Milestones",
    phase: "0-12 Months",
    duration: "12 weeks",
    lessons: 24,
    completed: 0,
    status: "Locked",
    topics: ["Motor Skills", "Cognitive Development", "Social-Emotional", "Language"],
  },
  {
    id: 4,
    title: "Stunting Prevention Guide",
    phase: "0-24 Months",
    duration: "8 weeks",
    lessons: 16,
    completed: 0,
    status: "Locked",
    topics: ["Nutrition", "Growth Monitoring", "Early Intervention", "Family Support"],
  },
]

export default function GoldenGenerationAcademy() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>1000 Days Golden Generation Academy</CardTitle>
          <CardDescription>Comprehensive education for healthy pregnancy and child development</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedCourse === course.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-muted-foreground">{course.phase}</p>
                  </div>
                  {course.status === "In Progress" && <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>}
                  {course.status === "Locked" && (
                    <Badge variant="secondary">
                      <Lock className="h-3 w-3 mr-1" />
                      Locked
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {course.completed}/{course.lessons}
                    </span>
                  </div>
                  <Progress value={(course.completed / course.lessons) * 100} />
                </div>

                <div className="text-sm text-muted-foreground mb-3">
                  <p>
                    {course.duration} • {course.lessons} lessons
                  </p>
                </div>

                {selectedCourse === course.id && (
                  <div className="space-y-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-sm font-medium mb-2">Topics Covered:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full" disabled={course.status === "Locked"}>
                      <Play className="h-4 w-4 mr-2" />
                      {course.status === "In Progress" ? "Continue Learning" : "Start Course"}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
