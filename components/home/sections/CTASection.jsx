'use client';

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { GoldTitle } from "@/components/reusables";

export default function CTASection() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass p-8 md:p-24 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden flex flex-col items-center text-center border-amber-400/10 shadow-[0_20px_60px_-15px_rgba(248,184,31,0.05)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,184,31,0.1)_0%,transparent_70%)]" />
          <h2 className="relative z-10 text-[clamp(2rem,8vw,4.5rem)] font-black leading-[1.1] tracking-tight text-white mb-10 w-full max-w-[90vw] text-center">
            Ready to land your <GoldTitle>dream offer?</GoldTitle>
          </h2>
          <Link href="/sign-up" className="relative z-10 w-full sm:w-auto">
            <Button variant="gold" className="h-16 w-full sm:w-auto px-12 rounded-2xl text-base font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(248,184,31,0.2)] hover:scale-105 active:scale-95 transition-all">
              Start Preparing Free
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
