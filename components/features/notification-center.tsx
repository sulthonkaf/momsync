"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, AlertCircle, CheckCircle, Pill, Heart, Trash2 } from "lucide-react"
import { useState } from "react"

const mockNotifications = [
  {
    id: "1",
    type: "appointment",
    title: "Appointment Reminder",
    message: "Your prenatal checkup with Dr. Emily Chen is in 24 hours at 2:00 PM",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    priority: "high",
    actionUrl: "/appointments/1",
    icon: Calendar,
  },
  {
    id: "2",
    type: "prescription",
    title: "Prescription Ready",
    message: "Your prenatal vitamins are ready for pickup at City Pharmacy",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    priority: "medium",
    actionUrl: "/pharmacy/1",
    icon: Pill,
  },
  {
    id: "3",
    type: "vital",
    title: "Vital Alert",
    message: "Your stress level has been elevated. Consider taking a break.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    priority: "medium",
    actionUrl: "/vitals",
    icon: Heart,
  },
  {
    id: "4",
    type: "alert",
    title: "Health Tip",
    message: "Remember to stay hydrated! Drink at least 8 glasses of water today.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    priority: "low",
    actionUrl: "/health-tips",
    icon: AlertCircle,
  },
]

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<"all" | "unread" | "appointment" | "prescription" | "vital">("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true
    if (filter === "unread") return !n.read
    return n.type === filter
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-50 border-red-200"
      case "high":
        return "bg-orange-50 border-orange-200"
      case "medium":
        return "bg-yellow-50 border-yellow-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Center
              </CardTitle>
              <CardDescription>Stay updated with important health reminders and alerts</CardDescription>
            </div>
            {unreadCount > 0 && <Badge className="text-lg px-3 py-1">{unreadCount} New</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {(["all", "unread", "appointment", "prescription", "vital"] as const).map((f) => (
              <Button
                key={f}
                size="sm"
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
                className={filter === f ? "" : "bg-transparent"}
              >
                {f === "all"
                  ? "All"
                  : f === "unread"
                    ? `Unread (${unreadCount})`
                    : f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            ))}
          </div>

          {unreadCount > 0 && (
            <Button size="sm" variant="outline" onClick={handleMarkAllAsRead} className="w-full bg-transparent">
              Mark all as read
            </Button>
          )}

          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <div
                    key={notification.id}
                    className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${getPriorityColor(
                      notification.priority,
                    )} ${!notification.read ? "border-primary" : "border-border"} ${
                      expandedId === notification.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setExpandedId(expandedId === notification.id ? null : notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-sm">{notification.title}</p>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          </div>
                          <Badge variant={getPriorityBadgeVariant(notification.priority)} className="text-xs">
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{formatTime(notification.timestamp)}</p>
                      </div>
                    </div>

                    {expandedId === notification.id && (
                      <div className="mt-3 flex gap-2">
                        {notification.actionUrl && (
                          <Button size="sm" className="flex-1">
                            Take Action
                          </Button>
                        )}
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkAsRead(notification.id)
                            }}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Read
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(notification.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
