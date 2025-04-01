import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "./prisma";

export async function getUser() {
  const { userId } = await auth()
  if (!userId) {
    return null
  }
  
  const client = await clerkClient()
  const clerkUser = await client.users.getUser(userId)
  const email = clerkUser.emailAddresses[0].emailAddress

  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      email: true,
      name: true,
      role: true
    }
  })

  return user
}