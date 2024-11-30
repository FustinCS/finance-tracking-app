"use client"

import * as React from "react"
import {
  ChartColumn,
  ThumbsUp
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavHeader from "./nav-header"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Statistics",
      url: "/stats",
      icon: ChartColumn,
      isActive: true,
    },
    {
      title: "Recommendations",
      url: "/recommendations",
      icon: ThumbsUp,
      isActive: true,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
