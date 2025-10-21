// Cross-Dashboard Messaging Service
// Enables real-time communication between different user roles

export interface Message {
  id: string
  senderId: string
  senderRole: "mother" | "doctor" | "nutritionist" | "pharmacist" | "health-worker" | "admin"
  senderName: string
  recipientId: string
  recipientRole: string
  content: string
  type: "message" | "alert" | "referral" | "prescription" | "report"
  priority: "low" | "normal" | "high" | "critical"
  timestamp: Date
  read: boolean
  attachments?: string[]
}

export interface Notification {
  id: string
  userId: string
  type: "message" | "alert" | "appointment" | "prescription" | "lab-result"
  title: string
  description: string
  actionUrl?: string
  read: boolean
  timestamp: Date
}

class CrossDashboardMessaging {
  private messages: Message[] = []
  private notifications: Notification[] = []
  private listeners: Map<string, Function[]> = new Map()

  // Send message between dashboards
  sendMessage(message: Omit<Message, "id" | "timestamp">): Message {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
    }

    this.messages.push(newMessage)
    this.notifyListeners("message-sent", newMessage)

    // Auto-create notification for recipient
    this.createNotification({
      userId: message.recipientId,
      type: "message",
      title: `New message from ${message.senderName}`,
      description: message.content.substring(0, 100),
      actionUrl: `/dashboard/${message.recipientRole}/messages`,
    })

    return newMessage
  }

  // Create alert/notification
  createNotification(notification: Omit<Notification, "id" | "timestamp" | "read">): Notification {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date(),
      read: false,
    }

    this.notifications.push(newNotification)
    this.notifyListeners("notification-created", newNotification)

    return newNotification
  }

  // Get messages for user
  getMessages(userId: string, role: string): Message[] {
    return this.messages.filter((m) => m.recipientId === userId || m.senderId === userId)
  }

  // Get notifications for user
  getNotifications(userId: string): Notification[] {
    return this.notifications.filter((n) => n.userId === userId)
  }

  // Mark message as read
  markMessageAsRead(messageId: string): void {
    const message = this.messages.find((m) => m.id === messageId)
    if (message) {
      message.read = true
      this.notifyListeners("message-read", message)
    }
  }

  // Mark notification as read
  markNotificationAsRead(notificationId: string): void {
    const notification = this.notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = true
      this.notifyListeners("notification-read", notification)
    }
  }

  // Send referral between professionals
  sendReferral(
    fromUserId: string,
    fromRole: string,
    toUserId: string,
    toRole: string,
    patientId: string,
    reason: string,
    details: string,
  ): Message {
    return this.sendMessage({
      senderId: fromUserId,
      senderRole: fromRole as any,
      senderName: "Healthcare Provider",
      recipientId: toUserId,
      recipientRole: toRole,
      content: `Referral for patient: ${reason}\n\n${details}`,
      type: "referral",
      priority: "high",
    })
  }

  // Send prescription notification
  sendPrescriptionNotification(
    pharmacistId: string,
    patientId: string,
    medications: string[],
    doctorName: string,
  ): Notification {
    return this.createNotification({
      userId: pharmacistId,
      type: "prescription",
      title: `New prescription from ${doctorName}`,
      description: `Medications: ${medications.join(", ")}`,
      actionUrl: "/dashboard/pharmacist/prescriptions",
    })
  }

  // Send lab result notification
  sendLabResultNotification(doctorId: string, patientName: string, testName: string): Notification {
    return this.createNotification({
      userId: doctorId,
      type: "lab-result",
      title: `Lab results available for ${patientName}`,
      description: `${testName} results are ready for review`,
      actionUrl: "/dashboard/doctor/lab-results",
    })
  }

  // Subscribe to events
  subscribe(event: string, callback: Function): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  // Notify all listeners
  private notifyListeners(event: string, data: any): void {
    const callbacks = this.listeners.get(event) || []
    callbacks.forEach((callback) => callback(data))
  }

  // Get unread count for user
  getUnreadCount(userId: string): number {
    const unreadMessages = this.messages.filter((m) => m.recipientId === userId && !m.read).length
    const unreadNotifications = this.notifications.filter((n) => n.userId === userId && !n.read).length
    return unreadMessages + unreadNotifications
  }
}

export const crossDashboardMessaging = new CrossDashboardMessaging()
