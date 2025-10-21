"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OnboardingSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="text-5xl mb-4">✓</div>
          <CardTitle>Onboarding Submitted!</CardTitle>
          <CardDescription>Your application has been received</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              Thank you for applying to join MomSync! Our verification team will review your documents and contact you
              within 2-3 business days.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">What happens next:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Document verification (2-3 business days)</li>
              <li>✓ Background check (if applicable)</li>
              <li>✓ Account activation email</li>
              <li>✓ Access to partner dashboard</li>
            </ul>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-900">
              Check your email regularly for updates. You can also log in to check your application status.
            </p>
          </div>

          <Button onClick={() => router.push("/")} className="w-full">
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
