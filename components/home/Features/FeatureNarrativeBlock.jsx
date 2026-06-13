'use client';

import * as React from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SectionLabel, SectionHeading } from "@/components/reusables";
import { cn } from "@/lib/utils";

export default function FeatureNarrativeBlock({ label, gray, gold, desc, visual, reversed = false }) {
  return (
    <div className={cn(
      "container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center",
      reversed && "lg:flex-row-reverse"
    )}>
      <motion.div 
        initial={{ opacity: 0, x: reversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={cn("space-y-8", reversed && "lg:order-2")}
      >
        <div className="space-y-4">
          <SectionLabel>{label}</SectionLabel>
          <SectionHeading gray={gray} gold={gold} />
        </div>
        <p className="text-lg text-white/40 leading-relaxed font-medium">
          {desc}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-4">
           <div className="flex items-center gap-3">
             <div className="h-6 w-6 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
               <CheckCircle2 size={14} />
             </div>
             <span className="text-[11px] font-bold text-white/80">FAANG Rubric Alignment</span>
           </div>
           <div className="flex items-center gap-3">
             <div className="h-6 w-6 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
               <CheckCircle2 size={14} />
             </div>
             <span className="text-[11px] font-bold text-white/80">Instant Analysis</span>
           </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={cn("relative", reversed && "lg:order-1")}
      >
        {visual}
      </motion.div>
    </div>
  );
}
