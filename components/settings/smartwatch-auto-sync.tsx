"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { smartwatchService, type SyncSettings } from "@/lib/smartwatch-service"
import { RefreshCw, Clock, AlertCircle } from "lucide-react"

export function SmartwatchAutoSync() {
  const [syncSettings, setSyncSettings] = useState<SyncSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSyncSettings()
  }, [])

  const loadSyncSettings = async () => {
    try {
      const settings = await smartwatchService.getSyncSettings()
      setSyncSettings(settings)
    } catch (error) {
      console.error("[v0] Failed to load sync settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSyncNow = async () => {
    try {
      setSaving(true)
      await smartwatchService.syncNow()
      alert("Data synced successfully!")
    } catch (error) {
      console.error("[v0] Sync failed:", error)
      alert("Failed to sync data")
    } finally {
      setSaving(false)
    }
  }

  const handleSettingChange = async (key: keyof SyncSettings, value: any) => {
    if (!syncSettings) return

    const updatedSettings = { ...syncSettings, [key]: value }
    setSyncSettings(updatedSettings)

    try {
      await smartwatchService.updateSyncSettings({ [key]: value })
    } catch (error) {
      console.error("[v0] Failed to update setting:", error)
      setSyncSettings(syncSettings) // Revert on error
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading sync settings...</div>
  }

  if (!syncSettings) {
    return <div className="text-center py-8">Failed to load sync settings</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Auto-Sync Configuration</h2>
        <p className="text-muted-foreground mt-2">Configure how your smartwatch data is automatically synchronized</p>
      </div>

      {/* Sync Status */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <RefreshCw className="h-5 w-5" />
            Sync Status
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-800">
          <p>Your smartwatch is connected and actively syncing data. Last sync: 2 minutes ago</p>
          <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700" onClick={handleSyncNow} disabled={saving}>
            {saving ? "Syncing..." : "Sync Now"}
          </Button>
        </CardContent>
      </Card>

      {/* Sync Interval */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Sync Interval
          </CardTitle>
          <CardDescription>How often your data is synchronized from the smartwatch</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {(["realtime", "5min", "15min", "30min", "hourly"] as const).map((interval) => (
            <label
              key={interval}
              className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent"
            >
              <input
                type="radio"
                name="syncInterval"
                value={interval}
                checked={syncSettings.syncInterval === interval}
                onChange={() => handleSettingChange("syncInterval", interval)}
                className="w-4 h-4"
              />
              <div>
                <p className="font-medium capitalize">{interval === "realtime" ? "Real-time" : `Every ${interval}`}</p>
                <p className="text-sm text-muted-foreground">
                  {interval === "realtime"
                    ? "Sync data immediately when available (uses more battery)"
                    : `Sync data every ${interval}`}
                </p>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Data Types to Sync */}
      <Card>
        <CardHeader>
          <CardTitle>Data Types to Sync</CardTitle>
          <CardDescription>Select which health metrics to automatically sync from your smartwatch</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="checkbox"
              checked={syncSettings.enableHeartRateTracking}
              onChange={(e) => handleSettingChange("enableHeartRateTracking", e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium">Heart Rate</p>
              <p className="text-sm text-muted-foreground">Track heart rate and heart rate variability</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="checkbox"
              checked={syncSettings.enableBloodPressureTracking}
              onChange={(e) => handleSettingChange("enableBloodPressureTracking", e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium">Blood Pressure</p>
              <p className="text-sm text-muted-foreground">Monitor systolic and diastolic pressure</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="checkbox"
              checked={syncSettings.enableO2Tracking}
              onChange={(e) => handleSettingChange("enableO2Tracking", e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium">Oxygen Saturation (SpO2)</p>
              <p className="text-sm text-muted-foreground">Track blood oxygen levels</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="checkbox"
              checked={syncSettings.enableStressTracking}
              onChange={(e) => handleSettingChange("enableStressTracking", e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium">Stress Level</p>
              <p className="text-sm text-muted-foreground">Monitor stress and relaxation levels</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="checkbox"
              checked={syncSettings.enableSleepTracking}
              onChange={(e) => handleSettingChange("enableSleepTracking", e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium">Sleep Tracking</p>
              <p className="text-sm text-muted-foreground">Monitor sleep patterns and quality</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="checkbox"
              checked={syncSettings.enableActivityTracking}
              onChange={(e) => handleSettingChange("enableActivityTracking", e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium">Activity Tracking</p>
              <p className="text-sm text-muted-foreground">Track steps, calories, and workouts</p>
            </div>
          </label>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Alert Notifications
          </CardTitle>
          <CardDescription>Get notified about important health events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="checkbox"
              checked={syncSettings.notifyAbnormalHeartRate}
              onChange={(e) => handleSettingChange("notifyAbnormalHeartRate", e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium">Abnormal Heart Rate Alert</p>
              <p className="text-sm text-muted-foreground">Get notified of unusual heart rate patterns</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="checkbox"
              checked={syncSettings.notifyLowBattery}
              onChange={(e) => handleSettingChange("notifyLowBattery", e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium">Low Battery Alert</p>
              <p className="text-sm text-muted-foreground">Remind when device battery is low</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="checkbox"
              checked={syncSettings.notifySyncFailed}
              onChange={(e) => handleSettingChange("notifySyncFailed", e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium">Sync Failed Alert</p>
              <p className="text-sm text-muted-foreground">Notify if data sync fails</p>
            </div>
          </label>
        </CardContent>
      </Card>

      {/* Info */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Your health data is encrypted and stored securely. Only you and authorized healthcare providers can access
          your data. Smartwatch data is synced to our secure servers and never shared with third parties.
        </AlertDescription>
      </Alert>
    </div>
  )
}
