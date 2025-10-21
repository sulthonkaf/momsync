"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface DrugInteraction {
  drug1: string
  drug2: string
  severity: "critical" | "major" | "moderate" | "minor"
  description: string
  recommendation: string
}

export default function DrugInteractionChecker() {
  const currentMedications = ["Metformin", "Insulin Lantus", "Prenatal Vitamins"]

  const interactions: DrugInteraction[] = [
    {
      drug1: "Metformin",
      drug2: "Insulin Lantus",
      severity: "moderate",
      description: "Combined use may increase hypoglycemia risk",
      recommendation: "Monitor blood glucose closely. Adjust insulin dose if needed.",
    },
    {
      drug1: "Prenatal Vitamins",
      drug2: "Metformin",
      severity: "minor",
      description: "Metformin may reduce B12 absorption",
      recommendation: "Monitor B12 levels. Consider B12 supplementation.",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-50 border-red-200"
      case "major":
        return "bg-orange-50 border-orange-200"
      case "moderate":
        return "bg-yellow-50 border-yellow-200"
      case "minor":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-600">Critical</Badge>
      case "major":
        return <Badge className="bg-orange-600">Major</Badge>
      case "moderate":
        return <Badge className="bg-yellow-600">Moderate</Badge>
      case "minor":
        return <Badge className="bg-blue-600">Minor</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {currentMedications.map((med, idx) => (
              <Badge key={idx} variant="outline" className="text-base py-2 px-3">
                {med}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {interactions.length === 0 ? (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            No significant drug interactions detected for this medication combination.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              {interactions.length} potential drug interaction(s) detected. Review before dispensing.
            </AlertDescription>
          </Alert>

          {interactions.map((interaction, idx) => (
            <Card key={idx} className={`border ${getSeverityColor(interaction.severity)}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">
                      {interaction.drug1} + {interaction.drug2}
                    </CardTitle>
                  </div>
                  {getSeverityBadge(interaction.severity)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Interaction:</p>
                  <p className="text-sm text-gray-600 mt-1">{interaction.description}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Recommendation:</p>
                  <p className="text-sm text-gray-600 mt-1">{interaction.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
