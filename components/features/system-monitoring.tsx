"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"

interface SystemStatus {
  service: string
  status: "operational" | "degraded" | "down"
  uptime: string
  responseTime: string
  lastChecked: string
}

export default function SystemMonitoring() {
  const systemStatus: SystemStatus[] = [
    {
      service: "API Server",
      status: "operational",
      uptime: "99.98%",
      responseTime: "45ms",
      lastChecked: "Just now",
    },
    {
      service: "Database",
      status: "operational",
      uptime: "99.99%",
      responseTime: "12ms",
      lastChecked: "Just now",
    },
    {
      service: "Authentication",
      status: "operational",
      uptime: "99.95%",
      responseTime: "78ms",
      lastChecked: "Just now",
    },
    {
      service: "File Storage",
      status: "degraded",
      uptime: "98.5%",
      responseTime: "250ms",
      lastChecked: "1 min ago",
    },
    {
      service: "Email Service",
      status: "operational",
      uptime: "99.90%",
      responseTime: "150ms",
      lastChecked: "2 min ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      case "down":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-600">Operational</Badge>
      case "degraded":
        return <Badge className="bg-orange-600">Degraded</Badge>
      case "down":
        return <Badge className="bg-red-600">Down</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const operationalCount = systemStatus.filter((s) => s.status === "operational").length
  const degradedCount = systemStatus.filter((s) => s.status === "degraded").length
  const downCount = systemStatus.filter((s) => s.status === "down").length

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Operational</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{operationalCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Services running normally</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Degraded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{degradedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Performance issues detected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Down</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{downCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Services unavailable</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {degradedCount > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            File Storage service is experiencing degraded performance. Response time is higher than normal.
          </AlertDescription>
        </Alert>
      )}

      {/* Service Status Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Service Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {systemStatus.map((service, idx) => (
            <div key={idx} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(service.status)}
                  <h4 className="font-semibold">{service.service}</h4>
                </div>
                {getStatusBadge(service.status)}
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Uptime</p>
                  <p className="font-semibold">{service.uptime}</p>
                </div>
                <div>
                  <p className="text-gray-600">Response Time</p>
                  <p className="font-semibold">{service.responseTime}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Checked</p>
                  <p className="font-semibold">{service.lastChecked}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
