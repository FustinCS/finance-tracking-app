import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { BudgetItem } from "@/types/budget-item";
import { useState } from "react";
import useAuthState from "@/hooks/use-auth";
import { useItems } from "@/context/items-context";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { generateUniqueId } from "@/lib/utils";


interface AddDialogProps {
  budgetItems: BudgetItem[];
  setBudgetItems: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
  currentDate: Date;
}

export function AddDialog({ budgetItems, setBudgetItems, currentDate}: AddDialogProps) {
  const { user, loading } = useAuthState();
  const { items, setItems } = useItems();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = async () => {
    if (!name || !category || !amount) {
      return;
    }
  
    const newItem = {
      name: name,
      category: category,
      amount: parseFloat(amount),
      date: currentDate,
    };
  
    if (!user) {
      // Update the local context/state directly for unauthenticated users
      const uniqueId = generateUniqueId();
      const itemWithId = { ...newItem, id: uniqueId };
  
      setBudgetItems([...budgetItems, itemWithId]);
      setItems([...items, itemWithId]);
    } else {
      try {
        // Create a new document with an auto-generated ID
        const userId = user.uid;
        const docRef = doc(collection(db, `users/${userId}/spending`));
        await setDoc(docRef, newItem);
  
        // Use the generated ID to update the local state
        const itemWithId = { ...newItem, id: docRef.id };
  
        setBudgetItems([...budgetItems, itemWithId]);
        setItems([...items, itemWithId]);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  
    // Clear inputs
    setName("");
    setCategory("");
    setAmount("");
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-bold">
          <Plus />
          New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Item</DialogTitle>
          <DialogDescription>
            Add a new item to your budget list.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                type="text"
                placeholder="Category name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleAdd}>
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
