'use client';

import * as React from "react";
import { motion } from "motion/react";

// Components & UI
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { 
  GoldTitle, 
  SectionLabel 
} from "@/components/reusables";

export default function TermsPage() {
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
            Terms of <br />
            <GoldTitle>Service.</GoldTitle>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-medium mb-12"
          >
            Last updated: June 30, 2026. General terms governing platform use, credits, and session conduct.
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
              <h3 className="text-2xl font-black text-white tracking-tight font-sans">1. Account & Session Credits</h3>
              <p className="text-sm font-medium text-white/40 leading-relaxed">
                Credits are issued based on your subscribed membership tier. Credits reset monthly and do not carry over to subsequent billing periods. Exploiting or manipulating user balances is grounds for suspension.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white tracking-tight font-sans">2. Communication Norms</h3>
              <p className="text-sm font-medium text-white/40 leading-relaxed">
                PrepWise AI is a professional environment. All interactions between interviewees and mentors must respect basic code of conduct rules. Verbal abuse or harassment triggers immediate platform removal.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white tracking-tight font-sans">3. Intellectual Assets</h3>
              <p className="text-sm font-medium text-white/40 leading-relaxed">
                Interactive metrics, scoring radar charts, and automatic feedback components represent PrepWise intellectual assets. Custom developer answers and reviewer transcripts remain owned by their respective candidates.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
