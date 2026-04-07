"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar({ isScrolled }: { isScrolled: boolean }) {
    return (
          <div
                  className="w-full h-[70px] fixed top-0 left-0 z-50 transition-all duration-500"
                  style={{ background: "#041227" }}
                >
            {/* Top accent bar */}
                <div
                          style={{
                                      height: "2px",
                                      width: "100%",
                                      background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
                          }}
                        />
          
                <div className="flex items-center justify-between container mx-auto h-full px-6">
                        <div className="flex items-center gap-8">
                                  <Link href="/" className="flex items-center">
                                              <Image
                                                              src="/images/assets/QL_QUANTON_LABS_LOGO_WHITE_TRANSPARENT_v1.0.png"
                                                              width={160}
                                                              height={40}
                                                              alt="Quanton Labs"
                                                              priority
                                                              style={{ width: "160px", height: "auto" }}
                                                            />
                                  </Link>Link>
                        
                                  <div className="flex items-center gap-4">
                                              <Link
                                                              href="/#governing-agent"
                                                              className="text-sm font-medium duration-200"
                                                              style={{ color: "rgba(255,255,255,0.70)" }}
                                                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                                                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.70)"; }}
                                                            >
                                                            Solutions
                                              </Link>Link>
                                              <Link
                                                              href="/#insights"
                                                              className="text-sm font-medium duration-200"
                                                              style={{ color: "rgba(255,255,255,0.70)" }}
                                                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ffffff"; }}
                                                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.70)"; }}
                                                            >
                                                            Resources
                                              </Link>Link>
                                  </div>div>
                        </div>div>
                
                        <Link
                                    href="/dashboard"
                                    className="px-6 py-2 text-white text-[12px] font-semibold transition-all duration-200"
                                    style={{
                                                  background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
                                                  borderRadius: "8px",
                                                   fontFamily: "Manrope, sans-serif",
                                                  fontWeight: 600,
                                                  border: "none",
                                    }}
                                    onMouseEnter={e => {
                                                  (e.currentTarget as HTMLElement).style.opacity = "0.88";
                                                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                                    }}
                                    onMouseLeave={e => {
                                                  (e.currentTarget as HTMLElement).style.opacity = "1";
                                                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                                    }}
                                  >
                                  Sign In
                        </Link>Link>
                </div>div>
          </div>div>
        );
}</div>
