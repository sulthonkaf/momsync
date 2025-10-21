"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"
import { AlertCircle, CheckCircle, TrendingUp, TrendingDown, Activity, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const vitalData = [
  { time: "00:00", heartRate: 68, bloodPressure: 118, stress: 30, oxygenSaturation: 98 },
  { time: "04:00", heartRate: 65, bloodPressure: 116, stress: 25, oxygenSaturation: 97 },
  { time: "08:00", heartRate: 72, bloodPressure: 120, stress: 40, oxygenSaturation: 98 },
  { time: "12:00", heartRate: 75, bloodPressure: 122, stress: 55, oxygenSaturation: 97 },
  { time: "16:00", heartRate: 73, bloodPressure: 121, stress: 50, oxygenSaturation: 98 },
  { time: "20:00", heartRate: 70, bloodPressure: 119, stress: 35, oxygenSaturation: 98 },
]

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Elevated Stress Detected",
    message:
      "Your stress level has been elevated for the past 2 hours. Consider taking a break and practicing relaxation techniques.",
    time: "2 hours ago",
    actionable: true,
  },
  {
    id: 2,
    type: "info",
    title: "Vital Signs Normal",
    message: "All vital signs are within normal ranges. Keep up the good health habits!",
    time: "Just now",
    actionable: false,
  },
  {
    id: 3,
    type: "success",
    title: "Heart Rate Stable",
    message: "Your heart rate has remained stable throughout the day. Excellent cardiovascular health!",
    time: "1 hour ago",
    actionable: false,
  },
]

const vitalStats = [
  {
    label: "Heart Rate",
    value: "72 bpm",
    status: "normal",
    range: "60-100 bpm",
    trend: "stable",
    icon: Activity,
  },
  {
    label: "Blood Pressure",
    value: "120/80 mmHg",
    status: "normal",
    range: "< 120/80 mmHg",
    trend: "stable",
    icon: Zap,
  },
  {
    label: "Oxygen Saturation",
    value: "98%",
    status: "normal",
    range: "95-100%",
    trend: "up",
    icon: Activity,
  },
  {
    label: "Stress Level",
    value: "35%",
    status: "elevated",
    range: "< 30%",
    trend: "down",
    icon: AlertCircle,
  },
]

export default function VitalMonitoring() {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([])

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "success":
        return "bg-green-50 border-green-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <CheckCircle className="h-5 w-5 text-blue-600" />
    }
  }

  const visibleAlerts = alerts.filter((a) => !dismissedAlerts.includes(a.id))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {vitalStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </div>
                  <Icon className={`h-5 w-5 ${stat.status === "normal" ? "text-green-600" : "text-yellow-600"}`} />
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                  {stat.trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                  <span>{stat.range}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vital Signs Monitoring</CardTitle>
          <CardDescription>Real-time data from your smartwatch (Last 24 hours)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={vitalData}>
              <defs>
                <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="heartRate"
                stroke="#0891b2"
                fillOpacity={1}
                fill="url(#colorHeartRate)"
                name="Heart Rate (bpm)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Early Warning System</CardTitle>
          <CardDescription>AI-powered health alerts and recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {visibleAlerts.length === 0 ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-900">All Systems Normal</p>
              <p className="text-sm text-green-800 mt-1">No alerts at this time. Keep monitoring your health!</p>
            </div>
          ) : (
            visibleAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 border rounded-lg transition-all ${getAlertColor(alert.type)} ${
                  selectedAlert === alert.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
              >
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                  </div>
                </div>

                {selectedAlert === alert.id && alert.actionable && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" className="flex-1">
                      Take Action
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setDismissedAlerts([...dismissedAlerts, alert.id])}
                    >
                      Dismiss
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Recommendations</CardTitle>
          <CardDescription>Personalized suggestions based on your vital signs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-semibold text-sm text-blue-900">Stay Hydrated</p>
            <p className="text-xs text-blue-800 mt-1">
              Drink at least 8-10 glasses of water daily to maintain healthy blood pressure and circulation.
            </p>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="font-semibold text-sm text-purple-900">Practice Relaxation</p>
            <p className="text-xs text-purple-800 mt-1">
              Your stress levels are slightly elevated. Try deep breathing exercises or meditation for 10 minutes.
            </p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-sm text-green-900">Continue Exercise</p>
            <p className="text-xs text-green-800 mt-1">
              Your heart rate is stable. Continue with light to moderate exercise as recommended by your doctor.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
