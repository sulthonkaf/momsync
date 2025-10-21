"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import BedManagement from "@/components/features/bed-management"
import StaffScheduling from "@/components/features/staff-scheduling"
import FinancialDashboard from "@/components/features/financial-dashboard"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Building2, AlertCircle, BarChart3, Bed, Calendar, DollarSign } from "lucide-react"
import { useState } from "react"

export function HospitalAdminDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "beds", label: "Bed Management", icon: Bed },
    { id: "staff", label: "Staff Scheduling", icon: Calendar },
    { id: "emergency", label: "Emergency Queue", icon: AlertCircle },
    { id: "financial", label: "Financial", icon: DollarSign },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  const hospitalData = {
    name: "Central Hospital",
    capacity: {
      obstetric_icu: { total: 10, available: 3 },
      nicu: { total: 15, available: 7 },
      regular_ward: { total: 50, available: 12 },
      emergency: { total: 8, available: 2 },
    },
    staff: [
      { id: 1, name: "Dr. Budi", role: "Obstetrician", status: "available" },
      { id: 2, name: "Midwife Siti", role: "Midwife", status: "in_consultation" },
      { id: 3, name: "Dr. Rina", role: "Pediatrician", status: "available" },
    ],
  }

  const referralData = [
    { month: "Jan", referrals: 45, admissions: 38 },
    { month: "Feb", referrals: 52, admissions: 44 },
    { month: "Mar", referrals: 48, admissions: 41 },
    { month: "Apr", referrals: 61, admissions: 52 },
    { month: "May", referrals: 55, admissions: 48 },
    { month: "Jun", referrals: 67, admissions: 58 },
  ]

  const emergencyQueue = [
    { id: 1, patient: "Ibu Dewi", condition: "High BP", priority: "high", time: "10:30" },
    { id: 2, patient: "Ibu Ani", condition: "Labor Pain", priority: "urgent", time: "10:45" },
    { id: 3, patient: "Ibu Sinta", condition: "Bleeding", priority: "critical", time: "11:00" },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "urgent":
        return "bg-orange-100 text-orange-800"
      case "high":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        navigationItems={navigationItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLogout={logout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} onLogout={logout} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{hospitalData.name}</h1>
              <p className="text-muted-foreground">Hospital Operations Dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(hospitalData.capacity).map(([key, value]) => (
                <Card key={key}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground capitalize">
                      {key.replace(/_/g, " ")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{value.available}</div>
                    <p className="text-xs text-muted-foreground">of {value.total} available</p>
                    <div className="mt-2 w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-teal-500 h-2 rounded-full"
                        style={{ width: `${(value.available / value.total) * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="beds">Beds</TabsTrigger>
                <TabsTrigger value="staff">Staff</TabsTrigger>
                <TabsTrigger value="emergency">Emergency</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Facility Status</CardTitle>
                    <CardDescription>Real-time capacity and availability</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(hospitalData.capacity).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium capitalize">{key.replace(/_/g, " ")}</p>
                          <p className="text-sm text-muted-foreground">
                            {value.available} / {value.total} available
                          </p>
                        </div>
                        <Badge variant={value.available > 0 ? "default" : "destructive"}>
                          {value.available > 0 ? "Available" : "Full"}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="flex gap-2 flex-wrap">
                    <Button variant="outline">Update Capacity</Button>
                    <Button variant="outline">Add Staff</Button>
                    <Button variant="outline">View Reports</Button>
                    <Button variant="outline">Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="beds" className="space-y-4">
                <BedManagement />
              </TabsContent>

              <TabsContent value="staff" className="space-y-4">
                <StaffScheduling />
              </TabsContent>

              <TabsContent value="emergency" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Queue</CardTitle>
                    <CardDescription>Patients waiting for emergency care</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {emergencyQueue.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{patient.patient}</p>
                            <p className="text-sm text-muted-foreground">{patient.condition}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{patient.time}</span>
                            <Badge className={getPriorityColor(patient.priority)}>{patient.priority}</Badge>
                            <Button size="sm" variant="outline">
                              Admit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <FinancialDashboard />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Referral Trends</CardTitle>
                    <CardDescription>Monthly referrals and admissions from MomSync</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={referralData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="referrals" stroke="#0d9488" name="Referrals" />
                        <Line type="monotone" dataKey="admissions" stroke="#f97316" name="Admissions" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Referrals (6 months)</p>
                      <p className="text-2xl font-bold">328</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Admission Rate</p>
                      <p className="text-2xl font-bold">87%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Wait Time</p>
                      <p className="text-2xl font-bold">12 min</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                      <p className="text-2xl font-bold">4.8/5</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
