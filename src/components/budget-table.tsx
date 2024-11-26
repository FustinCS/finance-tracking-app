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

export default function BudgetTable({ items } : { items: BudgetItem[]}) {
  return (
    <Table>
      <TableCaption>A list of all your current spendings for the given day.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => {
            return (
                <TableRow key={index}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                </TableRow>
            );
        })}
      </TableBody>
    </Table>
  );
}
