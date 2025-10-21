"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import UserManagement from "@/components/features/user-management"
import SystemAnalytics from "@/components/features/system-analytics"
import ContentManagement from "@/components/features/content-management"
import CommunityModeration from "@/components/features/community-moderation"
import { Users, BarChart3, FileText, MessageSquare, Settings, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "content", label: "Content", icon: FileText },
    { id: "community", label: "Community", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Mock statistics
  const stats = [
    { label: "Total Users", value: "1,247", change: "+45 this week" },
    { label: "Active Sessions", value: "342", change: "Right now" },
    { label: "System Health", value: "99.8%", change: "Uptime" },
    { label: "Pending Reports", value: "12", change: "Needs review" },
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
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">System management and monitoring</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, idx) => (
                    <Card key={idx}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* System Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="font-medium text-sm">High API Usage</p>
                      <p className="text-xs text-muted-foreground mt-1">API usage is at 85% of daily limit</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="font-medium text-sm">Database Backup Completed</p>
                      <p className="text-xs text-muted-foreground mt-1">Last backup: 2 hours ago</p>
                    </div>
                  </CardContent>
                </Card>

                <SystemAnalytics />
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <UserManagement />
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <SystemAnalytics />
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content">
                <ContentManagement />
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community">
                <CommunityModeration />
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Notifications</label>
                      <select className="w-full p-2 border border-border rounded-md">
                        <option>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Maintenance Mode</label>
                      <select className="w-full p-2 border border-border rounded-md">
                        <option>Off</option>
                        <option>On</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">API Rate Limit (requests/hour)</label>
                      <input
                        type="number"
                        defaultValue="10000"
                        className="w-full p-2 border border-border rounded-md"
                      />
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
