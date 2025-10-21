"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bed } from "lucide-react"

interface BedStatus {
  id: string
  roomNumber: string
  bedNumber: string
  status: "occupied" | "available" | "maintenance"
  patientName?: string
  admissionDate?: string
  expectedDischarge?: string
  ward: string
}

export default function BedManagement() {
  // Mock bed data
  const beds: BedStatus[] = [
    {
      id: "1",
      roomNumber: "101",
      bedNumber: "A",
      status: "occupied",
      patientName: "Ibu Siti Nurhaliza",
      admissionDate: "2024-10-10",
      expectedDischarge: "2024-10-20",
      ward: "Maternity",
    },
    {
      id: "2",
      roomNumber: "101",
      bedNumber: "B",
      status: "available",
      ward: "Maternity",
    },
    {
      id: "3",
      roomNumber: "102",
      bedNumber: "A",
      status: "occupied",
      patientName: "Ibu Dewi Lestari",
      admissionDate: "2024-10-12",
      expectedDischarge: "2024-10-18",
      ward: "Maternity",
    },
    {
      id: "4",
      roomNumber: "102",
      bedNumber: "B",
      status: "maintenance",
      ward: "Maternity",
    },
    {
      id: "5",
      roomNumber: "201",
      bedNumber: "A",
      status: "occupied",
      patientName: "Baby Adi",
      admissionDate: "2024-10-14",
      expectedDischarge: "2024-10-16",
      ward: "Pediatrics",
    },
    {
      id: "6",
      roomNumber: "201",
      bedNumber: "B",
      status: "available",
      ward: "Pediatrics",
    },
  ]

  const wards = [
    { name: "Maternity", total: 20, occupied: 14, available: 4, maintenance: 2 },
    { name: "Pediatrics", total: 15, occupied: 8, available: 6, maintenance: 1 },
    { name: "ICU", total: 10, occupied: 9, available: 1, maintenance: 0 },
  ]

  const getBedStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-50 border-red-200"
      case "available":
        return "bg-green-50 border-green-200"
      case "maintenance":
        return "bg-gray-50 border-gray-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getBedStatusBadge = (status: string) => {
    switch (status) {
      case "occupied":
        return <Badge className="bg-red-600">Occupied</Badge>
      case "available":
        return <Badge className="bg-green-600">Available</Badge>
      case "maintenance":
        return <Badge className="bg-gray-600">Maintenance</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const occupancyRate = Math.round((beds.filter((b) => b.status === "occupied").length / beds.length) * 100)

  return (
    <div className="space-y-6">
      {/* Occupancy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Beds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{beds.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all wards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Occupied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{beds.filter((b) => b.status === "occupied").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently in use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {beds.filter((b) => b.status === "available").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Ready for admission</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {occupancyRate > 80 ? "High" : occupancyRate > 50 ? "Moderate" : "Low"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ward Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ward Capacity Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {wards.map((ward) => (
            <div key={ward.name} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{ward.name}</h4>
                <Badge variant="outline">
                  {ward.occupied}/{ward.total} beds
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(ward.occupied / ward.total) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                <div>
                  <p className="text-gray-600">Occupied</p>
                  <p className="font-semibold text-red-600">{ward.occupied}</p>
                </div>
                <div>
                  <p className="text-gray-600">Available</p>
                  <p className="font-semibold text-green-600">{ward.available}</p>
                </div>
                <div>
                  <p className="text-gray-600">Maintenance</p>
                  <p className="font-semibold text-gray-600">{ward.maintenance}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bed Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bed Status Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Beds</TabsTrigger>
              <TabsTrigger value="occupied">Occupied</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3 mt-4">
              {beds.map((bed) => (
                <div key={bed.id} className={`p-4 border rounded-lg ${getBedStatusColor(bed.status)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Bed className="w-5 h-5" />
                        <h4 className="font-semibold">
                          Room {bed.roomNumber} - Bed {bed.bedNumber}
                        </h4>
                        {getBedStatusBadge(bed.status)}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{bed.ward} Ward</p>
                      {bed.patientName && (
                        <>
                          <p className="text-sm font-medium mt-2">Patient: {bed.patientName}</p>
                          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                            <div>
                              <p className="text-gray-600">Admitted</p>
                              <p className="font-semibold">{bed.admissionDate}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Expected Discharge</p>
                              <p className="font-semibold">{bed.expectedDischarge}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="occupied" className="space-y-3 mt-4">
              {beds
                .filter((b) => b.status === "occupied")
                .map((bed) => (
                  <div key={bed.id} className={`p-4 border rounded-lg ${getBedStatusColor(bed.status)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Bed className="w-5 h-5" />
                          <h4 className="font-semibold">
                            Room {bed.roomNumber} - Bed {bed.bedNumber}
                          </h4>
                          {getBedStatusBadge(bed.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{bed.ward} Ward</p>
                        {bed.patientName && (
                          <>
                            <p className="text-sm font-medium mt-2">Patient: {bed.patientName}</p>
                            <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                              <div>
                                <p className="text-gray-600">Admitted</p>
                                <p className="font-semibold">{bed.admissionDate}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Expected Discharge</p>
                                <p className="font-semibold">{bed.expectedDischarge}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="available" className="space-y-3 mt-4">
              {beds
                .filter((b) => b.status === "available")
                .map((bed) => (
                  <div key={bed.id} className={`p-4 border rounded-lg ${getBedStatusColor(bed.status)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Bed className="w-5 h-5" />
                          <h4 className="font-semibold">
                            Room {bed.roomNumber} - Bed {bed.bedNumber}
                          </h4>
                          {getBedStatusBadge(bed.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{bed.ward} Ward</p>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Assign Patient
                      </Button>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-3 mt-4">
              {beds
                .filter((b) => b.status === "maintenance")
                .map((bed) => (
                  <div key={bed.id} className={`p-4 border rounded-lg ${getBedStatusColor(bed.status)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Bed className="w-5 h-5" />
                          <h4 className="font-semibold">
                            Room {bed.roomNumber} - Bed {bed.bedNumber}
                          </h4>
                          {getBedStatusBadge(bed.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{bed.ward} Ward</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Mark Available
                      </Button>
                    </div>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
