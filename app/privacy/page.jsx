'use client';

import * as React from "react";
import { motion } from "motion/react";

// Components & UI
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { 
  GoldTitle, 
  SectionLabel 
} from "@/components/reusables";

export default function PrivacyPage() {
  return (
    <div className="relative w-full bg-black min-h-screen text-white overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <StarsBackground factor={0.03} speed={60} pointerEvents={false} className="h-full w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(248,184,31,0.08)_0%,transparent_50%)]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-24 overflow-hidden z-10">
        <div className="container mx-auto px-4 text-center">
          <SectionLabel>Legal Document</SectionLabel>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white mb-8"
          >
            Privacy <br />
            <GoldTitle>Policy.</GoldTitle>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-medium mb-12"
          >
            Last updated: June 30, 2026. Review how PrepWise AI handles, sandbox protects, and secures candidate data.
          </motion.p>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="relative py-12 pb-32 z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-10 md:p-16 rounded-[3.5rem] border-white/5 space-y-12 text-left"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white tracking-tight font-sans">1. Data Collection</h3>
              <p className="text-sm font-medium text-white/40 leading-relaxed">
                We gather information specifically to render your mock simulation experience. This comprises basic profile coordinates (name, email), credit balances, and session materials (mock feedback transcripts and ratings).
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white tracking-tight font-sans">2. Usage Rights</h3>
              <p className="text-sm font-medium text-white/40 leading-relaxed">
                Collected metrics serve only to update the candidate dashboard and compute simulated hiring estimations. Your data remains sandboxed and is never shared, leased, or distributed for commercial activities.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white tracking-tight font-sans">3. Session Feeds & Recordings</h3>
              <p className="text-sm font-medium text-white/40 leading-relaxed">
                Interactive video and audio streams conducted via our platform integration are encrypted. Candidates retain total control and can clear recorded sessions or evaluations from their system vaults at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
