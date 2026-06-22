"use client";

import { Sparkles, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

export function FeedbackModal({ open, onOpenChange, feedback, isLoading, error }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showOverlay={false}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 border border-[#f8b81f]/15 text-stone-100 w-[min(96vw,760px)] max-h-[62vh] rounded-3xl p-0 shadow-[0_40px_100px_rgba(0,0,0,0.95),0_0_60px_rgba(248,184,31,0.06),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden"
        style={{ background: "linear-gradient(145deg, #111120 0%, #0d0d18 40%, #0a0a14 100%)" }}
      >
        {/* Stars background — matches appointments page */}
        <div className="absolute inset-0 pointer-events-none">
          <StarsBackground
            factor={0.02}
            speed={60}
            starColor="#FFF"
            className="absolute inset-0 h-full w-full opacity-40 bg-transparent"
          />
          <div className="absolute -top-8 -left-8 w-48 h-48 bg-emerald-500/[0.06] rounded-full blur-3xl" />
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#f8b81f]/[0.07] rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(248,184,31,0.06)_0%,transparent_60%)]" />
        </div>

        {/* Gold top accent line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#f8b81f] to-transparent" />

        {/* Scrollable content */}
        <div className="relative z-10 overflow-y-auto p-6 space-y-5" style={{ maxHeight: "calc(62vh - 8px)" }}>

          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-sm font-black uppercase tracking-[0.15em] text-[#f8b81f] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#f8b81f]/20 to-[#f8b81f]/5 border border-[#f8b81f]/30 flex items-center justify-center shadow-[0_0_12px_rgba(248,184,31,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-[#f8b81f]" />
              </div>
              AI Evaluation Feedback
            </DialogTitle>
          </DialogHeader>

          {/* States */}
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#f8b81f]" />
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest animate-pulse">Retrieving report…</p>
            </div>
          ) : error ? (
            <div className="py-10 flex flex-col items-center justify-center gap-3 text-center">
              <AlertCircle className="w-9 h-9 text-red-500" />
              <p className="text-sm font-semibold text-white/70">{error}</p>
            </div>
          ) : (
            <div className="space-y-4">

              {/* Strengths + Improvements — 2-col grid */}
              <div className="grid grid-cols-2 gap-3">

                {/* Strengths */}
                <div className="relative rounded-2xl border border-emerald-500/20 min-w-0"
                  style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.09) 0%,rgba(16,185,129,0.03) 100%)" }}>
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0 shadow-[0_0_6px_rgba(16,185,129,0.2)]">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                      </div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.12em] text-emerald-400">Strengths</h4>
                      <span className="ml-auto text-[10px] font-bold text-emerald-400/50 bg-emerald-500/10 border border-emerald-500/15 px-2 py-0.5 rounded-full shrink-0">
                        {(feedback?.strengths || []).length}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {(feedback?.strengths || []).map((str, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-emerald-500/[0.05] border border-emerald-500/10 rounded-xl px-3 py-2.5 group hover:bg-emerald-500/[0.09] transition-all duration-200">
                          <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[9px] font-black text-emerald-400 leading-none">{idx + 1}</span>
                          <span className="text-[13px] text-white/85 leading-relaxed break-words min-w-0 group-hover:text-white transition-colors">{str}</span>
                        </li>
                      ))}
                      {!feedback?.strengths?.length && <li className="text-sm text-white/30 italic py-1">None recorded</li>}
                    </ul>
                  </div>
                </div>

                {/* Improvements */}
                <div className="relative rounded-2xl border border-[#f8b81f]/20 min-w-0"
                  style={{ background: "linear-gradient(135deg,rgba(248,184,31,0.08) 0%,rgba(248,184,31,0.02) 100%)" }}>
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#f8b81f]/40 to-transparent" />
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#f8b81f]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-[#f8b81f]/15 border border-[#f8b81f]/25 flex items-center justify-center shrink-0 shadow-[0_0_6px_rgba(248,184,31,0.2)]">
                        <AlertCircle size={12} className="text-[#f8b81f]" />
                      </div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.12em] text-[#f8b81f]">Areas to Improve</h4>
                      <span className="ml-auto text-[10px] font-bold text-[#f8b81f]/50 bg-[#f8b81f]/10 border border-[#f8b81f]/15 px-2 py-0.5 rounded-full shrink-0">
                        {(feedback?.improvements || []).length}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {(feedback?.improvements || []).map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-[#f8b81f]/[0.04] border border-[#f8b81f]/10 rounded-xl px-3 py-2.5 group hover:bg-[#f8b81f]/[0.08] transition-all duration-200">
                          <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#f8b81f]/15 border border-[#f8b81f]/30 flex items-center justify-center text-[9px] font-black text-[#f8b81f] leading-none">{idx + 1}</span>
                          <span className="text-[13px] text-white/85 leading-relaxed break-words min-w-0 group-hover:text-white transition-colors">{imp}</span>
                        </li>
                      ))}
                      {!feedback?.improvements?.length && <li className="text-sm text-white/30 italic py-1">None recorded</li>}
                    </ul>
                  </div>
                </div>

              </div>

              {/* AI Summary */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/25">Evaluator Notes</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>
                <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden"
                  style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%)" }}>
                  <div className="absolute top-2 left-3 text-5xl font-serif text-[#f8b81f]/[0.12] leading-none select-none pointer-events-none">&ldquo;</div>
                  <div className="absolute bottom-1 right-4 text-5xl font-serif text-[#f8b81f]/[0.12] leading-none select-none pointer-events-none">&rdquo;</div>
                  <p className="relative z-10 text-[13px] text-white/75 leading-[1.7] italic px-6 py-5">
                    {feedback?.summary || feedback?.sessionComment || "No additional evaluation notes provided."}
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}