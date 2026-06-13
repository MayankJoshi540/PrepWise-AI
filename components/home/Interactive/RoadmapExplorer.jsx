'use client';

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function RoadmapExplorer() {
  const [activeRole, setActiveRole] = React.useState('Frontend');

  const roleData = {
    'Frontend': { progress: 30, topics: '12 / 40', label: 'React, System Design, CSS' },
    'Backend': { progress: 65, topics: '26 / 40', label: 'System Design, Databases, API' },
    'Data': { progress: 15, topics: '6 / 40', label: 'SQL, Python, Pipelines' },
    'Mobile': { progress: 80, topics: '32 / 40', label: 'Swift, State, Architecture' }
  };

  return (
    <div className="glass p-8 md:p-12 rounded-[3rem] relative overflow-hidden lg:col-span-2 flex flex-col lg:flex-row h-full gap-12 items-center border-amber-400/10 shadow-[0_20px_60px_-15px_rgba(248,184,31,0.05)]">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="w-full lg:w-1/2 space-y-8 relative z-10 flex flex-col">
        <div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">Career Roadmap</h3>
          <p className="text-lg text-white/50 font-medium">Strategic preparation paths and curriculum tracking for your target role.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
           {Object.keys(roleData).map(role => (
             <button 
               key={role} 
               onClick={() => setActiveRole(role)}
               className={cn(
                 "p-5 rounded-3xl border transition-all text-left hover:scale-[1.02] active:scale-95 shadow-lg",
                 activeRole === role ? "border-amber-400/50 bg-linear-to-b from-[#ffc73c] to-[#f8b81f] text-black shadow-[0_0_20px_rgba(248,184,31,0.3)]" : "border-white/10 bg-white/5 text-white/40 hover:text-white"
               )}
             >
               <p className="text-[11px] font-black uppercase tracking-widest">{role}</p>
             </button>
           ))}
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 glass bg-black/40 border-amber-400/10 p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-center h-full min-h-[250px] shadow-[inset_0_0_30px_rgba(248,184,31,0.02)] relative z-10">
        <div className="space-y-6">
           <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-white/60">
             <span>{roleData[activeRole].label}</span>
             <motion.span 
                key={activeRole}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-amber-400 text-lg"
             >
               {roleData[activeRole].topics}
             </motion.span>
           </div>
           <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden relative">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${roleData[activeRole].progress}%` }}
               transition={{ type: "spring", stiffness: 50, damping: 15 }}
               className="absolute left-0 top-0 h-full bg-linear-to-r from-[#c79116] to-[#f8b81f] rounded-full shadow-[0_0_15px_rgba(248,184,31,0.5)]" 
             />
           </div>
           <div className="pt-8 border-t border-amber-400/10 text-center">
             <p className="text-xs font-medium text-white/40 leading-relaxed">
               Mastering these topics increases FAANG hire probability by an average of <span className="text-amber-400 font-black">{Math.round(roleData[activeRole].progress * 1.5)}%</span>.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}
