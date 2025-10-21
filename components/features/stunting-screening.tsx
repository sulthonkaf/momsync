"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Ruler, Weight } from "lucide-react"
import { useState } from "react"
import StuntingScreeningTool from "./stunting-screening-tool"

interface StuntingScreening {
  id: string
  patientName: string
  age: number
  height: number
  weight: number
  heightForAge: number
  status: "normal" | "at-risk" | "stunted"
  lastScreening: string
  referralNeeded: boolean
}

export default function StuntingScreening() {
  const [screenings, setScreenings] = useState<StuntingScreening[]>([
    {
      id: "1",
      patientName: "Bayi Adi",
      age: 18,
      height: 75,
      weight: 10.5,
      heightForAge: 72,
      status: "normal",
      lastScreening: "2024-01-10",
      referralNeeded: false,
    },
    {
      id: "2",
      patientName: "Bayi Budi",
      age: 24,
      height: 80,
      weight: 11.2,
      heightForAge: 85,
      status: "at-risk",
      lastScreening: "2024-01-08",
      referralNeeded: true,
    },
    {
      id: "3",
      patientName: "Bayi Citra",
      age: 30,
      height: 85,
      weight: 12.0,
      heightForAge: 92,
      status: "stunted",
      lastScreening: "2024-01-05",
      referralNeeded: true,
    },
  ])

  const [activeTab, setActiveTab] = useState("records")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-50 border-green-200"
      case "at-risk":
        return "bg-yellow-50 border-yellow-200"
      case "stunted":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-600">Normal Growth</Badge>
      case "at-risk":
        return <Badge className="bg-yellow-600">At Risk</Badge>
      case "stunted":
        return <Badge className="bg-red-600">Stunted</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Screening Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Screenings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{screenings.length}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">
              {screenings.filter((s) => s.status === "at-risk").length}
            </p>
            <p className="text-xs text-muted-foreground">Require monitoring</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Stunted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{screenings.filter((s) => s.status === "stunted").length}</p>
            <p className="text-xs text-muted-foreground">Require intervention</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="records">Screening Records</TabsTrigger>
          <TabsTrigger value="assessment">New Assessment</TabsTrigger>
          <TabsTrigger value="standards">WHO Standards</TabsTrigger>
        </TabsList>

        {/* Screening Records Tab */}
        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Stunting Screening Records
              </CardTitle>
              <CardDescription>Height-for-age assessment and growth monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {screenings.map((screening) => (
                <div key={screening.id} className={`border rounded-lg p-4 ${getStatusColor(screening.status)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{screening.patientName}</p>
                      <p className="text-sm text-muted-foreground">Age: {screening.age} months</p>
                    </div>
                    {getStatusBadge(screening.status)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Ruler className="h-4 w-4" />
                        {screening.height} cm
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Weight className="h-4 w-4" />
                        {screening.weight} kg
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expected Height</p>
                      <p className="font-semibold">{screening.heightForAge} cm</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deficit</p>
                      <p className="font-semibold text-red-600">
                        {(screening.heightForAge - screening.height).toFixed(1)} cm
                      </p>
                    </div>
                  </div>

                  {screening.referralNeeded && (
                    <Alert className="mb-3 bg-red-50 border-red-200">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        Referral to nutritionist recommended for intervention and meal planning
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {screening.referralNeeded && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Refer to Nutritionist
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* New Assessment Tab */}
        <TabsContent value="assessment">
          <StuntingScreeningTool />
        </TabsContent>

        {/* WHO Standards Tab */}
        <TabsContent value="standards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                WHO Growth Standards Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-semibold">Normal Growth</p>
                    <p className="text-xs text-muted-foreground mt-1">Height-for-age ≥ -1 SD</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-semibold">At Risk (Moderate)</p>
                    <p className="text-xs text-muted-foreground mt-1">Height-for-age &gt; -1 to -2 SD</p>
                  </div>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-semibold">Stunted (Severe)</p>
                    <p className="text-xs text-muted-foreground mt-1">Height-for-age &lt; -2 SD</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
