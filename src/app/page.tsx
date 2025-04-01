import { redirect } from "next/navigation";

async function Home() {
  return redirect("/dashboard/user");
}

export default Home;
