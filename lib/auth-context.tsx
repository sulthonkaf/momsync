"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { hasPermission as checkPermission } from "./rbac"

export type UserRole =
  | "mother"
  | "partner"
  | "doctor"
  | "midwife"
  | "nutritionist"
  | "hospital_admin"
  | "merchant"
  | "pharmacist"
  | "platform_admin"
  | "platform_support"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  phone?: string
  verified: boolean
  createdAt: Date
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasRole: (role: UserRole | UserRole[]) => boolean
  hasPermission: (permission: string) => boolean
  hasResourcePermission: (resource: string, action: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Role-based permissions mapping
const rolePermissions: Record<UserRole, string[]> = {
  mother: [
    "view_own_health",
    "view_baby_health",
    "access_education",
    "access_community",
    "book_consultation",
    "access_commerce",
    "view_own_records",
  ],
  partner: [
    "view_partner_health",
    "view_baby_health",
    "access_education",
    "access_community",
    "book_consultation",
    "access_commerce",
  ],
  doctor: [
    "view_patient_health",
    "view_patient_records",
    "provide_consultation",
    "manage_prescriptions",
    "access_analytics",
    "view_community_reports",
  ],
  midwife: ["view_patient_health", "view_patient_records", "provide_consultation", "manage_prescriptions"],
  nutritionist: ["view_patient_health", "provide_consultation", "manage_nutrition", "create_recipes"],
  hospital_admin: [
    "manage_hospital_data",
    "manage_capacity",
    "view_referred_patients",
    "manage_queue",
    "access_analytics",
  ],
  merchant: ["manage_products", "manage_inventory", "process_orders", "access_analytics", "manage_promotions"],
  pharmacist: ["view_prescriptions", "manage_inventory", "process_orders", "view_patient_records"],
  platform_admin: [
    "manage_users",
    "manage_roles",
    "view_analytics",
    "manage_content",
    "manage_community",
    "manage_commerce",
    "system_settings",
    "manage_compliance",
    "view_audit_logs",
  ],
  platform_support: ["view_users", "reset_password", "view_tickets", "moderate_community", "view_analytics"],
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const userData = await response.json()
      setUser(userData)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    fetch("/api/auth/logout", { method: "POST" })
  }

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false
    const roles = Array.isArray(role) ? role : [role]
    return roles.includes(user.role)
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    const permissions = rolePermissions[user.role] || []
    return permissions.includes(permission)
  }

  const hasResourcePermission = (resource: string, action: string): boolean => {
    if (!user) return false
    return checkPermission(user.role, resource, action)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        hasRole,
        hasPermission,
        hasResourcePermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
