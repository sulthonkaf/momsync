"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle, Video, Phone } from "lucide-react"
import { useState } from "react"

const appointments = [
  {
    id: 1,
    type: "Prenatal Checkup",
    doctor: "Dr. Emily Chen",
    date: "2024-10-20",
    time: "2:00 PM",
    location: "City Medical Center",
    status: "confirmed",
    consultationType: "in-person",
    notes: "Bring recent lab results",
    reminderSent: true,
    daysUntil: 2,
  },
  {
    id: 2,
    type: "Nutrition Consultation",
    doctor: "Sarah Mitchell (Nutritionist)",
    date: "2024-10-25",
    time: "10:00 AM",
    location: "Online",
    status: "confirmed",
    consultationType: "video",
    notes: "Discuss meal planning for pregnancy",
    reminderSent: false,
    daysUntil: 7,
  },
]

export default function UpcomingAppointments() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled consultations and checkups</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => setExpandedId(expandedId === apt.id ? null : apt.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold">{apt.type}</p>
                <p className="text-sm text-muted-foreground">{apt.doctor}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getStatusColor(apt.status)}`}>
                  {getStatusIcon(apt.status)}
                  <span className="ml-1">{apt.status}</span>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {apt.daysUntil} days
                </Badge>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {apt.date}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                {apt.time}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                {apt.consultationType === "video" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                {apt.location}
              </div>
            </div>

            {expandedId === apt.id && (
              <div className="p-3 bg-muted rounded-lg mb-3 border border-border">
                <p className="text-sm font-semibold mb-2">Appointment Details</p>
                <p className="text-xs text-muted-foreground mb-3">{apt.notes}</p>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Reminder {apt.reminderSent ? "sent" : "will be sent 24 hours before"}</span>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                Reschedule
              </Button>
              {apt.consultationType === "video" ? (
                <Button size="sm" className="flex-1">
                  <Video className="h-4 w-4 mr-1" />
                  Join Call
                </Button>
              ) : (
                <Button size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-1" />
                  Get Directions
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full bg-transparent">
          Book New Appointment
        </Button>
      </CardContent>
    </Card>
  )
}
