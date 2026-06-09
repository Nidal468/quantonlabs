// components/dashboard/company/company-settings.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Company, CompanyRole } from "@/lib/mock-data";
import { Users, Bot, CreditCard, Plus, Pencil } from "lucide-react";
import { CompanyDocument } from "@/model/company";

interface Props {
  company: CompanyDocument;
}

export function CompanySettings({ company }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-neutral-900">{company.name}</h2>
        <p className="text-neutral-500 text-sm">Manage members, agents, and subscription details.</p>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-medium text-neutral-500">Subscription & Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold">
                {company.plan.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-neutral-900 capitalize">{company.plan} Plan</p>
                <p className="text-xs text-neutral-500">
                  {company.subscriptionStatus === "active" ? "Next billing: " + new Date(company.subscriptionEndsAt!).toLocaleDateString() : "Trial ends: " + new Date(company.trialEndsAt!).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={company.subscriptionStatus === "active" ? "default" : "secondary"} className="capitalize">
                {company.subscriptionStatus}
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <CreditCard size={14} /> Manage Billing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="members" className="w-full">
        <TabsList className="bg-neutral-100/50 border border-neutral-200 p-1">
          <TabsTrigger value="members" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Users size={14} className="mr-2" /> Members
          </TabsTrigger>
          <TabsTrigger value="agents" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Bot size={14} className="mr-2" /> Agents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Button size="sm" className="gap-2 bg-neutral-900 hover:bg-neutral-800 text-white">
              <Plus size={14} /> Invite Member
            </Button>
          </div>
          {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {company.members.map((member) => (
              <Card key={member.id} className="border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="w-10 h-10 border border-neutral-200">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-neutral-100 text-neutral-600 text-xs">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 truncate">{member.name}</p>
                    <p className="text-xs text-neutral-500 truncate">{member.email}</p>
                  </div>
                  <Badge variant="secondary" className="capitalize text-[10px] h-5">{member.role}</Badge>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </TabsContent>

        <TabsContent value="agents" className="mt-6">
          <div className="p-8 border border-dashed border-neutral-200 rounded-lg bg-neutral-50/50 text-center">
            <Bot className="mx-auto text-neutral-400 mb-3" size={32} />
            <p className="text-neutral-600 font-medium">No agents configured yet</p>
            <p className="text-neutral-400 text-sm mt-1">Create an agent to start automating workflows.</p>
            <Button className="mt-4 bg-neutral-900 hover:bg-neutral-800 text-white">Create Agent</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
