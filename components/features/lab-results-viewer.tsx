"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"

interface LabResult {
  id: string
  testName: string
  date: string
  status: "normal" | "abnormal"
  value: string
  unit: string
}

export default function LabResultsViewer() {
  const labResults: LabResult[] = [
    {
      id: "1",
      testName: "Blood Glucose (Fasting)",
      date: "2024-10-15",
      status: "abnormal",
      value: "125",
      unit: "mg/dL",
    },
    {
      id: "2",
      testName: "Complete Blood Count",
      date: "2024-10-10",
      status: "normal",
      value: "All normal",
      unit: "-",
    },
    {
      id: "3",
      testName: "Ultrasound (Obstetric)",
      date: "2024-10-05",
      status: "normal",
      value: "Baby growth normal",
      unit: "-",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Lab Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {labResults.map((result) => (
          <div key={result.id} className="p-3 border rounded-lg bg-gray-50 flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{result.testName}</p>
              <p className="text-xs text-gray-600 mt-1">
                {new Date(result.date).toLocaleDateString()} • {result.value} {result.unit}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={result.status === "normal" ? "bg-green-600" : "bg-orange-600"}>{result.status}</Badge>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
