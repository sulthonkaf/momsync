"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

interface Prescription {
  id: string
  patientName: string
  doctorName: string
  doctorLicense: string
  medications: string[]
  date: string
  status: "verified" | "pending" | "rejected"
  notes: string
}

export default function PrescriptionVerification() {
  const prescriptions: Prescription[] = [
    {
      id: "RX001",
      patientName: "Ibu Siti Nurhaliza",
      doctorName: "Dr. Bambang Sutrisno",
      doctorLicense: "LIC-2024-001",
      medications: ["Metformin 500mg", "Insulin Lantus 10 units"],
      date: "2024-10-15",
      status: "verified",
      notes: "Gestational diabetes management",
    },
    {
      id: "RX002",
      patientName: "Ibu Dewi Lestari",
      doctorName: "Midwife Siti",
      doctorLicense: "LIC-2024-002",
      medications: ["Prenatal Vitamins", "Iron Supplement"],
      date: "2024-10-15",
      status: "pending",
      notes: "Routine prenatal care",
    },
    {
      id: "RX003",
      patientName: "Baby Adi",
      doctorName: "Dr. Ahmad",
      doctorLicense: "LIC-2024-003",
      medications: ["Amoxicillin 250mg/5ml"],
      date: "2024-10-14",
      status: "rejected",
      notes: "Patient has penicillin allergy - prescription rejected",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-orange-600" />
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-600">Verified</Badge>
      case "pending":
        return <Badge className="bg-orange-600">Pending Review</Badge>
      case "rejected":
        return <Badge className="bg-red-600">Rejected</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-50 border-green-200"
      case "pending":
        return "bg-orange-50 border-orange-200"
      case "rejected":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{prescriptions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {prescriptions.filter((p) => p.status === "verified").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ready to dispense</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {prescriptions.filter((p) => p.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting verification</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prescription Queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {prescriptions.map((rx) => (
            <div key={rx.id} className={`p-4 border rounded-lg ${getStatusColor(rx.status)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(rx.status)}
                  <div>
                    <h4 className="font-semibold">{rx.id}</h4>
                    <p className="text-sm text-gray-600">{rx.patientName}</p>
                  </div>
                </div>
                {getStatusBadge(rx.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <p className="text-gray-600">Prescriber</p>
                  <p className="font-semibold">{rx.doctorName}</p>
                  <p className="text-xs text-gray-500">{rx.doctorLicense}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date</p>
                  <p className="font-semibold">{rx.date}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Medications:</p>
                <div className="flex flex-wrap gap-2">
                  {rx.medications.map((med, idx) => (
                    <Badge key={idx} variant="outline">
                      {med}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">Notes: {rx.notes}</p>

              {rx.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Verify & Approve
                  </Button>
                  <Button size="sm" variant="outline">
                    Request Clarification
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
