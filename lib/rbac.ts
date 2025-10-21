export type UserRole =
  | "mother"
  | "partner"
  | "doctor"
  | "midwife"
  | "nutritionist"
  | "hospital_admin"
  | "merchant"
  | "pharmacist"
  | "platform_admin"
  | "platform_support"

export interface Permission {
  resource: string
  action: string
  description: string
}

export interface RoleDefinition {
  id: UserRole
  name: string
  description: string
  category: "end_user" | "partner" | "internal"
  permissions: Permission[]
}

// Comprehensive permission matrix for all roles
export const roleDefinitions: Record<UserRole, RoleDefinition> = {
  // END USERS
  mother: {
    id: "mother",
    name: "Pregnant Woman / Mother",
    description: "Primary end user - pregnant women and new mothers",
    category: "end_user",
    permissions: [
      // Health Data
      { resource: "health_data", action: "view_own", description: "View own health records" },
      { resource: "health_data", action: "create", description: "Create health journal entries" },
      { resource: "health_data", action: "edit_own", description: "Edit own health data" },

      // Baby Data
      { resource: "baby_data", action: "view_own", description: "View own baby data" },
      { resource: "baby_data", action: "create", description: "Create baby records" },
      { resource: "baby_data", action: "edit_own", description: "Edit own baby data" },

      // Education
      { resource: "education", action: "view", description: "Access education content" },
      { resource: "education", action: "track_progress", description: "Track learning progress" },

      // Community
      { resource: "community", action: "view", description: "View community forum" },
      { resource: "community", action: "create_post", description: "Create forum posts" },
      { resource: "community", action: "comment", description: "Comment on posts" },

      // Consultations
      { resource: "consultation", action: "book", description: "Book consultations" },
      { resource: "consultation", action: "view_own", description: "View own consultations" },

      // Commerce
      { resource: "commerce", action: "view_products", description: "View products" },
      { resource: "commerce", action: "purchase", description: "Make purchases" },
      { resource: "commerce", action: "view_orders", description: "View own orders" },

      // Medical Bridge
      { resource: "medical_bridge", action: "access", description: "Access hospital finder" },
      { resource: "medical_bridge", action: "emergency_sos", description: "Use emergency SOS" },
    ],
  },

  partner: {
    id: "partner",
    name: "Partner / Family Member",
    description: "Family member supporting pregnant woman",
    category: "end_user",
    permissions: [
      // Partner Health Data (shared)
      { resource: "health_data", action: "view_shared", description: "View shared health data" },
      { resource: "baby_data", action: "view_shared", description: "View shared baby data" },

      // Education
      { resource: "education", action: "view", description: "Access education content" },

      // Community
      { resource: "community", action: "view", description: "View community forum" },
      { resource: "community", action: "create_post", description: "Create forum posts" },

      // Consultations
      { resource: "consultation", action: "book", description: "Book consultations" },
      { resource: "consultation", action: "view_shared", description: "View shared consultations" },

      // Commerce
      { resource: "commerce", action: "view_products", description: "View products" },
      { resource: "commerce", action: "purchase", description: "Make purchases" },
    ],
  },

  // HEALTHCARE PROFESSIONALS
  doctor: {
    id: "doctor",
    name: "Doctor / Obstetrician",
    description: "Medical doctor providing consultations",
    category: "partner",
    permissions: [
      // Patient Data (with consent)
      { resource: "patient_data", action: "view_consented", description: "View patient data with consent" },
      { resource: "patient_data", action: "view_records", description: "View patient medical records" },

      // Consultations
      { resource: "consultation", action: "manage", description: "Manage consultations" },
      { resource: "consultation", action: "provide", description: "Provide consultations" },

      // Prescriptions
      { resource: "prescription", action: "create", description: "Create prescriptions" },
      { resource: "prescription", action: "view", description: "View prescriptions" },

      // Analytics
      { resource: "analytics", action: "view_own", description: "View own analytics" },

      // Education
      { resource: "education", action: "create_content", description: "Create educational content" },
      { resource: "education", action: "review_content", description: "Review educational content" },

      // Profile
      { resource: "profile", action: "manage", description: "Manage own profile" },
      { resource: "profile", action: "manage_schedule", description: "Manage consultation schedule" },
    ],
  },

  midwife: {
    id: "midwife",
    name: "Midwife",
    description: "Midwife providing maternal care",
    category: "partner",
    permissions: [
      // Patient Data (with consent)
      { resource: "patient_data", action: "view_consented", description: "View patient data with consent" },
      { resource: "patient_data", action: "view_records", description: "View patient medical records" },

      // Consultations
      { resource: "consultation", action: "manage", description: "Manage consultations" },
      { resource: "consultation", action: "provide", description: "Provide consultations" },

      // Prescriptions
      { resource: "prescription", action: "create", description: "Create prescriptions" },

      // Education
      { resource: "education", action: "create_content", description: "Create educational content" },

      // Profile
      { resource: "profile", action: "manage", description: "Manage own profile" },
      { resource: "profile", action: "manage_schedule", description: "Manage consultation schedule" },
    ],
  },

  nutritionist: {
    id: "nutritionist",
    name: "Nutritionist / Dietitian",
    description: "Nutrition specialist providing dietary guidance",
    category: "partner",
    permissions: [
      // Patient Data (with consent)
      { resource: "patient_data", action: "view_consented", description: "View patient data with consent" },

      // Consultations
      { resource: "consultation", action: "manage", description: "Manage consultations" },
      { resource: "consultation", action: "provide", description: "Provide consultations" },

      // Nutrition Programs
      { resource: "nutrition", action: "create_program", description: "Create nutrition programs" },
      { resource: "nutrition", action: "manage_recipes", description: "Manage recipes" },

      // Education
      { resource: "education", action: "create_content", description: "Create educational content" },

      // Profile
      { resource: "profile", action: "manage", description: "Manage own profile" },
      { resource: "profile", action: "manage_schedule", description: "Manage consultation schedule" },
    ],
  },

  // HOSPITAL PARTNER
  hospital_admin: {
    id: "hospital_admin",
    name: "Hospital Administrator",
    description: "Hospital partner managing facility operations",
    category: "partner",
    permissions: [
      // Hospital Data
      { resource: "hospital_data", action: "manage_own", description: "Manage own hospital data" },
      { resource: "hospital_data", action: "update_capacity", description: "Update facility capacity" },
      { resource: "hospital_data", action: "manage_staff", description: "Manage hospital staff" },

      // Patient Management
      { resource: "patient_data", action: "view_referred", description: "View referred patients" },
      { resource: "patient_data", action: "manage_queue", description: "Manage patient queue" },

      // Emergency
      { resource: "emergency", action: "receive_alerts", description: "Receive emergency alerts" },
      { resource: "emergency", action: "confirm_admission", description: "Confirm patient admission" },

      // Analytics
      { resource: "analytics", action: "view_own", description: "View hospital analytics" },
      { resource: "analytics", action: "view_referrals", description: "View referral statistics" },

      // Profile
      { resource: "profile", action: "manage", description: "Manage hospital profile" },
    ],
  },

  // E-COMMERCE PARTNER
  merchant: {
    id: "merchant",
    name: "Merchant / E-commerce Seller",
    description: "Product seller on MomSync Commerce",
    category: "partner",
    permissions: [
      // Product Management
      { resource: "product", action: "manage_own", description: "Manage own products" },
      { resource: "product", action: "update_inventory", description: "Update inventory" },
      { resource: "product", action: "manage_pricing", description: "Manage pricing" },

      // Orders
      { resource: "order", action: "view_own", description: "View own orders" },
      { resource: "order", action: "process", description: "Process orders" },
      { resource: "order", action: "manage_shipping", description: "Manage shipping" },

      // Analytics
      { resource: "analytics", action: "view_own", description: "View sales analytics" },

      // Promotions
      { resource: "promotion", action: "create", description: "Create promotions" },
      { resource: "promotion", action: "manage", description: "Manage promotions" },

      // Profile
      { resource: "profile", action: "manage", description: "Manage merchant profile" },
    ],
  },

  pharmacist: {
    id: "pharmacist",
    name: "Pharmacist",
    description: "Pharmacy partner managing prescriptions",
    category: "partner",
    permissions: [
      // Prescriptions
      { resource: "prescription", action: "view", description: "View prescriptions" },
      { resource: "prescription", action: "fulfill", description: "Fulfill prescriptions" },

      // Inventory
      { resource: "inventory", action: "manage", description: "Manage pharmacy inventory" },

      // Orders
      { resource: "order", action: "view_own", description: "View own orders" },
      { resource: "order", action: "process", description: "Process orders" },

      // Analytics
      { resource: "analytics", action: "view_own", description: "View pharmacy analytics" },

      // Profile
      { resource: "profile", action: "manage", description: "Manage pharmacy profile" },
    ],
  },

  // INTERNAL ADMIN
  platform_admin: {
    id: "platform_admin",
    name: "Platform Administrator",
    description: "MomSync internal admin with full system access",
    category: "internal",
    permissions: [
      // User Management
      { resource: "user", action: "manage_all", description: "Manage all users" },
      { resource: "user", action: "verify", description: "Verify users" },
      { resource: "user", action: "suspend", description: "Suspend users" },

      // Partner Verification
      { resource: "partner", action: "verify", description: "Verify partners" },
      { resource: "partner", action: "manage", description: "Manage partners" },

      // Content Management
      { resource: "education", action: "manage_all", description: "Manage all educational content" },
      { resource: "education", action: "publish", description: "Publish content" },

      // Community Moderation
      { resource: "community", action: "moderate", description: "Moderate community" },
      { resource: "community", action: "remove_content", description: "Remove inappropriate content" },

      // System Analytics
      { resource: "analytics", action: "view_all", description: "View all system analytics" },
      { resource: "analytics", action: "view_reports", description: "View system reports" },

      // Compliance
      { resource: "compliance", action: "manage", description: "Manage compliance" },
      { resource: "audit", action: "view_logs", description: "View audit logs" },

      // System Settings
      { resource: "system", action: "manage_settings", description: "Manage system settings" },
    ],
  },

  platform_support: {
    id: "platform_support",
    name: "Platform Support Staff",
    description: "MomSync support team member",
    category: "internal",
    permissions: [
      // User Support
      { resource: "user", action: "view_all", description: "View all users" },
      { resource: "user", action: "reset_password", description: "Reset user passwords" },
      { resource: "user", action: "view_tickets", description: "View support tickets" },

      // Community Moderation
      { resource: "community", action: "view_reports", description: "View community reports" },
      { resource: "community", action: "moderate", description: "Moderate community" },

      // Analytics
      { resource: "analytics", action: "view_reports", description: "View system reports" },

      // Audit
      { resource: "audit", action: "view_logs", description: "View audit logs" },
    ],
  },
}

// Helper function to check if a role has a specific permission
export function hasPermission(role: UserRole, resource: string, action: string): boolean {
  const rolePerms = roleDefinitions[role]?.permissions || []
  return rolePerms.some((p) => p.resource === resource && p.action === action)
}

// Helper function to get all permissions for a role
export function getRolePermissions(role: UserRole): Permission[] {
  return roleDefinitions[role]?.permissions || []
}

// Helper function to get role definition
export function getRoleDefinition(role: UserRole): RoleDefinition | undefined {
  return roleDefinitions[role]
}
