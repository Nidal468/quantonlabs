import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { notifications } from "@/db/landingPage";
import { IntelligentGridBackground } from "../animated/bg_grid";

export function HeroSection() {

  const randomNotifications = useMemo(() => {
    const shuffled = [...notifications].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, []);

  return (
    <div
      className="w-full relative overflow-hidden pt-20 md:pt-[120px]"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 60% at 50% 0%, rgba(43, 96, 235, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 60% at 0% 50%, rgba(139, 55, 234, 0.05) 0%, transparent 70%),
          radial-gradient(circle, rgba(43, 96, 235, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "auto, auto, 28px 28px",
        backgroundColor: "white",
      }}
    >
      {/* Top gradient bar */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: "3px",
          background: "linear-gradient(to right, #2B60EB, #4655EB, #584DEB, #7341EA, #8B37EA)",
        }}
      />

      <div className="relative container mx-auto w-full min-h-screen flex flex-col items-center justify-center gap-16 z-10">
        <IntelligentGridBackground />
        <div className="flex items-center justify-between w-full">

          {/* Left Content */}
          <div className="flex flex-col items-start justify-center text-center md:text-left max-w-xl p-6">

            <p
              className="text-xs tracking-[0.25em] mb-6"
              style={{
                background: "linear-gradient(to right, #2B60EB, #8B37EA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "Manrope
