import Link from "next/link";

export default function Sidebar({ role }: { role: "user" | "admin" }) {
  const userLinks = [
    { title: "Dashboard", url: "/dashboard/user" },
    { title: "New report", url: "/dashboard/user/report" },
  ];

  return (
    <aside className="border-2">
      <nav>
        {userLinks.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className="block text-gray-700 hover:text-blue-600"
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
