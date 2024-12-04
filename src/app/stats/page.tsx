"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

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
import Loading from "@/components/loading";
import DotLoading from "@/components/dot-loading";

interface SpendingData {
  category: string;
  amount: number;
}

export default function Home() {
  const { user, loading } = useAuthState();
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [fetchedData, setFetchedData] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date()));
  const [endDate, setEndDate] = useState<Date>(new Date(new Date()));

  useEffect(() => {
    const getSpendingData = async () => {
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);

      if (!user) {
        return;
      }

      const userId = user.uid;

      const q = query(
        collection(db, `users/${userId}/spending`),
        where("date", ">=", startOfDay),
        where("date", "<=", endOfDay),
        orderBy("category", "asc")
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
        setFetchedData(true);
      });
    };
    getSpendingData();
  }, [user, startDate, endDate]);

  if (loading) {
    return <Loading />;
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
        <div className="w-screen md:w-10/12 lg:w-full">
          {!user ? ( // prompt user to sign if they are not
            <div className="p-8 flex justify-center items-center">
              <SignInCard />
            </div>
          ) : (
            // user is signed in
            <div className="px-8 pb-8 md:pt-4">
              <p className="text-3xl mb-4 text-center md:text-left">
                Statistics
              </p>
              <div className="flex flex-col xs:flex-row gap-x-4 items-center justify-center md:justify-end mb-8">
                <DatePicker date={startDate} setDate={setStartDate} />
                <p>-</p>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>

              {fetchedData ? (
                spendingData.length !== 0 ? ( // spending data found
                  <>
                    <div className="mb-8">
                      {/* bar chart of spending by category  */}
                      <SpendingChart spendingData={spendingData} />
                    </div>
                    <div className="">
                      {/* table listing spending amounts by category */}
                      <SpendingTable
                        spendingData={spendingData.toSorted(
                          (a, b) => b.amount - a.amount
                        )}
                      />
                    </div>
                  </>
                ) : (
                  // no spending data found
                  <div className="flex items-center justify-center w-full h-full">
                    No data found for the selected date range...
                  </div>
                )
              ) : (
                // spending data is still being fetched
                <div className="flex items-center justify-center w-full h-full">
                  <DotLoading />
                </div>
              )}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
