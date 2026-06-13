'use client';

import * as React from "react";

export default function ReportVisual() {
  return (
    <div className="relative aspect-[4/3] glass rounded-[3rem] overflow-hidden p-10 group shadow-2xl">
       <div className="absolute -inset-20 bg-amber-500/5 rounded-full blur-[80px] group-hover:bg-amber-500/10 transition-all duration-1000" />
       <div className="relative space-y-8">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Performance Scorecard</h4>
            <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest">Hire</div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             {[
               { l: 'Technical', v: 88 },
               { l: 'Design', v: 92 },
               { l: 'Soft Skills', v: 84 },
               { l: 'Culture', v: 96 }
             ].map(s => (
               <div key={s.l} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                 <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2">{s.l}</p>
                 <p className="text-2xl font-black text-white mb-3">{s.v}%</p>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400" style={{ width: `${s.v}%` }} />
                 </div>
               </div>
             ))}
          </div>

          <div className="p-6 glass rounded-2xl border-amber-400/10">
             <p className="text-[11px] font-medium text-white/60 leading-relaxed italic">
                &quot;Strong command over distributed systems. Consider refining architectural diagramming clarity.&quot;
             </p>
          </div>
       </div>
    </div>
  );
}
