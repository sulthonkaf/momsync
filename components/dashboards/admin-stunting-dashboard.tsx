"use client"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { BarChart3, TrendingUp, Users, FileText, Settings, Download } from "lucide-react"
import { useState } from "react"

export default function AdminStuntingDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "programs", label: "Programs", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
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
              <h1 className="text-3xl font-bold text-foreground">Stunting Analytics Dashboard</h1>
              <p className="text-muted-foreground mt-1">Platform-wide stunting prevention metrics</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Children Screened
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,847</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Stunting Prevalence</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">28.5%</div>
                      <p className="text-xs text-muted-foreground">-2.3% from baseline</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Interventions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">456</div>
                      <p className="text-xs text-muted-foreground">Ongoing cases</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Recovery Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">64%</div>
                      <p className="text-xs text-muted-foreground">Improved status</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <span>Average Height Deficit</span>
                      <span className="font-semibold">7.2 cm</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <span>Severe Cases</span>
                      <span className="font-semibold">89 (19.5%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <span>Moderate Cases</span>
                      <span className="font-semibold">234 (51.2%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <span>Mild Cases</span>
                      <span className="font-semibold">134 (29.3%)</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Stunting Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-3">Monthly Prevalence Trend</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>August 2024</span>
                          <span className="font-medium">32.1%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>September 2024</span>
                          <span className="font-medium">30.8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>October 2024</span>
                          <span className="font-medium">28.5%</span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-3">Geographic Distribution</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Urban Areas</span>
                          <span className="font-medium">18.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rural Areas</span>
                          <span className="font-medium">42.3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Remote Areas</span>
                          <span className="font-medium">51.7%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Programs Tab */}
              <TabsContent value="programs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Programs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-2">Community Nutrition Programs</div>
                      <p className="text-sm text-muted-foreground mb-3">12 active programs across 8 regions</p>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-2">Healthcare Provider Network</div>
                      <p className="text-sm text-muted-foreground mb-3">
                        45 doctors, 32 nutritionists, 78 health workers
                      </p>
                      <Button variant="outline" className="w-full bg-transparent">
                        Manage Network
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-2">Mother Education Initiative</div>
                      <p className="text-sm text-muted-foreground mb-3">Reaching 1,200+ mothers monthly</p>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Content
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab */}
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Generate Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Monthly Stunting Report
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Quarterly Impact Assessment
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Regional Comparison Report
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Provider Performance Report
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      Export All Data
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-2">Data Refresh Interval</div>
                      <select className="w-full px-3 py-2 border rounded-md text-sm">
                        <option>Real-time</option>
                        <option>Every 1 hour</option>
                        <option>Every 6 hours</option>
                        <option>Daily</option>
                      </select>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="font-semibold mb-2">Alert Thresholds</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span>High Prevalence Alert</span>
                          <input type="number" defaultValue="35" className="w-20 px-2 py-1 border rounded" />
                          <span>%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Low Recovery Rate Alert</span>
                          <input type="number" defaultValue="50" className="w-20 px-2 py-1 border rounded" />
                          <span>%</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Save Settings</Button>
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
