'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Show, SignUpButton } from "@clerk/nextjs";
import { 
  CheckCircle2, 
  ArrowRight, 
  Plus, 
  Minus,
  Zap,
  Shield,
  Star,
  Trophy,
  Coffee,
  TrendingUp,
  Target
} from "lucide-react";

// Components
import PricingSection from "@/components/PricingSection";

// Background
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GrayTitle, 
  GoldTitle, 
  SectionLabel, 
  SectionHeading 
} from "@/components/reusables";
import { cn } from "@/lib/utils";

// Data
import { AVATARS } from "@/lib/data";

const FAQS = [
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time from your account settings. You will continue to have access until the end of your billing period."
  },
  {
    q: "Is there a free trial?",
    a: "We offer a Free plan that includes 5 AI interviews per month so you can experience the platform before upgrading."
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely! You can upgrade or downgrade your plan at any time. If you upgrade, the new features will be available immediately."
  },
  {
    q: "Do plans include coding interviews?",
    a: "Yes, our AI engine supports coding interviews across 20+ languages, providing real-time feedback on your code quality and algorithmic efficiency."
  },
  {
    q: "Are FAANG simulations realistic?",
    a: "Yes, we use real interview rubrics from top tech companies to ensure our simulations and feedback match the actual interview bar at FAANG."
  },
  {
    q: "How does AI feedback work?",
    a: "Our proprietary AI analyzes your voice clarity, technical accuracy, and problem-solving approach to provide instant, actionable feedback after every session."
  }
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Frontend Engineer",
    company: "Google",
    content: "The Pro plan's unlimited interviews were a game-changer. I practiced my system design every day until it became second nature.",
    avatar: AVATARS[1].src
  },
  {
    name: "Marcus Rodriguez",
    role: "Backend Engineer",
    company: "Stripe",
    content: "Ultra's FAANG simulations are terrifyingly accurate. I walked into my real Stripe interview feeling like I had already done it ten times.",
    avatar: AVATARS[2].src
  },
  {
    name: "Priya Patel",
    role: "SDE Intern",
    company: "Microsoft",
    content: "Starting with the Free plan helped me understand my weak spots. Upgrading to Pro gave me the specific roadmap I needed to land my internship.",
    avatar: AVATARS[3].src
  }
];

export default function PricingPage() {
  return (
    <div className="relative w-full bg-black min-h-screen">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <StarsBackground factor={0.03} speed={60} pointerEvents={false} className="h-full w-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(248,184,31,0.08)_0%,transparent_50%)]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <SectionLabel>Pricing Plans</SectionLabel>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white mb-8"
          >
            Invest in the <br />
            <GoldTitle>Offer You Want.</GoldTitle>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-medium mb-12"
          >
            Choose a plan that matches your preparation goals and accelerate your path toward your next offer. Train with AI-powered coaching trusted by thousands.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {[
              "5000+ Candidates Trained",
              "FAANG-Level Preparation",
              "Real-Time AI Feedback",
              "Role-Specific Paths"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                <CheckCircle2 size={14} className="text-amber-400" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- DYNAMIC PRICING SECTION --- */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <PricingSection />
        </div>
      </section>

      {/* --- WHY UPGRADE SECTION --- */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <SectionLabel>Premium Experience</SectionLabel>
            <SectionHeading 
              gray="Why Upgrade to" 
              gold="Pro & Ultra." 
              className="mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { 
                title: "Unlimited AI Interviews", 
                desc: "Remove all daily limits. Practice until every answer is perfect.",
                icon: <Zap size={24} />
              },
              { 
                title: "Role-Specific Coaching", 
                desc: "Get feedback tailored to your specific target role and level.",
                icon: <Target size={24} />
              },
              { 
                title: "FAANG Simulations", 
                desc: "Experience the exact interview bar of top-tier tech companies.",
                icon: <Trophy size={24} />
              },
              { 
                title: "Advanced Analytics", 
                desc: "Deep dive into your technical and communication metrics over time.",
                icon: <TrendingUp size={24} />
              },
              { 
                title: "System Design Practice", 
                desc: "Master high-level architectural thinking with interactive sessions.",
                icon: <Shield size={24} />
              },
              { 
                title: "Personalized Roadmaps", 
                desc: "Data-driven paths focusing on your specific weak points.",
                icon: <Star size={24} />
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

      {/* --- ROI SECTION --- */}

      {/* --- TESTIMONIALS --- */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <SectionLabel>Social Proof</SectionLabel>
            <SectionHeading 
              gray="Engineers Landing" 
              gold="Elite Roles." 
              className="mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[3rem] space-y-8 flex flex-col border-white/5"
              >
                <div className="flex-1">
                  <p className="text-lg font-medium text-white/60 leading-relaxed italic">
                    &quot;{t.content}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/20">
                    <Image src={t.avatar} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" alt={t.name} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white tracking-tight">{t.name}</p>
                    <p className="text-[10px] font-bold text-amber-400/60 uppercase tracking-widest">{t.role} → {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-24">
              <SectionLabel>Common Questions</SectionLabel>
              <SectionHeading 
                gray="Still Have" 
                gold="Questions?" 
                className="mx-auto"
              />
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="relative py-48 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto glass p-12 md:p-24 rounded-[4rem] relative overflow-hidden flex flex-col items-center text-center border-amber-400/10 shadow-[0_40px_100px_-30px_rgba(248,184,31,0.1)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,184,31,0.12)_0%,transparent_70%)]" />
            <h2 className="relative z-10 text-[clamp(2rem,7vw,4.5rem)] font-black leading-[1.1] tracking-tight text-white mb-10 text-center max-w-3xl">
              Your Dream Offer Is Worth More Than The <GoldTitle>Subscription.</GoldTitle>
            </h2>
            <p className="relative z-10 text-lg md:text-xl text-white/40 font-medium mb-12 max-w-2xl">
              Start preparing today and walk into your next interview with confidence.
            </p>
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button variant="gold" className="h-16 w-full sm:px-12 rounded-2xl text-base font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(248,184,31,0.2)] hover:scale-105 active:scale-95 transition-all">
                  Start Preparing Today
                </Button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <Link href="/">
                <Button variant="gold" className="h-16 w-full sm:px-12 rounded-2xl text-base font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(248,184,31,0.2)] hover:scale-105 active:scale-95 transition-all">
                  Go to Dashboard
                </Button>
              </Link>
            </Show>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="glass rounded-3xl overflow-hidden border-white/5 transition-all duration-500">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex items-center justify-between text-left group"
      >
        <span className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">{question}</span>
        <div className={cn(
          "w-8 h-8 rounded-xl glass flex items-center justify-center transition-all duration-500",
          isOpen ? "bg-amber-400 text-black rotate-180" : "text-white/40"
        )}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 pb-8 pt-0">
              <p className="text-sm md:text-base font-medium text-white/40 leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
