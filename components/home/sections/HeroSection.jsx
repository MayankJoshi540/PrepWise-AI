'use client';

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { Button } from "@/components/ui/button";
import { GoldTitle } from "@/components/reusables";
import HeroProductPreview from "../Hero/HeroProductPreview";

export default function HeroSection() {
  return (
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
          <div className="glass px-4 py-1.5 rounded-full flex items-center gap-2 group cursor-pointer hover:border-green-400/30 transition-all duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
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
          <Link href="/onboarding" className="w-full sm:w-auto">
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
  );
}
