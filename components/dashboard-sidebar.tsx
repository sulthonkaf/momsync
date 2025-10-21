"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { User } from "@/lib/auth-context"

interface NavigationItem {
  id: string
  label: string
  icon: LucideIcon
}

interface DashboardSidebarProps {
  isOpen: boolean
  onToggle: () => void
  navigationItems: NavigationItem[]
  activeTab: string
  onTabChange: (tab: string) => void
  user?: User | null
}

export default function DashboardSidebar({
  isOpen,
  onToggle,
  navigationItems,
  activeTab,
  onTabChange,
  user,
}: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-20",
      )}
    >
      {/* Header */}
      <div className="h-16 border-b border-sidebar-border flex items-center justify-between px-4">
        {isOpen && <span className="font-bold text-lg">MomSync</span>}
        <Button variant="ghost" size="icon" onClick={onToggle}>
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={cn("w-full justify-start", !isOpen && "justify-center")}
              onClick={() => onTabChange(item.id)}
            >
              <Icon className="h-5 w-5" />
              {isOpen && <span className="ml-3">{item.label}</span>}
            </Button>
          )
        })}
      </nav>

      {/* User Info */}
      {isOpen && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-sm">
            <p className="font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role.replace("_", " ")}</p>
          </div>
        </div>
      )}
    </aside>
  )
}
