"use client";

import { useState } from "react";
import { DatePicker } from "./date-picker";
import { SpendingChart } from "./spending-chart";
import { SpendingTable } from "./spending-table";

const spendingData = [
  { category: "Food", amount: 186 },
  { category: "Rent", amount: 305 },
  { category: "Utilities", amount: 237 },
  { category: "Leisure", amount: 73 },
];

export default function Home() {
  const [startDate, setStartDate] = useState<Date>(new Date(new Date()));
  const [endDate, setEndDate] = useState<Date>(new Date(new Date()));

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
