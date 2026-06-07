'use client';

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Bot, Terminal, Wallet } from "lucide-react";

// Background Components
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GrayTitle, GoldTitle, SectionLabel, SectionHeading } from "@/components/reusables";
import { Code, CodeBlock, CodeHeader } from "@/components/animate-ui/components/animate/code";

// Data
import { LOGOS, AI_TAGS, SLOTS, AVATARS, RATING_CONFIG } from "@/lib/data";

const CODE_SNIPPET = `const InterviewSession = ({ candidate, ai }) => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    ai.on('analysis', (insight) => {
      setFeedback(prev => [...prev, insight]);
    });
  }, [ai]);

  return (
    <div className="interview-room">
      <VideoFeed stream={candidate.stream} />
      <AIPanel insights={feedback} />
      <LiveCoach suggestion={feedback.last} />
    </div>
  );
};`;

/**
 * HOME PAGE
 */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-black selection:bg-white/20">
      
      {/* --- MAIN HERO SECTION --- */}
      <section className="relative min-h-dvh w-full flex flex-col overflow-hidden">
        
        {/* Layer 0: Background */}
        <div className="absolute inset-0 z-0">
          <StarsBackground
            factor={0.03} 
            speed={60}
            pointerEvents={true}
            className="h-full w-full"
          />
        </div>

        {/* Subtle Neutral Glow */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]" aria-hidden="true" />

        {/* Layer 1: Content Wrapper */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-36 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-center w-full">
              
              {/* Left Column: Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:-rotate-1 origin-left"
              >
                <HeroHeader />
                <HeroActions />
              </motion.div>

              {/* Right Column: Code Animation - Now visible on mobile but with adjustments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex flex-col self-start mt-8 lg:mt-4 relative group lg:rotate-1 origin-right w-full lg:max-w-xl mx-auto lg:mx-0"
              >
                {/* Golden Glow Backgrounds */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#f8b81f]/20 via-amber-500/20 to-orange-500/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px]" />
                
                <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(248,184,31,0.15)] bg-black/60 backdrop-blur-xl">
                  <Code code={CODE_SNIPPET} className="border-none bg-transparent">
                    <CodeHeader icon={Terminal} copyButton className="bg-white/[0.03] border-white/5 text-white/40">
                      <span className="bg-linear-to-r from-amber-400 to-[#f8b81f] bg-clip-text text-transparent font-bold">interview-session.tsx</span>
                    </CodeHeader>
                    <CodeBlock 
                      writing 
                      duration={4000} 
                      className="text-white/90 font-mono leading-relaxed selection:bg-amber-500/30"
                    />
                  </Code>
                </div>

                {/* Floating "AI Processing" indicator - Golden Version */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 z-20 px-4 py-2 bg-[#f8b81f]/90 backdrop-blur-md rounded-xl border border-white/20 shadow-xl flex items-center gap-2"
                >
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-black rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-black rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span className="text-[10px] font-bold text-black uppercase tracking-tighter">AI Processing</span>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* --- COMPANIES MARQUEE SECTION --- */}
      <CompaniesMarquee />

      {/* --- FEATURES SECTION --- */}
      <section className="relative py-20 sm:py-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Deep Section Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 text-center mb-24 space-y-4">
          <SectionLabel>Advanced Capabilities</SectionLabel>
          <SectionHeading
            gray="Engineered for"
            gold="Excellence."
          />
        </div>

        <div className="relative z-10 grid grid-cols-12 gap-6 sm:gap-10">
          
          {/* Main Hero Bento: AI Co-Pilot */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8"
          >
            <BentoCard
              icon={<Bot size={28} className="text-amber-400" />}
              title={<GrayTitle>Intelligent Interview Co-Pilot</GrayTitle>}
              desc="Our advanced AI engine generates high-fidelity, role-specific questions in real-time. It adapts to the candidate's proficiency level, ensuring every session is as challenging and relevant as the real thing."
            >
              <div className="flex flex-wrap gap-3 mt-4">
                {AI_TAGS.map((t) => (
                  <Badge key={t.label} variant={t.active ? "gold" : "outline"} className="px-5 py-2 text-[11px] font-bold rounded-2xl border-white/5 bg-white/[0.03]">
                    {t.label}
                  </Badge>
                ))}
              </div>
            </BentoCard>
          </motion.div>

          {/* Wallet: Minimalist Display */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-12 lg:col-span-4"
          >
            <BentoCard
              icon={<Wallet size={24} className="text-amber-400" />}
              title="Global Wallet"
              desc="Seamlessly manage your credits with our integrated ledger system. Earn, withdraw, and scale effortlessly."
            >
              <div className="mt-4 p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 flex flex-col justify-center items-center text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-black mb-4">Current Credits</p>
                <p className="text-7xl font-serif italic bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent leading-none">
                  42
                </p>
              </div>
            </BentoCard>
          </motion.div>

          {/* Row 2: Performance & Feedback */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-12 lg:col-span-6"
          >
            <BentoCard
              icon="📊"
              title={<GrayTitle>Performance Analytics</GrayTitle>}
              desc="Deep technical analysis powered by Gemini. Track accuracy, pace, and situational awareness."
            >
              <div className="mt-8 space-y-3">
                {[
                  { label: "Technical Depth", ...RATING_CONFIG.EXCELLENT },
                  { label: "Communication", ...RATING_CONFIG.GOOD },
                  { label: "System Design", ...RATING_CONFIG.AVERAGE },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group/row hover:bg-white/[0.04] transition-all">
                    <span className="text-xs font-bold text-white/40 group-hover/row:text-white/60">{r.label}</span>
                    <Badge variant="outline" className={`${r.className} border-none font-bold uppercase text-[9px]`}>
                      {r.emoji} {r.label}
                    </Badge>
                  </div>
                ))}
              </div>
            </BentoCard>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-12 lg:col-span-6"
          >
            <BentoCard
              icon="📹"
              title="Studio Infrastructure"
              desc="Low-latency video streaming with collaborative coding. Integrated by Stream.io."
            >
              <div className="mt-8 relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-black/40 group/video">
                <Image src="/hero2.png" alt="Video Feed" fill className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-3 py-1 rounded-full bg-red-500/80 text-[9px] font-black uppercase tracking-widest text-white animate-pulse">REC</div>
                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-bold text-white/80">45:00</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                     <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1" />
                   </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* Row 3: Utility Trio */}
          {[
            { 
              icon: "🗓️", 
              title: "Unified Scheduling", 
              desc: "One-click booking with timezone sync.",
              content: (
                <div className="flex flex-col gap-2 mt-6">
                  {SLOTS.slice(0, 3).map((s) => (
                    <div key={s.label} className={`h-12 rounded-2xl border flex items-center justify-between px-5 text-[11px] font-bold transition-all hover:scale-[1.02] cursor-pointer ${s.cls}`}>
                      {s.label}
                      <span className="opacity-40">Book Now</span>
                    </div>
                  ))}
                </div>
              )
            },
            { 
              icon: "💬", 
              title: "Expert Messaging", 
              desc: "Direct access to mentors.",
              content: (
                <div className="mt-6 space-y-4">
                  <div className="flex items-end gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                      <Image src={AVATARS[0].src} alt="Avatar" fill className="object-cover" />
                    </div>
                    <div className="p-3 px-4 rounded-2xl rounded-bl-none bg-amber-400/10 border border-amber-400/20 text-[11px] font-medium text-amber-200/80 max-w-[80%] leading-relaxed">
                      Hey! Great session today. Focus on your System Design tradeoffs next.
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-11 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-bounce" />
                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    Mentor is typing...
                  </div>
                </div>
              )
            },
            { 
              icon: "🔒", 
              title: "Edge Shield", 
              desc: "Advanced Arcjet protection.",
              content: (
                <div className="mt-6 space-y-2">
                  {[
                    { event: "Malicious Bot Blocked", time: "2m ago", color: "text-red-400" },
                    { event: "Rate Limit Applied", time: "15m ago", color: "text-amber-400" },
                    { event: "API Request Verified", time: "1h ago", color: "text-emerald-400" },
                  ].map((log) => (
                    <div key={log.event} className="flex items-center justify-between p-3 px-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className={`text-[10px] font-bold ${log.color} truncate`}>{log.event}</span>
                      <span className="text-[9px] font-medium text-white/20 whitespace-nowrap">{log.time}</span>
                    </div>
                  ))}
                </div>
              )
            }
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="col-span-12 md:col-span-4"
            >
              <BentoCard icon={item.icon} title={item.title} desc={item.desc} className="!p-8">
                {item.content}
              </BentoCard>
            </motion.div>
          ))}

        </div>
      </section>

      

    </div>
  );
}

/**
 * SUB-COMPONENTS
 */

function HeroHeader() {
  return (
    <div className="flex flex-col items-center lg:items-start space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="group flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white/60"></span>
          </span>
          <span className="text-[11px] font-semibold tracking-wider text-white/80">
            AI Interview Platform
          </span>
        </div>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-serif italic relative text-5xl sm:text-6xl lg:text-[clamp(3.5rem,8vw,6rem)] leading-[1.1] sm:leading-[0.85] tracking-tight text-white"
      >
        <GrayTitle>Ace your next</GrayTitle>
        <br />
        <GoldTitle>Interview.</GoldTitle>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative max-w-full lg:max-w-lg text-base sm:text-lg lg:text-xl leading-relaxed text-white/60 font-medium"
      >
        Practice with senior engineers. Get instant AI insights to land your dream job at top tech companies.
      </motion.p>
    </div>
  );
}

function HeroActions() {
  return (
    <div className="relative flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full sm:w-auto pt-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full sm:w-auto"
      >
        <Link href="/sign-up" className="w-full sm:w-auto">
          <Button variant="gold" className="h-14 w-full sm:w-auto px-10 rounded-2xl font-bold text-base transition-all shadow-[0_20px_40px_rgba(248,184,31,0.2)]">
            Get started for free
            <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full sm:w-auto"
      >
        <Link href="/explore" className="w-full sm:w-auto">
          <Button variant="outline" className="h-14 w-full sm:w-auto px-10 rounded-2xl border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-bold text-base">
            Explore paths
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

function CompaniesMarquee() {
  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="relative py-16 bg-black overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
          Helping engineers land roles at
        </p>
      </div>
      
      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-12 sm:gap-24 items-center"
        >
          {duplicatedLogos.map((logo, idx) => (
            <div key={`${logo.alt}-${idx}`} className="flex-shrink-0 relative w-[100px] h-6 opacity-70 hover:opacity-100 transition-all duration-500">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Side gradients for seamless fading effect */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}

function BentoCard({ icon, title, desc, children, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`group relative bg-white/[0.03] border border-white/5 hover:border-amber-400/30 rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-10 h-full transition-all duration-700 overflow-hidden backdrop-blur-3xl ${className}`}
    >
      {/* Mesh Gradient Background */}
      <div className="absolute -inset-[100%] bg-[radial-gradient(circle_at_50%_50%,rgba(248,184,31,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      
      {/* Top Glass Highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-white/[0.02] border border-white/10 flex items-center justify-center text-2xl sm:text-3xl mb-6 sm:mb-10 group-hover:scale-110 group-hover:bg-amber-400/10 group-hover:border-amber-400/20 transition-all duration-700 shadow-2xl">
          {icon}
        </div>

        <div className="space-y-4 mb-auto">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-sm sm:text-[15px] text-white/30 leading-relaxed font-medium max-w-full sm:max-w-[320px] group-hover:text-white/50 transition-colors">
            {desc}
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function MockUI({ rows = 3 }) {
  const widths = ["w-full", "w-4/5", "w-3/5", "w-full", "w-2/3"];
  const colors = [
    "bg-white/5",
    "bg-white/5",
    "bg-amber-400/20",
    "bg-white/5",
    "bg-white/5",
  ];

  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full ${widths[i % widths.length]} ${colors[i % colors.length]} group-hover:bg-white/10 transition-colors duration-700`}
        />
      ))}
    </div>
  );
}
