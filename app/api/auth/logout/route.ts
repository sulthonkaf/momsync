import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // Clear session/token
  return NextResponse.json({ success: true })
}
