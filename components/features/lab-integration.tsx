"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Plus } from "lucide-react"

interface LabResult {
  id: string
  testName: string
  date: string
  status: "normal" | "abnormal" | "critical"
  value: string
  referenceRange: string
  unit: string
  provider: string
}

interface LabIntegrationProps {
  patientId: string
}

export default function LabIntegration({ patientId }: LabIntegrationProps) {
  // Mock lab results
  const labResults: LabResult[] = [
    {
      id: "1",
      testName: "Blood Glucose (Fasting)",
      date: "2024-10-15",
      status: "abnormal",
      value: "125",
      referenceRange: "70-100",
      unit: "mg/dL",
      provider: "Lab Pathology",
    },
    {
      id: "2",
      testName: "Hemoglobin A1C",
      date: "2024-10-15",
      status: "abnormal",
      value: "7.2",
      referenceRange: "<5.7",
      unit: "%",
      provider: "Lab Pathology",
    },
    {
      id: "3",
      testName: "Complete Blood Count",
      date: "2024-10-10",
      status: "normal",
      value: "See details",
      referenceRange: "Normal range",
      unit: "-",
      provider: "Lab Pathology",
    },
    {
      id: "4",
      testName: "Liver Function Tests",
      date: "2024-10-05",
      status: "normal",
      value: "All normal",
      referenceRange: "Normal range",
      unit: "-",
      provider: "Lab Pathology",
    },
  ]

  const pendingTests = [
    { id: "1", testName: "Ultrasound (Obstetric)", orderedDate: "2024-10-15", expectedDate: "2024-10-20" },
    { id: "2", testName: "Glucose Tolerance Test", orderedDate: "2024-10-15", expectedDate: "2024-10-22" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-50 border-green-200"
      case "abnormal":
        return "bg-orange-50 border-orange-200"
      case "critical":
        return "bg-red-50 border-red-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-600">Normal</Badge>
      case "abnormal":
        return <Badge className="bg-orange-600">Abnormal</Badge>
      case "critical":
        return <Badge className="bg-red-600">Critical</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Lab Results</TabsTrigger>
          <TabsTrigger value="pending">Pending Tests</TabsTrigger>
          <TabsTrigger value="order">Order Test</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Lab Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {labResults.map((result) => (
                <div key={result.id} className={`p-4 border rounded-lg ${getStatusColor(result.status)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{result.testName}</h4>
                        {getStatusBadge(result.status)}
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-gray-600">Value</p>
                          <p className="font-semibold">
                            {result.value} {result.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Reference Range</p>
                          <p className="font-semibold">{result.referenceRange}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Date</p>
                          <p className="font-semibold">{new Date(result.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Provider: {result.provider}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Tests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingTests.map((test) => (
                <div key={test.id} className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{test.testName}</h4>
                      <p className="text-sm text-gray-600 mt-2">
                        Ordered: {new Date(test.orderedDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Expected: {new Date(test.expectedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order New Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Complete Blood Count",
                  "Glucose Tolerance Test",
                  "Liver Function Tests",
                  "Kidney Function Tests",
                  "Thyroid Function Tests",
                  "Lipid Panel",
                ].map((test, idx) => (
                  <Button key={idx} variant="outline" className="justify-start h-auto py-3 bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    {test}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
