"use client"

import UserProvider from "@/lib/context/user";
import { UserDocument } from "@/model/user";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: any }) {
    const [user, setUser] = useState<UserDocument | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const get = async () => {
            const res = await fetch(`/api/user/authenticated`, {
                method: "GET",
                cache: "no-store"
            });
            const result = await res.json();
            if (result && result !== "Unauthorized") setUser(result);
        };
        get()
    }, []);

    if (loading && !user) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-900">
            <div className="flex flex-col items-center gap-3 text-gray-600 dark:text-white">
                <div className="w-8 h-8 border-4 border-zinc-500 dark:text-white border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium">Please wait a moment...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white w-full">
            <UserProvider value={{ user }}>
                <Toaster position="top-right" richColors />
                {children}
            </UserProvider>
        </div>
    );
}
