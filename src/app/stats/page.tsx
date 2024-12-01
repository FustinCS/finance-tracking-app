"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import { DatePicker } from "./date-picker";
import { SpendingChart } from "./spending-chart";
import { SpendingTable } from "./spending-table";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import useAuthState from "@/hooks/use-auth";
import SignInCard from "@/components/sign-in-card";
import { Sign } from "crypto";

interface SpendingData {
  category: string;
  amount: number;
}

export default function Home() {
  const { user, loading } = useAuthState();
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date()));
  const [endDate, setEndDate] = useState<Date>(new Date(new Date()));

  useEffect(() => {
    const getSpendingData = async () => {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      if (!user) {
        return;
      }
      
      const userId = user.uid;

      const q = query(
        collection(db, `users/${userId}/spending`),
        where("date", ">=", startDate),
        where("date", "<=", endOfDay)
      );
      await getDocs(q).then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            category: data.category,
            amount: data.amount,
          };
        });
        setSpendingData(data);
      });
    };

    getSpendingData();
  }, [user, startDate, endDate]);

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
                  <BreadcrumbLink href="#">Statistics</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {!user ? (
          <div className="p-8 flex justify-center items-center">
            <SignInCard />
          </div>
        ) : (
          <div className="p-8">
            <p className="text-2xl">Statistics</p>
            <div className="flex flex-row gap-x-4 items-center justify-end mb-8">
              <DatePicker date={startDate} setDate={setStartDate} />
              <p>-</p>
              <DatePicker date={endDate} setDate={setEndDate} />
            </div>

            <div className="mb-8">
              <SpendingChart spendingData={spendingData} />
            </div>
            <div>
              <SpendingTable spendingData={spendingData} />
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
