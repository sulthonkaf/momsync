"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Search, MessageCircle, Heart } from "lucide-react"

const forumTopics = [
  {
    id: 1,
    title: "Tips for Managing Morning Sickness",
    category: "Pregnancy",
    author: "Sarah M.",
    replies: 24,
    likes: 156,
    views: 1240,
    lastActivity: "2 hours ago",
    verified: true,
  },
  {
    id: 2,
    title: "Breastfeeding Journey - First Month",
    category: "Postpartum",
    author: "Emma J.",
    replies: 18,
    likes: 98,
    views: 856,
    lastActivity: "4 hours ago",
    verified: true,
  },
  {
    id: 3,
    title: "Working Mothers - Balancing Act",
    category: "Lifestyle",
    author: "Lisa K.",
    replies: 32,
    likes: 203,
    views: 2150,
    lastActivity: "1 hour ago",
    verified: false,
  },
  {
    id: 4,
    title: "Nutrition Tips for Stunting Prevention",
    category: "Nutrition",
    author: "Dr. Chen",
    replies: 15,
    likes: 187,
    views: 1890,
    lastActivity: "3 hours ago",
    verified: true,
  },
]

const categories = ["All", "Pregnancy", "Postpartum", "Nutrition", "Lifestyle", "Baby Care"]

export default function CommunityForum() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredTopics = forumTopics.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Community Forum</CardTitle>
          <CardDescription>Connect with other mothers and share experiences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory !== cat ? "bg-transparent" : ""}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <Button className="w-full">Start New Discussion</Button>

          <div className="space-y-3">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{topic.title}</p>
                      {topic.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      by {topic.author} in {topic.category}
                    </p>
                  </div>
                  <Badge variant="secondary">{topic.category}</Badge>
                </div>

                <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {topic.replies} replies
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {topic.likes} likes
                  </div>
                  <div>{topic.views} views</div>
                  <div className="ml-auto">{topic.lastActivity}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
