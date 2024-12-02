"use client";

import {
  ChevronsUpDown,
  CircleUser,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ToggleTheme } from "./ui/toggle-theme";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import useAuthState from "@/hooks/use-auth";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user } = useAuthState();

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
                      <CircleUser className="size-7" />
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Sign in</span>
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
