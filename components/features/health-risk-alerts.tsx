"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, CheckCircle, Phone } from "lucide-react"
import { useState } from "react"

interface HealthAlert {
  id: string
  type: "critical" | "warning" | "info"
  title: string
  description: string
  metric: string
  value: string
  normalRange: string
  action: string
  timestamp: string
}

export default function HealthRiskAlerts() {
  const [alerts, setAlerts] = useState<HealthAlert[]>([
    {
      id: "1",
      type: "critical",
      title: "High Blood Pressure",
      description: "Your blood pressure is elevated. This requires immediate attention.",
      metric: "Blood Pressure",
      value: "160/100 mmHg",
      normalRange: "< 140/90 mmHg",
      action: "Contact your doctor immediately",
      timestamp: "2024-10-15 14:30",
    },
    {
      id: "2",
      type: "warning",
      title: "Elevated Glucose Level",
      description: "Your fasting glucose is higher than normal. Monitor closely.",
      metric: "Fasting Glucose",
      value: "125 mg/dL",
      normalRange: "70-100 mg/dL",
      action: "Follow your meal plan and retest in 3 days",
      timestamp: "2024-10-15 08:00",
    },
    {
      id: "3",
      type: "info",
      title: "Appointment Reminder",
      description: "Your next prenatal checkup is scheduled for tomorrow.",
      metric: "Appointment",
      value: "Oct 16, 2024 10:00 AM",
      normalRange: "-",
      action: "View appointment details",
      timestamp: "2024-10-15 09:00",
    },
  ])

  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([])

  const handleDismiss = (id: string) => {
    setDismissedAlerts([...dismissedAlerts, id])
  }

  const handleCallDoctor = () => {
    alert("Calling doctor... (In production, this would initiate a call)")
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      default:
        return <CheckCircle className="w-5 h-5 text-blue-600" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-orange-50 border-orange-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge className="bg-red-600">Critical</Badge>
      case "warning":
        return <Badge className="bg-orange-600">Warning</Badge>
      default:
        return <Badge className="bg-blue-600">Info</Badge>
    }
  }

  const visibleAlerts = alerts.filter((alert) => !dismissedAlerts.includes(alert.id))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Health Risk Alerts</CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            {visibleAlerts.length} active alert{visibleAlerts.length !== 1 ? "s" : ""}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {visibleAlerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <p className="text-gray-600">All health metrics are normal</p>
            </div>
          ) : (
            visibleAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{alert.title}</h4>
                        {getAlertBadge(alert.type)}
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{alert.description}</p>

                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-gray-600">Current Value</p>
                          <p className="font-semibold">{alert.value}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Normal Range</p>
                          <p className="font-semibold">{alert.normalRange}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Recommended Action</p>
                          <p className="font-semibold text-sm">{alert.action}</p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mt-3">{alert.timestamp}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {alert.type === "critical" && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={handleCallDoctor}>
                        <Phone className="w-4 h-4 mr-1" />
                        Call Doctor
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleDismiss(alert.id)}>
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
