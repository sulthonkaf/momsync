"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Users, MapPin, BookOpen, AlertTriangle, TrendingUp, Share2 } from "lucide-react"
import { useState } from "react"

export default function HealthWorkerDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const navigationItems = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "community-program", label: "Community Program", icon: Users },
    { id: "screening", label: "Screening", icon: AlertTriangle },
    { id: "education", label: "Education Materials", icon: BookOpen },
    { id: "referrals", label: "Referrals", icon: Share2 },
  ]

  const communityPrograms = [
    {
      id: 1,
      name: "Village Nutrition Awareness",
      location: "Kampung Maju",
      participants: 45,
      status: "active",
      nextSession: "2024-10-25",
    },
    {
      id: 2,
      name: "Growth Monitoring Clinic",
      location: "Posyandu Sehat",
      participants: 32,
      status: "active",
      nextSession: "2024-10-22",
    },
    {
      id: 3,
      name: "Mother Support Group",
      location: "Community Center",
      participants: 28,
      status: "active",
      nextSession: "2024-10-28",
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
              <p className="text-muted-foreground mt-1">Community Health Worker - Stunting Prevention Program</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="community-program">Community</TabsTrigger>
                <TabsTrigger value="screening">Screening</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="referrals">Referrals</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Children Screened</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">156</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">At Risk</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">23</div>
                      <p className="text-xs text-muted-foreground">Referred for intervention</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Community Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">Active programs</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Participants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">105</div>
                      <p className="text-xs text-muted-foreground">Total enrolled</p>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-semibold">Upcoming Screening Session</div>
                    <div className="text-sm">Growth monitoring clinic at Posyandu Sehat - October 22, 2024</div>
                  </AlertDescription>
                </Alert>
              </TabsContent>

              {/* Community Program Tab */}
              <TabsContent value="community-program" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Active Community Programs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {communityPrograms.map((program) => (
                      <div key={program.id} className="border rounded-lg p-4 hover:bg-muted/50 transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-semibold">{program.name}</div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4" />
                              {program.location}
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600">
                            Active
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Participants</p>
                            <p className="font-semibold">{program.participants}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Next Session</p>
                            <p className="font-semibold">{new Date(program.nextSession).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Add Participant
                          </Button>
                          <Button size="sm" variant="outline">
                            Schedule Session
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Screening Tab */}
              <TabsContent value="screening" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Monitoring Screening</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-3">Quick Screening Form</div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Child Name</label>
                          <input
                            type="text"
                            placeholder="Enter child's name"
                            className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium">Age (months)</label>
                            <input
                              type="number"
                              placeholder="Age"
                              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Height (cm)</label>
                            <input
                              type="number"
                              placeholder="Height"
                              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-sm font-medium">Weight (kg)</label>
                            <input
                              type="number"
                              placeholder="Weight"
                              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">MUAC (cm)</label>
                            <input
                              type="number"
                              placeholder="MUAC"
                              className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                            />
                          </div>
                        </div>
                        <Button className="w-full">Assess Stunting Risk</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Education Materials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      What is Stunting? - Infographic
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Prevention Strategies - Video
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Nutrition Guidelines - Pamphlet
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Early Warning Signs - Checklist
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Download All Materials
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Referrals Tab */}
              <TabsContent value="referrals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Referral Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-2">Pending Referrals</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <span>Adi Pratama - Severe Stunting</span>
                          <Button size="sm" variant="outline">
                            Refer
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <span>Siti Nurhaliza - Moderate Stunting</span>
                          <Button size="sm" variant="outline">
                            Refer
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">View Referral History</Button>
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
