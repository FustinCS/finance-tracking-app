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
import { useEffect, useState } from "react";
import BudgetTable from "@/components/budget-table";
import { BudgetItem } from "@/types/budget-item";
import { Card } from "@/components/ui/card";
import { AddDialog } from "@/components/add-dialog";
import { db } from "@/firebase";
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";

export default function Home() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const getBudgetItems = async () => {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);

      startOfDay.setHours(0, 0, 0, 0);
      endOfDay.setHours(23, 59, 59, 999);

      const q = query(
        collection(db, "spending"),
        where("date", ">=", startOfDay),
        where("date", "<=", endOfDay)
      );

      await getDocs(q).then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            category: data.category,
            amount: data.amount,
          };
        });
        setBudgetItems(data);
      });
    };
    getBudgetItems();
  }, [date])

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
                onSelect={(day) => day && setDate(day)}
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
