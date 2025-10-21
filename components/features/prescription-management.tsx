"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pill, Download, Send, Copy, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { useState } from "react"

const prescriptions = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    medication: "Prenatal Vitamins",
    dosage: "1 tablet daily",
    duration: "9 months",
    status: "Active",
    issuedDate: "2024-10-15",
    expiryDate: "2025-01-15",
    quantity: 90,
    refillsRemaining: 2,
    pharmacyName: "City Pharmacy",
    instructions: "Take with food, preferably in the morning",
  },
  {
    id: 2,
    patientName: "Emma Davis",
    medication: "Iron Supplement",
    dosage: "325mg daily",
    duration: "6 months",
    status: "Active",
    issuedDate: "2024-10-18",
    expiryDate: "2025-04-18",
    quantity: 180,
    refillsRemaining: 1,
    pharmacyName: "Health Plus Pharmacy",
    instructions: "Take on empty stomach for better absorption",
  },
  {
    id: 3,
    patientName: "Lisa Chen",
    medication: "Folic Acid",
    dosage: "400mcg daily",
    duration: "3 months",
    status: "Pending",
    issuedDate: "2024-10-19",
    expiryDate: "2025-01-19",
    quantity: 90,
    refillsRemaining: 0,
    pharmacyName: "Wellness Pharmacy",
    instructions: "Take daily, can be taken with or without food",
  },
]

export default function PrescriptionManagement() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Expired":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const handleCopyPrescription = (id: number) => {
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescription Management</CardTitle>
        <CardDescription>Manage and track patient prescriptions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{prescription.medication}</p>
                  <p className="text-sm text-muted-foreground">{prescription.patientName}</p>
                </div>
              </div>
              <Badge
                variant={prescription.status === "Active" ? "default" : "secondary"}
                className="flex items-center gap-1"
              >
                {getStatusIcon(prescription.status)}
                {prescription.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm mb-3">
              <div>
                <p className="text-muted-foreground">Dosage</p>
                <p className="font-medium">{prescription.dosage}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="font-medium">{prescription.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Issued</p>
                <p className="font-medium">{prescription.issuedDate}</p>
              </div>
            </div>

            {expandedId === prescription.id && (
              <div className="p-3 bg-muted rounded-lg mb-3 border border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium">{prescription.quantity} tablets</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Refills Remaining:</span>
                  <span className="font-medium">{prescription.refillsRemaining}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expiry Date:</span>
                  <span className="font-medium">{prescription.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pharmacy:</span>
                  <span className="font-medium">{prescription.pharmacyName}</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-muted-foreground mb-1">Instructions:</p>
                  <p className="text-xs">{prescription.instructions}</p>
                </div>
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setExpandedId(expandedId === prescription.id ? null : prescription.id)}
              >
                {expandedId === prescription.id ? "Hide Details" : "View Details"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => handleCopyPrescription(prescription.id)}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copiedId === prescription.id ? "Copied!" : "Copy"}
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Send className="h-4 w-4 mr-2" />
                Send to Pharmacy
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        ))}
        <Button className="w-full">Issue New Prescription</Button>
      </CardContent>
    </Card>
  )
}
