"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const patientTrendData = [
  { month: "Jan", patients: 12, consultations: 8 },
  { month: "Feb", patients: 15, consultations: 12 },
  { month: "Mar", patients: 18, consultations: 14 },
  { month: "Apr", patients: 22, consultations: 18 },
  { month: "May", patients: 24, consultations: 20 },
  { month: "Jun", patients: 24, consultations: 22 },
]

const riskDistribution = [
  { name: "Low Risk", value: 16 },
  { name: "Medium Risk", value: 6 },
  { name: "High Risk", value: 2 },
]

export default function AnalyticsOverview() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Patient Growth Trend</CardTitle>
          <CardDescription>Active patients and consultations over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patientTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="patients" stroke="#0891b2" name="Active Patients" />
              <Line type="monotone" dataKey="consultations" stroke="#ea580c" name="Consultations" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patient Risk Distribution</CardTitle>
          <CardDescription>Current patient risk levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-sm">{item.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${(item.value / 24) * 100}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
