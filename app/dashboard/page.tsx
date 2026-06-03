import { getSession } from "@/lib/auth/auth";
import connectDB from "@/lib/db";
import { Board } from "@/lib/models";
import { redirect } from "next/navigation";

async function Dashboard() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }
  await connectDB();
  const result = await Board.findOne({
    userId: session.user.id,
    name: "Job Hunt",
  });

  console.log(result);

  return <div>Dashboard</div>;
}

export default Dashboard;
