"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, DollarSign, CreditCard } from "lucide-react"

export default function FinancialDashboard() {
  const revenueData = [
    { month: "Aug", revenue: 45000, expenses: 32000, profit: 13000 },
    { month: "Sep", revenue: 52000, expenses: 35000, profit: 17000 },
    { month: "Oct", revenue: 58000, expenses: 38000, profit: 20000 },
  ]

  const paymentStatus = [
    { status: "Paid", count: 245, percentage: 78 },
    { status: "Pending", count: 52, percentage: 17 },
    { status: "Overdue", count: 18, percentage: 5 },
  ]

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$58,000</div>
            <p className="text-xs text-green-600 mt-1">+11.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$38,000</div>
            <p className="text-xs text-orange-600 mt-1">+8.6% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">$20,000</div>
            <p className="text-xs text-muted-foreground mt-1">34.5% profit margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">$12,500</div>
            <p className="text-xs text-muted-foreground mt-1">18 overdue invoices</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Revenue vs Expenses Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" />
              <Bar dataKey="expenses" fill="#ef4444" />
              <Bar dataKey="profit" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Payment Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentStatus.map((item) => (
            <div key={item.status} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{item.status}</h4>
                <Badge variant="outline">{item.count} invoices</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    item.status === "Paid" ? "bg-green-600" : item.status === "Pending" ? "bg-yellow-600" : "bg-red-600"
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{item.percentage}% of total</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
