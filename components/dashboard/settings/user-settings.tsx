// components/dashboard/settings/user-settings.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Bell, Shield, Moon, Sun, Globe } from "lucide-react";

export function UserSettings() {

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-900">Account Settings</h2>
        <p className="text-neutral-500 text-sm">Manage your profile, security, and preferences.</p>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-medium text-neutral-500">Profile</CardTitle>
        </CardHeader>
        {/* <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-16 h-16 border-2 border-white shadow-sm">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-neutral-100 text-neutral-700 text-lg">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">Upload new avatar</Button>
              <p className="text-xs text-neutral-400">JPG, GIF or PNG. Max 2MB.</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-700">Full Name</Label>
              <Input defaultValue={user.name} className="bg-white border-neutral-200" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-700">Email</Label>
              <Input defaultValue={user.email} className="bg-white border-neutral-200" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-neutral-900 hover:bg-neutral-800 text-white">Save changes</Button>
          </div>
        </CardContent> */}
      </Card>

      <Card className="border-neutral-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-medium text-neutral-500">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon size={18} className="text-neutral-500" />
              <div>
                <p className="text-sm font-medium text-neutral-900">Dark Mode</p>
                <p className="text-xs text-neutral-500">Switch between light and dark themes</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Toggle</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-neutral-500" />
              <div>
                <p className="text-sm font-medium text-neutral-900">Email Notifications</p>
                <p className="text-xs text-neutral-500">Receive updates about your workspace</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
