import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = await getUser();
  if (user?.role === "admin") {
    redirect("./admin");
  }
  return;
};

export default Dashboard;
