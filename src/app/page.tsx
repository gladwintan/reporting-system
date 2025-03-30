import prisma from '@/lib/prisma'

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div>
      setup
      {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.name}
          </li>
        ))}
    </div>
  );
}
