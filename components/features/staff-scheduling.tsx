"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, AlertCircle } from "lucide-react"

interface StaffShift {
  id: string
  staffName: string
  role: string
  shift: "morning" | "afternoon" | "night"
  date: string
  status: "scheduled" | "on-call" | "off"
  ward: string
}

export default function StaffScheduling() {
  const staffShifts: StaffShift[] = [
    {
      id: "1",
      staffName: "Dr. Bambang Sutrisno",
      role: "Obstetrician",
      shift: "morning",
      date: "2024-10-16",
      status: "scheduled",
      ward: "Maternity",
    },
    {
      id: "2",
      staffName: "Midwife Siti",
      role: "Midwife",
      shift: "afternoon",
      date: "2024-10-16",
      status: "scheduled",
      ward: "Maternity",
    },
    {
      id: "3",
      staffName: "Nurse Rina",
      role: "Nurse",
      shift: "night",
      date: "2024-10-16",
      status: "on-call",
      ward: "Maternity",
    },
    {
      id: "4",
      staffName: "Dr. Ahmad",
      role: "Pediatrician",
      shift: "morning",
      date: "2024-10-16",
      status: "scheduled",
      ward: "Pediatrics",
    },
  ]

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case "morning":
        return "bg-yellow-50 border-yellow-200"
      case "afternoon":
        return "bg-blue-50 border-blue-200"
      case "night":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-green-600">Scheduled</Badge>
      case "on-call":
        return <Badge className="bg-orange-600">On-Call</Badge>
      case "off":
        return <Badge className="bg-gray-600">Off</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Coverage Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Coverage Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Pediatrics ward is understaffed for night shift on Oct 17. Please schedule additional staff.
          </p>
          <Button size="sm" className="mt-3 bg-orange-600 hover:bg-orange-700">
            Resolve
          </Button>
        </CardContent>
      </Card>

      {/* Staff Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45</div>
            <p className="text-xs text-muted-foreground mt-1">Active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">38</div>
            <p className="text-xs text-muted-foreground mt-1">On duty</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">On-Call</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">7</div>
            <p className="text-xs text-muted-foreground mt-1">Available if needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Schedule - Oct 16, 2024
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {staffShifts.map((shift) => (
            <div key={shift.id} className={`p-4 border rounded-lg ${getShiftColor(shift.shift)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <h4 className="font-semibold">{shift.staffName}</h4>
                    {getStatusBadge(shift.status)}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{shift.role}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="capitalize">{shift.shift} Shift</span>
                    </div>
                    <span className="text-gray-600">{shift.ward} Ward</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Schedule Actions */}
      <div className="flex gap-2">
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-4 h-4 mr-2" />
          Create New Schedule
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          View Full Schedule
        </Button>
      </div>
    </div>
  )
}
