import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Breadcrumbs } from "@/components/dashboard/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/data";

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  let user = null;

  try {
    console.log("Fetching session...");
    const session = await getSession();
    console.log("Session:", JSON.stringify(session, null, 2));

    if (!session || !session.data || !session.data.user || !session.data.user.id) {
      console.log("No valid session found. Redirecting to home page.");
      redirect('/');
    }

    const userId = session.data.user.id;
    console.log("Fetching user data for ID:", userId);
    const userResult = await getUserById(userId);
    console.log("User result:", JSON.stringify(userResult, null, 2));

    if (!userResult || userResult.length === 0) {
      console.log("User not found. Redirecting to home page.");
      redirect('/');
    }

    user = userResult[0];

    if (user.role !== 'admin') {
      console.log("User is not an admin. Redirecting to home page.");
      redirect('/');
    }

    console.log("Admin user authenticated successfully.");
  } catch (error) {
    console.error("Error in dashboard layout:", error);
    redirect('/');
  }

  // If we've reached this point, the user is an authenticated admin
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs />
        </header>
        {modal}
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
