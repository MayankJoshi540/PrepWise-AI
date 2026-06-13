'use client';

import * as React from "react";
import { motion } from "motion/react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from "recharts";

export default function ScoreSimulator() {
  const [scores, setScores] = React.useState({
    'Communication': 90,
    'Technical': 80,
    'Design': 75,
    'Culture': 85,
    'Speed': 88
  });

  const avg = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / 5);
  const hireProb = Math.min(100, Math.round(avg * 1.15));
  const grade = avg > 90 ? 'Strong Hire' : avg > 80 ? 'Hire' : avg > 70 ? 'Leaning Hire' : 'No Hire';

  const chartData = Object.entries(scores).map(([subject, A]) => ({
    subject, A, fullMark: 100
  }));

  return (
    <div className="glass p-8 md:p-12 rounded-[3rem] relative overflow-hidden flex flex-col h-full lg:col-span-2 border-amber-400/10 shadow-[0_20px_60px_-15px_rgba(248,184,31,0.05)]">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="space-y-8 relative z-10 flex-1 flex flex-col">
        <div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">Hire Probability Simulator</h3>
          <p className="text-lg text-white/50 font-medium">Adjust metrics to see how technical rubrics impact your overall hiring probability.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 flex-1 items-center">
          {/* Chart Area */}
          <div className="w-full lg:w-1/2 h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="rgba(248,184,31,0.15)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700 }} />
                <Radar
                  name="Candidate"
                  dataKey="A"
                  stroke="#f8b81f"
                  strokeWidth={2}
                  fill="#f8b81f"
                  fillOpacity={0.15}
                  isAnimationActive={true}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Sliders & Results Area */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              {Object.entries(scores).map(([label, val]) => (
                <div key={label} className="space-y-3">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/60">
                    <span>{label}</span>
                    <motion.span 
                      key={val}
                      initial={{ scale: 1.2, color: '#f8b81f' }}
                      animate={{ scale: 1, color: '#ffffff' }}
                      className="text-white"
                    >
                      {val}%
                    </motion.span>
                  </div>
                  <div className="relative w-full h-2 bg-white/10 rounded-full flex items-center">
                    <div 
                      className="absolute left-0 top-0 h-full bg-linear-to-r from-[#c79116] to-[#f8b81f] rounded-full pointer-events-none" 
                      style={{ width: `${val}%` }} 
                    />
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={val} 
                      onChange={(e) => setScores(prev => ({ ...prev, [label]: parseInt(e.target.value) }))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div 
                      className="w-5 h-5 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(248,184,31,0.6)] pointer-events-none transition-transform absolute -translate-x-1/2" 
                      style={{ left: `${val}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-8 border-t border-amber-400/10 flex items-center justify-between">
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400/60 mb-1">Decision</p>
                <p className="text-3xl md:text-4xl font-black text-amber-50">{grade}</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400/60 mb-1">Probability</p>
                 <p className="text-4xl md:text-5xl font-black text-amber-400">{hireProb}<span className="text-amber-400/40 text-3xl">%</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
