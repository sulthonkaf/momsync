"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { AlertTriangle, Users, TrendingUp, Utensils, FileText, BarChart3 } from "lucide-react"
import { useState } from "react"

export default function NutritionistDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "stunting-management", label: "Stunting Management", icon: TrendingUp },
    { id: "meal-plans", label: "Meal Plans", icon: Utensils },
    { id: "clients", label: "My Clients", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
  ]

  // Mock stunting cases
  const stuntingCases = [
    {
      id: 1,
      childName: "Adi Pratama",
      age: "18 months",
      height: "72 cm",
      expectedHeight: "82 cm",
      severity: "moderate",
      status: "active",
      interventionStart: "2024-08-15",
    },
    {
      id: 2,
      childName: "Siti Nurhaliza",
      age: "24 months",
      height: "78 cm",
      expectedHeight: "88 cm",
      severity: "severe",
      status: "active",
      interventionStart: "2024-07-20",
    },
    {
      id: 3,
      childName: "Budi Santoso",
      age: "12 months",
      height: "68 cm",
      expectedHeight: "75 cm",
      severity: "mild",
      status: "improving",
      interventionStart: "2024-09-01",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe":
        return "text-red-600 bg-red-50"
      case "moderate":
        return "text-orange-600 bg-orange-50"
      case "mild":
        return "text-yellow-600 bg-yellow-50"
      default:
        return "text-green-600 bg-green-50"
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
              <h1 className="text-3xl font-bold text-foreground">Welcome, {user?.name}!</h1>
              <p className="text-muted-foreground mt-1">Nutritionist - Stunting Management</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="stunting-management">Stunting Management</TabsTrigger>
                <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
                <TabsTrigger value="clients">My Clients</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Cases</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">Stunting interventions</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Improving</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <p className="text-xs text-muted-foreground">Positive progress</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Severe Cases</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <p className="text-xs text-muted-foreground">Require urgent intervention</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">67%</div>
                      <p className="text-xs text-muted-foreground">Recovery rate</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="font-semibold">Siti Nurhaliza - Severe Stunting</div>
                        <div className="text-sm">Height deficit: 10cm. Recommend intensive nutrition intervention.</div>
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="font-semibold">Budi Santoso - Meal Plan Review Due</div>
                        <div className="text-sm">Monthly nutrition assessment scheduled for today.</div>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Stunting Management Tab */}
              <TabsContent value="stunting-management" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Active Stunting Cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stuntingCases.map((case_) => (
                        <div key={case_.id} className="border rounded-lg p-4 hover:bg-muted/50 transition">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="font-semibold">{case_.childName}</div>
                              <p className="text-sm text-muted-foreground">Age: {case_.age}</p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(case_.severity)}`}
                            >
                              {case_.severity.charAt(0).toUpperCase() + case_.severity.slice(1)}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                            <div>
                              <p className="text-muted-foreground">Current Height</p>
                              <p className="font-semibold">{case_.height}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Expected Height</p>
                              <p className="font-semibold">{case_.expectedHeight}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Deficit</p>
                              <p className="font-semibold text-red-600">
                                {Number.parseInt(case_.expectedHeight) - Number.parseInt(case_.height)}cm
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              Update Meal Plan
                            </Button>
                            <Button size="sm" variant="outline">
                              Log Progress
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Meal Plans Tab */}
              <TabsContent value="meal-plans" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="h-5 w-5" />
                      Nutrition Intervention Plans
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-3">High-Calorie Nutrient-Dense Diet Plan</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Daily Caloric Target:</span>
                          <span className="font-medium">1,200-1,500 kcal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protein Target:</span>
                          <span className="font-medium">30-40g/day</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Key Nutrients:</span>
                          <span className="font-medium">Iron, Zinc, Calcium, Vitamin A</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4">View Full Plan</Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-3">Recommended Foods</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-muted/50 p-2 rounded">Eggs (daily)</div>
                        <div className="bg-muted/50 p-2 rounded">Fortified cereals</div>
                        <div className="bg-muted/50 p-2 rounded">Legumes & beans</div>
                        <div className="bg-muted/50 p-2 rounded">Leafy greens</div>
                        <div className="bg-muted/50 p-2 rounded">Fish & poultry</div>
                        <div className="bg-muted/50 p-2 rounded">Dairy products</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Clients Tab */}
              <TabsContent value="clients" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      My Clients
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stuntingCases.map((case_) => (
                        <div key={case_.id} className="flex items-center justify-between p-3 bg-muted/50 rounded">
                          <div>
                            <div className="font-medium">{case_.childName}</div>
                            <p className="text-sm text-muted-foreground">
                              Intervention since {new Date(case_.interventionStart).toLocaleDateString()}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Contact
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Performance Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Monthly Stunting Intervention Report
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Client Progress Summary
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Nutrition Compliance Report
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Export Client Data
                    </Button>
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
