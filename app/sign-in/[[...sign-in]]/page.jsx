'use client';

import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { ArrowLeft, Sparkles, Brain, Award, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { shadcn } from "@clerk/ui/themes";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Premium Background Grid & Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1a0f_1px,transparent_1px),linear-gradient(to_bottom,#1f1a0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-[80px] pointer-events-none animate-pulse" />

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Visual Feature Showcase */}
        <div className="lg:col-span-6 space-y-8 text-left hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Badge variant="outline" className="rounded-full px-3 py-1 uppercase tracking-[0.22em] border-amber-400/30 bg-amber-400/5 text-amber-400 text-xs">
              <Sparkles className="size-3 mr-1.5 inline animate-pulse" />
              Welcome Back to PrepWise AI
            </Badge>
            <h1 className="text-5xl font-extrabold leading-tight text-white tracking-tight font-sans">
              Elevate Your <br />
              <span className="text-gradient-gold">Interview Performance</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
              Sign in to resume mock sessions with expert engineering leads, unlock detailed metrics, and accelerate your career roadmap.
            </p>
          </motion.div>

          {/* Interactive Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {/* Card 1: Live Performance Rubrics */}
            <div className="glass-gold p-6 rounded-2xl relative overflow-hidden group hover:border-amber-400/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400">
                  <Brain className="size-5" />
                </div>
                <h3 className="font-semibold text-white">Interactive Engine</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zinc-500">
                  <span>System Design</span>
                  <span className="text-amber-400">92%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="h-full bg-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Probability Simulator */}
            <div className="glass-gold p-6 rounded-2xl relative overflow-hidden group hover:border-amber-400/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-400/10 rounded-lg text-amber-400">
                  <Award className="size-5" />
                </div>
                <h3 className="font-semibold text-white">Offer Probability</h3>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-amber-400">94.8%</span>
                <span className="text-xs text-zinc-500">Avg Chance</span>
              </div>
            </div>

            {/* Card 3: Feedback Highlight */}
            <div className="sm:col-span-2 glass p-6 rounded-3xl relative overflow-hidden hover:border-zinc-700 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-white/5 rounded-xl text-zinc-400 mt-1">
                  <ShieldCheck className="size-5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Latest Mentor Feedback</span>
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping" />
                  </div>
                  <p className="text-sm text-zinc-300 italic">
                    "Exceptional handling of concurrency and DB locks. System Design flow was well-paced and trade-offs were explained perfectly."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats Bar */}
          <div className="flex items-center gap-6 pt-4 border-t border-zinc-800 text-zinc-500 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-400/80" />
              <span>Auto-Sync user credentials</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-amber-400/80" />
              <span>Encrypted mock sessions</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clerk Auth Page wrapper */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-md space-y-6"
          >
            {/* Back Button */}
            <div className="flex justify-start">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
              >
                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                Back to home
              </Link>
            </div>

            {/* Clerk Auth Component */}
            <div className="relative">
              {/* Subtle background glow specific to the card */}
              <div className="absolute inset-0 bg-amber-500/5 blur-[50px] -z-10 rounded-3xl" />
              <SignIn
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                fallbackRedirectUrl="/"
                appearance={{
                  theme: shadcn,
                  variables: {
                    colorPrimary: "#f8b81f",
                    colorBackground: "#09090b",
                    colorText: "#ffffff",
                    colorTextSecondary: "#a1a1aa",
                    colorInputBackground: "#18181b",
                    colorInputText: "#ffffff",
                    colorBorderPrimary: "#27272a",
                    borderRadius: "1rem",
                  },
                  elements: {
                    cardBox: "shadow-2xl shadow-amber-500/5 bg-transparent",
                    card: "border border-amber-500/10 bg-black/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8",
                    headerTitle: "font-sans text-3xl font-extrabold tracking-tight text-white mb-1",
                    headerSubtitle: "text-zinc-400 text-sm",
                    socialButtonsBlockButton: "border border-zinc-800 hover:border-amber-400/30 hover:bg-amber-400/5 transition-all text-white font-medium duration-200 py-2.5 rounded-lg",
                    socialButtonsBlockButtonText: "text-zinc-200 font-medium text-sm",
                    formButtonPrimary: "bg-linear-to-r from-[#f8b81f] to-[#c79116] text-black font-semibold hover:brightness-110 active:scale-[0.98] transition-all duration-200 py-2.5 rounded-lg",
                    formFieldInput: "bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all py-2.5",
                    footerActionLink: "text-amber-400 hover:text-amber-300 transition-colors font-medium",
                    dividerLine: "bg-zinc-800",
                    dividerText: "text-zinc-500 text-xs",
                    formFieldLabel: "text-zinc-300 font-medium text-xs mb-1.5",
                    footer: "border-t border-zinc-800 pt-4",
                  }
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

