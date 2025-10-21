"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const reports = [
  {
    id: 1,
    type: "Inappropriate Content",
    reporter: "User #1234",
    content: "Post in General Discussion",
    status: "Pending",
    reportedDate: "2024-10-18",
  },
  {
    id: 2,
    type: "Spam",
    reporter: "User #5678",
    content: "Comment in Nutrition Forum",
    status: "Reviewed",
    reportedDate: "2024-10-17",
  },
  {
    id: 3,
    type: "Harassment",
    reporter: "User #9012",
    content: "Direct Message",
    status: "Resolved",
    reportedDate: "2024-10-16",
  },
]

export default function CommunityModeration() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Moderation</CardTitle>
        <CardDescription>Review and manage community reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {reports.map((report) => (
          <div key={report.id} className="p-4 border border-border rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{report.type}</p>
                  <p className="text-sm text-muted-foreground">{report.content}</p>
                </div>
              </div>
              <Badge
                variant={
                  report.status === "Pending" ? "destructive" : report.status === "Reviewed" ? "secondary" : "default"
                }
              >
                {report.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground mb-3">
              <p>Reported by: {report.reporter}</p>
              <p>Date: {report.reportedDate}</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent text-destructive">
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
