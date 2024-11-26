import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BudgetTable({ items }) {
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
        <TableRow>
          <TableCell className="font-medium">In-N-Out</TableCell>
          <TableCell>Food</TableCell>
          <TableCell className="text-right">$11.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
