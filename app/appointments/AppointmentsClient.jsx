"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  Video,
  Sparkles,
  Award,
  ArrowRight,
  TrendingUp,
  Target,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { AppointmentCard } from "@/components/AppointmentCard";
import { FeedbackModal } from "@/components/FeedbackModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { RATING_LABEL, RATING_STYLES, STATUS_STYLES } from "@/lib/data";
import { formatDate, formatDuration, formatTime } from "@/lib/helpers";

function Countdown({ startTime }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(startTime) - new Date();
      if (difference <= 0) {
        setTimeLeft("Started / Starting now");
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
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [startTime]);

  return <span className="font-mono text-amber-400 font-semibold">{timeLeft}</span>;
}

export default function AppointmentsClient({ appointments, userRole }) {
  const [activeTab, setActiveTab] = useState("timeline");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const now = new Date();

  const mode = userRole === "INTERVIEWER" ? "interviewer" : "interviewee";
  const isInterviewer = mode === "interviewer";

  // Filter schedules
  const scheduled = appointments.filter(
    (a) => a.status === "SCHEDULED" && new Date(a.startTime) > now
  ).sort((a, b) => new Date(a.startTime) - new Date(b.startTime)); // earliest first for upcoming

  const past = appointments.filter(
    (a) => a.status !== "SCHEDULED" || new Date(a.endTime) <= now
  ).sort((a, b) => new Date(b.startTime) - new Date(a.startTime)); // latest first for past

  // Combine for sequential timeline: past (earliest first to show progress), then upcoming (earliest first)
  const sortedTimeline = [...past].reverse().concat(scheduled);

  // Metrics calculations
  const totalCompleted = appointments.filter((a) => a.status === "COMPLETED").length;
  
  // Average Rating
  const completedWithFeedback = appointments.filter((a) => a.feedback);
  const ratingWeights = { EXCELLENT: 4, GOOD: 3, AVERAGE: 2, POOR: 1 };
  const ratingLabels = { 4: "Excellent", 3: "Good", 2: "Average", 1: "Poor" };
  
  let averageRatingVal = 0;
  if (completedWithFeedback.length > 0) {
    const sum = completedWithFeedback.reduce(
      (acc, curr) => acc + (ratingWeights[curr.feedback.overallRating] || 3),
      0
    );
    averageRatingVal = Math.round(sum / completedWithFeedback.length);
  }

  // Next Interview
  const nextInterview = scheduled[0] || null;

  // Aggregated Insights
  const allStrengths = appointments
    .flatMap((a) => a.feedback?.strengths || [])
    .filter(Boolean);
  
  const allImprovements = appointments
    .flatMap((a) => a.feedback?.improvements || [])
    .filter(Boolean);

  const handleOpenFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setFeedbackOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-8 lg:px-0 py-12 flex flex-col gap-12 bg-black/70 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl">
      
      {selectedFeedback && (
        <FeedbackModal
          open={feedbackOpen}
          onOpenChange={setFeedbackOpen}
          feedback={selectedFeedback}
          intervieweeName={
            isInterviewer ? selectedFeedback.booking?.interviewee?.name : undefined
          }
        />
      )}

      {/* ─── METRICS PANELS ─── */}
      {appointments.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Next Session Countdown */}
          <div className="relative overflow-hidden glass rounded-2xl p-6 flex flex-col justify-between border-amber-400/10 bg-gradient-to-br from-amber-400/[0.02] via-transparent to-transparent">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold tracking-wider uppercase mb-3">
                <Clock size={14} className="text-amber-400" />
                <span>Next Session</span>
              </div>
              {nextInterview ? (
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-medium text-stone-200">
                    With {isInterviewer ? nextInterview.interviewee?.name : nextInterview.interviewer?.name}
                  </p>
                  <p className="text-xs text-stone-500">
                    {formatDate(nextInterview.startTime)} @ {formatTime(nextInterview.startTime)}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-stone-400 font-light mt-1">
                  No upcoming sessions.
                </p>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              {nextInterview ? (
                <>
                  <span className="text-xs text-stone-500 font-light">Countdown</span>
                  <Countdown startTime={nextInterview.startTime} />
                </>
              ) : (
                isInterviewer ? (
                  <span className="text-xs text-stone-500 italic font-light">Wait for candidate bookings</span>
                ) : (
                  <Link
                    href="/explore"
                    className="text-xs text-amber-400 font-medium hover:text-amber-300 transition-colors flex items-center gap-1"
                  >
                    Book a session <ChevronRight size={14} />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Prep/Hosting Metrics */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold tracking-wider uppercase mb-3">
                <Target size={14} className="text-amber-400" />
                <span>{isInterviewer ? "Hosting Statistics" : "Preparation Stats"}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-4xl font-serif text-amber-400 font-bold leading-snug">
                    {totalCompleted}
                  </p>
                  <p className="text-[10px] text-stone-500 tracking-wider uppercase mt-1">
                    Completed
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-serif text-stone-300 font-bold leading-snug">
                    {scheduled.length}
                  </p>
                  <p className="text-[10px] text-stone-500 tracking-wider uppercase mt-1">
                    Scheduled
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 text-xs text-stone-500 font-light">
              {isInterviewer ? "Total hosting time:" : "Total prep time:"} <span className="text-stone-300 font-medium">{totalCompleted * 45} mins</span>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="glass rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold tracking-wider uppercase mb-3">
                <Award size={14} className="text-amber-400" />
                <span>{isInterviewer ? "Evaluations Rating" : "Performance Rating"}</span>
              </div>
              {averageRatingVal > 0 ? (
                <div>
                  <p className="text-2xl font-serif text-stone-200 font-medium">
                    {ratingLabels[averageRatingVal]} Avg
                  </p>
                  <div className="flex gap-1.5 mt-2">
                    {[1, 2, 3, 4].map((star) => (
                      <span
                        key={star}
                        className={`w-3.5 h-3.5 rounded-full ${
                          star <= averageRatingVal ? "bg-amber-400" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-stone-400 font-light mt-1">
                    {isInterviewer ? "Complete sessions to file feedback." : "Complete sessions to view AI score cards."}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 text-xs text-stone-500 font-light">
              Based on <span className="text-stone-300 font-medium">{completedWithFeedback.length} reports</span>
            </div>
          </div>
        </section>
      )}

      {/* ─── EMPTY STATE REDESIGN ─── */}
      {appointments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-8 text-center max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full scale-125" />
            <span className="relative w-20 h-20 rounded-3xl bg-black border border-amber-400/30 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(248,184,31,0.15)]">
              🎯
            </span>
          </div>
          {isInterviewer ? (
            <>
              <div>
                <h2 className="text-4xl font-serif text-gradient-gold mb-2">Configure Your Interview Schedule</h2>
                <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed font-light">
                  Your upcoming mock sessions will appear here once candidates book availability slots. Set your hours on the homepage dashboard to get started.
                </p>
              </div>
              <Button variant="gold" size="lg" className="mt-2 text-black font-semibold tracking-wide" asChild>
                <Link href="/">Back to Dashboard <ArrowRight size={16} className="ml-1.5" /></Link>
              </Button>
            </>
          ) : (
            <>
              <div>
                <h2 className="text-4xl font-serif text-gradient-gold mb-2">Build Your Practice Roadmap</h2>
                <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed font-light">
                  Unlock professional growth through targeted mock interviews with engineering leads from Google, Meta, and Netflix.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left mt-4">
                <div className="glass p-5 rounded-2xl flex flex-col gap-2">
                  <span className="text-amber-400 text-xs font-mono">STEP 01</span>
                  <h3 className="text-stone-200 text-lg font-serif font-semibold">Select Expert</h3>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    Filter by domain (DSA, Frontend, System Design) and company.
                  </p>
                </div>
                <div className="glass p-5 rounded-2xl flex flex-col gap-2">
                  <span className="text-amber-400 text-xs font-mono">STEP 02</span>
                  <h3 className="text-stone-200 text-lg font-serif font-semibold">Live Simulation</h3>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    45 mins video call + coding, mirroring the real interview environment.
                  </p>
                </div>
                <div className="glass p-5 rounded-2xl flex flex-col gap-2">
                  <span className="text-amber-400 text-xs font-mono">STEP 03</span>
                  <h3 className="text-stone-200 text-lg font-serif font-semibold">AI & Expert Review</h3>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    Get transcript analysis and a structured grading rubric.
                  </p>
                </div>
              </div>

              <Button variant="gold" size="lg" className="mt-4 text-black font-bold tracking-wider" asChild>
                <Link href="/explore">Browse Interviewers <ArrowRight size={16} className="ml-1.5" /></Link>
              </Button>
            </>
          )}
        </div>
      )}

      {appointments.length > 0 && (
        <>
          {/* ─── TABS & TOGGLES ─── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-5 gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("timeline")}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
                  activeTab === "timeline" ? "text-amber-400" : "text-stone-500 hover:text-stone-300"
                }`}
              >
                Timeline View
                {activeTab === "timeline" && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab("grid")}
                className={`relative px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
                  activeTab === "grid" ? "text-amber-400" : "text-stone-500 hover:text-stone-300"
                }`}
              >
                Detailed Grid
                {activeTab === "grid" && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </div>
            
            <p className="text-xs text-stone-500 font-light">
              Showing {appointments.length} overall prep sessions
            </p>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "timeline" ? (
              <motion.section
                key="timeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="relative pl-8 md:pl-12 flex flex-col gap-10"
              >
                {/* Visual vertical connector line */}
                <div className="absolute left-[15px] md:left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-amber-400/80 via-white/10 to-transparent" />

                {sortedTimeline.map((booking, idx) => {
                  const isUpcoming = booking.status === "SCHEDULED" && new Date(booking.startTime) > now;
                  const status = booking.status;
                  const person = isInterviewer ? booking.interviewee : booking.interviewer;
                  const feedback = booking.feedback;

                  const creditsLabel = isInterviewer
                    ? `+${booking.creditsCharged} credits earned`
                    : `−${booking.creditsCharged} credits`;

                  const creditsStyle = isInterviewer
                    ? "border-green-500/20 bg-green-500/10 text-green-400"
                    : "border-amber-400/20 bg-amber-400/5 text-amber-400";
                  
                  return (
                    <div key={booking.id} className="relative group">
                      {/* Timeline Node Icon */}
                      <span className={`absolute -left-[33px] md:-left-[41px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-black z-10 transition-transform duration-300 group-hover:scale-110 ${
                        isUpcoming 
                          ? "bg-amber-400 shadow-[0_0_12px_rgba(248,184,31,0.4)] text-black" 
                          : status === "COMPLETED" 
                          ? "bg-[#09090b] border-emerald-500/50 text-emerald-400"
                          : "bg-[#09090b] border-red-500/50 text-red-400"
                      }`}>
                        {isUpcoming ? (
                          <Calendar size={10} className="stroke-[3px]" />
                        ) : status === "COMPLETED" ? (
                          <CheckCircle2 size={10} className="stroke-[3px]" />
                        ) : (
                          <AlertCircle size={10} className="stroke-[3px]" />
                        )}
                      </span>

                      {/* Timeline Card */}
                      <div className={`glass p-6 rounded-2xl flex flex-col gap-6 border-white/5 transition-all duration-300 group-hover:border-amber-400/20 group-hover:bg-amber-400/[0.01] ${
                        isUpcoming ? "border-amber-400/10 shadow-[0_0_30px_rgba(248,184,31,0.02)]" : ""
                      }`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {/* Left Details: Person Info */}
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12 border border-white/10 rounded-xl">
                              <AvatarImage src={person?.imageUrl} alt={person?.name} className="rounded-xl" />
                              <AvatarFallback className="rounded-xl bg-amber-400/10 text-amber-400 font-medium">
                                {person?.name?.[0] ?? "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-base font-medium text-stone-200 leading-tight">
                                  {person?.name}
                                </h3>
                                {isUpcoming && (
                                  <Badge variant="outline" className="border-amber-400/30 bg-amber-400/10 text-amber-300 text-[10px] uppercase font-mono px-2 py-0.5 tracking-wider">
                                    Next Step
                                  </Badge>
                                )}
                              </div>
                              {person?.title && person?.company ? (
                                <p className="text-xs text-stone-500 mt-1">
                                  {person.title} <span className="text-stone-700 mx-1">·</span> {person.company}
                                </p>
                              ) : (
                                <p className="text-xs text-stone-600 mt-1">
                                  {person?.email}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Right Details: Date & Badge */}
                          <div className="flex flex-wrap items-center md:items-end md:flex-col gap-2.5">
                            <div className="flex items-center gap-1.5 text-stone-400 text-xs font-mono bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                              <Calendar size={12} className="text-stone-500" />
                              <span>{formatDate(booking.startTime)}</span>
                              <span className="text-stone-600">@</span>
                              <span>{formatTime(booking.startTime)}</span>
                            </div>
                            <div className="flex gap-1.5">
                              <Badge variant="outline" className={`${STATUS_STYLES[status]} text-[10px] tracking-wider uppercase font-mono`}>
                                {status.charAt(0) + status.slice(1).toLowerCase()}
                              </Badge>
                              <Badge variant="outline" className={creditsStyle}>
                                {creditsLabel}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Mid-line separator */}
                        <div className="h-px bg-white/5" />

                        {/* Bottom Actions or Feedback Summary */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {isUpcoming ? (
                            <>
                              <div className="flex items-center gap-2.5 text-xs text-stone-400">
                                <Clock size={13} className="text-amber-400" />
                                <span>Starts in <Countdown startTime={booking.startTime} /></span>
                              </div>
                              <div className="flex items-center gap-2">
                                {booking.streamCallId && (
                                  <Button variant="gold" size="sm" className="h-8 gap-2 relative overflow-hidden group/btn shadow-[0_0_15px_rgba(248,184,31,0.1)] text-black" asChild>
                                    <Link href={`/call/${booking.streamCallId}`}>
                                      <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover/btn:translate-y-0" />
                                      <Video size={13} />
                                      Join Call
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex-1">
                                {feedback?.summary ? (
                                  <div className="bg-white/[0.01] border border-white/5 rounded-xl px-4 py-3 text-xs text-stone-400 font-light leading-relaxed max-w-3xl">
                                    <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase block mb-1">AI INSIGHT</span>
                                    {feedback.summary}
                                  </div>
                                ) : (
                                  <span className="text-xs text-stone-500 italic">No feedback submitted for this session.</span>
                                )}
                              </div>

                              {feedback && (
                                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1.5 border-amber-400/20 text-amber-400 hover:bg-amber-400/10 hover:border-amber-400/30 text-xs"
                                    onClick={() => handleOpenFeedback(feedback)}
                                  >
                                    <Sparkles size={12} />
                                    Read Feedback
                                  </Button>
                                  <Badge
                                    variant="outline"
                                    className={`h-6 ${RATING_STYLES[feedback.overallRating]} text-xs font-medium`}
                                  >
                                    ✦ {RATING_LABEL[feedback.overallRating]}
                                  </Badge>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.section>
            ) : (
              <motion.section
                key="grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-10"
              >
                {/* Upcoming */}
                {scheduled.length > 0 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <p className="text-xs font-semibold text-stone-500 tracking-widest uppercase font-mono">
                        Upcoming ({scheduled.length})
                      </p>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {scheduled.map((b) => (
                        <AppointmentCard key={b.id} booking={b} mode={mode} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Past */}
                {past.length > 0 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <p className="text-xs font-semibold text-stone-500 tracking-widest uppercase font-mono">
                        Past ({past.length})
                      </p>
                      <div className="flex-1 h-px bg-white/5" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {past.map((b) => (
                        <AppointmentCard
                          key={b.id}
                          booking={b}
                          mode={mode}
                          isPast={true}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.section>
            )}
          </AnimatePresence>

          {/* ─── CUMULATIVE INTELLIGENCE PANEL ─── */}
          {completedWithFeedback.length > 0 && (
            <section className="mt-6 border border-white/5 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-amber-300/[0.01] p-6 md:p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
                  <TrendingUp size={18} />
                </span>
                <div>
                  <h3 className="text-lg font-medium text-stone-200">
                    {isInterviewer ? "Candidate Evaluation Insights" : "Prep Intelligence"}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 font-light">
                    {isInterviewer 
                      ? "Consolidated review summaries across candidates you evaluated." 
                      : "Aggregated AI review themes from your mock interviews."}
                  </p>
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Strengths */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-emerald-400/80 flex items-center gap-2 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {isInterviewer ? "Notable Strengths Noted" : "Core Strengths"}
                  </h4>
                  {allStrengths.length > 0 ? (
                    <ul className="flex flex-col gap-2.5">
                      {Array.from(new Set(allStrengths)).slice(0, 6).map((str, i) => (
                        <li key={i} className="text-sm text-stone-300 flex items-start gap-2.5 leading-relaxed font-light">
                          <span className="text-emerald-500/60 mt-1 font-mono">✦</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-500 italic font-light">Strengths will populate as AI generates feedback profiles.</p>
                  )}
                </div>

                {/* Improvements */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-semibold tracking-wider uppercase text-amber-400/80 flex items-center gap-2 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    {isInterviewer ? "Top Recommended Focus Areas" : "Growth Focus Areas"}
                  </h4>
                  {allImprovements.length > 0 ? (
                    <ul className="flex flex-col gap-2.5">
                      {Array.from(new Set(allImprovements)).slice(0, 6).map((imp, i) => (
                        <li key={i} className="text-sm text-stone-300 flex items-start gap-2.5 leading-relaxed font-light">
                          <span className="text-amber-500/60 mt-1 font-mono">○</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-stone-500 italic font-light font-light">Growth areas will populate as AI reviews your sessions.</p>
                  )}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
