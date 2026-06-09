// app/dashboard/agents/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Bot, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDashboard } from "@/lib/hook/use-dashboard-context";

export default function AgentsPage() {
  const { activeCompany } = useDashboard();
  if (!activeCompany) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
          <Input placeholder="Search agents..." className="pl-9 bg-white border-neutral-200" />
        </div>
        <Button className="bg-neutral-900 hover:bg-neutral-800 text-white">
          <Plus size={16} className="mr-2" />
          New Agent
        </Button>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-medium text-neutral-500">All Agents</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-neutral-100">
                <TableHead className="w-[180px]">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* <TableBody>
              {activeCompany.agents.map((agent) => (
                <TableRow key={agent.id} className="border-neutral-100 hover:bg-neutral-50/50">
                  <TableCell className="font-medium text-neutral-900">{agent.name}</TableCell>
                  <TableCell>
                    <Badge variant={agent.status === "active" ? "default" : "secondary"} className="capitalize">
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-neutral-500">{agent.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit size={14} /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                          <Trash2 size={14} /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
