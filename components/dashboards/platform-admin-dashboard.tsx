"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { getNavigationItems } from "@/lib/dashboard-config"

export function PlatformAdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (!user) return null

  const navigationItems = getNavigationItems(user.role)

  const systemMetrics = [
    { month: "Jan", users: 5200, hospitals: 8, merchants: 12, nakes: 15 },
    { month: "Feb", users: 6800, hospitals: 12, merchants: 18, nakes: 22 },
    { month: "Mar", users: 8900, hospitals: 15, merchants: 25, nakes: 31 },
    { month: "Apr", users: 11200, hospitals: 18, merchants: 32, nakes: 42 },
    { month: "May", users: 14500, hospitals: 22, merchants: 40, nakes: 54 },
    { month: "Jun", users: 18900, hospitals: 28, merchants: 52, nakes: 68 },
  ]

  const pendingVerifications = [
    {
      id: 1,
      name: "Dr. Budi Santoso",
      type: "Doctor",
      documents: ["STR", "SIP", "ID"],
      submittedDate: "2024-01-18",
      status: "pending",
    },
    {
      id: 2,
      name: "Apotek Sehat Jaya",
      type: "Pharmacy",
      documents: ["License", "Tax ID", "Owner ID"],
      submittedDate: "2024-01-19",
      status: "pending",
    },
    {
      id: 3,
      name: "RS Mitra Sehat",
      type: "Hospital",
      documents: ["License", "Accreditation", "Tax ID"],
      submittedDate: "2024-01-20",
      status: "pending",
    },
  ]

  const communityReports = [
    { id: 1, reporter: "User #1234", content: "Inappropriate language", status: "pending", date: "2024-01-20" },
    { id: 2, reporter: "User #5678", content: "Spam post", status: "resolved", date: "2024-01-19" },
    { id: 3, reporter: "User #9012", content: "Misinformation", status: "pending", date: "2024-01-20" },
  ]

  const systemHealth = [
    { metric: "API Uptime", value: "99.98%", status: "healthy" },
    { metric: "Database Health", value: "Optimal", status: "healthy" },
    { metric: "Error Rate", value: "0.02%", status: "healthy" },
    { metric: "Response Time", value: "145ms", status: "healthy" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        navigationItems={navigationItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} onLogout={logout} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Platform Admin Dashboard</h1>
              <p className="text-muted-foreground">System management and oversight</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">18.9K</p>
                  <p className="text-xs text-muted-foreground">+32% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Hospitals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">28</p>
                  <p className="text-xs text-muted-foreground">Verified partners</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Merchants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">52</p>
                  <p className="text-xs text-muted-foreground">E-commerce partners</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Healthcare Pros</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">68</p>
                  <p className="text-xs text-muted-foreground">Verified professionals</p>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="health">System Health</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Growth</CardTitle>
                    <CardDescription>User and partner growth over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={systemMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="users" stroke="#0d9488" name="Users" />
                        <Line type="monotone" dataKey="hospitals" stroke="#f97316" name="Hospitals" />
                        <Line type="monotone" dataKey="merchants" stroke="#8b5cf6" name="Merchants" />
                        <Line type="monotone" dataKey="nakes" stroke="#06b6d4" name="Healthcare Pros" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage platform users and roles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-sm text-muted-foreground">mother@momsync.com</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>Mother</Badge>
                          <Button size="sm" variant="outline">
                            Manage
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Dr. Emily Chen</p>
                          <p className="text-sm text-muted-foreground">doctor@momsync.com</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>Doctor</Badge>
                          <Button size="sm" variant="outline">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>Manage platform content, articles, and resources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Pregnancy Care Guide</p>
                          <p className="text-sm text-muted-foreground">Published • 2024-01-15</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="default">Published</Badge>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Nutrition Tips for Mothers</p>
                          <p className="text-sm text-muted-foreground">Draft • 2024-01-18</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Draft</Badge>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Baby Development Milestones</p>
                          <p className="text-sm text-muted-foreground">Published • 2024-01-10</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="default">Published</Badge>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">Create New Content</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Analytics</CardTitle>
                    <CardDescription>Detailed analytics and performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Daily Active Users</p>
                        <p className="text-3xl font-bold mt-2">4,250</p>
                        <p className="text-xs text-muted-foreground mt-1">+12% from yesterday</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Sessions</p>
                        <p className="text-3xl font-bold mt-2">12,840</p>
                        <p className="text-xs text-muted-foreground mt-1">+8% from yesterday</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Avg Session Duration</p>
                        <p className="text-3xl font-bold mt-2">8m 32s</p>
                        <p className="text-xs text-muted-foreground mt-1">+2% from yesterday</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Bounce Rate</p>
                        <p className="text-3xl font-bold mt-2">24.5%</p>
                        <p className="text-xs text-muted-foreground mt-1">-1.2% from yesterday</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                    <CardDescription>Configure platform-wide settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Maintenance Mode</p>
                            <p className="text-sm text-muted-foreground">Enable/disable platform access</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Disabled
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Send system notifications to admins</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Enabled
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">API Rate Limiting</p>
                            <p className="text-sm text-muted-foreground">Requests per minute: 1000</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Data Backup</p>
                            <p className="text-sm text-muted-foreground">Last backup: 2024-01-20 02:00 AM</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Backup Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Verification Tab */}
              <TabsContent value="verification" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Verifications</CardTitle>
                    <CardDescription>Partner verification requests awaiting approval</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {pendingVerifications.map((verification) => (
                      <div key={verification.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{verification.name}</p>
                            <p className="text-sm text-muted-foreground">{verification.type}</p>
                          </div>
                          <Badge variant="secondary">{verification.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Documents: {verification.documents.join(", ")}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">Submitted: {verification.submittedDate}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="default">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            Request Info
                          </Button>
                          <Button size="sm" variant="destructive">
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Reports</CardTitle>
                    <CardDescription>Moderation reports from community members</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {communityReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{report.content}</p>
                          <p className="text-sm text-muted-foreground">Reported by: {report.reporter}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">{report.date}</span>
                          <Badge variant={report.status === "resolved" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* System Health Tab */}
              <TabsContent value="health" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>System Health</CardTitle>
                    <CardDescription>Real-time system performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    {systemHealth.map((health, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground">{health.metric}</p>
                        <p className="text-2xl font-bold mt-1">{health.value}</p>
                        <Badge className="mt-2" variant={health.status === "healthy" ? "default" : "destructive"}>
                          {health.status}
                        </Badge>
                      </div>
                    ))}
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
