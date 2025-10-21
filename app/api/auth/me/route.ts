import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // In a real app, verify the session/token here
  // For now, return null to indicate no user is logged in
  return NextResponse.json(null, { status: 401 })
}
