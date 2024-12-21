"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Package2, Ticket, Clock, LucideListOrdered, LogOut, Router } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSession, revokeSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

// Lấy session
export const fetcherSessionId = async () => {
  const response = await getSession();
  return response?.data?.session?.id;
};


const items = [
  {
    title: "Trang chủ",
    url: "/dashboard",
    icon: Home,
    role: ['admin', 'staff'],
  },
  {
    title: "Quản lý món ăn",
    url: "/dashboard/product",
    icon: Package2,
    role: ['admin'],
  },
  {
    title: "Ca làm việc",
    url: "/dashboard/shift",
    icon: Clock,
    role: ['admin'],
  },

  {
    title: "Quản lý khuyến mãi",
    url: "/dashboard/discount",
    icon: Ticket,
    role: ['admin'],
  },
  {
    title: "Quản lý đơn hàng",
    url: "/dashboard/order-management",
    icon: LucideListOrdered,
    role: ['admin', 'staff'],
  }
];

export function AppSidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();
  const router = useRouter();


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl">Hungry Yet?</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                item.role.includes(userRole) &&
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname === item.url} asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem >
                <SidebarMenuButton asChild onClick={async () => {
                  const sessionId = await fetcherSessionId();
                  if (sessionId) {
                    await revokeSession({ id: sessionId });
                    router.push("/");
                    router.refresh();
                  } else {
                    console.error("Session ID is undefined");
                  }
                }}>

                  <div>
                    <LogOut />
                    <span>Logout</span>
                  </div>

                </SidebarMenuButton>
              </SidebarMenuItem>


            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
