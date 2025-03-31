import { SignOutButton } from "@clerk/nextjs";
import "./globals.css";

import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div>
      <SignOutButton />
      setup
      {users.map((user) => (
        <li key={user.id} className="mb-2">
          {user.name}
        </li>
      ))}
    </div>
  );
}
