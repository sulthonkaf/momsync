"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { AccountSettings } from "@/components/settings/account-settings"
import { SmartwatchAutoSync } from "@/components/settings/smartwatch-auto-sync"
import { NotificationSettings } from "@/components/settings/notification-settings"
import {
  HealthInfoSettings,
  FamilySettings,
  ProfessionalSettings,
  ClinicSettings,
  HospitalSettings,
  StaffSettings,
  StoreSettings,
  PharmacySettings,
  SystemSettings,
  UserManagementSettings,
  AnalyticsSettings,
  SecuritySettings,
  TeamSettings,
  KnowledgeBaseSettings,
} from "@/components/settings/role-specific-settings"
import { roleSettingsTabs } from "@/lib/settings-config"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")

  if (!user) {
    router.push("/login")
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const settingsTabs = roleSettingsTabs[user.role] || []

  const renderSettingsContent = (tabId: string) => {
    switch (tabId) {
      // Common tabs
      case "profile":
        return <ProfileSettings user={user} />
      case "account":
        return <AccountSettings />
      case "smartwatch":
        return <SmartwatchAutoSync />
      case "notifications":
        return <NotificationSettings />

      // Mother & Partner specific
      case "health":
        return <HealthInfoSettings user={user} />
      case "family":
        return <FamilySettings user={user} />

      // Healthcare Professionals specific
      case "professional":
        return <ProfessionalSettings user={user} />
      case "clinic":
        return <ClinicSettings user={user} />
      case "specialization":
        return <ProfessionalSettings user={user} />

      // Hospital Admin specific
      case "hospital":
        return <HospitalSettings user={user} />
      case "staff":
        return <StaffSettings user={user} />
      case "billing":
        return <div className="text-muted-foreground">Billing settings coming soon...</div>

      // Merchant specific
      case "store":
        return <StoreSettings user={user} />
      case "products":
        return <div className="text-muted-foreground">Product management coming soon...</div>

      // Pharmacist specific
      case "pharmacy":
        return <PharmacySettings user={user} />
      case "inventory":
        return <div className="text-muted-foreground">Inventory management coming soon...</div>

      // Platform Admin specific
      case "system":
        return <SystemSettings user={user} />
      case "users":
        return <UserManagementSettings user={user} />
      case "analytics":
        return <AnalyticsSettings user={user} />
      case "security":
        return <SecuritySettings user={user} />

      // Platform Support specific
      case "team":
        return <TeamSettings user={user} />
      case "knowledge":
        return <KnowledgeBaseSettings user={user} />

      default:
        return <ProfileSettings user={user} />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        navigationItems={[]}
        activeTab=""
        onTabChange={() => {}}
        user={user}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} onLogout={handleLogout} />

        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList
                className="grid w-full gap-2 mb-8"
                style={{ gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))` }}
              >
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {/* Render content for each tab */}
              {settingsTabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                  {renderSettingsContent(tab.id)}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
