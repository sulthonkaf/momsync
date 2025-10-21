"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Calendar, Clock, MapPin, Filter, ChevronLeft, ChevronRight } from "lucide-react"

const availableSlots = [
  {
    id: 1,
    date: "2024-10-20",
    time: "09:00 AM",
    doctor: "Dr. Emily Chen",
    type: "Video",
    specialty: "Obstetrics",
    duration: 30,
    location: "Online",
    price: 50,
    available: true,
  },
  {
    id: 2,
    date: "2024-10-20",
    time: "02:00 PM",
    doctor: "Dr. Sarah Mitchell",
    type: "In-Person",
    specialty: "Nutrition",
    duration: 45,
    location: "City Medical Center",
    price: 75,
    available: true,
  },
  {
    id: 3,
    date: "2024-10-21",
    time: "10:30 AM",
    doctor: "Dr. Emily Chen",
    type: "Video",
    specialty: "Obstetrics",
    duration: 30,
    location: "Online",
    price: 50,
    available: true,
  },
  {
    id: 4,
    date: "2024-10-21",
    time: "03:00 PM",
    doctor: "Dr. James Wilson",
    type: "In-Person",
    specialty: "Pediatrics",
    duration: 30,
    location: "Women's Health Hospital",
    price: 60,
    available: false,
  },
]

export default function AppointmentBooking() {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [filterType, setFilterType] = useState<"all" | "video" | "in-person">("all")
  const [currentPage, setCurrentPage] = useState(0)
  const slotsPerPage = 3

  const filteredSlots = availableSlots.filter((slot) => {
    if (filterType === "all") return true
    return slot.type.toLowerCase().replace("-", "") === filterType.replace("-", "")
  })

  const paginatedSlots = filteredSlots.slice(currentPage * slotsPerPage, (currentPage + 1) * slotsPerPage)
  const totalPages = Math.ceil(filteredSlots.length / slotsPerPage)

  const handleBooking = () => {
    if (selectedSlot) {
      setBookingConfirmed(true)
      setTimeout(() => {
        setBookingConfirmed(false)
        setSelectedSlot(null)
      }, 3000)
    }
  }

  const selectedSlotData = availableSlots.find((s) => s.id === selectedSlot)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fast-Track Appointment Booking</CardTitle>
        <CardDescription>Book consultations with healthcare professionals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookingConfirmed && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-in fade-in">
            <p className="font-semibold text-sm text-green-900">Appointment Confirmed!</p>
            <p className="text-xs text-green-800 mt-2">
              Confirmation details have been sent to your email. You'll receive a reminder 24 hours before your
              appointment.
            </p>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-2">
            {(["all", "video", "in-person"] as const).map((type) => (
              <Button
                key={type}
                size="sm"
                variant={filterType === type ? "default" : "outline"}
                onClick={() => {
                  setFilterType(type)
                  setCurrentPage(0)
                }}
                className={filterType === type ? "" : "bg-transparent"}
              >
                {type === "all" ? "All" : type === "video" ? "Video" : "In-Person"}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {paginatedSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => setSelectedSlot(slot.id)}
              disabled={!slot.available}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                !slot.available
                  ? "opacity-50 cursor-not-allowed border-border"
                  : selectedSlot === slot.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">{slot.doctor}</p>
                  <p className="text-sm text-muted-foreground">{slot.specialty}</p>
                </div>
                <div className="text-right">
                  <Badge variant={slot.type === "Video" ? "default" : "secondary"}>{slot.type}</Badge>
                  <p className="text-xs font-semibold text-primary mt-1">${slot.price}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {slot.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {slot.time} ({slot.duration}min)
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {slot.location}
              </div>
            </button>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {selectedSlotData && (
          <div className="p-4 bg-muted rounded-lg border border-border">
            <p className="font-semibold text-sm mb-3">Booking Summary</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doctor:</span>
                <span className="font-medium">{selectedSlotData.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time:</span>
                <span className="font-medium">
                  {selectedSlotData.date} at {selectedSlotData.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">{selectedSlotData.type}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold text-primary">${selectedSlotData.price}</span>
              </div>
            </div>
          </div>
        )}

        {selectedSlot && (
          <Button onClick={handleBooking} className="w-full">
            Confirm Booking
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
