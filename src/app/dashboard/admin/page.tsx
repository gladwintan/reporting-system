import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const Admin = async () => {
  const user = await getUser();
  if (user?.role !== "admin") {
    redirect("./user");
  }
  return <div>page</div>;
};

export default Admin;
