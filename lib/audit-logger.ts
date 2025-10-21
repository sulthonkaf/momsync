export type AuditAction =
  | "LOGIN"
  | "LOGOUT"
  | "CREATE_USER"
  | "UPDATE_USER"
  | "DELETE_USER"
  | "VERIFY_PARTNER"
  | "REJECT_PARTNER"
  | "VIEW_PATIENT_DATA"
  | "CREATE_PRESCRIPTION"
  | "UPDATE_PRESCRIPTION"
  | "CREATE_CONSULTATION"
  | "MANAGE_PRODUCT"
  | "PROCESS_ORDER"
  | "MODERATE_CONTENT"
  | "SUSPEND_USER"
  | "EXPORT_DATA"
  | "SYSTEM_SETTING_CHANGE"

export interface AuditLog {
  id: string
  userId: string
  userRole: string
  action: AuditAction
  resource: string
  resourceId: string
  changes?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
  status: "success" | "failure"
  errorMessage?: string
  timestamp: Date
  metadata?: Record<string, unknown>
}

// Mock audit logs storage - replace with real database
const auditLogs: AuditLog[] = []

export async function logAuditEvent(
  userId: string,
  userRole: string,
  action: AuditAction,
  resource: string,
  resourceId: string,
  options?: {
    changes?: Record<string, unknown>
    status?: "success" | "failure"
    errorMessage?: string
    metadata?: Record<string, unknown>
  },
): Promise<void> {
  const log: AuditLog = {
    id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    userRole,
    action,
    resource,
    resourceId,
    changes: options?.changes,
    status: options?.status || "success",
    errorMessage: options?.errorMessage,
    timestamp: new Date(),
    metadata: options?.metadata,
  }

  auditLogs.push(log)

  // In production, this would be sent to a logging service
  console.log("[AUDIT]", log)
}

export function getAuditLogs(filters?: {
  userId?: string
  action?: AuditAction
  resource?: string
  startDate?: Date
  endDate?: Date
  limit?: number
}): AuditLog[] {
  let filtered = [...auditLogs]

  if (filters?.userId) {
    filtered = filtered.filter((log) => log.userId === filters.userId)
  }

  if (filters?.action) {
    filtered = filtered.filter((log) => log.action === filters.action)
  }

  if (filters?.resource) {
    filtered = filtered.filter((log) => log.resource === filters.resource)
  }

  if (filters?.startDate) {
    filtered = filtered.filter((log) => log.timestamp >= filters.startDate!)
  }

  if (filters?.endDate) {
    filtered = filtered.filter((log) => log.timestamp <= filters.endDate!)
  }

  // Sort by timestamp descending
  filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  // Apply limit
  if (filters?.limit) {
    filtered = filtered.slice(0, filters.limit)
  }

  return filtered
}

export function getAuditLogsByUser(userId: string, limit = 50): AuditLog[] {
  return getAuditLogs({ userId, limit })
}

export function getAuditLogsByAction(action: AuditAction, limit = 50): AuditLog[] {
  return getAuditLogs({ action, limit })
}

export function getAuditLogsByResource(resource: string, limit = 50): AuditLog[] {
  return getAuditLogs({ resource, limit })
}
