"use client"

export default function RootLayout({ children }: { children: any }) {
    return (
        <div className="min-h-screen bg-white w-full">
            {children}
        </div>
    );
}
