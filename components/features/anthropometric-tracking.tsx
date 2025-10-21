"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

interface AnthropometricData {
  date: string
  height: number
  weight: number
  muac: number
  whoStatus: "normal" | "at-risk" | "stunted"
}

export default function AnthropometricTracking() {
  const anthropometricData: AnthropometricData[] = [
    { date: "Sep 1", height: 58, weight: 2.8, muac: 11.2, whoStatus: "normal" },
    { date: "Sep 15", height: 59, weight: 2.95, muac: 11.4, whoStatus: "normal" },
    { date: "Oct 1", height: 60, weight: 3.1, muac: 11.6, whoStatus: "normal" },
    { date: "Oct 15", height: 61, weight: 3.25, muac: 11.8, whoStatus: "normal" },
  ]

  const childData = [
    { name: "Baby Adi", age: "6 months", height: 61, weight: 3.25, muac: 11.8, status: "normal" },
    { name: "Baby Budi", age: "12 months", height: 72, weight: 8.5, muac: 14.2, status: "at-risk" },
    { name: "Baby Citra", age: "18 months", height: 78, weight: 10.2, muac: 13.5, status: "stunted" },
  ]

  return (
    <div className="space-y-6">
      {/* Growth Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Growth Trend - Baby Adi</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={anthropometricData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="height" stroke="#3b82f6" name="Height (cm)" />
              <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#10b981" name="Weight (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Children Under Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Children Under Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {childData.map((child, idx) => {
            const statusColor =
              child.status === "normal"
                ? "bg-green-50 border-green-200"
                : child.status === "at-risk"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-red-50 border-red-200"

            const statusBadgeColor =
              child.status === "normal" ? "bg-green-600" : child.status === "at-risk" ? "bg-yellow-600" : "bg-red-600"

            return (
              <div key={idx} className={`p-4 border rounded-lg ${statusColor}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{child.name}</h4>
                    <p className="text-sm text-gray-600">{child.age}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {child.status === "normal" ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600" />
                    )}
                    <span className={`px-3 py-1 rounded text-white text-sm font-semibold ${statusBadgeColor}`}>
                      {child.status.charAt(0).toUpperCase() + child.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Height</p>
                    <p className="font-semibold">{child.height} cm</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Weight</p>
                    <p className="font-semibold">{child.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-600">MUAC</p>
                    <p className="font-semibold">{child.muac} cm</p>
                  </div>
                  <div>
                    <p className="text-gray-600">WHO Status</p>
                    <p className="font-semibold">{child.status}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
