import React from 'react'

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-24 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase italic">
            User <span className="text-amber-400">Dashboard</span>
          </h1>
          <p className="text-white/40 text-lg font-medium">Welcome back to PrepWise AI. Access your sessions, reports, and simulations here.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="glass p-8 rounded-[2.5rem] border-white/5 h-48 flex flex-col justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Active Sessions</p>
              <p className="text-4xl font-black text-white">0</p>
           </div>
           <div className="glass p-8 rounded-[2.5rem] border-white/5 h-48 flex flex-col justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">AI Credits</p>
              <p className="text-4xl font-black text-amber-400">Syncing...</p>
           </div>
           <div className="glass p-8 rounded-[2.5rem] border-white/5 h-48 flex flex-col justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Success Rate</p>
              <p className="text-4xl font-black text-white">0%</p>
           </div>
        </div>

        <div className="glass p-12 rounded-[3rem] border-white/5 min-h-[300px] flex items-center justify-center">
           <p className="text-white/20 font-black uppercase tracking-[0.2em]">Dashboard Content Loading...</p>
        </div>
      </div>
    </div>
  )
}
