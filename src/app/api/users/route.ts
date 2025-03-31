import prisma from '@/lib/prisma';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {   
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const client = await clerkClient()
    const clerkUser = await client.users.getUser(userId)
    const emailAddress = clerkUser.emailAddresses[0].emailAddress

    if (!emailAddress) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { email: emailAddress },
      select: { email: true, role: true }
    })

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user details from database' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { email, name } = await req.json();
  if (!email || !name) {
    return new NextResponse('Missing required fields', { status: 400 })
  }

  try {    
    const newUser = await prisma.user.upsert({
      where: { email: email },
      update: { 
        email: email,
        name: name
      },
      create: {
        email: email,
        name: name
      }
    });
    console.log(newUser)
    return NextResponse.json("New user added to database", { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add user to database' }, { status: 500 });
  }
}
