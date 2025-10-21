"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import { AlertTriangle, Phone, MapPin, Clock } from "lucide-react"

export default function EmergencySOS() {
  const [sosActive, setSosActive] = useState(false)
  const [emergencyType, setEmergencyType] = useState("medical")

  const emergencyTypes = [
    { id: "medical", label: "Medical Emergency", description: "Severe symptoms requiring immediate care" },
    { id: "labor", label: "Labor Started", description: "Contractions or water breaking" },
    { id: "bleeding", label: "Abnormal Bleeding", description: "Heavy or unusual bleeding" },
    { id: "preeclampsia", label: "Preeclampsia Symptoms", description: "Severe headache, vision changes, swelling" },
  ]

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Use the SOS button only for genuine emergencies. Emergency services will be notified immediately.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Emergency SOS System</CardTitle>
          <CardDescription>Quick access to emergency services and nearest hospital</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Emergency Type</label>
            <div className="grid grid-cols-2 gap-2">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setEmergencyType(type.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    emergencyType === type.id
                      ? "border-destructive bg-destructive/10"
                      : "border-border hover:border-destructive/50"
                  }`}
                >
                  <p className="font-medium text-sm">{type.label}</p>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {sosActive && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="font-semibold text-green-900">SOS Activated</p>
              <p className="text-sm text-green-800 mt-1">Emergency services have been notified</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Ambulance ETA: 5-7 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Nearest Hospital: City Medical Center (2.3 km)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Dispatcher: +1-555-0911</span>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={() => setSosActive(!sosActive)}
            className={`w-full h-16 text-lg font-bold ${sosActive ? "bg-green-600 hover:bg-green-700" : "bg-destructive hover:bg-destructive/90"}`}
          >
            {sosActive ? "SOS ACTIVE - Tap to Cancel" : "ACTIVATE SOS"}
          </Button>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="font-medium text-sm">Your Health Data Shared</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your vital signs, medical history, and current symptoms will be automatically shared with emergency
              responders.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
