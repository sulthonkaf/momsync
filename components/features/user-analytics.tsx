"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, TrendingUp } from "lucide-react"

export default function UserAnalytics() {
  const userGrowth = [
    { month: "Aug", mothers: 1200, doctors: 85, nutritionists: 45, healthWorkers: 120 },
    { month: "Sep", mothers: 1450, doctors: 95, nutritionists: 52, healthWorkers: 145 },
    { month: "Oct", mothers: 1680, doctors: 110, nutritionists: 62, healthWorkers: 168 },
  ]

  const userDistribution = [
    { name: "Mothers", value: 1680, color: "#ec4899" },
    { name: "Doctors", value: 110, color: "#3b82f6" },
    { name: "Nutritionists", value: 62, color: "#10b981" },
    { name: "Health Workers", value: 168, color: "#f59e0b" },
  ]

  const userMetrics = [
    { label: "Total Users", value: "2,020", change: "+12.5%" },
    { label: "Active Today", value: "1,245", change: "+8.3%" },
    { label: "New Signups", value: "156", change: "+23.1%" },
    { label: "Retention Rate", value: "94.2%", change: "+2.1%" },
  ]

  return (
    <div className="space-y-6">
      {/* User Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {userMetrics.map((metric, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-green-600 mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Growth Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            User Growth by Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="mothers" fill="#ec4899" />
              <Bar dataKey="doctors" fill="#3b82f6" />
              <Bar dataKey="nutritionists" fill="#10b981" />
              <Bar dataKey="healthWorkers" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* User Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Distribution by Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
