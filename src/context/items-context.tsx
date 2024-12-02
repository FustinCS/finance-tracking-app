"use client"

import { createContext, useContext, useState } from "react";
import { BudgetItem } from "@/types/budget-item";

type ItemsContextType = {
  items: BudgetItem[];
  setItems: (items: BudgetItem[]) => void;
};

const ItemsContext = createContext<ItemsContextType>({
  items: [],
  setItems: () => {},
});

export function useItems() {
  return useContext(ItemsContext);
}

export function ItemsProvider({ children } : {children: React.ReactNode}) {
  const [items, setItems] = useState<BudgetItem[]>([]);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};