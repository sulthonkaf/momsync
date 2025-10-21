"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Eye, EyeOff, Check, X } from "lucide-react"

export default function SignupPage() {
  const [step, setStep] = useState<"role" | "form">("role")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    agreeTerms: false,
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const roleOptions = [
    {
      value: "mother",
      label: "Pregnant Mother",
      description: "Track your pregnancy, health, and baby development",
      category: "End User",
    },
    {
      value: "partner",
      label: "Partner/Family",
      description: "Support your loved one's maternal health journey",
      category: "End User",
    },
    {
      value: "doctor",
      label: "Doctor",
      description: "Manage patients and provide medical consultations",
      category: "Healthcare Professional",
    },
    {
      value: "midwife",
      label: "Midwife",
      description: "Provide maternal care and support services",
      category: "Healthcare Professional",
    },
    {
      value: "nutritionist",
      label: "Nutritionist",
      description: "Create nutrition programs and dietary guidance",
      category: "Healthcare Professional",
    },
    {
      value: "hospital_admin",
      label: "Hospital Admin",
      description: "Manage hospital capacity and emergency services",
      category: "Partner",
    },
    {
      value: "merchant",
      label: "Merchant/Seller",
      description: "Sell maternal health products and services",
      category: "Partner",
    },
    {
      value: "pharmacist",
      label: "Pharmacist",
      description: "Manage prescriptions and pharmacy operations",
      category: "Partner",
    },
    {
      value: "platform_admin",
      label: "Platform Admin",
      description: "Manage MomSync platform and users",
      category: "Internal",
    },
    {
      value: "platform_support",
      label: "Platform Support",
      description: "Provide customer support and assistance",
      category: "Internal",
    },
  ]

  const groupedRoles = roleOptions.reduce(
    (acc, role) => {
      if (!acc[role.category]) acc[role.category] = []
      acc[role.category].push(role)
      return acc
    },
    {} as Record<string, typeof roleOptions>,
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"]
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-green-600"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Signup failed")
      }

      // Auto-login after signup
      await login(formData.email, formData.password)

      if (["hospital_admin", "merchant", "pharmacist"].includes(formData.role)) {
        router.push(`/onboarding/${formData.role}`)
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            {step === "role" ? "Choose your role to get started" : "Complete your profile to join MomSync"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === "role" ? (
            <div className="space-y-4">
              {Object.entries(groupedRoles).map(([category, roles]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-3">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, role: role.value }))
                          setStep("form")
                        }}
                        className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                      >
                        <div className="font-medium text-foreground">{role.label}</div>
                        <div className="text-sm text-muted-foreground mt-1">{role.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full ${
                            i < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password strength: <span className="font-medium">{strengthLabels[passwordStrength - 1]}</span>
                    </p>
                  </div>
                )}

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    {formData.password.length >= 8 ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <X size={14} className="text-muted-foreground" />
                    )}
                    <span>At least 8 characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <X size={14} className="text-muted-foreground" />
                    )}
                    <span>Uppercase and lowercase letters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/\d/.test(formData.password) ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <X size={14} className="text-muted-foreground" />
                    )}
                    <span>At least one number</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="rounded border-border mt-1"
                  required
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setStep("role")}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </div>
            </form>
          )}

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
