'use client';

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

// Backgrounds
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

// UI Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GrayTitle, GoldTitle, DecorativeLine } from "@/components/reusables";

// Data
import { LOGOS } from "@/lib/data";

/**
 * HOME PAGE - Single Fold
 * Optimized to fit all content within a single viewport height (no scrolling).
 */
export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-black selection:bg-amber-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full flex flex-col">
        
        {/* Layer 0: Background & Layout Wrapper */}
        <StarsBackground
          factor={0.03} 
          speed={60}
          pointerEvents={true}
          className="absolute inset-0 h-full w-full flex items-start justify-center pt-28 pb-20"
        >
          <BackgroundGlow />

          {/* Layer 1: Content Grid */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-28">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-2 items-center w-full">
              
              {/* Left Column: Compact Content */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-start text-left max-w-xl lg:-rotate-1 origin-left lg:pr-4"
              >
                <HeroHeader />
                <HeroActions />
                <SocialProof />
              </motion.div>

              {/* Right Column: Reserved for Future Components */}
              <div className=" lg:block relative h-full w-full">
                {/* Reserved for your future element */}
              </div>

            </div>
          </div>
        </StarsBackground>
      </section>

    </div>
  );
}

/**
 * SUB-COMPONENTS
 */

function BackgroundGlow() {
  return (
    <div 
      className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_40%,rgba(245,158,11,0.15)_0%,transparent_60%)]" 
      aria-hidden="true"
    />
  );
}

function HeroHeader() {
  return (
    <>
      <Badge variant="gold" className="mb-6 px-3 py-1 text-[10px] font-bold tracking-widest backdrop-blur-3xl border-amber-400/50 bg-amber-400/20 text-amber-400 uppercase">
        ✨ Powered by AI Engine
      </Badge>

      <DecorativeLine />

      <h1 className="font-sans font-bold relative text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.0] tracking-tight text-white mb-6">
        <GrayTitle>Ace your next</GrayTitle>
        <br />
        <GoldTitle>Interview.</GoldTitle>
      </h1>

      <p className="relative max-w-md text-base leading-relaxed text-stone-200 font-medium mb-2">
        Realistic mock interviews with senior engineers. 
        Get AI-driven insights to elevate your career.
      </p>
    </>
  );
}

function HeroActions() {
  return (
    <div className="relative mt-8 flex flex-col sm:flex-row justify-start gap-3 w-full sm:w-auto">
      <Link href="/sign-up" className="w-full sm:w-auto">
        <Button variant="gold" className="h-12 w-full sm:w-auto px-8 rounded-xl bg-amber-400 text-black hover:bg-amber-300 font-bold text-sm transition-all shadow-[0_15px_30px_rgba(245,158,11,0.25)]">
          Get Started
          <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </Button>
      </Link>

      <Link href="/explore" className="w-full sm:w-auto">
        <Button variant="outline" className="h-12 w-full sm:w-auto px-8 rounded-xl border-white/15 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-bold text-sm">
          Explore
        </Button>
      </Link>
    </div>
  );
}

function SocialProof() {
  return (
    <div className="mt-12 w-full border-t border-white/5 pt-8 max-w-md">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-6">
        Trusted by engineers from
      </p>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-5 opacity-90 transition-all hover:opacity-100">
        {LOGOS.slice(0, 7).map((logo) => (
          <Image
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            width={75}
            height={22}
            className="h-4 w-auto object-contain sm:h-5"
          />
        ))}
      </div>
    </div>
  );
}
