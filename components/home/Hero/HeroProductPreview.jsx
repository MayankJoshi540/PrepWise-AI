'use client';

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AVATARS } from "@/lib/data";

export default function HeroProductPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-6xl mx-auto group"
    >
      <div className="absolute -inset-10 bg-amber-500/10 rounded-[4rem] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative glass rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Mock OS Header */}
        <div className="flex items-center justify-between px-8 py-4 bg-white/[0.03] border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center gap-6">
            <div className="h-1 w-32 bg-white/5 rounded-full" />
            <div className="h-1 w-16 bg-white/5 rounded-full" />
          </div>
        </div>

        {/* Product UI Simulation */}
        <div className="grid grid-cols-12 gap-px bg-white/5 min-h-[600px]">
          <div className="col-span-12 md:col-span-8 bg-black/40 p-8 relative overflow-hidden">
             {/* Main Video/Code Area */}
             <div className="h-full flex flex-col gap-6">
               <div className="flex justify-between items-center">
                 <Badge className="bg-amber-400/10 border-amber-400/20 text-amber-400 font-black tracking-widest uppercase py-1">L5 Frontend Interview</Badge>
                 <div className="flex gap-2">
                   <div className="px-3 py-1 glass rounded-lg text-[10px] font-bold text-white/40 uppercase tracking-widest">45:00</div>
                 </div>
               </div>
               
               <div className="flex-1 rounded-2xl border border-white/5 bg-black/60 p-6 relative">
                 <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-24 aspect-video rounded-lg border border-white/10 bg-white/5 flex items-center justify-center relative overflow-hidden">
                      <Image src={AVATARS[0].src} fill className="object-cover opacity-60 grayscale" alt="Interviewer" />
                    </div>
                 </div>
                 <div className="font-mono text-sm space-y-2 text-white/80">
                   <p className="text-amber-400">interviewer.ask(&quot;How would you optimize...&quot;);</p>
                   <p className="text-white/40 mt-8">&#47;&#47; Implement your solution below</p>
                   <div className="flex items-center gap-1">
                     <span className="w-1 h-5 bg-amber-400 animate-pulse" />
                   </div>
                 </div>
               </div>
             </div>
          </div>

          <div className="col-span-12 md:col-span-4 bg-white/[0.02] p-8 space-y-8 border-l border-white/5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 mb-6">AI Feedback</p>
              <div className="space-y-4">
                 <div className="glass-gold p-4 rounded-xl">
                   <p className="text-[11px] font-medium text-amber-200/80 leading-relaxed italic">
                     &quot;Focus on discussing the reconciliation algorithm trade-offs in React 19.&quot;
                   </p>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-amber-400" 
                   />
                 </div>
                 <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-white/30">
                   <span>Technical Depth</span>
                   <span>85%</span>
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Live Signals</p>
              {["Voice Clarity Optimized", "Code Quality High", "Pace Stabilized"].map(sig => (
                <div key={sig} className="flex items-center gap-3">
                  <CheckCircle2 size={12} className="text-amber-400/40" />
                  <span className="text-[11px] font-bold text-white/40">{sig}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
