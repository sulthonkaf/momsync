"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const userGrowthData = [
  { month: "Jan", users: 150, activeUsers: 120 },
  { month: "Feb", users: 280, activeUsers: 220 },
  { month: "Mar", users: 450, activeUsers: 380 },
  { month: "Apr", users: 680, activeUsers: 580 },
  { month: "May", users: 920, activeUsers: 800 },
  { month: "Jun", users: 1247, activeUsers: 1050 },
]

const roleDistribution = [
  { role: "Mother", count: 650 },
  { role: "Partner", count: 180 },
  { role: "Doctor", count: 85 },
  { role: "Healthcare Provider", count: 220 },
  { role: "Pharmacist", count: 112 },
]

export default function SystemAnalytics() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>User Growth Trend</CardTitle>
          <CardDescription>Total and active users over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#0891b2" name="Total Users" />
              <Line type="monotone" dataKey="activeUsers" stroke="#ea580c" name="Active Users" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Distribution by Role</CardTitle>
          <CardDescription>Current user breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0891b2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
