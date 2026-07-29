import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Initialize your Supabase server client
  const supabase = await createSupabaseServerClient();

  // 2. Handle missing environment variables gracefully
  if (!supabase) {
    redirect("/login"); // Change "/login" to your actual sign-in route if different
  }

  // 3. Fetch the current user to verify they are authenticated
  const {
    data: { user },
  } = await supabase!.auth.getUser();

  // 4. Redirect unauthenticated users away from the dashboard
  if (!user) {
    redirect("/login");
  }

  // 5. Render the dashboard layout for authenticated users
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar email={user?.email ?? ""} />
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}
