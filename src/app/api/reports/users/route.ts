import { getUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Not authorized" }, { status: 401 })

  try {
    const body = await req.json()

    if (!body.reportType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const report = await prisma.report.create({
      // @ts-ignore
      data: {
        type: body.reportType,
        target_id: body.targetId,
        reason: body.reason,
        description: body.description || null,
        submitter: { connect: { email: user.email} }
      },
    })

    return NextResponse.json("Successfully created report", { status: 201 })
  } catch (error) {
    console.error("Error saving report:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
