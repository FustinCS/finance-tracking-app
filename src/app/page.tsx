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
import { collection, getDocs, query, where } from "firebase/firestore";
import { DatePicker } from "./stats/date-picker";
import useAuthState from "@/hooks/use-auth";
import { useItems } from "@/context/items-context";
import NotSignedInAlert from "@/components/not-signed-in-alert";

export default function Home() {
  const {items} = useItems();
  
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [date, setDate] = useState<Date>(new Date());

  const { user, loading } = useAuthState();

  useEffect(() => {
    const getBudgetItems = async () => {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);

      startOfDay.setHours(0, 0, 0, 0);
      endOfDay.setHours(23, 59, 59, 999);
      
      // If user is not logged in, we are going to opt into using the items context
      if (!user) {
        const data = items.filter((item) => {
          return item.date >= startOfDay && item.date <= endOfDay;
        })
        setBudgetItems(data);
        return;
      }
      
      // pull from database if logged in
      const userId = user.uid;

      const q = query(
        collection(db, `users/${userId}/spending`),
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
            date: data.date.toDate(),
          };
        });
        setBudgetItems(data);
      });
    };
    getBudgetItems();
  }, [items, date, user]);

  if (loading) {
    return null;
  }

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
        <main className="p-0 md:p-16 md:pt-4">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-center md:text-left">
            Budget List
          </h2>
          {!user && <NotSignedInAlert />}
          <div className="flex flex-col items-center md:items-start md:flex-row gap-4 pt-4">
            <div className="flex-grow flex flex-col w-full px-12 md:px-0">
              <div className="self-center md:self-end pb-2 gap-4 flex justify-center flex-col md:flex-row">
                <div className="lg:hidden">
                  <DatePicker date={date} setDate={setDate} />
                </div>  
                <AddDialog budgetItems={budgetItems} setBudgetItems={setBudgetItems} currentDate={date} />
              </div>
              <div className="w-full">
                <BudgetTable budgetItems={budgetItems} setBudgetItems={setBudgetItems} />
              </div>
            </div>
            <Card className="w-fit">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => day && setDate(day)}
                toDate={new Date()} // Disables future dates from current date
                initialFocus
                className="hidden lg:block"
              />
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
