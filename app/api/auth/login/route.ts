import { type NextRequest, NextResponse } from "next/server"

// Mock user database - replace with real database
const mockUsers = [
  {
    id: "1",
    email: "mother@momsync.com",
    password: "password123",
    name: "Sarah Johnson",
    role: "mother",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    phone: "+1234567890",
    verified: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "1b",
    email: "partner@momsync.com",
    password: "password123",
    name: "John Smith",
    role: "partner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    phone: "+1234567890",
    verified: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    email: "doctor@momsync.com",
    password: "password123",
    name: "Dr. Emily Chen",
    role: "doctor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    phone: "+1234567891",
    verified: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "6",
    email: "midwife@momsync.com",
    password: "password123",
    name: "Midwife Sarah",
    role: "midwife",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Midwife",
    phone: "+1234567895",
    verified: true,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "7",
    email: "nutritionist@momsync.com",
    password: "password123",
    name: "Nutritionist Alex",
    role: "nutritionist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nutritionist",
    phone: "+1234567896",
    verified: true,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "3",
    email: "hospital@momsync.com",
    password: "password123",
    name: "Hospital Admin",
    role: "hospital_admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hospital",
    phone: "+1234567892",
    verified: true,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "3b",
    email: "hospital-admin@momsync.com",
    password: "password123",
    name: "Hospital Administrator",
    role: "hospital_admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HospitalAdmin",
    phone: "+1234567892",
    verified: true,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    email: "merchant@momsync.com",
    password: "password123",
    name: "Merchant Admin",
    role: "merchant",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Merchant",
    phone: "+1234567893",
    verified: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "8",
    email: "pharmacist@momsync.com",
    password: "password123",
    name: "Pharmacist John",
    role: "pharmacist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pharmacist",
    phone: "+1234567897",
    verified: true,
    createdAt: new Date("2024-01-06"),
  },
  {
    id: "5",
    email: "admin@momsync.com",
    password: "password123",
    name: "Platform Admin",
    role: "platform_admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    phone: "+1234567894",
    verified: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "5b",
    email: "platform-admin@momsync.com",
    password: "password123",
    name: "Platform Administrator",
    role: "platform_admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PlatformAdmin",
    phone: "+1234567894",
    verified: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "9",
    email: "support@momsync.com",
    password: "password123",
    name: "Platform Support",
    role: "platform_support",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Support",
    phone: "+1234567898",
    verified: true,
    createdAt: new Date("2024-01-01"),
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
