"use client"


import Overview from "@/components/pages/overview/page";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const navLinks: { id: string, text: string }[] = [
    {
        id: 'overview',
        text: 'Overview'
    },
    {
        id: 'ai_agents',
        text: 'AI Agents Libary'
    },
    {
        id: 'qunton os',
        text: 'Qunton OS'
    }
]

export default function dashboard() {
    const [selectedLink, setSelectedLink] = useState('overview');

    return (
        <div className="w-full h-screen flex">
            <div className="w-[280px] h-full bg-white/60 backdrop-blur-2xl shadow px-4 space-y-3">
                <div className="w-full border-b flex items-center justify-between py-4">
                    <div className="flex items-center justify-start gap-2">
                        <div className="w-12 h-12 rounded-md overflow-hidden">
                            <img src={'/images/profile_pic.png'} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="font-bold">Abu Saleh</h1>
                            <h1 className="text-[13px] text-black/60">nidalstar1000@gmail.com</h1>
                        </div>
                    </div>
                    <ChevronsUpDown />
                </div>
                <div className="w-full flex flex-col gap-2">
                    {navLinks.map((item, index) => {
                        return (
                            <div
                                className={`w-full py-3 flex items-center justify-start px-2 rounded-md text-sm duration-300 ${selectedLink === item.id ? "bg-black/5 shadow text-black" : "text-black/50"}`}
                                key={index}
                                onClick={() => setSelectedLink(item.id)}
                            >
                                <h1>{item.text}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Overview/>
        </div>
    )
}