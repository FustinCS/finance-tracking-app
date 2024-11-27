"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenuItem 
      onClick={() => theme === 'light' ? setTheme("dark") : setTheme("light")}
      className="cursor-pointer"
    >
      Toggle Theme
    </DropdownMenuItem>
  )
}
