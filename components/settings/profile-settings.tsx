"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail, Phone, MapPin, Calendar, Edit2 } from "lucide-react"
import type { User as UserType } from "@/lib/auth-context"

interface ProfileSettingsProps {
  user: UserType | null
}

export function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <p className="text-muted-foreground mt-2">Manage your personal information</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{user?.name}</h3>
              <p className="text-muted-foreground capitalize">{user?.role.replace("_", " ")}</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                <Edit2 className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg disabled:bg-muted"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg disabled:bg-muted"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+62 812 3456 7890"
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg disabled:bg-muted"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </label>
              <input
                type="text"
                placeholder="City, Country"
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg disabled:bg-muted"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date of Birth
              </label>
              <input
                type="date"
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg disabled:bg-muted"
              />
            </div>
          </div>

          <div className="flex gap-3">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Role-Specific Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
          <CardDescription>Your role and credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <input
                type="text"
                value={user?.role.replace("_", " ")}
                disabled
                className="w-full px-3 py-2 border rounded-lg bg-muted"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">License/ID Number</label>
              <input
                type="text"
                placeholder="Your professional ID"
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg disabled:bg-muted"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Specialization</label>
              <input
                type="text"
                placeholder="Your specialization"
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg disabled:bg-muted"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Organization</label>
              <input
                type="text"
                placeholder="Hospital/Clinic name"
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded-lg disabled:bg-muted"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
