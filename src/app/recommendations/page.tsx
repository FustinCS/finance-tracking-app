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
import { BudgetItem } from "@/types/budget-item";
import { RecTable } from "./rec-list";
import useAuthState from "@/hooks/use-auth";
import SignInCard from "@/components/sign-in-card";

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
];

export default function Home() {
  const { user } = useAuthState();
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleGenerateRecommendations = () => {
    setShouldFetch(false);
    setTimeout(() => {
      setShouldFetch(true);
    }, 0);
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

              {shouldFetch ? (
                <RecTable items={dummyData} />
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
