'use client';

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function FeedbackPlayground() {
  const [answerQuality, setAnswerQuality] = React.useState('Average');

  const answers = {
    'Weak': "I think I would use a loop to check all the items.",
    'Average': "I would use a simple useEffect to fetch the data on component mount.",
    'Excellent': "I'd implement a sliding window approach with debouncing to ensure we process bursts efficiently without blocking the main thread."
  };

  const feedback = {
    'Weak': "Too vague. Specify which loop and the time complexity (O(N) vs O(1)).",
    'Average': "Good start. Now discuss how you'd handle error states and loading skeletons.",
    'Excellent': "Perfect. You addressed both performance (debouncing) and user experience."
  };

  return (
    <div className="glass p-8 md:p-12 rounded-[3rem] relative overflow-hidden lg:col-span-2 flex flex-col lg:flex-row h-full gap-12 items-center border-amber-400/10 shadow-[0_20px_60px_-15px_rgba(248,184,31,0.05)]">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="w-full lg:w-1/2 space-y-8 relative z-10 flex flex-col">
        <div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">AI Feedback Loop</h3>
          <p className="text-lg text-white/50 font-medium">Experience real-time coaching adapting to your answer quality.</p>
        </div>
        
        <div className="flex flex-col gap-3">
            {['Weak', 'Average', 'Excellent'].map(q => (
              <button 
                key={q} 
                onClick={() => setAnswerQuality(q)}
                className={cn(
                  "p-5 rounded-3xl text-[11px] font-black uppercase tracking-widest border transition-all text-left hover:scale-[1.02] active:scale-95 shadow-lg",
                  answerQuality === q ? "border-amber-400/50 bg-linear-to-b from-[#ffc73c] to-[#f8b81f] text-black shadow-[0_0_20px_rgba(248,184,31,0.3)]" : "border-white/10 bg-white/5 text-white/40 hover:text-white"
                )}
              >
                {q} Response
              </button>
            ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 glass bg-black/40 border-amber-400/10 p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-center h-full min-h-[300px] shadow-[inset_0_0_30px_rgba(248,184,31,0.02)]">
        <div className="space-y-6 flex-1 flex flex-col justify-center">
           <div className="flex flex-col gap-6">
              <div className="w-full">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 pl-2">You</p>
                <motion.div 
                  key={`ans-${answerQuality}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="self-end ml-auto max-w-[90%] glass p-5 rounded-3xl rounded-tr-none text-sm md:text-base font-medium text-white/80 leading-relaxed"
                >
                  &quot;{answers[answerQuality]}&quot;
                </motion.div>
              </div>
              
              <div className="w-full">
                <p className="text-[9px] font-black uppercase tracking-widest text-amber-400/60 mb-2 pl-2">AI Coach</p>
                <motion.div 
                  key={`fb-${answerQuality}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="self-start mr-auto max-w-[90%] glass bg-amber-400/[0.05] p-5 rounded-3xl rounded-tl-none text-sm md:text-base font-bold text-amber-50 border-amber-400/20 leading-relaxed shadow-[0_10px_30px_rgba(248,184,31,0.05)]"
                >
                   &quot;{feedback[answerQuality]}&quot;
                </motion.div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
