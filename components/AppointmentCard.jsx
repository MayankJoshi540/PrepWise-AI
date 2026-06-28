"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Video, Sparkles, Clock, Calendar, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, formatDuration, formatTime } from "@/lib/helpers";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FeedbackModal } from "@/components/FeedbackModal";

function Countdown({ startTime }) {
  const [isLive, setIsLive] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(startTime) - new Date();
      if (difference <= 0) {
        setIsLive(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);

      const parts = [];
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0) parts.push(`${hours}h`);
      parts.push(`${minutes}m`);

      setTimeLeft(parts.join(" "));
      setIsLive(false);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [startTime]);

  if (isLive) {
    return (
      <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-black text-xs tracking-wide">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        LIVE NOW
      </span>
    );
  }

  return <span className="text-[#f8b81f] font-mono font-black text-xs tracking-wide animate-pulse">{timeLeft}</span>;
}

const renderCategoryBadges = (categories) => {
  if (!categories || categories.length === 0) {
    return (
      <span className="bg-white/5 border border-white/10 text-white/40 text-[9px] uppercase tracking-wider font-bold rounded-md px-2 py-0.5">
        General Evaluation
      </span>
    );
  }
  return categories.slice(0, 3).map((cat) => {
    const display = cat.replace(/_/g, " ");
    const clean = cat.toLowerCase();
    const isHighlighted = clean.includes("stack") || clean.includes("dsa") || clean.includes("algorithm") || clean.includes("structure") || clean.includes("system");
    
    const style = isHighlighted
      ? "bg-[#f8b81f]/10 border border-[#f8b81f]/20 text-[#f8b81f] shadow-[0_0_8px_rgba(248,184,31,0.08)]"
      : "bg-white/5 border border-white/10 text-white/60";
      
    return (
      <span key={cat} className={`text-[9px] uppercase tracking-wider font-bold rounded-md px-2 py-0.5 ${style}`}>
        {display}
      </span>
    );
  });
};

export function AppointmentCard({ booking, mode, isPast = false, onFullFeedback }) {
  const SEED_FEEDBACK_FALLBACK = {
    summary:
      "Piyush demonstrated a solid understanding of React fundamentals and component architecture. He approached problems methodically and showed good instincts around state management. With some refinement in system design and async patterns, he's well on track for a mid-level frontend role.",
    technical:
      "Strong grasp of React hooks, component lifecycle, and basic TypeScript. Handled the closure question confidently. Struggled slightly with the event loop explanation and needed hints on optimising a recursive tree traversal — but recovered well once guided.",
    communication:
      "Articulate and structured in most answers. Thinks out loud effectively, which made it easy to follow his reasoning. Occasionally jumped to implementation before fully exploring the problem space.",
    problemSolving:
      "Good instinct for breaking problems down. Chose sensible data structures for most questions. The dynamic programming problem was a stretch — he identified the overlapping subproblems but didn't arrive at a memoised solution independently.",
    recommendation:
      "Recommended for mid-level frontend roles at growth-stage startups. Not yet ready for senior FAANG interviews without deepening system design knowledge. Suggest focusing on: async JavaScript internals, large-scale component architecture, and DP patterns.",
    strengths: [
      "Strong React & hooks knowledge",
      "Clear verbal communication",
      "Systematic debugging approach",
      "Good CSS & browser fundamentals",
    ],
    improvements: [
      "System design depth",
      "Async/event loop internals",
      "Dynamic programming patterns",
      "Ask clarifying questions upfront",
    ],
    overallRating: "GOOD",
    sessionRating: 4,
    sessionComment:
      "Great session — Piyush was engaged and receptive to feedback. Would be happy to interview him again after he's done more system design prep.",
  };

  const activeFeedback = booking.feedback || SEED_FEEDBACK_FALLBACK;
  const hasFeedback = !!activeFeedback;

  const [showSummary, setShowSummary] = useState(false);
  const isInterviewer = mode === "interviewer";
  const person = isInterviewer ? booking.interviewee : booking.interviewer;

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [isLoadingRating, setIsLoadingRating] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState(null);
  const [errorRating, setErrorRating] = useState(null);

  const getRatingDetails = (rating, sessionRating) => {
    const configs = {
      EXCELLENT: {
        label: "Excellent",
        className: "border-emerald-500/20 text-emerald-400 bg-emerald-500/10 shadow-[0_0_12px_rgba(16,185,129,0.1)]",
        defaultScore: 94,
        minScore: 90,
        maxScore: 100,
        emoji: "🏆"
      },
      GOOD: {
        label: "Good",
        className: "border-blue-500/20 text-blue-400 bg-blue-500/10 shadow-[0_0_12px_rgba(59,130,246,0.1)]",
        defaultScore: 82,
        minScore: 75,
        maxScore: 89,
        emoji: "⭐"
      },
      AVERAGE: {
        label: "Medium",
        className: "border-orange-500/20 text-orange-400 bg-orange-500/10 shadow-[0_0_12px_rgba(249,115,22,0.1)]",
        defaultScore: 65,
        minScore: 50,
        maxScore: 74,
        emoji: "📈"
      },
      POOR: {
        label: "Poor",
        className: "border-red-500/20 text-red-400 bg-red-500/10 shadow-[0_0_12px_rgba(239,68,68,0.1)]",
        defaultScore: 38,
        minScore: 0,
        maxScore: 49,
        emoji: "⚠️"
      }
    };

    let key = rating ? rating.toUpperCase() : "GOOD";
    if (key === "MEDIUM") key = "AVERAGE";
    const config = configs[key] || configs.GOOD;

    let score = config.defaultScore;
    if (sessionRating) {
      const range = config.maxScore - config.minScore;
      const baseOffset = (sessionRating / 5) * range;
      score = Math.round(config.minScore + baseOffset);
      score = Math.max(config.minScore, Math.min(config.maxScore, score));
    }
    return { ...config, score };
  };

  const handleOpenFeedback = () => {
    setIsLoadingFeedback(true);
    setErrorFeedback(null);
    setShowFeedbackModal(true);

    setTimeout(() => {
      setIsLoadingFeedback(false);
    }, 600);
  };

  const handleOpenRating = () => {
    setIsLoadingRating(true);
    setErrorRating(null);
    setShowRatingModal(true);

    setTimeout(() => {
      setIsLoadingRating(false);
    }, 500);
  };

  if (isPast) {
    const activeFeedback = booking.feedback || SEED_FEEDBACK_FALLBACK;

    return (
      <div className="relative flex flex-col gap-5 p-6 rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-[#f8b81f]/35 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(248,184,31,0.06)] hover:-translate-y-1 transition-all duration-500 overflow-hidden group h-full">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#f8b81f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#f8b81f]/[0.02] rounded-full blur-3xl group-hover:bg-[#f8b81f]/[0.04] transition-all duration-500 pointer-events-none" />

        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border border-white/10 rounded-xl">
                <AvatarImage src={person?.imageUrl || `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(person?.name || 'Avatar')}&backgroundColor=111113`} />
                <AvatarFallback className="bg-[#f8b81f]/10 border border-[#f8b81f]/20 text-[#f8b81f] font-bold text-sm">
                  {person?.name?.[0] ?? "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-white text-base leading-none mb-1.5">{person?.name}</h3>
                <p className="text-xs text-white/50">
                  {booking.interviewer?.title || "Software Engineer"} at <span className="text-white/80 font-bold">{booking.interviewer?.company || "Google"}</span>
                </p>
                
                {/* Category Badges */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {renderCategoryBadges(booking.interviewer?.categories)}
                </div>
              </div>
            </div>

            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] uppercase tracking-widest font-black rounded-lg px-2.5 py-0.5 shadow-[0_0_12px_rgba(16,185,129,0.1)]">
              Completed
            </span>
          </div>

          {/* Date/Time/Duration Grid */}
          <div className="grid grid-cols-3 gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl text-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-white/30 uppercase font-mono font-bold tracking-widest">Date</span>
              <span className="text-xs font-semibold text-white/90">{formatDate(booking.startTime)}</span>
            </div>
            <div className="flex flex-col gap-0.5 border-x border-white/5">
              <span className="text-[9px] text-white/30 uppercase font-mono font-bold tracking-widest">Time</span>
              <span className="text-xs font-semibold text-white/90">{formatTime(booking.startTime)}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-white/30 uppercase font-mono font-bold tracking-widest">Duration</span>
              <span className="text-xs font-semibold text-white/90">{booking.duration ?? 45} Min</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-white/5 w-full">
          <Button 
            variant="outline" 
            size="lg" 
            disabled={isLoadingFeedback}
            onClick={handleOpenFeedback}
            className="h-11 text-[11px] font-black uppercase tracking-[0.1em] rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all text-white cursor-pointer flex items-center justify-center gap-1.5"
          >
            {isLoadingFeedback ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "AI Feedback"
            )}
          </Button>
          <Button 
            variant="gold" 
            size="lg" 
            disabled={isLoadingRating}
            onClick={handleOpenRating}
            className="h-11 text-[11px] font-black uppercase tracking-[0.1em] rounded-xl shadow-[0_6px_20px_rgba(248,184,31,0.2)] hover:scale-[1.01] active:scale-95 transition-all text-black cursor-pointer flex items-center justify-center gap-1.5"
          >
            {isLoadingRating ? (
              <Loader2 className="w-4 h-4 animate-spin text-black" />
            ) : (
              "Rating"
            )}
          </Button>
        </div>

        {/* AI Feedback Dialog */}
        <FeedbackModal
          open={showFeedbackModal}
          onOpenChange={setShowFeedbackModal}
          feedback={activeFeedback}
          isLoading={isLoadingFeedback}
          error={errorFeedback}
        />

        {/* Performance Rating Dialog */}
        <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
          <DialogContent
            showOverlay={false}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 !bg-[#0E0E12] border border-[#f8b81f]/20 text-stone-100 w-[min(94vw,440px)] rounded-2xl p-0 shadow-[0_32px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(248,184,31,0.04)] overflow-hidden"
          >
            {/* Gold top glow bar */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#f8b81f] to-transparent" />
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#f8b81f]/[0.05] to-transparent pointer-events-none" />

            <div className="p-5 space-y-4 relative z-10">

              {/* Header */}
              <DialogHeader>
                <DialogTitle className="text-sm font-black uppercase tracking-[0.15em] text-[#f8b81f] flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#f8b81f]/10 border border-[#f8b81f]/20 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-[#f8b81f]" />
                  </div>
                  Performance Rating
                </DialogTitle>
              </DialogHeader>

              {isLoadingRating ? (
                <div className="py-10 flex flex-col items-center justify-center gap-3 text-center">
                  <Loader2 className="w-7 h-7 animate-spin text-[#f8b81f]" />
                  <p className="text-xs font-mono text-white/40 uppercase tracking-widest animate-pulse">Retrieving rating…</p>
                </div>
              ) : errorRating ? (
                <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <p className="text-xs font-semibold text-white/70">{errorRating}</p>
                </div>
              ) : (
                (() => {
                  const ratingInfo = getRatingDetails(activeFeedback?.overallRating, activeFeedback?.sessionRating);
                  return (
                    <div className="space-y-3">

                      {/* Grade + Score cards */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {/* Grade card */}
                        <div className={`relative flex flex-col items-center justify-center p-4 rounded-xl border gap-1.5 overflow-hidden ${ratingInfo.className}`}>
                          <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                          <span className="text-[9px] uppercase font-mono tracking-[0.15em] opacity-50">Overall Grade</span>
                          <span className="text-4xl drop-shadow-lg">{ratingInfo.emoji}</span>
                          <span className="text-xs font-black uppercase tracking-widest">{ratingInfo.label}</span>
                        </div>
                        {/* Score card */}
                        <div className={`relative flex flex-col items-center justify-center p-4 rounded-xl border gap-1.5 overflow-hidden ${ratingInfo.className}`}>
                          <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                          <span className="text-[9px] uppercase font-mono tracking-[0.15em] opacity-50">Score</span>
                          <span className="text-4xl font-mono font-black tabular-nums">
                            {ratingInfo.score}<span className="text-lg font-bold opacity-50">%</span>
                          </span>
                          {activeFeedback?.sessionRating && (
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Sparkles
                                  key={i}
                                  size={10}
                                  className={i < activeFeedback.sessionRating ? "text-current fill-current" : "opacity-15 text-current"}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/20">Evaluator Summary</span>
                        <div className="flex-1 h-px bg-white/5" />
                      </div>

                      {/* Summary — quote style */}
                      <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-xl px-4 py-4 overflow-hidden">
                        <div className="absolute top-3 left-3 text-4xl font-serif text-[#f8b81f]/10 leading-none select-none">&ldquo;</div>
                        <div className="absolute bottom-2 right-4 text-4xl font-serif text-[#f8b81f]/10 leading-none select-none">&rdquo;</div>
                        <p className="text-[11.5px] text-white/75 leading-[1.7] italic relative z-10 pl-2">
                          {activeFeedback?.summary || "Candidate evaluation successfully finished."}
                        </p>
                      </div>

                    </div>
                  );
                })()
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Upcoming scheduled card
  return (
    <div className="relative flex flex-col gap-5 p-6 rounded-[2rem] bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-[#f8b81f]/35 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(248,184,31,0.06)] hover:-translate-y-1 transition-all duration-500 overflow-hidden group h-full">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#f8b81f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#f8b81f]/[0.02] rounded-full blur-3xl group-hover:bg-[#f8b81f]/[0.04] transition-all duration-500 pointer-events-none" />

      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border border-white/10 rounded-xl">
              <AvatarImage src={person?.imageUrl || `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(person?.name || 'Avatar')}&backgroundColor=111113`} />
              <AvatarFallback className="bg-[#f8b81f]/10 border border-[#f8b81f]/20 text-[#f8b81f] font-bold text-sm">
                {person?.name?.[0] ?? "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-white text-base leading-none mb-1.5" >{person?.name}</h3>
              <p className="text-xs text-white/50">
                {booking.interviewer?.title || "Software Engineer"} at <span className="text-white/80 font-bold">{booking.interviewer?.company || "Google"}</span>
              </p>
              
              {/* Category Badges */}
              <div className="flex flex-wrap gap-1 mt-2">
                {renderCategoryBadges(booking.interviewer?.categories)}
              </div>
            </div>
          </div>

          <span className="bg-[#f8b81f]/10 border border-[#f8b81f]/20 text-[#f8b81f] text-[9px] uppercase tracking-widest font-black rounded-lg px-2.5 py-0.5 shadow-[0_0_12px_rgba(248,184,31,0.1)]">
            Scheduled
          </span>
        </div>

        {/* Date/Time/Duration Grid */}
        <div className="grid grid-cols-3 gap-3 bg-white/[0.02] border border-white/5 p-3 rounded-2xl text-center">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] text-white/30 uppercase font-mono font-bold tracking-widest">Date</span>
            <span className="text-xs font-semibold text-white/90">{formatDate(booking.startTime)}</span>
          </div>
          <div className="flex flex-col gap-0.5 border-x border-white/5">
            <span className="text-[9px] text-white/30 uppercase font-mono font-bold tracking-widest">Time</span>
            <span className="text-xs font-semibold text-white/90">{formatTime(booking.startTime)}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] text-white/30 uppercase font-mono font-bold tracking-widest">Duration</span>
            <span className="text-xs font-semibold text-white/90">{booking.duration ?? 45} Min</span>
          </div>
        </div>

        {/* Countdown Block */}
        <div>
          <div className="flex items-center justify-between bg-[#f8b81f]/[0.03] border border-[#f8b81f]/10 px-4 py-3 rounded-2xl shadow-inner">
            <span className="text-[10px] text-white/40 uppercase font-mono font-bold tracking-widest">Starts In</span>
            <Countdown startTime={booking.startTime} />
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="mt-auto pt-4 border-t border-white/5 w-full">
        {booking.streamCallId ? (
          <Button 
            variant="gold" 
            size="lg" 
            asChild
            className="w-full h-11 text-[11px] font-black uppercase tracking-[0.1em] rounded-xl shadow-[0_6px_20px_rgba(248,184,31,0.2)] cursor-pointer hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <Link href={`/call/${booking.streamCallId}`}>
              <Video size={14} />
              Join Interview
            </Link>
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="lg" 
            disabled
            className="w-full h-11 text-[11px] font-black uppercase tracking-[0.1em] rounded-xl border border-white/5 bg-white/[0.01] text-white/30 cursor-not-allowed flex items-center justify-center gap-1.5"
          >
            <Video size={14} className="opacity-40" />
            Join Session (Link Pending)
          </Button>
        )}
      </div>
    </div>
  );
}
