"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Watch, Bluetooth, CheckCircle2, AlertCircle, Plus } from "lucide-react"

export function SmartwatchSettings() {
  const [connectedDevices, setConnectedDevices] = useState([
    {
      id: 1,
      name: "Apple Watch Series 8",
      type: "smartwatch",
      status: "connected",
      lastSync: "2 minutes ago",
      battery: 85,
    },
  ])

  const [showAddDevice, setShowAddDevice] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Smartwatch & Device Settings</h2>
        <p className="text-muted-foreground mt-2">Connect and manage your health monitoring devices</p>
      </div>

      {/* Connected Devices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bluetooth className="h-5 w-5" />
            Connected Devices
          </CardTitle>
          <CardDescription>Your paired health monitoring devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedDevices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Watch className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-sm text-muted-foreground">Last sync: {device.lastSync}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Battery: {device.battery}%</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowAddDevice(!showAddDevice)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Device
          </Button>
        </CardContent>
      </Card>

      {/* Data Sync Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Data Sync Settings</CardTitle>
          <CardDescription>Configure how your health data is synchronized</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium">Real-time Sync</p>
                <p className="text-sm text-muted-foreground">Sync data immediately when available</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium">Heart Rate Monitoring</p>
                <p className="text-sm text-muted-foreground">Track heart rate and heart rate variability</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium">Sleep Tracking</p>
                <p className="text-sm text-muted-foreground">Monitor sleep patterns and quality</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
              <input type="checkbox" className="w-4 h-4" />
              <div>
                <p className="font-medium">Activity Tracking</p>
                <p className="text-sm text-muted-foreground">Track steps, calories, and workouts</p>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Device Notifications</CardTitle>
          <CardDescription>Receive alerts from your connected devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium">Abnormal Heart Rate Alert</p>
                <p className="text-sm text-muted-foreground">Get notified of unusual heart rate patterns</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <div>
                <p className="font-medium">Low Battery Alert</p>
                <p className="text-sm text-muted-foreground">Remind when device battery is low</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
              <input type="checkbox" className="w-4 h-4" />
              <div>
                <p className="font-medium">Sync Failed Alert</p>
                <p className="text-sm text-muted-foreground">Notify if data sync fails</p>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900">
            <AlertCircle className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-amber-800">
          <p>
            Your health data is encrypted and stored securely. Only you and authorized healthcare providers can access
            your data.
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button>Save Settings</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  )
}
