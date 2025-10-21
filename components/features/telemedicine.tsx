"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Phone, MessageSquare, Clock, Star, TrendingUp } from "lucide-react"
import { useState } from "react"

const consultants = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    specialty: "Obstetrics",
    rating: 4.9,
    reviews: 342,
    responseTime: "< 5 min",
    available: true,
    consultationType: ["Video", "Phone"],
    experience: "12 years",
    nextAvailable: "Now",
    hourlyRate: 50,
    successRate: 98,
    languages: ["English", "Mandarin"],
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    specialty: "Nutritionist",
    rating: 4.8,
    reviews: 287,
    responseTime: "< 10 min",
    available: true,
    consultationType: ["Video", "Chat"],
    experience: "8 years",
    nextAvailable: "In 15 min",
    hourlyRate: 40,
    successRate: 96,
    languages: ["English", "Spanish"],
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    specialty: "Pediatrician",
    rating: 4.7,
    reviews: 215,
    responseTime: "< 15 min",
    available: false,
    consultationType: ["Video", "Phone"],
    experience: "10 years",
    nextAvailable: "In 2 hours",
    hourlyRate: 55,
    successRate: 97,
    languages: ["English"],
  },
]

export default function Telemedicine() {
  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(null)
  const [consultationMode, setConsultationMode] = useState<"video" | "phone" | "chat" | null>(null)

  const selectedData = consultants.find((c) => c.id === selectedConsultant)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Professional Consultation</CardTitle>
          <CardDescription>Connect with healthcare professionals via video, phone, or chat</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {consultants.map((consultant) => (
              <div
                key={consultant.id}
                onClick={() => setSelectedConsultant(consultant.id)}
                className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                  selectedConsultant === consultant.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-lg">{consultant.name}</p>
                    <p className="text-sm text-muted-foreground">{consultant.specialty}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={consultant.available ? "default" : "secondary"}>
                      {consultant.available ? "Available" : "Busy"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{consultant.nextAvailable}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>
                      {consultant.rating} ({consultant.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {consultant.responseTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    {consultant.successRate}% success rate
                  </div>
                  <div className="text-muted-foreground">{consultant.experience} experience</div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {consultant.consultationType.includes("Video") && (
                    <Badge variant="outline" className="text-xs">
                      <Video className="h-3 w-3 mr-1" />
                      Video
                    </Badge>
                  )}
                  {consultant.consultationType.includes("Phone") && (
                    <Badge variant="outline" className="text-xs">
                      <Phone className="h-3 w-3 mr-1" />
                      Phone
                    </Badge>
                  )}
                  {consultant.consultationType.includes("Chat") && (
                    <Badge variant="outline" className="text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Chat
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {consultant.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedData && (
        <Card>
          <CardHeader>
            <CardTitle>Consultation Details</CardTitle>
            <CardDescription>Choose your preferred consultation method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">{selectedData.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedData.specialty}</p>
                </div>
                <p className="font-semibold text-primary">${selectedData.hourlyRate}/hour</p>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{selectedData.experience} of experience</p>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>{selectedData.successRate}% patient satisfaction rate</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-sm">Select Consultation Type:</p>
              <div className="grid grid-cols-3 gap-2">
                {selectedData.consultationType.includes("Video") && (
                  <Button
                    variant={consultationMode === "video" ? "default" : "outline"}
                    onClick={() => setConsultationMode("video")}
                    className={consultationMode === "video" ? "" : "bg-transparent"}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                )}
                {selectedData.consultationType.includes("Phone") && (
                  <Button
                    variant={consultationMode === "phone" ? "default" : "outline"}
                    onClick={() => setConsultationMode("phone")}
                    className={consultationMode === "phone" ? "" : "bg-transparent"}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </Button>
                )}
                {selectedData.consultationType.includes("Chat") && (
                  <Button
                    variant={consultationMode === "chat" ? "default" : "outline"}
                    onClick={() => setConsultationMode("chat")}
                    className={consultationMode === "chat" ? "" : "bg-transparent"}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                )}
              </div>
            </div>

            {consultationMode && (
              <Button className="w-full" disabled={!selectedData.available}>
                {selectedData.available ? `Start ${consultationMode} Consultation` : "Consultant Unavailable"}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
