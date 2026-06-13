'use client';

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function AnalyticsVisual() {
  return (
    <div className="relative aspect-[4/3] glass rounded-[3rem] overflow-hidden p-10 group shadow-2xl">
       <div className="relative h-full flex flex-col justify-between">
          <div className="flex justify-between items-center">
             <div className="space-y-1">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Preparation Velocity</p>
               <p className="text-lg font-bold text-white">Consistent Growth</p>
             </div>
             <div className="flex gap-2">
                {[1,2,3,4].map(i => <div key={i} className="h-8 w-1.5 bg-amber-400/20 rounded-full" />)}
                <div className="h-8 w-1.5 bg-amber-400 rounded-full" />
             </div>
          </div>

          <div className="flex-1 flex items-end gap-3 pt-12">
             {[30, 45, 35, 60, 55, 80, 75, 95].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: 0 }}
                 whileInView={{ height: `${h}%` }}
                 className={cn(
                   "flex-1 rounded-t-xl transition-all duration-500",
                   i === 7 ? "bg-amber-400" : "bg-white/5 group-hover:bg-white/10"
                 )}
               />
             ))}
          </div>

          <div className="pt-10 flex gap-8">
             <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/20 text-center">Sessions</p>
                <p className="text-xl font-black text-white text-center">24</p>
             </div>
             <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/20 text-center">Avg. Score</p>
                <p className="text-xl font-black text-white text-center">82%</p>
             </div>
             <div className="space-y-1">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/20 text-center"> FAANG Prob.</p>
                <p className="text-xl font-black text-white text-center">92%</p>
             </div>
          </div>
       </div>
    </div>
  );
}
