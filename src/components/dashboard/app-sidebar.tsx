"use client";

import React, { useCallback, useMemo, useEffect } from "react";
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
import {
  Home,
  Package2,
  Ticket,
  Clock,
  LucideListOrdered,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, redirect } from "next/navigation";
import { getSession, revokeSession } from "@/lib/auth-client";

const items = [
  {
    title: "Trang chủ",
    url: "/dashboard",
    icon: Home,
    role: ["admin", "staff"],
  },
  {
    title: "Quản lý món ăn",
    url: "/dashboard/product",
    icon: Package2,
    role: ["admin"],
  },
  {
    title: "Ca làm việc",
    url: "/dashboard/shift",
    icon: Clock,
    role: ["admin"],
  },
  {
    title: "Quản lý khuyến mãi",
    url: "/dashboard/discount",
    icon: Ticket,
    role: ["admin"],
  },
  {
    title: "Quản lý đơn hàng",
    url: "/dashboard/order-management",
    icon: LucideListOrdered,
    role: ["admin", "staff"],
  },
];

export function AppSidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      const session = await getSession();
      const sessionId = session?.data?.session?.id;
      if (sessionId) {
        await revokeSession({ id: sessionId });
        router.push("/");
        router.refresh();
      } else {
        console.error("Session ID is undefined");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [router]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl">
            Hungry Yet?
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(
                (item) =>
                  item.role.includes(userRole) && (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={pathname === item.url}
                        asChild
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={handleLogout}>
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
