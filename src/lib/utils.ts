import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUniqueId(){
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
};

export function trimString(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.substring(0, maxLength) + "..."; 
  }
}