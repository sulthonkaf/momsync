"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function RoleOnboardingPage() {
  const params = useParams()
  const router = useRouter()
  const role = params.role as string
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    documents: [] as File[],
  })

  const steps = [
    { number: 1, title: "Personal Information", description: "Enter your basic details" },
    { number: 2, title: "Professional Details", description: "Provide professional information" },
    { number: 3, title: "Document Upload", description: "Upload required documents" },
    { number: 4, title: "Review & Submit", description: "Review and submit for verification" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(e.target.files!)],
      }))
    }
  }

  const handleSubmit = async () => {
    try {
      // Submit onboarding data
      const response = await fetch("/api/onboarding/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          ...formData,
        }),
      })

      if (response.ok) {
        router.push("/onboarding/success")
      }
    } catch (error) {
      console.error("Submission failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Onboarding</h1>
          <p className="text-muted-foreground">Role: {role.replace(/_/g, " ").toUpperCase()}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step) => (
              <div key={step.number} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step.number ? "bg-teal-500 text-white" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </div>
                  {step.number < steps.length && (
                    <div className={`flex-1 h-1 mx-2 ${currentStep > step.number ? "bg-teal-500" : "bg-secondary"}`} />
                  )}
                </div>
                <p className="text-sm font-medium mt-2">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">
                    Please provide your professional credentials and qualifications for verification.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Professional License Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter your license number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter years of experience"
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900">Upload all required documents for verification.</p>
                </div>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                  </label>
                </div>
                {formData.documents.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Documents:</p>
                    {formData.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-secondary rounded">
                        <span className="text-sm">{doc.name}</span>
                        <Badge>{(doc.size / 1024 / 1024).toFixed(2)} MB</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-900">
                    Please review your information before submitting for verification.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-secondary rounded">
                    <span className="font-medium">Full Name:</span>
                    <span>{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-secondary rounded">
                    <span className="font-medium">Email:</span>
                    <span>{formData.email}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-secondary rounded">
                    <span className="font-medium">Phone:</span>
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-secondary rounded">
                    <span className="font-medium">Documents:</span>
                    <span>{formData.documents.length} uploaded</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              {currentStep < steps.length ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-teal-500 hover:bg-teal-600">
                  Submit for Verification
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
