"use client"

import type React from "react"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import type { User } from "@/lib/auth-context"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"

interface NavigationItem {
  id: string
  label: string
  icon: LucideIcon
}

interface DashboardLayoutProps {
  user: User | null
  onLogout: () => void
  navigationItems: NavigationItem[]
  title: string
  subtitle?: string
  children: React.ReactNode
}

export default function DashboardLayout({
  user,
  onLogout,
  navigationItems,
  title,
  subtitle,
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState(navigationItems[0]?.id || "overview")

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        navigationItems={navigationItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} onLogout={onLogout} />

        <main className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header Section */}
            <div>
              <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
