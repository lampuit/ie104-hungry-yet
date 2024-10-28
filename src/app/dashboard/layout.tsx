"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Home, Package2 } from "lucide-react";
import React from "react";
import Link from "next/link";

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
];

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar items={items} pathname={pathname} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {pathSegments.map((segment, index) => {
                const isLast = index === pathSegments.length - 1;
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

                return (
                  <React.Fragment key={href}>
                    {isLast ? (
                      <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold">
                          {segment.charAt(0).toUpperCase() + segment.slice(1)}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    ) : (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link href={href}>
                              {segment.charAt(0).toUpperCase() +
                                segment.slice(1)}
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
