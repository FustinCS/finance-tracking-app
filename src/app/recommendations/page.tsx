"use client";

import { useState } from "react";
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
import { RecTable } from "./rec-list";
import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import useAuthState from "@/hooks/use-auth";
import SignInCard from "@/components/sign-in-card";

interface SpendingData {
  title: string;
  category: string;
  amount: number;
}

export default function Home() {
  const { user } = useAuthState();
  const [fetchedData, setFetchedData] = useState(false);
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);

  const handleGenerateRecommendations = () => {
    const getSpendingData = async () => {
      if (!user) {
        return;
      }

      const userId = user.uid;

      const q = query(collection(db, `users/${userId}/spending`));
      await getDocs(q).then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            title: data.name,
            category: data.category,
            amount: data.amount,
          };
        });
        setSpendingData(data);
        setFetchedData(true);
      });
    };

    getSpendingData();
  };

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
                  <BreadcrumbLink href="#">AI Recommendations</BreadcrumbLink>
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
          <div className="flex flex-wrap lg:flex-nowrap flex-1 gap-4 p-16 pt-4">
            <div className="w-full">
              <button
                onClick={handleGenerateRecommendations}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Generate Recommendations
              </button>

              {fetchedData ? (
                spendingData.length !== 0 ? (
                  <RecTable items={spendingData} />
                ) : (
                  <p>
                    No data available. Add some spending data to get
                    recommendations!
                  </p>
                )
              ) : (
                <p>No recommendations yet. Click the button to generate!</p>
              )}
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
