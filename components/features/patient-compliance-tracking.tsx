"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, AlertCircle } from "lucide-react"

interface ComplianceData {
  patientName: string
  complianceRate: number
  status: "excellent" | "good" | "fair" | "poor"
  mealsLogged: number
  targetMeals: number
  lastUpdate: string
}

export default function PatientComplianceTracking() {
  const complianceData: ComplianceData[] = [
    {
      patientName: "Ibu Siti Nurhaliza",
      complianceRate: 92,
      status: "excellent",
      mealsLogged: 23,
      targetMeals: 25,
      lastUpdate: "Today",
    },
    {
      patientName: "Ibu Dewi Lestari",
      complianceRate: 78,
      status: "good",
      mealsLogged: 19,
      targetMeals: 25,
      lastUpdate: "Yesterday",
    },
    {
      patientName: "Ibu Rina Wijaya",
      complianceRate: 65,
      status: "fair",
      mealsLogged: 16,
      targetMeals: 25,
      lastUpdate: "2 days ago",
    },
    {
      patientName: "Ibu Hana Kusuma",
      complianceRate: 45,
      status: "poor",
      mealsLogged: 11,
      targetMeals: 25,
      lastUpdate: "3 days ago",
    },
  ]

  const trendData = [
    { week: "Week 1", compliance: 75 },
    { week: "Week 2", compliance: 78 },
    { week: "Week 3", compliance: 82 },
    { week: "Week 4", compliance: 85 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-50 border-green-200"
      case "good":
        return "bg-blue-50 border-blue-200"
      case "fair":
        return "bg-yellow-50 border-yellow-200"
      case "poor":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-600">Excellent</Badge>
      case "good":
        return <Badge className="bg-blue-600">Good</Badge>
      case "fair":
        return <Badge className="bg-yellow-600">Fair</Badge>
      case "poor":
        return <Badge className="bg-red-600">Poor</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Compliance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Overall Compliance Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="compliance" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Patient Compliance Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patient Compliance Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {complianceData.map((patient, idx) => (
            <div key={idx} className={`p-4 border rounded-lg ${getStatusColor(patient.status)}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{patient.patientName}</h4>
                  <p className="text-sm text-gray-600 mt-1">Last update: {patient.lastUpdate}</p>
                </div>
                {getStatusBadge(patient.status)}
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">Compliance Rate</span>
                  <span className="text-sm font-bold">{patient.complianceRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      patient.status === "excellent"
                        ? "bg-green-600"
                        : patient.status === "good"
                          ? "bg-blue-600"
                          : patient.status === "fair"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                    }`}
                    style={{ width: `${patient.complianceRate}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Meals Logged</p>
                  <p className="font-semibold">
                    {patient.mealsLogged}/{patient.targetMeals}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Missing Logs</p>
                  <p className="font-semibold">{patient.targetMeals - patient.mealsLogged}</p>
                </div>
              </div>

              {patient.status === "poor" && (
                <div className="mt-3 p-2 bg-red-100 rounded flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">Low compliance - Consider follow-up call</p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
