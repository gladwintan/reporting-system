import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {
  await prisma.user.createMany({
    data: [
      { email: "admin@servihub.com", role: "admin", name: "Admin User" },
      { email: "user1@servihub.com", name: "User One" },
    ],
  })
  
  await prisma.report.create({
    data: {
      type: "review",
      target_id: 101,
      reason: "Spam content",
      submitted_by: 2
    }
  })
}

main()

