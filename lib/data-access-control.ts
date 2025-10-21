import type { UserRole } from "./rbac"

export interface DataAccessPolicy {
  role: UserRole
  canViewOwnData: boolean
  canViewSharedData: boolean
  canViewAllData: boolean
  dataTypes: string[]
  restrictions: string[]
}

// Data access control policies for each role
export const dataAccessPolicies: Record<UserRole, DataAccessPolicy> = {
  mother: {
    role: "mother",
    canViewOwnData: true,
    canViewSharedData: true,
    canViewAllData: false,
    dataTypes: ["own_health", "own_baby", "shared_health", "shared_baby", "consultations", "prescriptions"],
    restrictions: ["cannot_view_other_users_data", "cannot_view_hospital_operations", "cannot_view_merchant_data"],
  },

  partner: {
    role: "partner",
    canViewOwnData: true,
    canViewSharedData: true,
    canViewAllData: false,
    dataTypes: ["shared_health", "shared_baby", "consultations", "prescriptions"],
    restrictions: ["cannot_view_other_users_data", "cannot_view_hospital_operations", "cannot_view_merchant_data"],
  },

  doctor: {
    role: "doctor",
    canViewOwnData: true,
    canViewSharedData: false,
    canViewAllData: false,
    dataTypes: ["consented_patient_data", "own_profile", "own_consultations", "own_prescriptions"],
    restrictions: [
      "can_only_view_consented_patients",
      "cannot_view_hospital_operations",
      "cannot_view_merchant_data",
      "cannot_view_other_doctors_patients",
    ],
  },

  midwife: {
    role: "midwife",
    canViewOwnData: true,
    canViewSharedData: false,
    canViewAllData: false,
    dataTypes: ["consented_patient_data", "own_profile", "own_consultations"],
    restrictions: ["can_only_view_consented_patients", "cannot_view_hospital_operations", "cannot_view_merchant_data"],
  },

  nutritionist: {
    role: "nutritionist",
    canViewOwnData: true,
    canViewSharedData: false,
    canViewAllData: false,
    dataTypes: ["consented_patient_nutrition_data", "own_profile", "own_consultations"],
    restrictions: [
      "can_only_view_consented_patients",
      "cannot_view_full_medical_records",
      "cannot_view_hospital_operations",
    ],
  },

  hospital_admin: {
    role: "hospital_admin",
    canViewOwnData: true,
    canViewSharedData: false,
    canViewAllData: false,
    dataTypes: ["own_hospital_data", "referred_patients_summary", "own_analytics"],
    restrictions: [
      "can_only_view_own_hospital",
      "cannot_view_detailed_patient_records",
      "cannot_view_other_hospitals",
      "cannot_view_merchant_data",
    ],
  },

  merchant: {
    role: "merchant",
    canViewOwnData: true,
    canViewSharedData: false,
    canViewAllData: false,
    dataTypes: ["own_products", "own_orders", "own_analytics"],
    restrictions: [
      "cannot_view_patient_health_data",
      "cannot_view_hospital_operations",
      "cannot_view_other_merchants_data",
    ],
  },

  pharmacist: {
    role: "pharmacist",
    canViewOwnData: true,
    canViewSharedData: false,
    canViewAllData: false,
    dataTypes: ["prescriptions", "own_inventory", "own_orders"],
    restrictions: [
      "can_only_view_prescriptions_for_fulfillment",
      "cannot_view_full_patient_records",
      "cannot_view_hospital_operations",
    ],
  },

  platform_admin: {
    role: "platform_admin",
    canViewOwnData: true,
    canViewSharedData: true,
    canViewAllData: true,
    dataTypes: ["all_data"],
    restrictions: ["must_follow_audit_logging", "must_have_compliance_approval_for_sensitive_data"],
  },

  platform_support: {
    role: "platform_support",
    canViewOwnData: true,
    canViewSharedData: false,
    canViewAllData: false,
    dataTypes: ["user_support_data", "community_reports", "system_logs"],
    restrictions: ["cannot_view_detailed_patient_data", "cannot_view_financial_data", "cannot_modify_user_data"],
  },
}

export function canAccessData(role: UserRole, dataType: string): boolean {
  const policy = dataAccessPolicies[role]
  if (!policy) return false

  if (policy.canViewAllData) return true
  return policy.dataTypes.includes(dataType)
}

export function getDataAccessPolicy(role: UserRole): DataAccessPolicy | undefined {
  return dataAccessPolicies[role]
}

export function hasDataRestriction(role: UserRole, restriction: string): boolean {
  const policy = dataAccessPolicies[role]
  if (!policy) return false
  return policy.restrictions.includes(restriction)
}
