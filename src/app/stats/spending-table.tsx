import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SpendingData {
  category: string;
  amount: number;
}

export function SpendingTable({
  spendingData,
}: {
  spendingData: SpendingData[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-11/12">Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {spendingData.map((spending) => (
          <TableRow key={spending.category}>
            <TableCell>{spending.category}</TableCell>
            <TableCell className="text-right">{spending.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="w-11/12">Total</TableCell>
          <TableCell className="text-right">
            {spendingData.reduce((acc, curr) => acc + curr.amount, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
