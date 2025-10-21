"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ShoppingCart, Package, TrendingUp, Settings } from "lucide-react"
import { useState } from "react"

export function MerchantDashboard() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const navigationItems = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "promotions", label: "Promotions", icon: Settings },
  ]

  const salesData = [
    { day: "Mon", sales: 2400, orders: 24 },
    { day: "Tue", sales: 1398, orders: 22 },
    { day: "Wed", sales: 9800, orders: 29 },
    { day: "Thu", sales: 3908, orders: 20 },
    { day: "Fri", sales: 4800, orders: 25 },
    { day: "Sat", sales: 3800, orders: 18 },
    { day: "Sun", sales: 4300, orders: 21 },
  ]

  const products = [
    { id: 1, name: "Prenatal Vitamins", sku: "PV-001", stock: 150, price: 45000, sales: 234 },
    { id: 2, name: "Iron Supplement", sku: "IS-001", stock: 89, price: 35000, sales: 156 },
    { id: 3, name: "Baby Formula", sku: "BF-001", stock: 45, price: 125000, sales: 89 },
    { id: 4, name: "Maternity Pillow", sku: "MP-001", stock: 23, price: 250000, sales: 34 },
  ]

  const orders = [
    { id: "ORD-001", customer: "Sarah Johnson", total: 450000, status: "pending", date: "2024-01-20" },
    { id: "ORD-002", customer: "Ibu Dewi", total: 125000, status: "shipped", date: "2024-01-19" },
    { id: "ORD-003", customer: "Ibu Ani", total: 375000, status: "delivered", date: "2024-01-18" },
    { id: "ORD-004", customer: "Ibu Sinta", total: 250000, status: "processing", date: "2024-01-20" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
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
              <p className="text-muted-foreground">Manage your products and sales</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Rp 28.4M</p>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">159</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">Active listings</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Avg Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">4.7</p>
                  <p className="text-xs text-muted-foreground">Out of 5 stars</p>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="promotions">Promotions</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Sales</CardTitle>
                    <CardDescription>Sales and orders for the past week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#0d9488" name="Sales (Rp)" />
                        <Bar dataKey="orders" fill="#f97316" name="Orders" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Products</CardTitle>
                    <CardDescription>Manage your product inventory</CardDescription>
                    <Button className="mt-2">Add New Product</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">Rp {product.price.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                            </div>
                            <Badge variant={product.stock > 50 ? "default" : "secondary"}>Stock: {product.stock}</Badge>
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
                    <CardDescription>Manage and track customer orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">Rp {order.total.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{order.date}</p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                            <Button size="sm" variant="outline">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="promotions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Promotions</CardTitle>
                    <CardDescription>Manage your promotional campaigns</CardDescription>
                    <Button className="mt-2">Create Promotion</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium">New Year Sale - 20% Off</p>
                        <p className="text-sm text-muted-foreground">Valid until: 2024-02-15</p>
                        <Badge className="mt-2">Active</Badge>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="font-medium">Bundle Deal - Buy 2 Get 1</p>
                        <p className="text-sm text-muted-foreground">Valid until: 2024-02-28</p>
                        <Badge className="mt-2">Active</Badge>
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
