'use client';

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Cpu,
  BookOpen
} from "lucide-react";

// Components & UI
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { 
  GoldTitle, 
  SectionLabel, 
  SectionHeading 
} from "@/components/reusables";

const blogPosts = [
  {
    slug: "mastering-system-design-2026",
    title: "Mastering the System Design Interview",
    category: "Architecture",
    excerpt: "System design interviews are shifting from static diagrams to active trade-off discussions. Learn how to explain eventual consistency, rate limiters, and sharding like a Staff Engineer.",
    date: "June 24, 2026",
    readTime: "5 min read"
  },
  {
    slug: "ai-assisted-engineering-assessments",
    title: "The Shift to AI-Assisted Engineering Assessments",
    category: "Recruiting",
    excerpt: "How modern tech companies are integrating automated coding engines into their interview loops, and what it means for candidate preparation.",
    date: "June 18, 2026",
    readTime: "4 min read"
  },
  {
    slug: "negotiate-faang-engineering-offer",
    title: "How to Negotiate Your FAANG Engineering Offer",
    category: "Career",
    excerpt: "Your interview performance directly translates to your compensation tier. Here is how to structure your review metrics to negotiate maximum equity during offer stages.",
    date: "May 29, 2026",
    readTime: "6 min read"
  }
];

export default function BlogPage() {
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
          <SectionLabel>Insights & Guides</SectionLabel>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white mb-8"
          >
            Insights & Technical <br />
            <GoldTitle>Guides.</GoldTitle>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-medium mb-12"
          >
            Stay ahead of the curve. Dive into system design breakdowns, career growth guides, and assessments trends compiled by engineering leads.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {[
              "Architecture Deep Dives",
              "Negotiation Playbooks",
              "Recruiting Trends",
              "FAANG Benchmarks"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                <CheckCircle2 size={14} className="text-amber-400" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- BLOG GRID SECTION --- */}
      <section className="relative py-24 z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <SectionLabel>Featured Publications</SectionLabel>
            <SectionHeading 
              gray="From the PrepWise" 
              gold="Engineering Bench." 
              className="mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[3rem] space-y-8 flex flex-col justify-between border-white/5 hover:border-amber-400/20 transition-all duration-500 group cursor-pointer"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-500 text-xs font-semibold">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight leading-snug group-hover:text-amber-400 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-sm font-medium text-white/40 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <span className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                    <Calendar size={14} />
                    {post.date}
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white group-hover:text-amber-400 transition-colors duration-300">
                    Read Post
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
