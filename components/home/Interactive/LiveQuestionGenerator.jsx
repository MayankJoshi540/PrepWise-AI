'use client';

import * as React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LiveQuestionGenerator() {
  const [level, setLevel] = React.useState('Medium');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  
  const questionsDB = {
    'Easy': [
      "Explain the difference between 'let', 'const', and 'var' in JavaScript.",
      "What is the Virtual DOM in React and how does it work?",
      "How would you center a div using CSS Flexbox or Grid?"
    ],
    'Medium': [
      "Design a rate-limiter for a globally distributed API using Redis.",
      "Explain how React's reconciliation algorithm handles list rendering.",
      "Implement a debounce function from scratch. What are its edge cases?"
    ],
    'Hard': [
      "Implement a custom task scheduler that handles priorities and concurrency limits.",
      "Design a scalable real-time collaborative code editor (like Google Docs).",
      "Explain how you would optimize a React application that processes 10k WebSocket events per second."
    ]
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setQuestionIndex(prev => (prev + 1) % questionsDB[level].length);
      setIsGenerating(false);
    }, 1000);
  };

  const currentQuestion = questionsDB[level][questionIndex];

  return (
    <div className="glass p-8 md:p-12 rounded-[3rem] relative overflow-hidden flex flex-col lg:flex-row h-full gap-12 items-center lg:col-span-2 border-amber-400/10 shadow-[0_20px_60px_-15px_rgba(248,184,31,0.05)]">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="w-full lg:w-1/2 space-y-8 relative z-10 flex flex-col">
        <div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">Live Question Engine</h3>
          <p className="text-lg text-white/50 font-medium">Instant simulation of role-specific technical scenarios.</p>
        </div>
        <div className="space-y-6 flex flex-col">
          <div className="flex gap-3">
            {['Easy', 'Medium', 'Hard'].map(l => (
              <button 
                key={l} 
                onClick={() => { setLevel(l); setQuestionIndex(0); handleGenerate(); }}
                className={cn(
                  "px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 shadow-lg",
                  level === l ? "border-amber-400/50 bg-linear-to-b from-[#ffc73c] to-[#f8b81f] text-black shadow-[0_0_20px_rgba(248,184,31,0.3)]" : "border-white/10 bg-white/5 text-white/40 hover:text-white"
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center pt-2">
             <Button 
               onClick={handleGenerate}
               variant="outline" 
               className="h-12 px-8 rounded-xl border-amber-400/20 bg-amber-400/5 text-amber-400 text-[11px] font-black uppercase tracking-widest hover:bg-amber-400/10 hover:border-amber-400/40"
             >
               Regenerate Scenario
             </Button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 glass bg-black/40 border-amber-400/10 p-8 md:p-12 rounded-[2.5rem] flex items-center min-h-[250px] relative shadow-[inset_0_0_30px_rgba(248,184,31,0.02)]">
         <p className={cn(
           "absolute top-6 left-8 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500",
           isGenerating ? "text-amber-400 opacity-100" : "text-white/20 opacity-0"
         )}>AI is Generating...</p>
         
         <div className="w-full pt-8">
            {isGenerating ? (
              <div className="w-full space-y-4">
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden relative">
                   <motion.div 
                     initial={{ left: "-100%" }}
                     animate={{ left: "100%" }}
                     transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                     className="absolute inset-0 w-1/3 bg-amber-400/40"
                   />
                </div>
                <div className="h-3 w-3/4 bg-white/5 rounded-full" />
                <div className="h-3 w-1/2 bg-white/5 rounded-full" />
              </div>
            ) : (
              <motion.p 
                key={`${level}-${questionIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-base md:text-lg font-bold text-amber-50 leading-relaxed font-mono"
              >
                &quot;{currentQuestion}&quot;
              </motion.p>
            )}
         </div>
      </div>
    </div>
  );
}
