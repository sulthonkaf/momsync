import type { LucideIcon } from "lucide-react"
import type { UserRole } from "@/lib/auth-context"
import { Heart, Baby, BookOpen, MessageSquare, Users, Calendar, Pill, BarChart3, Settings, AlertCircle, ShoppingCart, Package, FileText, MessageSquareMore, Utensils, Share2 } from 'lucide-react'

export interface NavigationItem {
  id: string
  label: string
  icon: LucideIcon
}

export const dashboardConfig: Record<UserRole, NavigationItem[]> = {
  mother: [
    { id: "overview", label: "Overview", icon: Heart },
    { id: "monitoring", label: "Health Monitoring", icon: Heart },
    { id: "journal", label: "Health Journal", icon: BookOpen },
    { id: "baby", label: "Baby Tracker", icon: Baby },
    { id: "ai-assistant", label: "AI Assistant", icon: MessageSquare },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "community", label: "Community", icon: Users },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "nutrition", label: "Nutrition", icon: Utensils },
    { id: "family", label: "Family Sharing", icon: Share2 },
    { id: "timeline", label: "Pregnancy Timeline", icon: Calendar },
  ],
  partner: [
    { id: "overview", label: "Overview", icon: Heart },
    { id: "monitoring", label: "Partner Health", icon: Heart },
    { id: "baby", label: "Baby Tracker", icon: Baby },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "community", label: "Community", icon: Users },
  ],
  doctor: [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "patients", label: "My Patients", icon: Users },
    { id: "consultations", label: "Consultations", icon: Calendar },
    { id: "prescriptions", label: "Prescriptions", icon: Pill },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ],
  midwife: [
    { id: "overview", label: "Overview", icon: Heart },
    { id: "patients", label: "My Patients", icon: Users },
    { id: "consultations", label: "Consultations", icon: Calendar },
    { id: "records", label: "Medical Records", icon: FileText },
  ],
  nutritionist: [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "patients", label: "My Patients", icon: Users },
    { id: "nutrition", label: "Nutrition Plans", icon: BookOpen },
    { id: "recipes", label: "Recipes", icon: Pill },
  ],
  hospital_admin: [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "capacity", label: "Capacity Management", icon: Users },
    { id: "queue", label: "Patient Queue", icon: Calendar },
    { id: "referrals", label: "Referrals", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ],
  merchant: [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ],
  pharmacist: [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "prescriptions", label: "Prescriptions", icon: Pill },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
  ],
  platform_admin: [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "content", label: "Content Management", icon: FileText },
    { id: "community", label: "Community", icon: MessageSquareMore },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ],
  platform_support: [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "tickets", label: "Support Tickets", icon: AlertCircle },
    { id: "community", label: "Community Moderation", icon: MessageSquareMore },
  ],
}

export function getNavigationItems(role: UserRole): NavigationItem[] {
  return dashboardConfig[role] || []
}
