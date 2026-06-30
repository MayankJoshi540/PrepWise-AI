'use client';

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Home, Compass, AlertCircle } from "lucide-react";

// Components & UI
import { Button } from "@/components/ui/button";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { GoldTitle, SectionLabel } from "@/components/reusables";

export default function NotFound() {
  return (
    <div className="relative w-full bg-black min-h-screen text-white overflow-hidden flex items-center justify-center pt-32 pb-16">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <StarsBackground factor={0.03} speed={60} pointerEvents={false} className="h-full w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(248,184,31,0.08)_0%,transparent_50%)]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 max-w-xl text-center space-y-10">
        
        {/* Error Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-amber-400/20 bg-amber-400/5 px-4 py-2 rounded-full text-amber-400 text-xs font-black uppercase tracking-[0.2em]"
        >
          <AlertCircle size={14} className="animate-pulse" />
          Error 404
        </motion.div>

        {/* Heading */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.95] tracking-tight text-white"
          >
            Session Out <br />
            Of <GoldTitle>Bounds.</GoldTitle>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/40 text-base font-medium leading-relaxed max-w-md mx-auto"
          >
            The interview path or route you are trying to access does not exist or has been deprecated. Let's get you back on track.
          </motion.p>
        </div>

        {/* Visual Simulated Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-xl rounded-full" />
          <div className="flex items-center justify-between text-left border-b border-white/5 pb-4 mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Path Status</span>
              <p className="font-sans font-black tracking-tight text-lg text-white">Undefined Route</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 border border-white/10 px-2.5 py-1 rounded-full">
              404
            </span>
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed text-left">
            Error trace: System was unable to map the incoming request token to a registered dashboard session. Ensure URL path validity.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="gold" className="h-14 w-full sm:px-8 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-[1.03] hover:shadow-lg active:scale-95 transition-all">
              <Compass className="size-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
          
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="h-14 w-full sm:px-8 rounded-2xl text-xs font-black uppercase tracking-widest border-white/10 hover:bg-white/5 text-white/80 hover:text-white transition-all">
              <Home className="size-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
