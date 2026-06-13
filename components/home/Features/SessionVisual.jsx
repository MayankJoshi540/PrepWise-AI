'use client';

import * as React from "react";
import Image from "next/image";
import { AVATARS } from "@/lib/data";

export default function SessionVisual() {
  return (
    <div className="relative aspect-[4/3] glass rounded-[3rem] overflow-hidden p-8 group shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(248,184,31,0.05)_0%,transparent_70%)]" />
      <div className="relative space-y-6">
        <div className="flex justify-between items-center mb-10">
           <div className="flex gap-1.5">
             {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/10" />)}
           </div>
           <div className="px-3 py-1 glass rounded-lg text-[9px] font-bold text-white/30 uppercase tracking-widest">Active Session</div>
        </div>
        
        <div className="space-y-4">
           <div className="glass-gold p-5 rounded-2xl border-dashed">
             <p className="text-xs font-bold text-amber-200/80 leading-relaxed">
               &quot;Interviewer is analyzing your approach to cache invalidation...&quot;
             </p>
           </div>
           <div className="glass p-5 rounded-2xl">
             <div className="flex gap-3 items-start">
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">💬</div>
               <div className="space-y-2 flex-1">
                 <div className="h-2 w-[80%] bg-white/10 rounded-full" />
                 <div className="h-2 w-[40%] bg-white/5 rounded-full" />
               </div>
             </div>
           </div>
        </div>
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-32 md:w-48 aspect-video glass rounded-2xl border-amber-400/10 flex items-center justify-center overflow-hidden">
         <Image src={AVATARS[1].src} fill className="object-cover opacity-40 grayscale" alt="Mentor" />
      </div>
    </div>
  );
}
