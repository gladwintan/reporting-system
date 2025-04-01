import Sidebar from "@/components/Sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row">
      <Sidebar role="user" />
      {children}
    </div>
  );
}
