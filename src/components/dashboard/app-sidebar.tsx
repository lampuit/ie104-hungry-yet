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
import { BadgeCent, Home, Package2, Ticket, Clock, LucideListOrdered } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { getSession } from "@/lib/auth-client";
import { getUserById } from "@/lib/data";
import Dashboardrompt from "../ui/dashboard-prompt";

// Lấy session
export const fetcherUserRole = async () => {
  const response = await getSession();
  const userId = response?.data?.user?.id as string;
  const userInfoArray = await getUserById(userId);
  return userInfoArray[0]?.role;
};


const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Product",
    url: "/dashboard/product",
    icon: Package2,
  },
  {
    title: "Shift",
    url: "/dashboard/shift",
    icon: Clock,
  },

  {
    title: "Discount",
    url: "/dashboard/discount",
    icon: Ticket,
  },
  {
    title: "Order Management",
    url: "/dashboard/order-management",
    icon: LucideListOrdered,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: role, isLoading, } = useSWR('userId', fetcherUserRole);


  return (
    role === 'admin' &&
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl">Hungry Yet?</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname === item.url} asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
