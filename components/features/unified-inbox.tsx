"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, AlertCircle, FileText } from "lucide-react"
import { useState } from "react"

interface InboxItem {
  id: string
  from: string
  role: string
  subject: string
  preview: string
  timestamp: string
  type: "message" | "alert" | "referral" | "prescription"
  priority: "low" | "normal" | "high" | "critical"
  read: boolean
}

export default function UnifiedInbox() {
  const [items, setItems] = useState<InboxItem[]>([
    {
      id: "1",
      from: "Dr. Bambang Sutrisno",
      role: "Doctor",
      subject: "Patient Referral: Ibu Siti Nurhaliza",
      preview: "Referral for gestational diabetes management. Patient needs nutritionist consultation...",
      timestamp: "2 hours ago",
      type: "referral",
      priority: "high",
      read: false,
    },
    {
      id: "2",
      from: "Lab Pathology",
      role: "Lab",
      subject: "Lab Results Ready: Blood Glucose Test",
      preview: "Lab results for Ibu Siti Nurhaliza are now available for review",
      timestamp: "1 hour ago",
      type: "alert",
      priority: "normal",
      read: false,
    },
    {
      id: "3",
      from: "Pharmacist Rina",
      role: "Pharmacist",
      subject: "Prescription Verification Required",
      preview: "Prescription RX001 requires verification before dispensing",
      timestamp: "30 minutes ago",
      type: "prescription",
      priority: "high",
      read: false,
    },
    {
      id: "4",
      from: "Health Worker Budi",
      role: "Health Worker",
      subject: "Community Screening Report",
      preview: "Monthly stunting screening report from community program submitted",
      timestamp: "1 day ago",
      type: "message",
      priority: "normal",
      read: true,
    },
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-50 border-red-200"
      case "high":
        return "bg-orange-50 border-orange-200"
      case "normal":
        return "bg-blue-50 border-blue-200"
      case "low":
        return "bg-gray-50 border-gray-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <Badge className="bg-red-600">Critical</Badge>
      case "high":
        return <Badge className="bg-orange-600">High</Badge>
      case "normal":
        return <Badge className="bg-blue-600">Normal</Badge>
      case "low":
        return <Badge className="bg-gray-600">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "referral":
        return <FileText className="w-5 h-5 text-blue-600" />
      case "alert":
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      case "prescription":
        return <Mail className="w-5 h-5 text-green-600" />
      default:
        return <Mail className="w-5 h-5 text-gray-600" />
    }
  }

  const unreadCount = items.filter((i) => !i.read).length

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && <Badge className="ml-2 bg-red-600">{unreadCount}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {items.map((item) => (
            <Card
              key={item.id}
              className={`border ${getPriorityColor(item.priority)} ${!item.read ? "font-semibold" : ""}`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getTypeIcon(item.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{item.subject}</h4>
                        <p className="text-sm text-gray-600">
                          {item.from} • {item.role}
                        </p>
                      </div>
                      {getPriorityBadge(item.priority)}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{item.preview}</p>
                    <p className="text-xs text-gray-500">{item.timestamp}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="referrals" className="space-y-3 mt-4">
          {items
            .filter((i) => i.type === "referral")
            .map((item) => (
              <Card key={item.id} className={`border ${getPriorityColor(item.priority)}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {getTypeIcon(item.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.subject}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.from}</p>
                      <p className="text-sm text-gray-700 mt-2">{item.preview}</p>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Accept
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-3 mt-4">
          {items
            .filter((i) => i.type === "alert")
            .map((item) => (
              <Card key={item.id} className={`border ${getPriorityColor(item.priority)}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {getTypeIcon(item.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.subject}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.from}</p>
                      <p className="text-sm text-gray-700 mt-2">{item.preview}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-3 mt-4">
          {items
            .filter((i) => i.type === "prescription")
            .map((item) => (
              <Card key={item.id} className={`border ${getPriorityColor(item.priority)}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {getTypeIcon(item.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.subject}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.from}</p>
                      <p className="text-sm text-gray-700 mt-2">{item.preview}</p>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Verify
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="messages" className="space-y-3 mt-4">
          {items
            .filter((i) => i.type === "message")
            .map((item) => (
              <Card key={item.id} className={`border ${getPriorityColor(item.priority)}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {getTypeIcon(item.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.subject}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.from}</p>
                      <p className="text-sm text-gray-700 mt-2">{item.preview}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
