"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, FileText, Pill, TrendingUp } from "lucide-react"

interface PatientRecord {
  id: string
  date: string
  type: "diagnosis" | "treatment" | "lab" | "note"
  title: string
  description: string
  provider: string
}

interface PatientHistoryProps {
  patientId: string
  patientName: string
}

export default function PatientHistory({ patientId, patientName }: PatientHistoryProps) {
  // Mock patient history data
  const medicalHistory: PatientRecord[] = [
    {
      id: "1",
      date: "2024-10-15",
      type: "diagnosis",
      title: "Gestational Diabetes",
      description: "Diagnosed during routine glucose screening",
      provider: "Dr. Bambang Sutrisno",
    },
    {
      id: "2",
      date: "2024-10-10",
      type: "lab",
      title: "Blood Glucose Test",
      description: "Fasting: 125 mg/dL, Random: 180 mg/dL",
      provider: "Lab Pathology",
    },
    {
      id: "3",
      date: "2024-10-05",
      type: "treatment",
      title: "Insulin Therapy Started",
      description: "Prescribed Lantus 10 units daily",
      provider: "Dr. Bambang Sutrisno",
    },
    {
      id: "4",
      date: "2024-09-28",
      type: "note",
      title: "Routine Prenatal Checkup",
      description: "BP: 130/85, Weight: 72kg, Baby HR: 145 bpm",
      provider: "Midwife Siti",
    },
  ]

  const allergies = ["Penicillin", "Shellfish"]
  const currentMedications = [
    { name: "Prenatal Vitamins", dosage: "1 tablet daily", startDate: "2024-08-01" },
    { name: "Insulin Lantus", dosage: "10 units daily", startDate: "2024-10-05" },
    { name: "Metformin", dosage: "500mg twice daily", startDate: "2024-10-05" },
  ]

  const getRecordIcon = (type: string) => {
    switch (type) {
      case "diagnosis":
        return <AlertCircle className="w-4 h-4" />
      case "lab":
        return <TrendingUp className="w-4 h-4" />
      case "treatment":
        return <Pill className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getRecordColor = (type: string) => {
    switch (type) {
      case "diagnosis":
        return "bg-red-50 border-red-200"
      case "lab":
        return "bg-blue-50 border-blue-200"
      case "treatment":
        return "bg-green-50 border-green-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history">Medical History</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
          <TabsTrigger value="vitals">Vital Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medical History - {patientName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {medicalHistory.map((record) => (
                <div key={record.id} className={`p-4 border rounded-lg ${getRecordColor(record.type)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">{getRecordIcon(record.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{record.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {record.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{record.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {record.provider} • {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Medications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentMedications.map((med, idx) => (
                <div key={idx} className="p-4 border rounded-lg bg-blue-50 border-blue-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{med.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">Dosage: {med.dosage}</p>
                      <p className="text-xs text-gray-500 mt-2">Started: {med.startDate}</p>
                    </div>
                    <Pill className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allergies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Known Allergies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allergies.map((allergy, idx) => (
                  <Badge key={idx} variant="destructive" className="text-base py-2 px-3">
                    {allergy}
                  </Badge>
                ))}
              </div>
              {allergies.length === 0 && <p className="text-gray-500">No known allergies recorded</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vital Signs Trends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Blood Pressure</p>
                  <p className="text-2xl font-bold mt-2">130/85</p>
                  <p className="text-xs text-gray-500 mt-1">Last: Oct 15, 2024</p>
                  <p className="text-xs text-orange-600 mt-2">Trending up - Monitor closely</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="text-2xl font-bold mt-2">72 kg</p>
                  <p className="text-xs text-gray-500 mt-1">Last: Oct 15, 2024</p>
                  <p className="text-xs text-green-600 mt-2">Stable</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Blood Glucose</p>
                  <p className="text-2xl font-bold mt-2">125 mg/dL</p>
                  <p className="text-xs text-gray-500 mt-1">Last: Oct 10, 2024</p>
                  <p className="text-xs text-orange-600 mt-2">Elevated - Insulin therapy ongoing</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600">Heart Rate</p>
                  <p className="text-2xl font-bold mt-2">145 bpm</p>
                  <p className="text-xs text-gray-500 mt-1">Baby HR - Oct 5, 2024</p>
                  <p className="text-xs text-green-600 mt-2">Normal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
