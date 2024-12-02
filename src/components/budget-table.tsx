import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { BudgetItem } from "@/types/budget-item";
import { Button } from "./ui/button";
import useAuthState from "@/hooks/use-auth";
import { useItems } from "@/context/items-context";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface BudgetTableProps {
  budgetItems: BudgetItem[];
  setBudgetItems: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
}

export default function BudgetTable({
  budgetItems,
  setBudgetItems,
}: BudgetTableProps) {
  const { user } = useAuthState();
  const { items, setItems } = useItems();

  const handleDelete = (id: string) => {
    // optimistally delete item from budgetItems
    const updatedBudgetItems = budgetItems.filter((item) => item.id !== id);
    setBudgetItems(updatedBudgetItems);

    // if user is not logged in, delete from items context
    if (!user) {
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      return;
    }

    // delete from database
    const userId = user.uid;
    const itemRef = doc(db, `users/${userId}/spending/${id}`);
    deleteDoc(itemRef);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="w-[16px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {budgetItems.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="text-right">
                ${item.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleDelete(item.id)} className="cursor-pointer text-red-500 data-[highlighted]:text-red-700 dark:data-[highlighted]:text-red-300 data-[highlighted]:bg-red-100 dark:data-[highlighted]:bg-[#8B0000]">
                      <Trash />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
