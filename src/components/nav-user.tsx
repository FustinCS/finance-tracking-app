"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  CircleUser,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { ToggleTheme } from "./ui/toggle-theme";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import useAuthState from "@/hooks/use-auth";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, loading } = useAuthState();

  const handleSignIn = () => {
    signInWithPopup(auth, new GoogleAuthProvider());
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Check for autheticated user */}
              {user ? (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.photoURL || "Unknown"} alt={user.displayName || "Unknown"} className="rounded-full" />
                    <AvatarFallback className="rounded-full">
                      <CircleUser className="size-7" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.displayName}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </>
              ) : (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="Unknown" alt="No User" className="rounded-full"/>
                    <AvatarFallback className="rounded-full">
                      <CircleUser className="size-7" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Log in</span>
                  </div>
                </>
              )}

              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <ToggleTheme />
              {user ? (
                <DropdownMenuItem
                  onClick={() => auth.signOut()}
                  className="w-full justify-center cursor-pointer"
                >
                  Sign Out
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={handleSignIn}
                  className="w-full justify-center cursor-pointer"
                >
                  Sign In
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
