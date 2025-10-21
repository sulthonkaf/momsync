"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Search, Eye, MessageSquare } from "lucide-react"

const patients = [
  {
    id: "P001",
    name: "Sarah Johnson",
    age: 28,
    status: "Active",
    lastVisit: "2024-10-15",
    riskLevel: "Low",
    phone: "+1234567890",
  },
  {
    id: "P002",
    name: "Emma Davis",
    age: 32,
    status: "Active",
    lastVisit: "2024-10-18",
    riskLevel: "High",
    phone: "+1234567891",
  },
  {
    id: "P003",
    name: "Lisa Chen",
    age: 26,
    status: "Active",
    lastVisit: "2024-10-10",
    riskLevel: "Medium",
    phone: "+1234567892",
  },
  {
    id: "P004",
    name: "Maria Garcia",
    age: 30,
    status: "Inactive",
    lastVisit: "2024-09-20",
    riskLevel: "Low",
    phone: "+1234567893",
  },
]

export default function PatientList() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Patients</CardTitle>
        <CardDescription>Manage and monitor your patient list</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>Add Patient</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Patient ID</th>
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Age</th>
                <th className="text-left py-3 px-4 font-medium">Risk Level</th>
                <th className="text-left py-3 px-4 font-medium">Last Visit</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-mono text-xs">{patient.id}</td>
                  <td className="py-3 px-4">{patient.name}</td>
                  <td className="py-3 px-4">{patient.age}</td>
                  <td className="py-3 px-4">
                    <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel}</Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{patient.lastVisit}</td>
                  <td className="py-3 px-4">
                    <Badge variant={patient.status === "Active" ? "default" : "secondary"}>{patient.status}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
