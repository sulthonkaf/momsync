"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"

const contentItems = [
  {
    id: 1,
    title: "1000 Days Academy - Week 1",
    type: "Educational Content",
    status: "Published",
    views: 1240,
    createdDate: "2024-10-01",
  },
  {
    id: 2,
    title: "Nutrition Guide for Pregnant Women",
    type: "Article",
    status: "Published",
    views: 2150,
    createdDate: "2024-09-15",
  },
  {
    id: 3,
    title: "Baby Development Milestones",
    type: "Video",
    status: "Draft",
    views: 0,
    createdDate: "2024-10-18",
  },
]

export default function ContentManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management</CardTitle>
        <CardDescription>Manage educational and promotional content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button>Create New Content</Button>

        <div className="space-y-3">
          {contentItems.map((item) => (
            <div key={item.id} className="p-4 border border-border rounded-lg hover:bg-muted/50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.type}</p>
                </div>
                <Badge variant={item.status === "Published" ? "default" : "secondary"}>{item.status}</Badge>
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                <span>{item.views} views</span>
                <span>{item.createdDate}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="ghost">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
