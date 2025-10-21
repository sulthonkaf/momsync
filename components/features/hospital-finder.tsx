"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { MapPin, Phone, Clock, Zap, Star, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

const hospitals = [
  {
    id: 1,
    name: "City Medical Center",
    distance: "2.3 km",
    availability: "Available",
    capacity: 85,
    specialties: ["Obstetrics", "Neonatal Care", "Emergency"],
    phone: "+1-555-0101",
    hours: "24/7",
    rating: 4.8,
    reviews: 342,
    waitTime: "15 min",
    emergencyServices: true,
    neonatalICU: true,
    maternityWard: true,
    score: 95,
  },
  {
    id: 2,
    name: "Women's Health Hospital",
    distance: "4.1 km",
    availability: "Available",
    capacity: 60,
    specialties: ["Obstetrics", "Gynecology", "Maternal Care"],
    phone: "+1-555-0102",
    hours: "24/7",
    rating: 4.9,
    reviews: 456,
    waitTime: "20 min",
    emergencyServices: true,
    neonatalICU: true,
    maternityWard: true,
    score: 98,
  },
  {
    id: 3,
    name: "General Hospital",
    distance: "5.8 km",
    availability: "Limited",
    capacity: 95,
    specialties: ["Emergency", "General Care"],
    phone: "+1-555-0103",
    hours: "24/7",
    rating: 4.5,
    reviews: 218,
    waitTime: "45 min",
    emergencyServices: true,
    neonatalICU: false,
    maternityWard: false,
    score: 72,
  },
]

export default function HospitalFinder() {
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null)
  const [urgency, setUrgency] = useState("routine")
  const [location, setLocation] = useState("")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const sortedHospitals = [...hospitals].sort((a, b) => {
    if (urgency === "emergency") {
      return b.score - a.score
    }
    return a.distance.localeCompare(b.distance)
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "routine":
        return "bg-blue-50 border-blue-200"
      case "urgent":
        return "bg-yellow-50 border-yellow-200"
      case "emergency":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Smart Hospital Finder</CardTitle>
          <CardDescription>Find the best hospital based on your condition and location</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Your Location</label>
              <Input
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Urgency Level</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full mt-1 p-2 border border-border rounded-md bg-background"
              >
                <option value="routine">Routine Checkup</option>
                <option value="urgent">Urgent</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
          </div>
          <Button className="w-full">Find Hospitals</Button>
        </CardContent>
      </Card>

      {urgency === "emergency" && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">Emergency Mode Active</p>
                <p className="text-sm text-red-800 mt-1">
                  Hospitals are sorted by emergency readiness and response time. Call 911 if this is a life-threatening
                  emergency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {sortedHospitals.map((hospital) => (
          <Card
            key={hospital.id}
            className={`cursor-pointer transition-all ${selectedHospital === hospital.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelectedHospital(hospital.id)}
          >
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-lg">{hospital.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    {hospital.distance}
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={hospital.availability === "Available" ? "default" : "secondary"}
                    className="flex items-center gap-1 justify-end"
                  >
                    {hospital.availability === "Available" ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <AlertCircle className="h-3 w-3" />
                    )}
                    {hospital.availability}
                  </Badge>
                  <div className="flex items-center gap-1 mt-1 justify-end">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{hospital.rating}</span>
                    <span className="text-xs text-muted-foreground">({hospital.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{hospital.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{hospital.hours}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="p-2 bg-background rounded border border-border">
                  <p className="text-muted-foreground text-xs">Wait Time</p>
                  <p className="font-semibold">{hospital.waitTime}</p>
                </div>
                <div className="p-2 bg-background rounded border border-border">
                  <p className="text-muted-foreground text-xs">Bed Capacity</p>
                  <p className="font-semibold">{hospital.capacity}% occupied</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Facilities:</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    {hospital.emergencyServices ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-gray-400" />
                    )}
                    <span>Emergency Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hospital.neonatalICU ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-gray-400" />
                    )}
                    <span>Neonatal ICU</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hospital.maternityWard ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-gray-400" />
                    )}
                    <span>Maternity Ward</span>
                  </div>
                </div>
              </div>

              <div className="mb-4 p-3 bg-muted rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <p className="font-semibold text-sm">Recommendation Score</p>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${hospital.score}%` }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{hospital.score}/100 - Highly Recommended</p>
              </div>

              {selectedHospital === hospital.id && (
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Zap className="h-4 w-4 mr-2" />
                    Fast-Track Booking
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
