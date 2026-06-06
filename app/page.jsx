'use client';

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Terminal } from "lucide-react";

// Background Components
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GrayTitle, GoldTitle } from "@/components/reusables";
import { Code, CodeBlock, CodeHeader } from "@/components/animate-ui/components/animate/code";

// Data
import { LOGOS } from "@/lib/data";

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
      <section className="relative min-h-screen w-full flex flex-col overflow-hidden">
        
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
        <div className="relative z-10 flex-1 flex items-center justify-center w-full pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
              
              {/* Left Column: Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:-rotate-1 origin-left"
              >
                <HeroHeader />
                <HeroActions />
                <SocialProof />
              </motion.div>

              {/* Right Column: Code Animation - Restricted to Laptop/Desktop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="hidden lg:flex flex-col self-start mt-4 relative group lg:rotate-1 origin-right"
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

      {/* --- FEATURES SECTION --- */}
      <section className="relative py-24 lg:py-40 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <FeatureCard 
              title="Real-time Analysis"
              description="Get instant feedback on your tone, pace, and body language during the session."
              icon="⚡"
            />
            <FeatureCard 
              title="Expert Questions"
              description="Access a database of 10,000+ industry-specific questions from top-tier companies."
              icon="🎯"
            />
            <FeatureCard 
              title="Progress Tracking"
              description="Visualize your improvement over time with detailed performance analytics."
              icon="📈"
            />
          </div>
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
        className="font-serif italic relative text-5xl sm:text-6xl lg:text-[clamp(3.5rem,8vw,6rem)] leading-[0.85] tracking-tight text-white"
      >
        <GrayTitle>Ace your next</GrayTitle>
        <br />
        <GoldTitle>Interview.</GoldTitle>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative max-w-lg text-base sm:text-lg lg:text-xl leading-relaxed text-white/60 font-medium"
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

function SocialProof() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.7 }}
      className="mt-12 w-full border-t border-white/10 pt-8 max-w-md"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6">
        Trusted by engineers from
      </p>
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-5 opacity-60 transition-all hover:opacity-100">
        {LOGOS.slice(0, 7).map((logo) => (
          <Image
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={75}
            height={22}
            className="h-4 w-auto object-contain brightness-0 invert sm:h-5"
          />
        ))}
      </div>
    </motion.div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
      <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{description}</p>
    </div>
  );
}
