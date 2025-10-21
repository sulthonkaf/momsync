import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users: Record<
  string,
  {
    id: string
    email: string
    name: string
    password: string
    role: string
    verified: boolean
    createdAt: Date
  }
> = {
  "mother@momsync.com": {
    id: "1",
    email: "mother@momsync.com",
    name: "Sarah Johnson",
    password: "password123",
    role: "mother",
    verified: true,
    createdAt: new Date(),
  },
  "partner@momsync.com": {
    id: "2",
    email: "partner@momsync.com",
    name: "John Smith",
    password: "password123",
    role: "partner",
    verified: true,
    createdAt: new Date(),
  },
  "doctor@momsync.com": {
    id: "3",
    email: "doctor@momsync.com",
    name: "Dr. Emily Chen",
    password: "password123",
    role: "doctor",
    verified: true,
    createdAt: new Date(),
  },
  "midwife@momsync.com": {
    id: "4",
    email: "midwife@momsync.com",
    name: "Midwife Lisa",
    password: "password123",
    role: "midwife",
    verified: true,
    createdAt: new Date(),
  },
  "nutritionist@momsync.com": {
    id: "5",
    email: "nutritionist@momsync.com",
    name: "Nutritionist Maria",
    password: "password123",
    role: "nutritionist",
    verified: true,
    createdAt: new Date(),
  },
  "hospital-admin@momsync.com": {
    id: "6",
    email: "hospital-admin@momsync.com",
    name: "Hospital Admin",
    password: "password123",
    role: "hospital_admin",
    verified: true,
    createdAt: new Date(),
  },
  "merchant@momsync.com": {
    id: "7",
    email: "merchant@momsync.com",
    name: "Merchant Store",
    password: "password123",
    role: "merchant",
    verified: true,
    createdAt: new Date(),
  },
  "pharmacist@momsync.com": {
    id: "8",
    email: "pharmacist@momsync.com",
    name: "Pharmacist John",
    password: "password123",
    role: "pharmacist",
    verified: true,
    createdAt: new Date(),
  },
  "platform-admin@momsync.com": {
    id: "9",
    email: "platform-admin@momsync.com",
    name: "Admin User",
    password: "password123",
    role: "platform_admin",
    verified: true,
    createdAt: new Date(),
  },
  "support@momsync.com": {
    id: "10",
    email: "support@momsync.com",
    name: "Support Team",
    password: "password123",
    role: "platform_support",
    verified: true,
    createdAt: new Date(),
  },
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    // Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Check if user already exists
    if (users[email]) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password, // In production, hash this!
      role,
      verified: false,
      createdAt: new Date(),
    }

    users[email] = newUser

    // Return user data (without password)
    return NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        verified: newUser.verified,
        createdAt: newUser.createdAt,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ message: "Signup failed" }, { status: 500 })
  }
}
