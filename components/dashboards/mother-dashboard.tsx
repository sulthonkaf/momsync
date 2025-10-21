"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import VitalMonitoring from "@/components/features/vital-monitoring"
import HealthJournal from "@/components/features/health-journal"
import AIAssistant from "@/components/features/ai-assistant"
import BabyTracker from "@/components/features/baby-tracker"
import UpcomingAppointments from "@/components/features/upcoming-appointments"
import StuntingEducation from "@/components/features/stunting-education"
import HealthRiskAlerts from "@/components/features/health-risk-alerts"
import DoctorMessaging from "@/components/features/doctor-messaging"
import LabResultsViewer from "@/components/features/lab-results-viewer"
import { smartwatchService, type VitalSignsData } from "@/lib/smartwatch-service"
import { AlertTriangle, Heart, Baby, BookOpen, MessageSquare, Users, Utensils, Share2, Calendar } from "lucide-react"
import { useState, useEffect } from "react"

export default function MotherDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [vitalSigns, setVitalSigns] = useState<VitalSignsData | null>(null)
  const [loadingVitals, setLoadingVitals] = useState(true)

  useEffect(() => {
    const fetchVitalSigns = async () => {
      try {
        const data = await smartwatchService.getLatestVitalSigns()
        setVitalSigns(data)
      } catch (error) {
        console.error("[v0] Failed to fetch vital signs:", error)
        // Fallback to mock data if fetch fails
        setVitalSigns({
          timestamp: new Date(),
          heartRate: 72,
          bloodPressure: "120/80",
          oxygenSaturation: 98,
          stressLevel: 45,
          source: "manual",
        })
      } finally {
        setLoadingVitals(false)
      }
    }

    fetchVitalSigns()
  }, [])

  // Mock data for alerts
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Folate Intake Low",
      description: "Your folate intake is below recommended levels. Consider adding more leafy greens.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "info",
      title: "Appointment Reminder",
      description: "Your prenatal checkup is scheduled for tomorrow at 2:00 PM",
      timestamp: "1 day ago",
    },
  ]

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Heart },
    { id: "monitoring", label: "Health Monitoring", icon: Heart },
    { id: "journal", label: "Health Journal", icon: BookOpen },
    { id: "baby", label: "Baby Tracker", icon: Baby },
    { id: "ai-assistant", label: "AI Assistant", icon: MessageSquare },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "community", label: "Community", icon: Users },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "stunting", label: "Stunting Prevention", icon: BookOpen },
    { id: "nutrition", label: "Nutrition", icon: Utensils },
    { id: "family", label: "Family Sharing", icon: Share2 },
    { id: "timeline", label: "Pregnancy Timeline", icon: Calendar },
    { id: "alerts", label: "Health Alerts", icon: AlertTriangle },
    { id: "messaging", label: "Doctor Chat", icon: MessageSquare },
    { id: "labs", label: "Lab Results", icon: BookOpen },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        navigationItems={navigationItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLogout={logout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} onLogout={logout} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
              <p className="text-muted-foreground mt-1">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Alerts */}
            {alerts.length > 0 && (
              <div className="space-y-2">
                {alerts.map((alert) => (
                  <Alert key={alert.id} variant={alert.type === "warning" ? "destructive" : "default"}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-semibold">{alert.title}</div>
                      <div className="text-sm">{alert.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">{alert.timestamp}</div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 lg:grid-cols-15 overflow-x-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                <TabsTrigger value="journal">Journal</TabsTrigger>
                <TabsTrigger value="baby">Baby</TabsTrigger>
                <TabsTrigger value="ai-assistant">AI</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="stunting">Stunting</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="messaging">Chat</TabsTrigger>
                <TabsTrigger value="labs">Labs</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Vital Signs Cards - Now from Smartwatch */}
                  {loadingVitals ? (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-muted-foreground">Loading vital signs...</p>
                      </CardContent>
                    </Card>
                  ) : vitalSigns ? (
                    <>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Heart Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{vitalSigns.heartRate}</div>
                          <p className="text-xs text-muted-foreground">bpm - Normal</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Source: {vitalSigns.source === "smartwatch" ? "Apple Watch" : "Manual Entry"}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Blood Pressure</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{vitalSigns.bloodPressure}</div>
                          <p className="text-xs text-muted-foreground">mmHg - Normal</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">O2 Saturation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{vitalSigns.oxygenSaturation}%</div>
                          <p className="text-xs text-muted-foreground">SpO2 - Excellent</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Stress Level</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{vitalSigns.stressLevel}%</div>
                          <p className="text-xs text-muted-foreground">Moderate</p>
                        </CardContent>
                      </Card>
                    </>
                  ) : null}
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="outline" className="w-full bg-transparent">
                      Log Symptoms
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      View Education
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Join Community
                    </Button>
                  </CardContent>
                </Card>

                {/* Upcoming Appointments */}
                <UpcomingAppointments />
              </TabsContent>

              {/* Monitoring Tab */}
              <TabsContent value="monitoring">
                <VitalMonitoring />
              </TabsContent>

              {/* Journal Tab */}
              <TabsContent value="journal">
                <HealthJournal />
              </TabsContent>

              {/* Baby Tracker Tab */}
              <TabsContent value="baby">
                <BabyTracker />
              </TabsContent>

              {/* AI Assistant Tab */}
              <TabsContent value="ai-assistant">
                <AIAssistant />
              </TabsContent>

              {/* Appointments Tab */}
              <TabsContent value="appointments">
                <UpcomingAppointments />
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Community Forum
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition">
                        <div className="font-semibold">First Trimester Tips & Support</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Join 2,345 members discussing pregnancy tips
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            Join Discussion
                          </Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition">
                        <div className="font-semibold">Nutrition & Healthy Eating</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Share recipes and nutrition advice with other mothers
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            Join Discussion
                          </Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition">
                        <div className="font-semibold">Exercise & Wellness During Pregnancy</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Safe exercises and wellness routines for pregnant mothers
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            Join Discussion
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">Create New Discussion</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Pregnancy Education & Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition">
                        <div className="font-semibold">First Trimester Guide</div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Learn about changes in your body and baby development
                        </p>
                        <Button size="sm" variant="outline" className="mt-3 bg-transparent">
                          Read More
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition">
                        <div className="font-semibold">Prenatal Care Essentials</div>
                        <p className="text-sm text-muted-foreground mt-2">Understanding prenatal tests and checkups</p>
                        <Button size="sm" variant="outline" className="mt-3 bg-transparent">
                          Read More
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition">
                        <div className="font-semibold">Labor & Delivery Preparation</div>
                        <p className="text-sm text-muted-foreground mt-2">What to expect during labor and delivery</p>
                        <Button size="sm" variant="outline" className="mt-3 bg-transparent">
                          Read More
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition">
                        <div className="font-semibold">Postpartum Recovery</div>
                        <p className="text-sm text-muted-foreground mt-2">Recovery tips and postpartum care guide</p>
                        <Button size="sm" variant="outline" className="mt-3 bg-transparent">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stunting Education Tab */}
              <TabsContent value="stunting">
                <StuntingEducation />
              </TabsContent>

              {/* Nutrition Tab */}
              <TabsContent value="nutrition" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="h-5 w-5" />
                      Nutrition Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">2,150</div>
                            <p className="text-sm text-muted-foreground">Calories Today</p>
                            <p className="text-xs text-muted-foreground mt-1">Goal: 2,400 cal</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">65g</div>
                            <p className="text-sm text-muted-foreground">Protein</p>
                            <p className="text-xs text-muted-foreground mt-1">Goal: 70g</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">1,200mg</div>
                            <p className="text-sm text-muted-foreground">Calcium</p>
                            <p className="text-xs text-muted-foreground mt-1">Goal: 1,000mg</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-3">Today's Meals</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <span>Breakfast: Oatmeal with berries</span>
                          <span className="text-sm text-muted-foreground">350 cal</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <span>Lunch: Grilled chicken salad</span>
                          <span className="text-sm text-muted-foreground">450 cal</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <span>Snack: Greek yogurt</span>
                          <span className="text-sm text-muted-foreground">150 cal</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">Log Meal</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Family Sharing Tab */}
              <TabsContent value="family" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Family Sharing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-3">Shared With</div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                          <div>
                            <div className="font-medium">John Doe (Partner)</div>
                            <p className="text-sm text-muted-foreground">Can view health data & appointments</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Remove
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                          <div>
                            <div className="font-medium">Dr. Sarah Smith (Doctor)</div>
                            <p className="text-sm text-muted-foreground">Can view health records</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-3">Invite Family Member</div>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          placeholder="Enter email address"
                          className="flex-1 px-3 py-2 border rounded-md text-sm"
                        />
                        <Button>Send Invite</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pregnancy Timeline Tab */}
              <TabsContent value="timeline" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Pregnancy Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary pl-4 py-2">
                        <div className="font-semibold">Week 1-4: Conception & Implantation</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your baby is just beginning to develop. Fertilization occurs and the embryo starts to implant.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">Status: Completed</div>
                      </div>
                      <div className="border-l-4 border-primary pl-4 py-2">
                        <div className="font-semibold">Week 5-8: Embryonic Development</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Major organs begin to form. Your baby is now called an embryo.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">Status: Completed</div>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50 rounded">
                        <div className="font-semibold">Week 9-12: First Trimester Screening</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          First ultrasound and screening tests. Your baby is now called a fetus.
                        </p>
                        <div className="text-xs text-blue-600 mt-2">Status: Current (Week 11)</div>
                      </div>
                      <div className="border-l-4 border-muted pl-4 py-2 opacity-50">
                        <div className="font-semibold">Week 13-27: Second Trimester</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Baby grows rapidly. You may start feeling movements.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">Status: Upcoming</div>
                      </div>
                      <div className="border-l-4 border-muted pl-4 py-2 opacity-50">
                        <div className="font-semibold">Week 28-40: Third Trimester</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Baby continues to grow and prepare for birth.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">Status: Upcoming</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Health Alerts Tab */}
              <TabsContent value="alerts" className="space-y-4">
                <HealthRiskAlerts />
              </TabsContent>

              {/* Doctor Messaging Tab */}
              <TabsContent value="messaging" className="space-y-4">
                <DoctorMessaging />
              </TabsContent>

              {/* Lab Results Tab */}
              <TabsContent value="labs" className="space-y-4">
                <LabResultsViewer />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
