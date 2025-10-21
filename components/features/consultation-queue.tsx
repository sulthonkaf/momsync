"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Phone, Video, AlertCircle, CheckCircle, User } from "lucide-react"
import { useState } from "react"

const consultations = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    type: "Video Call",
    scheduledTime: "2:00 PM",
    duration: "30 min",
    status: "Upcoming",
    priority: "Normal",
    patientAge: 28,
    reason: "Prenatal checkup",
    notes: "First-time mother, needs guidance",
  },
  {
    id: 2,
    patientName: "Emma Davis",
    type: "Phone Call",
    scheduledTime: "3:30 PM",
    duration: "20 min",
    status: "Upcoming",
    priority: "High",
    patientAge: 35,
    reason: "Gestational diabetes follow-up",
    notes: "Requires urgent attention",
  },
  {
    id: 3,
    patientName: "Lisa Chen",
    type: "In-Person",
    scheduledTime: "4:00 PM",
    duration: "45 min",
    status: "Upcoming",
    priority: "Normal",
    patientAge: 32,
    reason: "Nutrition consultation",
    notes: "Weight management discussion",
  },
]

export default function ConsultationQueue() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [activeConsultation, setActiveConsultation] = useState<number | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Upcoming":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "In Progress":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Consultation Queue</CardTitle>
          <CardDescription>Today's scheduled consultations ({consultations.length} total)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {consultations.map((consultation, index) => (
            <div
              key={consultation.id}
              className={`p-4 border-2 rounded-lg transition-all ${
                activeConsultation === consultation.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <p className="font-semibold">{consultation.patientName}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{consultation.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={consultation.priority === "High" ? "destructive" : "secondary"}
                    className="flex items-center gap-1"
                  >
                    {getStatusIcon(consultation.status)}
                    {consultation.priority}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {consultation.scheduledTime}
                </div>
                <div>{consultation.duration}</div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                {consultation.type === "Video Call" && <Video className="h-4 w-4" />}
                {consultation.type === "Phone Call" && <Phone className="h-4 w-4" />}
                <span>{consultation.type}</span>
              </div>

              {expandedId === consultation.id && (
                <div className="p-3 bg-muted rounded-lg mb-3 border border-border text-sm">
                  <p className="font-semibold mb-2">Patient Details</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>Age: {consultation.patientAge}</p>
                    <p>Reason: {consultation.reason}</p>
                    <p>Notes: {consultation.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {consultation.type === "Video Call" && (
                  <Button size="sm" className="flex-1" onClick={() => setActiveConsultation(consultation.id)}>
                    <Video className="h-4 w-4 mr-2" />
                    Join Video
                  </Button>
                )}
                {consultation.type === "Phone Call" && (
                  <Button size="sm" className="flex-1" onClick={() => setActiveConsultation(consultation.id)}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Patient
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setExpandedId(expandedId === consultation.id ? null : consultation.id)}
                >
                  {expandedId === consultation.id ? "Hide" : "Details"}
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Reschedule
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {activeConsultation && (
        <Card className="border-primary">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-lg">Active Consultation</CardTitle>
            <CardDescription>{consultations.find((c) => c.id === activeConsultation)?.patientName}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-semibold text-sm text-green-900">Consultation in Progress</p>
              <p className="text-xs text-green-800 mt-1">Connection established. Patient is ready for consultation.</p>
            </div>
            <Button variant="destructive" className="w-full">
              End Consultation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
