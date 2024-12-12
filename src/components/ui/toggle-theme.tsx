"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenuItem
      onClick={() => theme === 'light' ? setTheme("dark") : setTheme("light")}
      className="cursor-pointer justify-center"
    >
      Toggle Theme
    </DropdownMenuItem>
  )
}
