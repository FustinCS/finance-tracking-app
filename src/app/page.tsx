"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import BudgetTable from "@/components/budget-table";
import { BudgetItem } from "@/types/budget-item";

const dummyData: BudgetItem[] = [
  {
    title: "Groceries",
    amount: 100,
    category: "Food",
  },
  {
    title: "Gas",
    amount: 50,
    category: "Transportation",
  },
  {
    title: "Rent",
    amount: 1000,
    category: "Housing",
  },
]

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Budget List</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-wrap lg:flex-nowrap flex-1 gap-4 p-16 pt-4">
         <BudgetTable items={dummyData} />
          <div className="flex-none">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              toDate={new Date()} // Disables future dates from current date
              initialFocus
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
