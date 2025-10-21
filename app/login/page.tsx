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
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      if (rememberMe) {
        localStorage.setItem("rememberEmail", email)
      }
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const demoAccounts = [
    { email: "mother@momsync.com", role: "Mother", category: "End User" },
    { email: "partner@momsync.com", role: "Partner", category: "End User" },
    { email: "doctor@momsync.com", role: "Doctor", category: "Healthcare" },
    { email: "midwife@momsync.com", role: "Midwife", category: "Healthcare" },
    { email: "nutritionist@momsync.com", role: "Nutritionist", category: "Healthcare" },
    { email: "hospital-admin@momsync.com", role: "Hospital Admin", category: "Partner" },
    { email: "merchant@momsync.com", role: "Merchant", category: "Partner" },
    { email: "pharmacist@momsync.com", role: "Pharmacist", category: "Partner" },
    { email: "platform-admin@momsync.com", role: "Platform Admin", category: "Internal" },
    { email: "support@momsync.com", role: "Platform Support", category: "Internal" },
  ]

  const groupedAccounts = demoAccounts.reduce(
    (acc, account) => {
      if (!acc[account.category]) acc[account.category] = []
      acc[account.category].push(account)
      return acc
    },
    {} as Record<string, typeof demoAccounts>,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Welcome to MomSync</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!showForgotPassword ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-border"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Demo Accounts</span>
                </div>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {Object.entries(groupedAccounts).map(([category, accounts]) => (
                  <div key={category}>
                    <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">{category}</div>
                    <div className="space-y-2">
                      {accounts.map((account) => (
                        <button
                          key={account.email}
                          onClick={() => {
                            setEmail(account.email)
                            setPassword("password123")
                          }}
                          className="w-full text-left p-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
                        >
                          <div className="font-medium">{account.role}</div>
                          <div className="text-xs text-muted-foreground">{account.email}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <p className="text-sm text-muted-foreground">We'll send you a link to reset your password.</p>
              <Button className="w-full">Send Reset Link</Button>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowForgotPassword(false)}>
                Back to Sign In
              </Button>
            </div>
          )}

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
