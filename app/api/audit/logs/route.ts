import { type NextRequest, NextResponse } from "next/server"
import { getAuditLogs } from "@/lib/audit-logger"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const action = searchParams.get("action")
    const resource = searchParams.get("resource")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 50

    const logs = getAuditLogs({
      userId: userId || undefined,
      action: (action as any) || undefined,
      resource: resource || undefined,
      limit,
    })

    return NextResponse.json(logs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 })
  }
}
