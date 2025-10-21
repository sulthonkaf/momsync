export interface SmartWatchDevice {
  id: string
  name: string
  type: "apple-watch" | "fitbit" | "garmin" | "samsung-watch" | "other"
  status: "connected" | "disconnected" | "syncing"
  lastSync: Date
  battery: number
  dataPermissions: {
    heartRate: boolean
    bloodPressure: boolean
    oxygenSaturation: boolean
    stressLevel: boolean
    sleep: boolean
    activity: boolean
  }
}

export interface VitalSignsData {
  timestamp: Date
  heartRate: number
  bloodPressure: string
  oxygenSaturation: number
  stressLevel: number
  source: "smartwatch" | "manual" | "manual-entry"
  deviceId?: string
}

export interface SyncSettings {
  autoSync: boolean
  syncInterval: "realtime" | "5min" | "15min" | "30min" | "hourly"
  enableHeartRateTracking: boolean
  enableBloodPressureTracking: boolean
  enableO2Tracking: boolean
  enableStressTracking: boolean
  enableSleepTracking: boolean
  enableActivityTracking: boolean
  notifyAbnormalHeartRate: boolean
  notifyLowBattery: boolean
  notifySyncFailed: boolean
}

// Mock service - dalam implementasi real akan connect ke API backend
export const smartwatchService = {
  // Get connected devices
  getConnectedDevices: async (): Promise<SmartWatchDevice[]> => {
    // TODO: Replace with actual API call
    return [
      {
        id: "device-1",
        name: "Apple Watch Series 8",
        type: "apple-watch",
        status: "connected",
        lastSync: new Date(Date.now() - 2 * 60000), // 2 minutes ago
        battery: 85,
        dataPermissions: {
          heartRate: true,
          bloodPressure: true,
          oxygenSaturation: true,
          stressLevel: true,
          sleep: true,
          activity: true,
        },
      },
    ]
  },

  // Get latest vital signs from smartwatch
  getLatestVitalSigns: async (deviceId?: string): Promise<VitalSignsData> => {
    // TODO: Replace with actual API call to fetch from smartwatch
    return {
      timestamp: new Date(),
      heartRate: 72,
      bloodPressure: "120/80",
      oxygenSaturation: 98,
      stressLevel: 45,
      source: "smartwatch",
      deviceId: deviceId || "device-1",
    }
  },

  // Get sync settings
  getSyncSettings: async (): Promise<SyncSettings> => {
    // TODO: Replace with actual API call
    return {
      autoSync: true,
      syncInterval: "realtime",
      enableHeartRateTracking: true,
      enableBloodPressureTracking: true,
      enableO2Tracking: true,
      enableStressTracking: true,
      enableSleepTracking: true,
      enableActivityTracking: true,
      notifyAbnormalHeartRate: true,
      notifyLowBattery: true,
      notifySyncFailed: false,
    }
  },

  // Update sync settings
  updateSyncSettings: async (settings: Partial<SyncSettings>): Promise<SyncSettings> => {
    // TODO: Replace with actual API call
    console.log("[v0] Updating sync settings:", settings)
    return { ...(await smartwatchService.getSyncSettings()), ...settings }
  },

  // Connect new device
  connectDevice: async (deviceType: SmartWatchDevice["type"]): Promise<SmartWatchDevice> => {
    // TODO: Replace with actual OAuth/pairing flow
    console.log("[v0] Connecting device:", deviceType)
    return {
      id: `device-${Date.now()}`,
      name: `${deviceType} Device`,
      type: deviceType,
      status: "connected",
      lastSync: new Date(),
      battery: 100,
      dataPermissions: {
        heartRate: true,
        bloodPressure: true,
        oxygenSaturation: true,
        stressLevel: true,
        sleep: true,
        activity: true,
      },
    }
  },

  // Disconnect device
  disconnectDevice: async (deviceId: string): Promise<void> => {
    // TODO: Replace with actual API call
    console.log("[v0] Disconnecting device:", deviceId)
  },

  // Manually sync data
  syncNow: async (deviceId?: string): Promise<VitalSignsData> => {
    // TODO: Replace with actual API call
    console.log("[v0] Syncing data from device:", deviceId)
    return smartwatchService.getLatestVitalSigns(deviceId)
  },
}
