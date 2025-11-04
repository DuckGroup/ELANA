import { AdminSidebar } from "../components/adminSidebar";
import { auth0 } from "@/lib/auth0";
import { getUserById } from "@/lib/api";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  try {
    const user = await getUserById(session.user.sub);

    if (user.role !== "admin") {
      redirect("/");
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
