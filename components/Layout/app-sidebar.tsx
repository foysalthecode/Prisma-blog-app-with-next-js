import * as React from "react";

import { SearchForm } from "@/components/Layout/search-form";
import { VersionSwitcher } from "@/components/Layout/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { adminRoutes } from "@/src/adminRoutes";
import { userRoutes } from "@/src/userRoutes";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      items: [
        {
          title: "User Dashborad",
          url: "/dashboard",
        },
        {
          title: "Admin Dashboard",
          url: "/admin-dashboard",
        },
      ],
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes = [];

  switch (user.role) {
    case "admin":
      routes = adminRoutes;
      break;
    case "user":
      routes = userRoutes;
      break;

    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
