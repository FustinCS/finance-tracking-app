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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddDialog } from "@/components/add-dialog";

const dummyData: BudgetItem[] = [
  {
    name: "Groceries",
    amount: 100,
    category: "Food",
  },
  {
    name: "Gas",
    amount: 50,
    category: "Transportation",
  },
  {
    name: "Rent",
    amount: 1000.00,
    category: "Housing",
  },
];

export default function Home() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(dummyData);
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
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="p-0 lg:p-16 lg:pt-4">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center lg:text-left">
            Budget List
          </h2>
          <div className="flex flex-col items-center lg:items-start lg:flex-row gap-4">
            <div className="flex-grow flex flex-col">
              <div className="self-center lg:self-end pb-2">
                <AddDialog items={budgetItems} setItems={setBudgetItems} />
              </div>
              <BudgetTable items={budgetItems} />
            </div>
            <Card className="w-fit">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                toDate={new Date()} // Disables future dates from current date
                initialFocus
              />
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
