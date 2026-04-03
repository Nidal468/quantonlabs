"use client";

import Link from "next/link";

export default function Navbar({ isScrolled }: { isScrolled: boolean }) {


  return (
    <div
      className={`w-full h-[70px] fixed top-0 left-0 z-50 transition-all duration-500 ${isScrolled ? "glass backdrop-blur-md bg-white/40 shadow-md border-b border-slate-200/40" : ""
        }`}
    >
      <div className="flex items-center justify-between container mx-auto h-full px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/assets/seo/ql_logo.png" className="w-8" />
            <img src="/images/assets/seo/ql_text.png" className="w-30" />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/#what-gets-deployed"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 duration-200"
            >
              Solutions
            </Link>
            <Link
              href="/#insights"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 duration-200"
            >
              Resources
            </Link>
          </div>
        </div>
        <Link href={'/dashboard'} className="px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium text-[12px]">Check it out</Link>
      </div>
    </div>
  );
}
