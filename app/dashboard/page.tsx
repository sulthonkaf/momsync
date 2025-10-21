"use client"

import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/lib/protected-route"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import MotherDashboard from "@/components/dashboards/mother-dashboard"
import DoctorDashboard from "@/components/dashboards/doctor-dashboard"
import AdminDashboard from "@/components/dashboards/admin-dashboard"
import { NakesDashboard } from "@/components/dashboards/nakes-dashboard"
import { HospitalAdminDashboard } from "@/components/dashboards/hospital-admin-dashboard"
import { MerchantDashboard } from "@/components/dashboards/merchant-dashboard"
import { PlatformAdminDashboard } from "@/components/dashboards/platform-admin-dashboard"
import { PharmacistDashboard } from "@/components/dashboards/pharmacist-dashboard"
import { PlatformSupportDashboard } from "@/components/dashboards/platform-support-dashboard"
import NutritionistDashboard from "@/components/dashboards/nutritionist-dashboard"
import HealthWorkerDashboard from "@/components/dashboards/health-worker-dashboard"
import AdminStuntingDashboard from "@/components/dashboards/admin-stunting-dashboard"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Route to appropriate dashboard based on role
  if (user.role === "mother" || user.role === "partner") {
    return (
      <ProtectedRoute requiredRole={["mother", "partner"]}>
        <MotherDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "doctor" || user.role === "healthcare_provider") {
    return (
      <ProtectedRoute requiredRole={["doctor", "healthcare_provider"]}>
        <DoctorDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "nutritionist") {
    return (
      <ProtectedRoute requiredRole="nutritionist">
        <NutritionistDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "health_worker") {
    return (
      <ProtectedRoute requiredRole="health_worker">
        <HealthWorkerDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "midwife") {
    return (
      <ProtectedRoute requiredRole="midwife">
        <NakesDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "hospital_admin") {
    return (
      <ProtectedRoute requiredRole="hospital_admin">
        <HospitalAdminDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "merchant") {
    return (
      <ProtectedRoute requiredRole="merchant">
        <MerchantDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "pharmacist") {
    return (
      <ProtectedRoute requiredRole="pharmacist">
        <PharmacistDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "admin" && user.department === "stunting_prevention") {
    return (
      <ProtectedRoute requiredRole="admin">
        <AdminStuntingDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "admin") {
    return (
      <ProtectedRoute requiredRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "platform_admin") {
    return (
      <ProtectedRoute requiredRole="platform_admin">
        <PlatformAdminDashboard />
      </ProtectedRoute>
    )
  }

  if (user.role === "platform_support") {
    return (
      <ProtectedRoute requiredRole="platform_support">
        <PlatformSupportDashboard />
      </ProtectedRoute>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
        <p className="text-muted-foreground">Your role does not have access to a dashboard.</p>
      </div>
    </div>
  )
}
