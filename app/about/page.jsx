'use client';

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Users, 
  Brain, 
  Shield, 
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Cpu
} from "lucide-react";

// Components & UI
import { Button } from "@/components/ui/button";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { 
  GoldTitle, 
  SectionLabel, 
  SectionHeading 
} from "@/components/reusables";

export default function AboutPage() {
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
          <SectionLabel>About PrepWise AI</SectionLabel>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white mb-8"
          >
            Invest in Your <br />
            <GoldTitle>Engineering Future.</GoldTitle>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-medium mb-12"
          >
            PrepWise AI is a premium interview coaching platform bridging the gap between candidate preparation and actual FAANG-level interviewer expectations.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {[
              "10,000+ Mock Sessions",
              "FAANG-Level Mentors",
              "Interactive Rubrics",
              "Developer Sandboxes"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                <CheckCircle2 size={14} className="text-amber-400" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- VISION STATEMENT --- */}
      <section className="relative py-24 z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-10 md:p-16 rounded-[3rem] border-white/5 text-center space-y-6"
          >
            <Sparkles className="size-8 text-amber-400 mx-auto animate-pulse" />
            <h2 className="font-sans font-black text-3xl md:text-4xl text-stone-100 tracking-tight leading-snug">
              Pioneering the Next Generation of <span className="text-gradient-gold">Mock Assessments</span>
            </h2>
            <p className="text-white/50 max-w-3xl mx-auto leading-relaxed text-base font-medium">
              Standard technical recruiting is broken. Syntax assessments ignore communication depth and high-level design. We solve this by introducing active system design simulation rooms, real-time code environments, and structured feedback analytics compiled by actual engineering leads.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CORE PILLARS --- */}
      <section className="relative py-24 z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <SectionLabel>Core Pillars</SectionLabel>
            <SectionHeading 
              gray="How We Deliver" 
              gold="Elite Results." 
              className="mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { 
                title: "Elite Mentor Network", 
                desc: "Learn directly from staff developers, tech leads, and hiring managers running actual loops at Google, Meta, and Stripe.",
                icon: <Users size={24} />
              },
              { 
                title: "AI Feedback Engine", 
                desc: "Gain instant analytics measuring your voice pace, conceptual accuracy, and system design complexity.",
                icon: <Brain size={24} />
              },
              { 
                title: "Secure & Encrypted", 
                desc: "Your records, feedback transcripts, and mock logs are protected with secure sandboxing and private sharing controls.",
                icon: <Shield size={24} />
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-amber-400/20 transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-amber-400 mb-8 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-black text-white mb-4 tracking-tight">{feature.title}</h4>
                <p className="text-sm font-medium text-white/40 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CAREERS / MENTOR CTA --- */}
      <section className="relative py-32 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto glass p-12 md:p-24 rounded-[4rem] relative overflow-hidden flex flex-col items-center text-center border-amber-400/10 shadow-[0_40px_100px_-30px_rgba(248,184,31,0.1)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,184,31,0.12)_0%,transparent_70%)]" />
            <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 mb-4">Join Our Network</span>
            <h2 className="relative z-10 text-[clamp(2rem,7vw,4.5rem)] font-black leading-[1.1] tracking-tight text-white mb-10 text-center max-w-3xl">
              Help Candidates Land Their <GoldTitle>Dream Roles.</GoldTitle>
            </h2>
            <p className="relative z-10 text-lg md:text-xl text-white/40 font-medium mb-12 max-w-2xl">
              We are constantly seeking senior developers and technical managers to mentor candidate preparation paths. Earn credits and grow your network.
            </p>
            <Link href="/contact" className="relative z-10 w-full sm:w-auto">
              <Button variant="gold" className="h-16 w-full sm:px-12 rounded-2xl text-base font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(248,184,31,0.2)] hover:scale-105 active:scale-95 transition-all">
                Become a Mentor
                <ArrowUpRight size={18} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
