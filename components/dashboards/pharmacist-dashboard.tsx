"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Pill, Package, ShoppingCart, BarChart3 } from "lucide-react"
import { useState } from "react"

export function PharmacistDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "prescriptions", label: "Prescriptions", icon: Pill },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
  ]

  const prescriptionData = [
    { day: "Mon", pending: 12, fulfilled: 28, rejected: 2 },
    { day: "Tue", pending: 15, fulfilled: 32, rejected: 1 },
    { day: "Wed", pending: 10, fulfilled: 35, rejected: 3 },
    { day: "Thu", pending: 18, fulfilled: 30, rejected: 2 },
    { day: "Fri", pending: 14, fulfilled: 38, rejected: 1 },
    { day: "Sat", pending: 8, fulfilled: 25, rejected: 0 },
    { day: "Sun", pending: 6, fulfilled: 20, rejected: 1 },
  ]

  const inventory = [
    { id: 1, name: "Prenatal Vitamins", sku: "PV-001", stock: 250, reorderLevel: 100, status: "adequate" },
    { id: 2, name: "Iron Supplement", sku: "IS-001", stock: 45, reorderLevel: 100, status: "low" },
    { id: 3, name: "Folic Acid", sku: "FA-001", stock: 180, reorderLevel: 80, status: "adequate" },
    { id: 4, name: "Calcium Supplement", sku: "CS-001", stock: 320, reorderLevel: 150, status: "adequate" },
  ]

  const prescriptions = [
    {
      id: "RX-001",
      patient: "Sarah Johnson",
      medication: "Prenatal Vitamins",
      quantity: 30,
      status: "pending",
      date: "2024-01-20",
    },
    {
      id: "RX-002",
      patient: "Ibu Dewi",
      medication: "Iron Supplement",
      quantity: 60,
      status: "fulfilled",
      date: "2024-01-19",
    },
    {
      id: "RX-003",
      patient: "Ibu Ani",
      medication: "Folic Acid",
      quantity: 90,
      status: "fulfilled",
      date: "2024-01-18",
    },
    {
      id: "RX-004",
      patient: "Ibu Sinta",
      medication: "Calcium Supplement",
      quantity: 60,
      status: "pending",
      date: "2024-01-20",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "fulfilled":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStockColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-red-100 text-red-800"
      case "adequate":
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
              <p className="text-muted-foreground">Manage prescriptions and inventory</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Prescriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-xs text-muted-foreground">Awaiting fulfillment</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Fulfilled Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">28</p>
                  <p className="text-xs text-muted-foreground">Successfully processed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Need reordering</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Customer Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">4.8</p>
                  <p className="text-xs text-muted-foreground">Out of 5 stars</p>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Prescription Activity</CardTitle>
                    <CardDescription>Prescription fulfillment trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={prescriptionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pending" fill="#eab308" name="Pending" />
                        <Bar dataKey="fulfilled" fill="#0d9488" name="Fulfilled" />
                        <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="prescriptions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Prescriptions</CardTitle>
                    <CardDescription>Manage prescription fulfillment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {prescriptions.map((prescription) => (
                        <div key={prescription.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{prescription.id}</p>
                            <p className="text-sm text-muted-foreground">{prescription.patient}</p>
                            <p className="text-sm text-muted-foreground">
                              {prescription.medication} x{prescription.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{prescription.date}</span>
                            <Badge className={getStatusColor(prescription.status)}>{prescription.status}</Badge>
                            {prescription.status === "pending" && <Button size="sm">Fulfill</Button>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Management</CardTitle>
                    <CardDescription>Track medication stock levels</CardDescription>
                    <Button className="mt-2">Add Stock</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {inventory.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{item.stock} units</p>
                              <p className="text-xs text-muted-foreground">Reorder: {item.reorderLevel}</p>
                            </div>
                            <Badge className={getStockColor(item.status)}>{item.status}</Badge>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Track customer orders and deliveries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">Order #ORD-2024-001</p>
                          <p className="text-sm text-muted-foreground">Sarah Johnson - Prenatal Vitamins</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">Order #ORD-2024-002</p>
                          <p className="text-sm text-muted-foreground">Ibu Dewi - Iron Supplement</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-100 text-blue-800">In Transit</Badge>
                          <Button size="sm" variant="outline">
                            Track
                          </Button>
                        </div>
                      </div>
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
