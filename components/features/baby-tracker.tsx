"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle } from "lucide-react"

const milestones = [
  { id: 1, age: "0-3 months", milestone: "Smiling and cooing", status: "upcoming" },
  { id: 2, age: "3-6 months", milestone: "Rolling over", status: "upcoming" },
  { id: 3, age: "6-9 months", milestone: "Sitting up", status: "upcoming" },
  { id: 4, age: "9-12 months", milestone: "Crawling", status: "upcoming" },
]

export default function BabyTracker() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Baby Development Tracker</CardTitle>
          <CardDescription>Monitor your baby's growth and milestones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {milestones.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
              {item.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-medium">{item.milestone}</p>
                <p className="text-sm text-muted-foreground">{item.age}</p>
              </div>
              <Button variant="outline" size="sm">
                Log
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Baby Schedule</CardTitle>
          <CardDescription>Track feeding, sleep, and diaper changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-sm">Last Feeding: 2 hours ago</p>
              <p className="text-xs text-muted-foreground">Breast milk - 20 minutes</p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="font-medium text-sm">Last Sleep: 4 hours ago</p>
              <p className="text-xs text-muted-foreground">Duration: 1.5 hours</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-medium text-sm">Last Diaper Change: 1 hour ago</p>
              <p className="text-xs text-muted-foreground">Type: Wet</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
