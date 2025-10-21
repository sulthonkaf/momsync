"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Search, Edit, Trash2, Shield } from "lucide-react"

const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "mother",
    status: "Active",
    joinDate: "2024-01-15",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Emily Chen",
    email: "emily@example.com",
    role: "doctor",
    status: "Active",
    joinDate: "2024-01-10",
    verified: true,
  },
  {
    id: 3,
    name: "John Smith",
    email: "john@example.com",
    role: "partner",
    status: "Active",
    joinDate: "2024-02-20",
    verified: false,
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "healthcare_provider",
    status: "Inactive",
    joinDate: "2024-01-05",
    verified: true,
  },
]

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      mother: "bg-pink-100 text-pink-800",
      partner: "bg-blue-100 text-blue-800",
      doctor: "bg-green-100 text-green-800",
      healthcare_provider: "bg-purple-100 text-purple-800",
      admin: "bg-red-100 text-red-800",
      pharmacist: "bg-yellow-100 text-yellow-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage system users and their roles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>Add User</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Email</th>
                <th className="text-left py-3 px-4 font-medium">Role</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Verified</th>
                <th className="text-left py-3 px-4 font-medium">Join Date</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                  <td className="py-3 px-4">
                    <Badge className={getRoleColor(user.role)}>{user.role.replace("_", " ")}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={user.verified ? "default" : "secondary"}>{user.verified ? "Yes" : "No"}</Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{user.joinDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
