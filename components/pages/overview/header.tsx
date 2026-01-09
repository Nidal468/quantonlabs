"use client";

import { useState } from 'react';
import { ListChevronsUpDown, EllipsisVertical, User, Settings, LogOut, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-lg p-4 md:p-5 flex items-center justify-between border-b border-zinc-200 sticky top-0 z-50">
      <div className="flex items-center gap-3 md:gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-black/70 hover:bg-gray-100 rounded-full"
          aria-label="Menu"
        >
          <ListChevronsUpDown size={24} />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-800 rounded-full flex items-center justify-center shadow-md">
            <h1 className="text-white font-bold text-lg">F</h1>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-md font-bold text-gray-900">Future Tech</h1>
            <p className="text-sm text-black/60 hidden md:block">We improve users life using our tech</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          className={`hidden md:flex ${isSearchOpen ? 'bg-gray-100' : 'hover:bg-gray-100'} rounded-full`}
          aria-label={isSearchOpen ? "Close search" : "Open search"}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search size={20} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-gray-100 rounded-full relative"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-gray-100 rounded-full"
              aria-label="User menu"
            >
              <EllipsisVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600 hover:text-red-700">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search bar that slides in */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-16 bg-white border-b border-zinc-200 p-4 md:hidden">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-gray-100 rounded-full"
              aria-label="Close search"
              onClick={() => setIsSearchOpen(false)}
            >
              <Search size={20} />
            </Button>
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 border border-zinc-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Search"
            />
          </div>
        </div>
      )}
    </header>
  );
}
