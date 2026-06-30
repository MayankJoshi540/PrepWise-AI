'use client';

import * as React from "react";
import { motion } from "motion/react";
import { 
  CheckCircle2, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  Building, 
  Users 
} from "lucide-react";
import { toast } from "sonner";

// Components & UI
import { Button } from "@/components/ui/button";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { 
  GoldTitle, 
  SectionLabel, 
  SectionHeading 
} from "@/components/reusables";

export default function ContactPage() {
  const [form, setForm] = React.useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate server request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSent(true);
    toast.success("Message sent successfully! Our team will get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
    
    // Reset state after a few seconds
    setTimeout(() => setIsSent(false), 3000);
  };

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
          <SectionLabel>Get in Touch</SectionLabel>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white mb-8"
          >
            Connect with Our <br />
            <GoldTitle>Support Team.</GoldTitle>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-medium mb-12"
          >
            Have questions about mock structures, enterprise licensing, or custom developer pools? Send us a message and we'll reply swiftly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {[
              "Avg Response < 2 Hours",
              "24/7 Operations",
              "Partnership Inquiries",
              "Secure Data Sandbox"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                <CheckCircle2 size={14} className="text-amber-400" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- FORM & INFO GRID --- */}
      <section className="relative py-24 z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Info Column (Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8"
            >
              {/* Card 1: Direct Support */}
              <div className="glass p-10 rounded-[2.5rem] border-white/5 space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-2xl rounded-full" />
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <h4 className="text-xl font-black text-white tracking-tight">Direct Support</h4>
                <p className="text-sm font-medium text-white/40 leading-relaxed">
                  Reach out directly for account, credit, or booking queries.
                  <br />
                  <span className="text-amber-400 font-sans font-bold text-lg block mt-2">support@prepwise.ai</span>
                </p>
              </div>

              {/* Card 2: Enterprise Partnerships */}
              <div className="glass p-10 rounded-[2.5rem] border-white/5 space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-2xl rounded-full" />
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Building size={24} />
                </div>
                <h4 className="text-xl font-black text-white tracking-tight">Partnerships & Recruiting</h4>
                <p className="text-sm font-medium text-white/40 leading-relaxed">
                  Interviews integration and corporate custom assessments.
                  <br />
                  <span className="text-amber-400 font-sans font-bold text-lg block mt-2">partners@prepwise.ai</span>
                </p>
              </div>
            </motion.div>

            {/* Form Column (Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 glass p-10 md:p-12 rounded-[3.5rem] border-white/5 relative overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="space-y-6 text-left relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all font-sans"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-white/40">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all font-sans"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-white/40">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all font-sans"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-white/40">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all font-sans resize-none"
                    placeholder="Tell us details about your request..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-2xl bg-linear-to-r from-amber-400 to-amber-600 text-black font-black uppercase tracking-widest hover:scale-[1.01] hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="inline-block h-6 w-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : isSent ? (
                    <>
                      <Check className="size-5" />
                      Message Sent
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
