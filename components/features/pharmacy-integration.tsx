"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pill, Truck, Clock, MapPin, Phone, CheckCircle } from "lucide-react"
import { useState } from "react"

const prescriptions = [
  {
    id: 1,
    medication: "Prenatal Vitamins",
    dosage: "1 tablet daily",
    quantity: 30,
    prescribedBy: "Dr. Emily Chen",
    status: "Ready for Pickup",
    pharmacy: "City Pharmacy",
    address: "123 Main St, Downtown",
    phone: "+1-555-0201",
    pickupTime: "2:00 PM - 6:00 PM",
    price: 25.99,
    estimatedPickup: "Today",
  },
  {
    id: 2,
    medication: "Iron Supplement",
    dosage: "325mg daily",
    quantity: 60,
    prescribedBy: "Dr. Emily Chen",
    status: "Processing",
    pharmacy: "Health Plus Pharmacy",
    address: "456 Oak Ave, Midtown",
    phone: "+1-555-0202",
    pickupTime: "10:00 AM - 8:00 PM",
    price: 18.5,
    estimatedPickup: "Tomorrow",
  },
  {
    id: 3,
    medication: "Folic Acid",
    dosage: "400mcg daily",
    quantity: 90,
    prescribedBy: "Dr. Sarah Mitchell",
    status: "Delivered",
    pharmacy: "Wellness Pharmacy",
    address: "789 Pine Rd, Uptown",
    phone: "+1-555-0203",
    pickupTime: "N/A",
    price: 12.99,
    estimatedPickup: "Delivered",
  },
]

export default function PharmacyIntegration() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ready for Pickup":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>MomSync Pharmacy</CardTitle>
          <CardDescription>Manage prescriptions and order medications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Pill className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{prescription.medication}</p>
                      <p className="text-sm text-muted-foreground">{prescription.dosage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        prescription.status === "Ready for Pickup"
                          ? "default"
                          : prescription.status === "Delivered"
                            ? "secondary"
                            : "outline"
                      }
                      className="flex items-center gap-1 justify-end"
                    >
                      {getStatusIcon(prescription.status)}
                      {prescription.status}
                    </Badge>
                    <p className="text-sm font-semibold text-primary mt-1">${prescription.price}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-medium">{prescription.quantity} tablets</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Prescribed by</p>
                    <p className="font-medium">{prescription.prescribedBy}</p>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-lg mb-3">
                  <p className="font-medium text-sm mb-2">{prescription.pharmacy}</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {prescription.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3 w-3" />
                      {prescription.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {prescription.pickupTime}
                    </div>
                  </div>
                </div>

                {expandedId === prescription.id && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-3 text-sm">
                    <p className="font-semibold text-blue-900 mb-2">Estimated {prescription.estimatedPickup}</p>
                    <p className="text-xs text-blue-800">
                      {prescription.status === "Ready for Pickup"
                        ? "Your prescription is ready! Visit the pharmacy during business hours."
                        : prescription.status === "Processing"
                          ? "Your prescription is being prepared. Check back soon."
                          : "Your prescription has been delivered successfully."}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {prescription.status === "Ready for Pickup" && (
                    <>
                      <Button size="sm" className="flex-1">
                        <Truck className="h-4 w-4 mr-1" />
                        Arrange Delivery
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <MapPin className="h-4 w-4 mr-1" />
                        Get Directions
                      </Button>
                    </>
                  )}
                  {prescription.status === "Processing" && (
                    <Button size="sm" className="w-full" disabled>
                      <Clock className="h-4 w-4 mr-1" />
                      Processing...
                    </Button>
                  )}
                  {prescription.status === "Delivered" && (
                    <Button size="sm" className="w-full" disabled>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Delivered
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setExpandedId(expandedId === prescription.id ? null : prescription.id)}
                  >
                    {expandedId === prescription.id ? "Hide" : "Details"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full bg-transparent">
            View All Prescriptions
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
