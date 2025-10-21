"use client"

import type { User } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Mother & Partner - Health Information
export function HealthInfoSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Information</CardTitle>
        <CardDescription>Manage your pregnancy and health tracking information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="due-date">Expected Due Date</Label>
            <Input id="due-date" type="date" placeholder="Select date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="trimester">Current Trimester</Label>
            <Input id="trimester" type="text" placeholder="e.g., Second Trimester" disabled />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="medical-history">Medical History</Label>
          <Textarea id="medical-history" placeholder="Any allergies, conditions, or medications..." rows={4} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergency-contact">Emergency Contact</Label>
          <Input id="emergency-contact" type="text" placeholder="Name and phone number" />
        </div>
        <Button>Save Health Information</Button>
      </CardContent>
    </Card>
  )
}

// Mother - Family Members
export function FamilySettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Members</CardTitle>
        <CardDescription>Add and manage family members who can access your health information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Partner Account</p>
              <p className="text-sm text-muted-foreground">partner@momsync.com</p>
            </div>
            <Button variant="outline" size="sm">
              Remove
            </Button>
          </div>
        </div>
        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">Add Family Member</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="family-email">Email Address</Label>
              <Input id="family-email" type="email" placeholder="family@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="family-relation">Relationship</Label>
              <Input id="family-relation" type="text" placeholder="e.g., Mother, Sister, Friend" />
            </div>
            <Button>Send Invitation</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Healthcare Professionals - Professional Credentials
export function ProfessionalSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Credentials</CardTitle>
        <CardDescription>Manage your professional license and credentials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="license-number">License Number</Label>
            <Input id="license-number" type="text" placeholder="Your license number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="license-expiry">License Expiry Date</Label>
            <Input id="license-expiry" type="date" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Input id="specialization" type="text" placeholder="e.g., Obstetrics, Pediatrics" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="education">Education & Certifications</Label>
          <Textarea id="education" placeholder="List your degrees and certifications..." rows={4} />
        </div>
        <Button>Save Professional Information</Button>
      </CardContent>
    </Card>
  )
}

// Healthcare Professionals - Clinic Information
export function ClinicSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinic Information</CardTitle>
        <CardDescription>Manage your clinic or practice details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="clinic-name">Clinic/Practice Name</Label>
          <Input id="clinic-name" type="text" placeholder="Your clinic name" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clinic-phone">Phone Number</Label>
            <Input id="clinic-phone" type="tel" placeholder="+62 XXX XXXX XXXX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clinic-email">Email Address</Label>
            <Input id="clinic-email" type="email" placeholder="clinic@example.com" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="clinic-address">Address</Label>
          <Textarea id="clinic-address" placeholder="Full clinic address..." rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clinic-hours">Operating Hours</Label>
          <Input id="clinic-hours" type="text" placeholder="e.g., Mon-Fri: 9AM-5PM" />
        </div>
        <Button>Save Clinic Information</Button>
      </CardContent>
    </Card>
  )
}

// Hospital Admin - Hospital Settings
export function HospitalSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hospital Settings</CardTitle>
        <CardDescription>Manage your hospital information and configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="hospital-name">Hospital Name</Label>
          <Input id="hospital-name" type="text" placeholder="Your hospital name" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hospital-code">Hospital Code</Label>
            <Input id="hospital-code" type="text" placeholder="Hospital registration code" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total-beds">Total Beds</Label>
            <Input id="total-beds" type="number" placeholder="Number of beds" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hospital-address">Address</Label>
          <Textarea id="hospital-address" placeholder="Full hospital address..." rows={3} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hospital-phone">Phone Number</Label>
            <Input id="hospital-phone" type="tel" placeholder="+62 XXX XXXX XXXX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hospital-email">Email Address</Label>
            <Input id="hospital-email" type="email" placeholder="admin@hospital.com" />
          </div>
        </div>
        <Button>Save Hospital Settings</Button>
      </CardContent>
    </Card>
  )
}

// Hospital Admin & Merchant - Staff Management
export function StaffSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Management</CardTitle>
        <CardDescription>Manage your staff members and departments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Dr. Budi Santoso</p>
              <p className="text-sm text-muted-foreground">Doctor - Obstetrics</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Siti Nurhaliza</p>
              <p className="text-sm text-muted-foreground">Midwife</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </div>
        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">Add Staff Member</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="staff-email">Email Address</Label>
              <Input id="staff-email" type="email" placeholder="staff@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="staff-role">Role</Label>
              <Input id="staff-role" type="text" placeholder="e.g., Doctor, Nurse, Midwife" />
            </div>
            <Button>Send Invitation</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Merchant - Store Settings
export function StoreSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Settings</CardTitle>
        <CardDescription>Manage your store information and configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="store-name">Store Name</Label>
          <Input id="store-name" type="text" placeholder="Your store name" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="store-phone">Phone Number</Label>
            <Input id="store-phone" type="tel" placeholder="+62 XXX XXXX XXXX" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-email">Email Address</Label>
            <Input id="store-email" type="email" placeholder="store@example.com" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="store-address">Address</Label>
          <Textarea id="store-address" placeholder="Full store address..." rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="store-description">Store Description</Label>
          <Textarea id="store-description" placeholder="Describe your store..." rows={3} />
        </div>
        <Button>Save Store Settings</Button>
      </CardContent>
    </Card>
  )
}

// Pharmacist - Pharmacy Settings
export function PharmacySettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pharmacy Information</CardTitle>
        <CardDescription>Manage your pharmacy details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="pharmacy-name">Pharmacy Name</Label>
          <Input id="pharmacy-name" type="text" placeholder="Your pharmacy name" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pharmacy-license">License Number</Label>
            <Input id="pharmacy-license" type="text" placeholder="Pharmacy license number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pharmacy-phone">Phone Number</Label>
            <Input id="pharmacy-phone" type="tel" placeholder="+62 XXX XXXX XXXX" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pharmacy-address">Address</Label>
          <Textarea id="pharmacy-address" placeholder="Full pharmacy address..." rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pharmacy-hours">Operating Hours</Label>
          <Input id="pharmacy-hours" type="text" placeholder="e.g., Mon-Sun: 8AM-10PM" />
        </div>
        <Button>Save Pharmacy Information</Button>
      </CardContent>
    </Card>
  )
}

// Platform Admin - System Settings
export function SystemSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Configuration</CardTitle>
        <CardDescription>Configure platform-wide settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Maintenance Mode</p>
              <p className="text-sm text-muted-foreground">Temporarily disable platform access</p>
            </div>
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">User Registration</p>
              <p className="text-sm text-muted-foreground">Allow new user registrations</p>
            </div>
            <input type="checkbox" className="w-4 h-4" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Community Features</p>
              <p className="text-sm text-muted-foreground">Enable community forum and discussions</p>
            </div>
            <input type="checkbox" className="w-4 h-4" defaultChecked />
          </div>
        </div>
        <Button>Save System Settings</Button>
      </CardContent>
    </Card>
  )
}

// Platform Admin - User Management
export function UserManagementSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage platform users and roles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Sarah Wijaya</p>
              <p className="text-sm text-muted-foreground">Mother - Active</p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Dr. Budi Santoso</p>
              <p className="text-sm text-muted-foreground">Doctor - Active</p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Platform Admin - Analytics
export function AnalyticsSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Analytics</CardTitle>
        <CardDescription>View platform usage and statistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-3xl font-bold">12,543</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Active Today</p>
            <p className="text-3xl font-bold">3,421</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">New Users (7d)</p>
            <p className="text-3xl font-bold">234</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Consultations (7d)</p>
            <p className="text-3xl font-bold">1,234</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Platform Admin - Security Settings
export function SecuritySettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Configure platform security options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
            </div>
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">IP Whitelist</p>
              <p className="text-sm text-muted-foreground">Restrict access by IP address</p>
            </div>
            <input type="checkbox" className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Session Timeout</p>
              <p className="text-sm text-muted-foreground">Auto-logout after 30 minutes</p>
            </div>
            <input type="checkbox" className="w-4 h-4" defaultChecked />
          </div>
        </div>
        <Button>Save Security Settings</Button>
      </CardContent>
    </Card>
  )
}

// Platform Support - Team Settings
export function TeamSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Settings</CardTitle>
        <CardDescription>Manage your support team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Rina Kusuma</p>
              <p className="text-sm text-muted-foreground">Support Agent - Active</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </div>
        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">Add Team Member</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team-email">Email Address</Label>
              <Input id="team-email" type="email" placeholder="agent@support.com" />
            </div>
            <Button>Send Invitation</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Platform Support - Knowledge Base
export function KnowledgeBaseSettings({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
        <CardDescription>Manage support resources and documentation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <p className="font-medium">Getting Started Guide</p>
            <p className="text-sm text-muted-foreground">Last updated: 2 days ago</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="font-medium">FAQ - Pregnancy Tracking</p>
            <p className="text-sm text-muted-foreground">Last updated: 1 week ago</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="font-medium">Troubleshooting Common Issues</p>
            <p className="text-sm text-muted-foreground">Last updated: 3 days ago</p>
          </div>
        </div>
        <Button>Manage Knowledge Base</Button>
      </CardContent>
    </Card>
  )
}
