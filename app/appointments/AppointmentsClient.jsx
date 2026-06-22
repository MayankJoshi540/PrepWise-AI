"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarOff } from "lucide-react";
import { AppointmentCard } from "@/components/AppointmentCard";
import { FeedbackModal } from "@/components/FeedbackModal";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { motion } from "motion/react";

export default function AppointmentsClient({ appointments, userRole, userName }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  
  const now = new Date();
  const isInterviewer = userRole === "INTERVIEWER";

  // Counts for the header badges
  const upcomingCount = appointments.filter(b => b.status === "SCHEDULED" && new Date(b.startTime) > now).length;
  const completedCount = appointments.filter(b => b.status === "COMPLETED").length;

  const handleOpenFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setFeedbackOpen(true);
  };

  // Filter logic
  const processedAppointments = appointments.filter((b) => {
    const isUpcoming = b.status === "SCHEDULED" && new Date(b.startTime) > now;
    if (statusFilter === "upcoming") return isUpcoming;
    if (statusFilter === "completed") return b.status === "COMPLETED";
    return true;
  });

  // Sort logic (latest first by default)
  const sortedAppointments = [...processedAppointments].sort((a, b) => {
    return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
  });

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col gap-6 font-sans text-white bg-transparent relative z-10 pb-16">
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

      {/* Background Starry Sky and radial gradient matching the website hero styling */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <StarsBackground
          factor={0.02} 
          speed={60}
          starColor="#FFF"
          className="absolute inset-0 h-full w-full opacity-45 bg-transparent"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(248,184,31,0.06)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ─── PAGE HEADER ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5 relative z-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase italic">
            Interview <span className="text-gradient-gold">Sessions</span>
          </h1>
          <p className="text-white/40 text-base font-medium">
            Welcome back, <span className="text-white">{userName}</span>. Manage upcoming and completed interviews, review AI feedback, and track candidate performance.
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/10 px-4 py-2.5 rounded-xl">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Upcoming</span>
            <span className="text-xs font-mono font-black text-[#f8b81f] bg-[#f8b81f]/10 px-2.5 py-0.5 rounded-lg border border-[#f8b81f]/20 shadow-[0_0_10px_rgba(248,184,31,0.1)]">
              {upcomingCount}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.02] border border-white/10 px-4 py-2.5 rounded-xl">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black">Completed</span>
            <span className="text-xs font-mono font-black text-white bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10">
              {completedCount}
            </span>
          </div>
        </div>
      </div>

      {/* ─── TABS ─── */}
      <div className="flex justify-start relative z-10">
        <div className="flex items-center gap-1.5 bg-[#0A0A0C]/80 backdrop-blur-xl p-1.5 rounded-full border border-white/10 w-full sm:w-[350px] relative shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          {[
            { id: "all", label: "All Sessions" },
            { id: "upcoming", label: "Upcoming" },
            { id: "completed", label: "Completed" }
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`relative flex-1 h-9 text-[10px] font-black uppercase tracking-[0.15em] rounded-full transition-colors duration-300 select-none cursor-pointer focus:outline-none flex items-center justify-center ${
                  isActive ? "text-white" : "text-white/30 hover:text-white/70"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="customActiveTab"
                    className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-full -z-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeDot"
                      className="w-1.5 h-1.5 rounded-full bg-[#f8b81f] shadow-[0_0_8px_#f8b81f]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── RESPONSIVE CARD GRID ─── */}
      {sortedAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAppointments.map((booking) => {
            const isUpcoming = booking.status === "SCHEDULED" && new Date(booking.startTime) > now;
            return (
              <AppointmentCard 
                key={booking.id}
                booking={booking}
                mode={userRole === "INTERVIEWER" ? "interviewer" : "interviewee"}
                isPast={!isUpcoming}
                onFullFeedback={handleOpenFeedback}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center border border-dashed border-white/10 bg-white/[0.01] rounded-[2rem] flex flex-col items-center justify-center gap-3 relative z-10">
          <CalendarOff className="text-white/20 mb-1 animate-pulse" size={32} />
          <p className="text-sm text-white/40 font-mono font-black uppercase tracking-widest">
            No matching interview sessions found
          </p>
        </div>
      )}

    </div>
  );
}
