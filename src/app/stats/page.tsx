"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import { DatePicker } from "./date-picker";
import { SpendingChart } from "./spending-chart";
import { SpendingTable } from "./spending-table";

interface SpendingData {
  category: string;
  amount: number;
}

export default function Home() {
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date()));
  const [endDate, setEndDate] = useState<Date>(new Date(new Date()));

  useEffect(() => {
    const getSpendingData = async () => {
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);

      const q = query(
        collection(db, "spending"),
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
  }, [startDate, endDate]);

  return (
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
  );
}
