"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import PatientList from "@/components/features/patient-list"
import ConsultationQueue from "@/components/features/consultation-queue"
import PrescriptionManagement from "@/components/features/prescription-management"
import AnalyticsOverview from "@/components/features/analytics-overview"
import StuntingScreening from "@/components/features/stunting-screening"
import PatientHistory from "@/components/features/patient-history"
import LabIntegration from "@/components/features/lab-integration"
import ClinicalNotes from "@/components/features/clinical-notes"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Pill, BarChart3, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function DoctorDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "patients", label: "My Patients", icon: Users },
    { id: "consultations", label: "Consultations", icon: Calendar },
    { id: "prescriptions", label: "Prescriptions", icon: Pill },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "stunting", label: "Stunting Screening", icon: AlertCircle },
  ]

  // Mock statistics
  const stats = [
    { label: "Active Patients", value: "24", change: "+2 this week" },
    { label: "Pending Consultations", value: "5", change: "2 today" },
    { label: "Prescriptions Issued", value: "18", change: "This month" },
    { label: "Patient Satisfaction", value: "4.8/5", change: "Based on 42 reviews" },
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

        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="patients">My Patients</TabsTrigger>
                <TabsTrigger value="consultations">Consultations</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="stunting">Stunting</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-4 gap-4">
                  {stats.map((stat, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="patients" className="space-y-6">
                {selectedPatientId ? (
                  <div className="space-y-4">
                    <Button variant="outline" onClick={() => setSelectedPatientId(null)}>
                      Back to Patient List
                    </Button>
                    <PatientHistory patientId={selectedPatientId} patientName="Ibu Siti Nurhaliza" />
                    <LabIntegration patientId={selectedPatientId} />
                    <ClinicalNotes patientId={selectedPatientId} />
                  </div>
                ) : (
                  <PatientList onSelectPatient={setSelectedPatientId} />
                )}
              </TabsContent>

              <TabsContent value="consultations">
                <ConsultationQueue />
              </TabsContent>

              <TabsContent value="prescriptions">
                <PrescriptionManagement />
              </TabsContent>

              <TabsContent value="analytics">
                <AnalyticsOverview />
              </TabsContent>

              <TabsContent value="stunting">
                <StuntingScreening />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
