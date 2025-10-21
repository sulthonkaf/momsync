"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Heart, AlertCircle } from "lucide-react"

export default function PartnerMode() {
  return (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Partner Mode allows your partner or family member to stay informed and involved in your pregnancy journey.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Partner Dashboard</CardTitle>
          <CardDescription>Stay connected and informed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-semibold text-sm mb-2">Next Appointment</p>
              <div className="flex items-center gap-2 text-sm mb-2">
                <Calendar className="h-4 w-4" />
                <span>October 20, 2024 at 2:00 PM</span>
              </div>
              <p className="text-xs text-muted-foreground">Prenatal Checkup with Dr. Emily Chen</p>
              <Button size="sm" className="mt-3 w-full">
                Add to Calendar
              </Button>
            </div>

            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Partner's Role
              </p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>✓ View health updates</li>
                <li>✓ Receive appointment reminders</li>
                <li>✓ Access educational content</li>
                <li>✓ Manage shopping list</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-sm">Recent Health Updates</p>
            <div className="space-y-2">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium">Vital Signs Normal</p>
                <p className="text-xs text-muted-foreground mt-1">All vital signs are within normal ranges</p>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium">Folate Intake Low</p>
                <p className="text-xs text-muted-foreground mt-1">Consider adding more leafy greens to meals</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-sm">Shared Tasks</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm flex-1">Buy prenatal vitamins</span>
                <Badge variant="outline">Today</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm flex-1">Prepare healthy dinner</span>
                <Badge variant="outline">This week</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm flex-1">Schedule baby room setup</span>
                <Badge variant="outline">Next week</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
