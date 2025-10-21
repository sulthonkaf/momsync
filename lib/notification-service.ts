export interface Notification {
  id: string
  type: "appointment" | "alert" | "reminder" | "prescription" | "vital"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  priority: "low" | "medium" | "high" | "critical"
  channels: ("email" | "sms" | "push" | "in-app")[]
}

export interface ReminderSchedule {
  appointmentId: string
  remindAt: Date[] // Multiple reminder times (e.g., 24h before, 1h before)
  notificationChannels: ("email" | "sms" | "push")[]
  sent: boolean
}

export class NotificationService {
  private notifications: Notification[] = []
  private reminders: ReminderSchedule[] = []

  // Add a new notification
  addNotification(notification: Omit<Notification, "id" | "timestamp" | "read">): Notification {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}`,
      timestamp: new Date(),
      read: false,
    }
    this.notifications.push(newNotification)
    return newNotification
  }

  // Get all notifications
  getNotifications(filter?: { type?: string; read?: boolean }): Notification[] {
    return this.notifications.filter((n) => {
      if (filter?.type && n.type !== filter.type) return false
      if (filter?.read !== undefined && n.read !== filter.read) return false
      return true
    })
  }

  // Mark notification as read
  markAsRead(notificationId: string): void {
    const notification = this.notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = true
    }
  }

  // Schedule appointment reminders
  scheduleReminder(appointmentId: string, appointmentTime: Date, channels: ("email" | "sms" | "push")[]): void {
    const remindTimes = [
      new Date(appointmentTime.getTime() - 24 * 60 * 60 * 1000), // 24 hours before
      new Date(appointmentTime.getTime() - 60 * 60 * 1000), // 1 hour before
      new Date(appointmentTime.getTime() - 15 * 60 * 1000), // 15 minutes before
    ]

    const reminder: ReminderSchedule = {
      appointmentId,
      remindAt: remindTimes,
      notificationChannels: channels,
      sent: false,
    }

    this.reminders.push(reminder)
  }

  // Get pending reminders
  getPendingReminders(): ReminderSchedule[] {
    const now = new Date()
    return this.reminders.filter((r) => !r.sent && r.remindAt.some((time) => time <= now))
  }

  // Mark reminder as sent
  markReminderAsSent(appointmentId: string): void {
    const reminder = this.reminders.find((r) => r.appointmentId === appointmentId)
    if (reminder) {
      reminder.sent = true
    }
  }

  // Get unread count
  getUnreadCount(): number {
    return this.notifications.filter((n) => !n.read).length
  }

  // Clear old notifications (older than 30 days)
  clearOldNotifications(): void {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    this.notifications = this.notifications.filter((n) => n.timestamp > thirtyDaysAgo)
  }
}

export const notificationService = new NotificationService()
