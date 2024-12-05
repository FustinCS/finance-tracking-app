"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BudgetItem } from "@/types/budget-item";
import { ClipLoader } from "react-spinners";

export function RecTable({ items }: { items: BudgetItem[] }) {
  const [recommendations, setRecommendations] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setRecommendations(null);

      try {
        const budgetSummary = items
          .map((item) => `${item.category}: $${item.amount}`)
          .join(", ");

        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ budgetSummary }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        setRecommendations(data.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [items]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-16 mt-32">
          <ClipLoader color="#3b82f6" size={50} />
        </div>
      ) : recommendations === null ? (
        <p>No recommendations yet. Click the button to generate!</p>
      ) : (
        <Table>
          <TableCaption>A list of AI recommendations on how to save money.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Possible ways to save money (some may not be possible based on your specific situations)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recommendations.map((rec, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{rec}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
