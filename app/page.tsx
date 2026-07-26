"use client"

import { Badge } from "@/components/ui/badge";
import { Apple, Brain, Check, DollarSign, FileText, Headphones, LayoutGrid, Megaphone, Package, Sparkles, TrendingUp, UsersRound } from "lucide-react";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react"
import { GrAndroid, GrApple, GrWindows } from "react-icons/gr";
import agentsData from "@/db/agent-templates.json";
import Link from "next/link";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Megaphone,
  TrendingUp,
  Headphones,
  UsersRound,
  LayoutGrid,
  Package,
  DollarSign,
  Brain,
  FileText,
  Sparkles,
};

export const IconComponent = (icon: string) => {
  return iconMap[icon || "Brain"] || Brain;
}


export default function LandingPage() {
  return (
    <div className="w-full bg-black relative overflow-hidden">
      <NeuralNetworkCanvas />
      <div className="relative z-10">
        <Container />
      </div>
    </div>
  )
}

function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    class Node {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      radius!: number;

      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        if (!canvas) return;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
        ctx.fill();
      }
    }

    const initNodes = () => {
      nodes = [];
      const nodeCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
      }
    };

    const drawConnections = () => {
      if (!ctx) return;
      const connectionDistance = 150;
      const maxOpacity = 0.3;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = maxOpacity * (1 - distance / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}

function Container() {
  const [selectedPage, setSelectedPage] = useState(0);
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 relative z-20">
      <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      {selectedPage === 0 && <Home />}
    </div>
  )
}


function Navbar({ selectedPage, setSelectedPage }: {
  selectedPage: number,
  setSelectedPage: Dispatch<SetStateAction<number>>
}) {
  const navlinks: string[] = ["Home", "About", "Case Studies", "Solutions", "Contact Us"]
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full fixed w-full max-w-5xl mx-auto top-4 md:top-10 shadow-lg z-999">
      {/* logo */}
      <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-xl rounded-full overflow-hidden p-1 border border-white/30">
        <img className="flex-1 rounded-full w-full h-full object-cover" src={'/images/assets/Quanton Labs Favicon black.png'} />
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden flex items-center justify-center p-2 text-white rounded-lg hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center justify-center gap-4 md:gap-6 px-4 md:px-10">
        {navlinks.map((link, index) => {
          return (
            <div
              key={index}
              onClick={() => { setSelectedPage(index); setIsOpen(false); }}
              className={`text-xs flex items-center justify-center duration-300 transition-all cursor-pointer select-none px-3 py-2 ${selectedPage === index ? "bg-white text-black rounded-full px-6 shadow-lg" : "text-white/80 hover:text-white hover:bg-white/10 rounded-full"}`}>
              {link}
            </div>
          )
        })}
      </div>

      {/* Mobile nav links */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-4 md:hidden flex flex-col gap-3 shadow-2xl z-1000">
          {navlinks.map((link, index) => {
            return (
              <div
                key={index}
                onClick={() => { setSelectedPage(index); setIsOpen(false); }}
                className={`text-sm flex items-center justify-center duration-300 transition-all cursor-pointer select-none px-4 py-3 rounded-lg ${selectedPage === index ? "bg-white text-black" : "text-white/80 hover:text-white hover:bg-white/10"}`}>
                {link}
              </div>
            )
          })}
        </div>
      )}

      <Link
        href={'/auth/signin'}
        className={`hidden md:flex text-xs flex items-center justify-center duration-300 transition-all cursor-pointer select-none py-2 md:py-3 bg-purple-700 text-white rounded-full px-4 md:px-6 ml-1 md:mr-1 uppercase shadow-lg hover:bg-purple-600`}>
        Join Us
      </Link>
    </div>
  )
}

function Home() {
  return (
    <div className="flex-1">
      {/* hero section */}
      <section className="flex-1 w-full min-h-screen flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 relative z-20 px-4 md:px-6 pt-24 md:pt-0">
        <div className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center gap-2 md:gap-3 lg:gap-4 shadow-lg">
          <div className="rounded-sm bg-purple-600/30 backdrop-blur-2xl p-1 border border-purple-500/30">
            <Check className="text-purple-300 w-3 h-3 sm:w-4 sm:h-4" size={12} />
          </div>
          <h1 className="text-white text-xs md:text-sm">Everything in one place</h1>
        </div>
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl max-w-4xl text-center leading-tight md:leading-18 font-bold drop-shadow-2xl">
          Tap into the new era of business where you work along side Agents
        </h1>
        <p className="text-sm md:text-base lg:text-lg max-w-3xl text-center text-white/70 drop-shadow-md px-2">
          Allow our agents to optimize and rebuild your system into one that works for you. saves you time, money and brings in more revenue
        </p>
        <div className="bg-white text-black px-4 py-2 rounded-md hover:bg-purple-600 hover:text-white transition-colors cursor-pointer shadow-lg hover:shadow-purple-500/20 text-sm md:text-base">
          Learn more
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-3 text-white">
          <p className="text-white/60 mr-2 md:mr-3">
            Available for:
          </p>
          <div className="flex items-center gap-2 md:gap-3">
            <GrWindows className="w-5 h-5 md:w-6 md:h-6" />
            <GrAndroid className="w-5 h-5 md:w-6 md:h-6" />
            <GrApple className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
        {/* Agents */}
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8 w-full max-w-5xl">
          <h1 className="text-white/80 text-sm md:text-base lg:text-lg">Select from a range of 8 highly trained AI agents</h1>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full justify-items-center">
            {agentsData.map((a, i) => {
              const Icon = IconComponent(a.icon)
              return (
                <div className="text-white bg-zinc-700/80 p-2 sm:p-3 md:p-4 rounded-md hover:bg-zinc-600 transition-colors cursor-pointer" key={i}>
                   <Icon size={16} className="sm:size-5 md:size-6" />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
