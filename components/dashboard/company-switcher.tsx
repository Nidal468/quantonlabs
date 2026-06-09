// components/dashboard/company-switcher.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, ChevronDown, Building2 } from "lucide-react";
import { useDashboard } from "@/lib/hook/use-dashboard-context";
import { CompanyDocument } from "@/model/company";
import CreateCompanyPage from "./company/createCompanyForm";

interface Props {
  companies: CompanyDocument[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export function CompanySwitcher({ companies, activeId, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { activeCompany } = useDashboard();

  return (
    <div className="px-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-between h-auto py-3 px-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center shrink-0">
                <Building2 size={16} />
              </div>
              <div className="flex flex-col items-start truncate">
                <span className="text-xs text-neutral-500 font-medium">Workspace</span>
                <span className="text-sm font-semibold text-neutral-900 truncate">
                  {activeCompany?.name || "Select workspace"}
                </span>
              </div>
            </div>
            <ChevronDown size={16} className="text-neutral-400 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[240px] p-1">
          <DropdownMenuLabel className="px-3 py-2 text-xs font-medium text-neutral-500">Workspaces</DropdownMenuLabel>
          {companies.map((c) => (
            <DropdownMenuItem
              key={c._id.toString()}
              onClick={() => { onSelect(c._id.toString()); setOpen(false); }}
              className="gap-3 cursor-pointer"
            >
              <div className="w-6 h-6 bg-neutral-100 rounded flex items-center justify-center">
                <Building2 size={14} />
              </div>
              <span className="flex-1 truncate">{c.name}</span>
              {activeId === c._id.toString() && <span className="text-xs text-neutral-400">Active</span>}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => { setOpen(false); setDialogOpen(true); }}
            className="gap-3 cursor-pointer text-neutral-900"
          >
            <Plus size={16} />
            <span>Create workspace</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md border-neutral-200 shadow-xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-neutral-900 text-base font-semibold tracking-tight">
              Create new workspace
            </DialogTitle>
          </DialogHeader>
          <CreateCompanyPage
            onSubmit={async (data) => {
              // Replace with your actual server action or API call
              // await createCompanyAction({ name: data.name });
              setDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
