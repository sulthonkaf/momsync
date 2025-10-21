"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Calendar, Users, Pill, Star, AlertCircle } from "lucide-react"
import { useState } from "react"
import StuntingScreening from "@/components/features/stunting-screening"
import StuntingManagement from "@/components/features/stunting-management"

export function NakesDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Star },
    { id: "consultations", label: "Consultations", icon: Calendar },
    { id: "patients", label: "Patients", icon: Users },
    { id: "prescriptions", label: "Prescriptions", icon: Pill },
    { id: "stunting", label: "Stunting Screening", icon: AlertCircle },
    { id: "management", label: "Stunting Management", icon: AlertCircle },
  ]

  const consultations = [
    {
      id: 1,
      patient: "Sarah Johnson",
      type: "Video Call",
      time: "14:00",
      status: "scheduled",
      duration: "30 min",
    },
    {
      id: 2,
      patient: "Ibu Dewi",
      type: "Chat",
      time: "15:30",
      status: "scheduled",
      duration: "20 min",
    },
    {
      id: 3,
      patient: "Ibu Ani",
      type: "In-Person",
      time: "16:00",
      status: "scheduled",
      duration: "45 min",
    },
  ]

  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 28,
      weeks: 32,
      lastVisit: "2024-01-15",
      status: "stable",
    },
    {
      id: 2,
      name: "Ibu Dewi",
      age: 35,
      weeks: 28,
      lastVisit: "2024-01-10",
      status: "monitoring",
    },
    {
      id: 3,
      name: "Ibu Ani",
      age: 26,
      weeks: 24,
      lastVisit: "2024-01-12",
      status: "stable",
    },
  ]

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
              <h1 className="text-3xl font-bold text-foreground">Welcome, {user?.name}!</h1>
              <p className="text-muted-foreground">Manage consultations and patient care</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Today's Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">2 hours remaining</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Under your care</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Prescriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-muted-foreground">Awaiting fulfillment</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-xs text-muted-foreground">Out of 5 stars</p>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="consultations">Consultations</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="stunting">Stunting</TabsTrigger>
                <TabsTrigger value="management">Management</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Consultations This Week</p>
                      <p className="text-2xl font-bold mt-1">18</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                      <p className="text-2xl font-bold mt-1">96%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                      <p className="text-2xl font-bold mt-1">2.3h</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="consultations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheduled Consultations</CardTitle>
                    <CardDescription>Your upcoming consultation schedule</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {consultations.map((consultation) => (
                      <div key={consultation.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{consultation.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {consultation.type} • {consultation.duration}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{consultation.time}</span>
                          <Button size="sm">Start</Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="patients" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Patients</CardTitle>
                    <CardDescription>Patients under your care</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {patients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {patient.age} years • {patient.weeks} weeks pregnant
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={patient.status === "stable" ? "default" : "secondary"}>
                              {patient.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stunting">
                <StuntingScreening />
              </TabsContent>

              <TabsContent value="management">
                <StuntingManagement />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
