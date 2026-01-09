import { DollarSign, EllipsisVertical, ListChevronsUpDown } from "lucide-react"
import Header from "./header"

export default function Overview() {
    return (
        <div className="w-full h-screen flex flex-col">
            <Header/>
            <div className="flex-1 bg-gray-50 p-4">
                <div className="w-full flex items-center justify-between gap-4">
                    <div className="w-[430px] h-[380px]">
                        <div className="w-full flex items-center justify-between py-3">
                            <h1 className="font-bold">Daily Stats</h1>
                            <EllipsisVertical />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white rounded-md p-4 w-[200px] h-40 flex flex-col items-start justify-between shadow-lg border">
                                <div className="p-3 bg-zinc-50 flex items-center justify-center rounded-full shadow-md border">
                                    <DollarSign className="text-black/60" size={16} />
                                </div>
                                <div>
                                    <h1 className="text-md text-zinc-400">Revenue</h1>
                                    <p className="text-xl">438483$</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-md p-4 w-[200px] h-40 flex flex-col items-start justify-between shadow-lg border">
                                <div className="p-3 bg-zinc-50 flex items-center justify-center rounded-full shadow-md border">
                                    <DollarSign className="text-black/60" size={16} />
                                </div>
                                <div>
                                    <h1 className="text-md text-zinc-400">Revenue</h1>
                                    <p className="text-xl">438483$</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-md p-4 w-[200px] h-40 flex flex-col items-start justify-between shadow-lg border">
                                <div className="p-3 bg-zinc-50 flex items-center justify-center rounded-full shadow-md border">
                                    <DollarSign className="text-black/60" size={16} />
                                </div>
                                <div>
                                    <h1 className="text-md text-zinc-400">Revenue</h1>
                                    <p className="text-xl">438483$</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-md p-4 w-[200px] h-40 flex flex-col items-start justify-between shadow-lg border">
                                <div className="p-3 bg-zinc-50 flex items-center justify-center rounded-full shadow-md border">
                                    <DollarSign className="text-black/60" size={16} />
                                </div>
                                <div>
                                    <h1 className="text-md text-zinc-400">Revenue</h1>
                                    <p className="text-xl">438483$</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 h-[380px] bg-white shadow-lg flex items-start justify-between border rounded-md"></div>
                </div>
            </div>
        </div>
    )
}


