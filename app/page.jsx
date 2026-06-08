'use client';

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer 
} from "recharts";
import { 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

// Background Components
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GrayTitle, 
  GoldTitle, 
  SectionLabel, 
  SectionHeading,
  DecorativeLine 
} from "@/components/reusables";
import { cn } from "@/lib/utils";

// Data
import { LOGOS, AVATARS } from "@/lib/data";

/**
 * HOME PAGE - ELITE REDESIGN
 */
export default function Home() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      
      {/* --- ELITE HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
        
        {/* Elite Background Layer */}
        <div className="absolute inset-0 z-0">
          <StarsBackground
            factor={0.03} 
            speed={60}
            pointerEvents={true}
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(248,184,31,0.08)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex justify-center"
          >
            <div className="glass px-4 py-1.5 rounded-full flex items-center gap-2 group cursor-pointer hover:border-amber-400/30 transition-all duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60 group-hover:text-amber-400 transition-colors">
                Trusted by 5,000+ FAANG Aspirants
              </span>
              <ArrowRight size={12} className="text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>

          {/* Authoritative Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-5xl mx-auto mb-10 text-[clamp(2.5rem,9vw,6.5rem)] font-black leading-[0.85] tracking-[-0.06em] text-white"
          >
            Practice Interviews.
            <br />
            <GoldTitle>Get Hired Faster.</GoldTitle>
          </motion.h1>

          {/* Supportive Copy */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-14 text-lg md:text-xl text-white/40 font-medium leading-relaxed"
          >
            Train with our elite AI engine that generates realistic role-specific questions and provides instant, deep technical feedback.
          </motion.p>

          {/* CTA Group */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24"
          >
            <Link href="/sign-up" className="w-full sm:w-auto">
              <Button variant="gold" className="h-16 w-full sm:w-64 rounded-2xl text-base font-black uppercase tracking-widest shadow-[0_20px_60px_rgba(248,184,31,0.3)]">
                Start Preparing Free
              </Button>
            </Link>
            <Link href="#interactive" className="w-full sm:w-auto">
              <Button variant="outline" className="h-16 w-full sm:w-64 rounded-2xl text-base font-black uppercase tracking-widest glass hover:bg-white/10">
                Live Demo
              </Button>
            </Link>
          </motion.div>

          {/* Elite Product Preview Mockup */}
          <HeroProductPreview />

        </div>
      </section>

      {/* --- TRUST SECTION --- */}
      <section className="relative py-24 border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-16">
            Aspiring engineers land roles at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-30 hover:opacity-100 transition-opacity duration-1000">
             {LOGOS.slice(0, 6).map((logo) => (
               <div key={logo.alt} className="h-6 w-auto relative grayscale brightness-200">
                 <Image src={logo.src} alt={logo.alt} width={100} height={30} className="object-contain" />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- INTERACTIVE EXPERIENCE SECTION --- */}
      <section id="interactive" className="relative py-32 overflow-hidden bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-24 space-y-6">
            <SectionLabel>Interactive Showcase</SectionLabel>
            <SectionHeading 
              gray="Experience the future of" 
              gold="Preparation." 
              className="mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
             <LiveQuestionGenerator />
             <ScoreSimulator />
             <FeedbackPlayground />
             <RoadmapExplorer />
          </div>
        </div>
      </section>

      {/* --- NARRATIVE FEATURE SECTIONS --- */}
      <section id="features" className="relative py-32 space-y-48">
        
        {/* Narrative Block 1 */}
        <FeatureNarrativeBlock
          label="The Engine"
          gray="Role-Specific"
          gold="Intelligent Coaching."
          desc="Stop practicing generic questions. Our engine adapts to your target role, level, and company, generating dynamic scenarios that test your limits."
          visual={<SessionVisual />}
        />

        {/* Narrative Block 2 */}
        <FeatureNarrativeBlock
          reversed
          label="The Insight"
          gray="Deep Technical"
          gold="Analysis Reports."
          desc="Get detailed scorecards after every session. We analyze your technical depth, communication clarity, and problem-solving strategies using FAANG rubrics."
          visual={<ReportVisual />}
        />

        {/* Narrative Block 3 */}
        <FeatureNarrativeBlock
          label="The Roadmap"
          gray="Data-Driven"
          gold="Success Paths."
          desc="Track your progress with visual analytics. Identify weak spots, monitor hiring readiness, and know exactly when you're ready for the real thing."
          visual={<AnalyticsVisual />}
        />

      </section>

      {/* --- FINAL CTA --- */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto glass p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden flex flex-col items-center text-center border-amber-400/10 shadow-[0_20px_60px_-15px_rgba(248,184,31,0.05)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,184,31,0.1)_0%,transparent_70%)]" />
            <h2 className="relative z-10 text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] tracking-tight text-white mb-10 w-full">
              Ready to land your 
              <br />
              <GoldTitle>dream offer?</GoldTitle>
            </h2>
            <Link href="/sign-up" className="relative z-10 w-full sm:w-auto">
              <Button variant="gold" className="h-16 w-full sm:w-auto px-12 rounded-2xl text-base font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(248,184,31,0.2)] hover:scale-105 active:scale-95 transition-all">
                Start Preparing Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />

    </div>
  );
}

/**
 * --- SUB-COMPONENTS (ELITE UI) ---
 */


function HeroProductPreview() {
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
                    <div className="w-24 aspect-video rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
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

function LiveQuestionGenerator() {
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


function ScoreSimulator() {
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

function FeedbackPlayground() {
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

function RoadmapExplorer() {
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


function FeatureNarrativeBlock({ label, gray, gold, desc, visual, reversed = false }) {
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

function SessionVisual() {
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

function ReportVisual() {
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

function AnalyticsVisual() {
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

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
               <Image src="/logo.png" alt="PrepWise AI" width={140} height={40} className="object-contain" />
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              The world&apos;s most advanced technical interview simulation platform. Practice with elite AI mentors and get hired faster.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Product</h4>
            <ul className="space-y-4">
              {['AI Co-Pilot', 'Performance Analytics', 'Studio Environment', 'Pricing'].map(link => (
                <li key={link}><Link href="#" className="text-sm font-medium text-white/40 hover:text-amber-400 transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {['About', 'Blog', 'Careers', 'Contact'].map(link => (
                <li key={link}><Link href="#" className="text-sm font-medium text-white/40 hover:text-amber-400 transition-colors">{link}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs font-medium text-white/20">
          <p>© {new Date().getFullYear()} PrepWise AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

