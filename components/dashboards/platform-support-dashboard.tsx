"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Headphones, Ticket, MessageSquare, BookOpen } from "lucide-react"
import { useState } from "react"

export function PlatformSupportDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Headphones },
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "community", label: "Community", icon: MessageSquare },
    { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
  ]

  const ticketTrendData = [
    { week: "Week 1", open: 12, resolved: 45, pending: 8 },
    { week: "Week 2", open: 15, resolved: 52, pending: 10 },
    { week: "Week 3", open: 10, resolved: 48, pending: 7 },
    { week: "Week 4", open: 18, resolved: 55, pending: 12 },
  ]

  const supportTickets = [
    {
      id: "TKT-001",
      user: "Sarah Johnson",
      issue: "Cannot reset password",
      priority: "high",
      status: "open",
      date: "2024-01-20",
    },
    {
      id: "TKT-002",
      user: "Ibu Dewi",
      issue: "App crashes on startup",
      priority: "critical",
      status: "open",
      date: "2024-01-20",
    },
    {
      id: "TKT-003",
      user: "Ibu Ani",
      issue: "Billing issue",
      priority: "medium",
      status: "pending",
      date: "2024-01-19",
    },
    {
      id: "TKT-004",
      user: "Dr. Budi",
      issue: "Feature request",
      priority: "low",
      status: "resolved",
      date: "2024-01-18",
    },
  ]

  const communityReports = [
    { id: 1, reporter: "User #1234", content: "Inappropriate language", status: "pending", date: "2024-01-20" },
    { id: 2, reporter: "User #5678", content: "Spam post", status: "resolved", date: "2024-01-19" },
    { id: 3, reporter: "User #9012", content: "Misinformation", status: "pending", date: "2024-01-20" },
  ]

  const knowledgeBase = [
    { id: 1, title: "How to reset password", views: 1250, helpful: 95 },
    { id: 2, title: "Getting started with MomSync", views: 2100, helpful: 98 },
    { id: 3, title: "Understanding vital monitoring", views: 890, helpful: 92 },
    { id: 4, title: "Booking consultations", views: 1450, helpful: 96 },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
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
              <p className="text-muted-foreground">User support and community management</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Open Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-xs text-muted-foreground">Awaiting response</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Resolved This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">55</p>
                  <p className="text-xs text-muted-foreground">+12% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">2.3h</p>
                  <p className="text-xs text-muted-foreground">Within SLA</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Satisfaction Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-xs text-muted-foreground">User satisfaction</p>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Support Ticket Trends</CardTitle>
                    <CardDescription>Weekly ticket activity and resolution rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={ticketTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="open" stroke="#ef4444" name="Open" />
                        <Line type="monotone" dataKey="resolved" stroke="#0d9488" name="Resolved" />
                        <Line type="monotone" dataKey="pending" stroke="#f97316" name="Pending" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tickets" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                    <CardDescription>Manage user support requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {supportTickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{ticket.id}</p>
                            <p className="text-sm text-muted-foreground">{ticket.user}</p>
                            <p className="text-sm text-muted-foreground">{ticket.issue}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                            <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                            <Button size="sm" variant="outline">
                              {ticket.status === "resolved" ? "View" : "Respond"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="community" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Reports</CardTitle>
                    <CardDescription>Moderation reports from community members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
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
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="knowledge" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Knowledge Base Articles</CardTitle>
                    <CardDescription>Manage self-service documentation</CardDescription>
                    <Button className="mt-2">Create Article</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {knowledgeBase.map((article) => (
                        <div key={article.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{article.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {article.views} views • {article.helpful}% helpful
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              Analytics
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Support Analytics</CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Tickets (This Month)</p>
                      <p className="text-2xl font-bold mt-1">287</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Resolution Rate</p>
                      <p className="text-2xl font-bold mt-1">96%</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
                      <p className="text-2xl font-bold mt-1">4.2h</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-muted-foreground">First Contact Resolution</p>
                      <p className="text-2xl font-bold mt-1">78%</p>
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
