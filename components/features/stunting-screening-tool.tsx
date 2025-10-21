"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, TrendingDown } from "lucide-react"
import { useState } from "react"

interface ScreeningResult {
  childName: string
  age: number
  height: number
  weight: number
  muac: number
  expectedHeight: number
  heightForAge: number
  severity: "normal" | "mild" | "moderate" | "severe"
  recommendation: string
}

export default function StuntingScreeningTool() {
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    height: "",
    weight: "",
    muac: "",
  })

  const [result, setResult] = useState<ScreeningResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  // WHO Growth Standards (simplified)
  const whoStandards: Record<number, { height: number; weight: number }> = {
    6: { height: 67, weight: 7.3 },
    12: { height: 75, weight: 9.6 },
    18: { height: 81, weight: 11.5 },
    24: { height: 87, weight: 13.5 },
    30: { height: 91, weight: 15.0 },
    36: { height: 95, weight: 16.5 },
  }

  const calculateSeverity = (heightDeficit: number): ScreeningResult["severity"] => {
    if (heightDeficit < 1) return "normal"
    if (heightDeficit < 2) return "mild"
    if (heightDeficit < 3) return "moderate"
    return "severe"
  }

  const getRecommendation = (severity: ScreeningResult["severity"]): string => {
    switch (severity) {
      case "normal":
        return "Child is within normal growth range. Continue regular monitoring and maintain good nutrition."
      case "mild":
        return "Mild stunting detected. Recommend nutritional counseling and monthly follow-up monitoring."
      case "moderate":
        return "Moderate stunting detected. Refer to nutritionist for intervention plan. Follow-up in 2 weeks."
      case "severe":
        return "Severe stunting detected. Urgent referral to nutritionist and pediatrician. Weekly monitoring required."
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAssess = () => {
    const age = Number.parseInt(formData.age)
    const height = Number.parseFloat(formData.height)
    const weight = Number.parseFloat(formData.weight)
    const muac = Number.parseFloat(formData.muac)

    // Find closest WHO standard
    const closestAge = Object.keys(whoStandards)
      .map(Number)
      .reduce((prev, curr) => (Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev))

    const standard = whoStandards[closestAge]
    const heightDeficit = standard.height - height
    const severity = calculateSeverity(heightDeficit)

    const screeningResult: ScreeningResult = {
      childName: formData.childName,
      age,
      height,
      weight,
      muac,
      expectedHeight: standard.height,
      heightForAge: heightDeficit,
      severity,
      recommendation: getRecommendation(severity),
    }

    setResult(screeningResult)
    setShowResult(true)
  }

  const getSeverityColor = (severity: ScreeningResult["severity"]) => {
    switch (severity) {
      case "normal":
        return "text-green-600 bg-green-50 border-green-200"
      case "mild":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "moderate":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "severe":
        return "text-red-600 bg-red-50 border-red-200"
    }
  }

  const getSeverityIcon = (severity: ScreeningResult["severity"]) => {
    switch (severity) {
      case "normal":
        return <CheckCircle className="h-5 w-5" />
      case "severe":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <TrendingDown className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Stunting Screening Tool</h2>
        <p className="text-muted-foreground mt-2">WHO-based height-for-age assessment for early stunting detection</p>
      </div>

      <Tabs defaultValue="screening" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="screening">Screening</TabsTrigger>
          <TabsTrigger value="standards">WHO Standards</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        {/* Screening Tab */}
        <TabsContent value="screening" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Child Assessment Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Child Name</label>
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  placeholder="Enter child's name"
                  className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Age (months)</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g., 24"
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="e.g., 78"
                    step="0.1"
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="e.g., 13.5"
                    step="0.1"
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">MUAC (cm)</label>
                  <input
                    type="number"
                    name="muac"
                    value={formData.muac}
                    onChange={handleInputChange}
                    placeholder="e.g., 14.5"
                    step="0.1"
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                  />
                </div>
              </div>

              <Button onClick={handleAssess} className="w-full">
                Assess Stunting Risk
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {showResult && result && (
            <Card className={`border-2 ${getSeverityColor(result.severity)}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getSeverityIcon(result.severity)}
                    Assessment Result
                  </CardTitle>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(result.severity)}`}>
                    {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/50 p-3 rounded">
                    <p className="text-xs text-muted-foreground">Child Name</p>
                    <p className="font-semibold">{result.childName}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded">
                    <p className="text-xs text-muted-foreground">Age</p>
                    <p className="font-semibold">{result.age} months</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded">
                    <p className="text-xs text-muted-foreground">Current Height</p>
                    <p className="font-semibold">{result.height} cm</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded">
                    <p className="text-xs text-muted-foreground">Expected Height</p>
                    <p className="font-semibold">{result.expectedHeight} cm</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-muted/30">
                  <div className="font-semibold mb-2">Height-for-Age Analysis</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Height Deficit:</span>
                      <span className="font-semibold">{result.heightForAge.toFixed(1)} cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight:</span>
                      <span className="font-semibold">{result.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MUAC:</span>
                      <span className="font-semibold">{result.muac} cm</span>
                    </div>
                  </div>
                </div>

                <Alert variant={result.severity === "severe" ? "destructive" : "default"}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="font-semibold mb-1">Clinical Recommendation</div>
                    <div className="text-sm">{result.recommendation}</div>
                  </AlertDescription>
                </Alert>

                <div className="flex gap-2">
                  <Button className="flex-1">Save Assessment</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Refer to Nutritionist
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Print Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* WHO Standards Tab */}
        <TabsContent value="standards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>WHO Height-for-Age Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Age (months)</th>
                      <th className="text-left py-2 px-3">Expected Height (cm)</th>
                      <th className="text-left py-2 px-3">Expected Weight (kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(whoStandards).map(([age, standards]) => (
                      <tr key={age} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-3">{age}</td>
                        <td className="py-2 px-3">{standards.height}</td>
                        <td className="py-2 px-3">{standards.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: These are simplified WHO standards. For precise assessment, refer to complete WHO growth charts.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guidelines Tab */}
        <TabsContent value="guidelines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stunting Classification Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                <div className="font-semibold text-green-900 mb-2">Normal</div>
                <p className="text-sm text-green-800">
                  Height-for-age within normal range. Continue regular monitoring.
                </p>
              </div>

              <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                <div className="font-semibold text-yellow-900 mb-2">Mild Stunting</div>
                <p className="text-sm text-yellow-800">
                  Height deficit 1-2 cm. Recommend nutritional counseling and monthly follow-up.
                </p>
              </div>

              <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
                <div className="font-semibold text-orange-900 mb-2">Moderate Stunting</div>
                <p className="text-sm text-orange-800">
                  Height deficit 2-3 cm. Refer to nutritionist for intervention. Follow-up in 2 weeks.
                </p>
              </div>

              <div className="border rounded-lg p-4 bg-red-50 border-red-200">
                <div className="font-semibold text-red-900 mb-2">Severe Stunting</div>
                <p className="text-sm text-red-800">
                  Height deficit greater than 3 cm. Urgent referral required. Weekly monitoring essential.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Measurements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="font-semibold text-sm mb-1">Height-for-Age (HAZ)</div>
                <p className="text-sm text-muted-foreground">
                  Primary indicator of stunting. Measures child's height against age-specific WHO standards.
                </p>
              </div>

              <div className="border rounded-lg p-3">
                <div className="font-semibold text-sm mb-1">MUAC (Mid-Upper Arm Circumference)</div>
                <p className="text-sm text-muted-foreground">
                  Indicates acute malnutrition. MUAC &lt; 12.5 cm suggests acute malnutrition in children 6-59 months.
                </p>
              </div>

              <div className="border rounded-lg p-3">
                <div className="font-semibold text-sm mb-1">Weight-for-Height (WHZ)</div>
                <p className="text-sm text-muted-foreground">
                  Indicates acute malnutrition. Complements height-for-age assessment for comprehensive evaluation.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
