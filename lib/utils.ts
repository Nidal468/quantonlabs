import { clsx, type ClassValue } from "clsx"
import { Megaphone, TrendingUp, Headphones, UsersRound, LayoutGrid, Package, DollarSign, Brain, FileText, Sparkles } from "lucide-react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}