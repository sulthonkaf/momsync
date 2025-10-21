"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Mail, MessageSquare } from "lucide-react"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Notification Settings</h2>
        <p className="text-muted-foreground mt-2">Control how you receive notifications</p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <p className="font-medium">Health Alerts</p>
              <p className="text-sm text-muted-foreground">Important health updates and alerts</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <p className="font-medium">Appointment Reminders</p>
              <p className="text-sm text-muted-foreground">Reminders for upcoming appointments</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input type="checkbox" className="w-4 h-4" />
            <div>
              <p className="font-medium">Weekly Summary</p>
              <p className="text-sm text-muted-foreground">Weekly health summary report</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input type="checkbox" className="w-4 h-4" />
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">News and promotional content</p>
            </div>
          </label>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <p className="font-medium">Urgent Alerts</p>
              <p className="text-sm text-muted-foreground">Critical health alerts</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <p className="font-medium">Messages</p>
              <p className="text-sm text-muted-foreground">New messages from healthcare providers</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input type="checkbox" className="w-4 h-4" />
            <div>
              <p className="font-medium">Community Activity</p>
              <p className="text-sm text-muted-foreground">Community forum updates</p>
            </div>
          </label>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            SMS Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div>
              <p className="font-medium">Critical Alerts Only</p>
              <p className="text-sm text-muted-foreground">Only critical health alerts via SMS</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input type="checkbox" className="w-4 h-4" />
            <div>
              <p className="font-medium">Appointment Reminders</p>
              <p className="text-sm text-muted-foreground">SMS reminders for appointments</p>
            </div>
          </label>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button>Save Preferences</Button>
        <Button variant="outline">Reset to Default</Button>
      </div>
    </div>
  )
}
