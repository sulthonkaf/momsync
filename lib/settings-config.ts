import type React from "react"
import type { UserRole } from "./auth-context"
import {
  User,
  Lock,
  Bell,
  Watch,
  Heart,
  Users,
  Briefcase,
  Building2,
  ShoppingCart,
  Pill,
  BarChart3,
  Shield,
  Settings,
} from "lucide-react"

export interface SettingTab {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

export const roleSettingsTabs: Record<UserRole, SettingTab[]> = {
  mother: [
    { id: "profile", label: "Profile", icon: User, description: "Personal information" },
    { id: "health", label: "Health Info", icon: Heart, description: "Pregnancy & health tracking" },
    { id: "family", label: "Family", icon: Users, description: "Add family members & partners" },
    { id: "smartwatch", label: "Devices", icon: Watch, description: "Connect smartwatch & devices" },
    { id: "account", label: "Account", icon: Lock, description: "Password & security" },
    { id: "notifications", label: "Alerts", icon: Bell, description: "Notification preferences" },
  ],
  partner: [
    { id: "profile", label: "Profile", icon: User, description: "Personal information" },
    { id: "family", label: "Family", icon: Users, description: "View family members" },
    { id: "smartwatch", label: "Devices", icon: Watch, description: "Connect smartwatch & devices" },
    { id: "account", label: "Account", icon: Lock, description: "Password & security" },
    { id: "notifications", label: "Alerts", icon: Bell, description: "Notification preferences" },
  ],
  doctor: [
    { id: "profile", label: "Profile", icon: User, description: "Professional information" },
    { id: "professional", label: "Professional", icon: Briefcase, description: "License & credentials" },
    { id: "clinic", label: "Clinic", icon: Building2, description: "Clinic information" },
    { id: "account", label: "Account", icon: Lock, description: "Password & security" },
    { id: "notifications", label: "Alerts", icon: Bell, description: "Notification preferences" },
  ],
  midwife: [
    { id: "profile", label: "Profile", icon: User, description: "Professional information" },
    { id: "professional", label: "Professional", icon: Briefcase, description: "License & credentials" },
    { id: "clinic", label: "Clinic", icon: Building2, description: "Clinic information" },
    { id: "account", label: "Account", icon: Lock, description: "Password & security" },
    { id: "notifications", label: "Alerts", icon: Bell, description: "Notification preferences" },
  ],
  nutritionist: [
    { id: "profile", label: "Profile", icon: User, description: "Professional information" },
    { id: "professional", label: "Professional", icon: Briefcase, description: "License & credentials" },
    { id: "specialization", label: "Specialization", icon: Heart, description: "Areas of expertise" },
    { id: "account", label: "Account", icon: Lock, description: "Password & security" },
    { id: "notifications", label: "Alerts", icon: Bell, description: "Notification preferences" },
  ],
  hospital_admin: [
    { id: "profile", label: "Profile", icon: User, description: "Personal information" },
    { id: "hospital", label: "Hospital", icon: Building2, description: "Hospital settings & info" },
    { id: "staff", label: "Staff", icon: Users, description: "Manage staff & departments" },
    { id: "billing", label: "Billing", icon: ShoppingCart, description: "Billing & payments" },
    { id: "account", label: "Account", icon: Lock, description: "Password & security" },
    { id: "notifications", label: "Alerts", icon: Bell, description: "Notification preferences" },
  ],
  merchant: [
    { id: "profile", label: "Profile", icon: User, description: "Personal information" },
    { id: "store", label: "Store", icon: ShoppingCart, description: "Store settings & info" },
    { id: "products", label: "Products", icon: Briefcase, description: "Manage products" },
    { id: "billing", label: "Billing", icon: ShoppingCart, description: "Payment methods" },
    { id: "account", label: "Account", icon: Lock, description: "Password & security" },
    { id: "notifications", label: "Alerts", icon: Bell, description: "Notification preferences" },
  ],
  pharmacist: [
    { id: "profile", label: "Profile", icon: User, description: "Professional information" },
    { id: "pharmacy", label: "Pharmacy", icon: Pill, description: "Pharmacy information" },
    { id: "inventory", label: "Inventory", icon: ShoppingCart, description: "Manage inventory" },
    { id: "account", label: "Account", icon: Lock, description: "Password & security" },
    { id: "notifications", label: "Alerts", icon: Bell, description: "Notification preferences" },
  ],
  platform_admin: [
    { id: "profile", label: "Profile", icon: User, description: "Personal information" },
    { id: "system", label: "System", icon: Settings, description: "System configuration" },
    { id: "users", label: "Users", icon: Users, description: "User management" },
    { id: "analytics", label: "Analytics", icon: BarChart3, description: "Platform analytics" },
    { id: "security", label: "Security", icon: Shield, description: "Security settings" },
    { id: "account", label: "Account", icon: Lock, description: "Password & security" },
  ],
  platform_support: [
    { id: "profile", label: "Profile", icon: User, description: "Personal information" },
    { id: "team", label: "Team", icon: Users, description: "Team settings" },
    { id: "knowledge", label: "Knowledge Base", icon: Briefcase, description: "Support resources" },
    { id: "account", label: "Account", icon: Lock, description: "Password & security" },
    { id: "notifications", label: "Alerts", icon: Bell, description: "Notification preferences" },
  ],
}
