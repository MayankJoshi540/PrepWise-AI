"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { bookSlot } from "@/actions/booking";
import useFetch from "@/hooks/use-fetch";
import UpgradeModal from "@/components/UpgradeModal";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  CalendarDays,
  Clock,
  ShieldCheck,
  AlertCircle,
  Video,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import {
  formatDateFull,
  formatTime,
  formatDateTab,
  generateDates,
  generateSlots,
} from "@/lib/helpers";

const SLOT_DURATION_MINUTES = 60;
const DAYS_AHEAD = 9;

export default function SlotPicker({ interviewer, interviewerCredits, userCredits }) {
  const router = useRouter();
  const dates = useMemo(() => generateDates(DAYS_AHEAD), []);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const summaryRef = useRef(null);
  const datesRef = useRef(null);

  const availability = interviewer.availabilities?.[0] || {
    startTime: new Date(new Date().setHours(9, 0, 0, 0)),
    endTime: new Date(new Date().setHours(18, 0, 0, 0)),
  };

  const nextLabel = useMemo(() => {
    if (!availability) return "N/A";
    for (const date of dates) {
      const s = generateSlots(date, new Date(availability.startTime), new Date(availability.endTime), interviewer.bookingsAsInterviewer ?? [], SLOT_DURATION_MINUTES);
      if (s.some((x) => !x.isBooked)) {
        if (date.toDateString() === new Date().toDateString()) return "Today";
        const tmr = new Date(); tmr.setDate(tmr.getDate() + 1);
        if (date.toDateString() === tmr.toDateString()) return "Tomorrow";
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      }
    }
    return "Next few days";
  }, [dates, availability, interviewer.bookingsAsInterviewer]);

  useEffect(() => {
    if (selectedSlot && summaryRef.current) {
      // Safe scrolling that doesn't jump the page horizontally
      summaryRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }, [selectedSlot]);

  const { data, loading, error, fn: bookFn } = useFetch(bookSlot);
  const canAfford = userCredits >= interviewerCredits;

  const slots = useMemo(() => {
    if (!availability) return [];
    return generateSlots(selectedDate, availability.startTime, availability.endTime, interviewer.bookingsAsInterviewer ?? [], SLOT_DURATION_MINUTES);
  }, [selectedDate, availability, interviewer.bookingsAsInterviewer]);

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (data?.success && data.streamCallId) {
      setIsNavigating(true);
      toast.success("Mock session booked successfully!");
      router.push("/dashboard");
    }
  }, [data, router]);

  const handleDateChange = (date) => { setSelectedDate(date); setSelectedSlot(null); };
  const handleSlotClick = (slot) => {
    if (!slot.available) return;
    if (!canAfford) { setUpgradeOpen(true); return; }
    setSelectedSlot((prev) => prev?.startTime.getTime() === slot.startTime.getTime() ? null : slot);
  };
  const handleConfirm = () => {
    if (!selectedSlot) return;
    bookFn({ interviewerId: interviewer.id, startTime: selectedSlot.startTime.toISOString(), endTime: selectedSlot.endTime.toISOString() });
  };

  if (!availability) {
    return (
      <div className="glass rounded-[2.5rem] p-10 flex flex-col items-center gap-4 text-center border-white/5">
        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-white/40 mb-2">
          <CalendarDays size={24} />
        </div>
        <div>
          <p className="text-lg font-black text-white tracking-tight">Schedule Unavailable</p>
          <p className="text-sm font-medium text-white/40 mt-2 leading-relaxed max-w-[200px] mx-auto">
            No active slots published by this coach right now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UpgradeModal
        open={upgradeOpen}
        onOpenChange={setUpgradeOpen}
        reason={`You need ${interviewerCredits} credits to book this session. Your current balance is ${userCredits}.`}
      />

      <div className="flex flex-col gap-6 glass p-6 md:p-8 rounded-[2.5rem] relative overflow-hidden group border-white/5 hover:border-amber-400/20 transition-all duration-500 shadow-2xl">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-400/[0.05] rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Reserve a Slot</p>
            <h2 className="font-black text-2xl text-white tracking-tight">Book a Session</h2>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] font-black text-white/40 block uppercase tracking-[0.2em] mb-1">Rate</span>
            <span className="text-3xl font-black text-amber-400 leading-none tracking-tighter">
              {interviewerCredits}<span className="text-sm font-bold text-amber-400/60 ml-1">cr</span>
            </span>
          </div>
        </div>

        {/* Info strip */}
        <div className="flex flex-wrap items-center gap-3 text-xs glass bg-white/[0.02] border-white/5 rounded-2xl px-4 py-3">
          <Clock size={14} className="text-amber-400 shrink-0" />
          <span className="font-bold text-white/60">60 min</span>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <Zap size={14} className="text-amber-400 shrink-0" />
          <span className="font-medium text-white/60">
            Next: <span className="text-amber-400 font-black">{nextLabel}</span>
          </span>
          <div className="ml-auto flex items-center gap-2">
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <span className="text-white/40 font-bold uppercase tracking-wider text-[9px] hidden sm:inline">Bal:</span>
            <span className={`font-black ${canAfford ? "text-emerald-400" : "text-red-400"}`}>{userCredits}cr</span>
          </div>
        </div>

        <Separator className="bg-white/5" />

        {/* Date picker */}
        <div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Select Date</p>
          <div className="grid grid-cols-3 gap-2">
            {dates.map((date) => {
              const label = formatDateTab(date);
              const active = date.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={date.toDateString()}
                  onClick={() => handleDateChange(date)}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    active
                      ? "border-amber-400/50 bg-amber-400 text-black shadow-[0_0_20px_-5px_rgba(248,184,31,0.4)] scale-105 z-10"
                      : "border-white/5 glass text-white/60 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className={`font-black text-[9px] uppercase tracking-[0.1em] mb-1 ${active ? "text-black/70" : "text-white/40"}`}>{label.top}</span>
                  <span className={`font-black text-base leading-none ${active ? "text-black" : "text-white"}`}>{label.bottom}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Separator className="bg-white/5" />

        {/* Time slots */}
        <div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4">Select Time</p>
          {slots.length === 0 ? (
            <p className="text-center py-6 text-xs font-medium text-white/40 glass rounded-2xl border-white/5">No slots available for this date.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => {
                const isSelected = selectedSlot?.startTime.getTime() === slot.startTime.getTime();
                return (
                  <button
                    key={slot.startTime.toISOString()}
                    disabled={slot.isBooked}
                    onClick={() => handleSlotClick(slot)}
                    className={`relative text-xs py-3 rounded-xl border font-black tracking-tight transition-all duration-300 ${
                      isSelected
                        ? "border-amber-400/50 bg-amber-400 text-black shadow-[0_0_20px_-5px_rgba(248,184,31,0.4)] scale-105 z-10"
                        : slot.isBooked
                        ? "border-white/[0.02] bg-transparent text-white/20 cursor-not-allowed line-through font-medium"
                        : "border-white/5 glass text-white/60 hover:border-amber-400/30 hover:text-amber-400 cursor-pointer hover:bg-amber-400/5"
                    }`}
                  >
                    {formatTime(slot.startTime)}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Confirmation panel */}
        <AnimatePresence>
          {selectedSlot && (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div ref={summaryRef} className="border border-amber-400/20 bg-amber-400/[0.05] rounded-[1.5rem] p-5 flex flex-col gap-4 mt-2 backdrop-blur-xl">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em]">Confirm Booking</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-amber-400/80 bg-amber-400/10 px-2 py-1 rounded-full">
                    <ShieldCheck size={12} />
                    <span className="font-black uppercase tracking-wider">Secure</span>
                  </div>
                </div>

                <div className="bg-black/50 rounded-2xl border border-white/5 p-4 flex flex-col gap-3 text-xs font-medium">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 uppercase tracking-widest text-[9px] font-black">Date</span>
                    <span className="text-white font-bold">{formatDateFull(selectedSlot.startTime)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40 uppercase tracking-widest text-[9px] font-black">Time</span>
                    <span className="text-amber-400 font-black">{formatTime(selectedSlot.startTime)} – {formatTime(selectedSlot.endTime)}</span>
                  </div>
                  <div className="h-px bg-white/5 my-1" />
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 font-black uppercase tracking-widest text-[10px]">Cost</span>
                    <span className="text-amber-400 font-black text-sm">-{interviewerCredits} credits</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-white/40 uppercase tracking-widest font-black">Remaining</span>
                    <span className="text-white/60 font-bold">{userCredits - interviewerCredits} credits</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-black/30 rounded-xl border border-white/5 px-4 py-3">
                  <Video size={14} className="text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-[10px] font-bold text-white/60 leading-relaxed uppercase tracking-wider">Video room auto-created upon booking.</p>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-black">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{error?.message || error}</span>
                  </div>
                )}

                <div className="flex gap-3 mt-1">
                  <Button variant="outline" className="flex-1 h-12 rounded-xl border-white/10 text-white/60 hover:text-white glass text-xs font-black uppercase tracking-widest cursor-pointer hover:border-white/20 transition-all" disabled={loading || isNavigating} onClick={() => setSelectedSlot(null)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 h-12 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-widest cursor-pointer border-0 shadow-[0_0_20px_-5px_rgba(248,184,31,0.5)] transition-all hover:scale-[1.02]" disabled={loading || isNavigating} onClick={handleConfirm}>
                    {loading || isNavigating ? "Confirming..." : "Confirm →"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}