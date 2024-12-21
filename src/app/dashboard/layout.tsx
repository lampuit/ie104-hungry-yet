import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Breadcrumbs } from "@/components/dashboard/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session || !session.user) redirect("/login");
  if (!(session.user.role === "admin" ||session.user.role === "staff" )) redirect("/");

  return (
    <SidebarProvider>
      <AppSidebar userRole={session.user.role} />
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
