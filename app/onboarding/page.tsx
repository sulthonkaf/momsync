"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function OnboardingPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const partnerRoles = [
    {
      id: "doctor",
      name: "Doctor / Obstetrician",
      description: "Provide medical consultations and care",
      icon: "👨‍⚕️",
      documents: ["STR (Medical License)", "SIP (Practice License)", "ID Card", "Proof of Address"],
    },
    {
      id: "midwife",
      name: "Midwife",
      description: "Provide maternal care and consultations",
      icon: "👩‍⚕️",
      documents: ["STR (Midwife License)", "SIP (Practice License)", "ID Card", "Proof of Address"],
    },
    {
      id: "nutritionist",
      name: "Nutritionist / Dietitian",
      description: "Provide nutrition guidance and programs",
      icon: "🥗",
      documents: ["Professional License", "Certification", "ID Card", "Proof of Address"],
    },
    {
      id: "hospital_admin",
      name: "Hospital Administrator",
      description: "Manage hospital operations and referrals",
      icon: "🏥",
      documents: ["Hospital License", "Tax ID", "Accreditation Certificate", "Admin ID"],
    },
    {
      id: "merchant",
      name: "Merchant / E-commerce Seller",
      description: "Sell products on MomSync Commerce",
      icon: "🛍️",
      documents: ["Business License", "Tax ID", "Product Catalog", "Bank Account Info"],
    },
    {
      id: "pharmacist",
      name: "Pharmacist / Pharmacy",
      description: "Manage prescriptions and pharmacy operations",
      icon: "💊",
      documents: ["Pharmacy License", "Pharmacist License", "Tax ID", "Product Catalog"],
    },
  ]

  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId)
  }

  const handleContinue = () => {
    if (selectedRole) {
      router.push(`/onboarding/${selectedRole}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Join MomSync as a Partner</h1>
          <p className="text-lg text-muted-foreground">
            Select your role and complete the verification process to start serving our community
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {partnerRoles.map((role) => (
            <Card
              key={role.id}
              className={`cursor-pointer transition-all ${
                selectedRole === role.id ? "ring-2 ring-teal-500 bg-teal-50" : "hover:shadow-lg"
              }`}
              onClick={() => handleSelectRole(role.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl mb-2">{role.icon}</div>
                    <CardTitle>{role.name}</CardTitle>
                  </div>
                  {selectedRole === role.id && <Badge className="bg-teal-500">Selected</Badge>}
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-foreground mb-2">Required Documents:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {role.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="mr-2">✓</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={handleContinue} disabled={!selectedRole} size="lg">
            Continue with {selectedRole ? partnerRoles.find((r) => r.id === selectedRole)?.name : "Selected Role"}
          </Button>
        </div>
      </div>
    </div>
  )
}
