"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarOff, Sparkles } from "lucide-react";
import { AppointmentCard } from "@/components/AppointmentCard";
import { FeedbackModal } from "@/components/FeedbackModal";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { updateInterviewerProfile, updateInterviewerAvailability } from "@/actions/interviewer";
import { setupDeveloperTestCall } from "@/actions/call";
import { CATEGORIES, YEARS_OPTIONS } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

// Helper function to format a Date to a "HH:MM" string for time inputs
const formatToTimeStr = (dateVal) => {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function AppointmentsClient({ appointments, userRole, userName, dbUser }) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const handleDevTestCall = async () => {
    setIsTesting(true);
    const id = toast.loading("Setting up developer test call...");
    try {
      const res = await setupDeveloperTestCall();
      if (res.success) {
        toast.success("Redirecting to call...", { id });
        router.push(`/call/${res.streamCallId}`);
      } else {
        toast.error("Failed to setup developer test call", { id });
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to setup developer test call", { id });
    } finally {
      setIsTesting(false);
    }
  };
  
  const now = new Date();
  const isInterviewer = userRole === "INTERVIEWER";

  // Counts for the header badges
  const upcomingCount = appointments.filter(b => b.status === "SCHEDULED" && new Date(b.startTime) > now).length;
  const completedCount = appointments.filter(b => b.status === "COMPLETED").length;

  const handleOpenFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setFeedbackOpen(true);
  };

  // Profile Edit Form State
  const [profileForm, setProfileForm] = useState({
    name: dbUser?.name || "",
    imageUrl: dbUser?.imageUrl || "",
    title: dbUser?.title || "",
    company: dbUser?.company || "",
    yearsExp: dbUser?.yearsExp || 1,
    bio: dbUser?.bio || "",
    creditRate: dbUser?.creditRate || 1,
    categories: dbUser?.categories || [],
    startTime: dbUser?.availabilities?.[0] ? formatToTimeStr(dbUser.availabilities[0].startTime) : "09:00",
    endTime: dbUser?.availabilities?.[0] ? formatToTimeStr(dbUser.availabilities[0].endTime) : "17:00",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // 1. Update Profile Information (including custom image URL and display name)
      await updateInterviewerProfile({
        name: profileForm.name,
        imageUrl: profileForm.imageUrl,
        title: profileForm.title,
        company: profileForm.company,
        yearsExp: Number(profileForm.yearsExp),
        bio: profileForm.bio,
        categories: profileForm.categories,
        creditRate: Number(profileForm.creditRate),
      });

      // 2. Update Availability Slots
      await updateInterviewerAvailability(
        profileForm.startTime,
        profileForm.endTime
      );

      toast.success("Profile updated successfully!");
      setStatusFilter("all");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
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

  // Tabs array
  const tabs = [
    { id: "all", label: "All Sessions" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" }
  ];

  if (isInterviewer) {
    tabs.push({ id: "profile", label: "Profile" });
  }

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
          <button
            onClick={handleDevTestCall}
            disabled={isTesting}
            className="h-11 px-5 rounded-xl border border-amber-400/20 bg-amber-400/5 hover:bg-amber-400/10 text-amber-400 hover:text-amber-300 transition-all text-xs font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles size={13} className={isTesting ? "animate-spin" : "animate-pulse"} />
            Dev Test Call
          </button>

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
        <div className={`flex items-center gap-1.5 bg-[#0A0A0C]/80 backdrop-blur-xl p-1.5 rounded-full border border-white/10 w-full ${isInterviewer ? "sm:w-[450px]" : "sm:w-[350px]"} relative shadow-[0_10px_35px_rgba(0,0,0,0.8)]`}>
          {tabs.map((tab) => {
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

      {/* ─── CONTENT AREA ─── */}
      {statusFilter === "profile" && isInterviewer ? (
        <form onSubmit={handleSave} className="space-y-6 max-w-3xl bg-[#0a0a0c]/60 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="relative shrink-0">
              <Avatar className="w-20 h-20 border border-white/10 shadow-xl rounded-full overflow-hidden bg-stone-900">
                <AvatarImage 
                  src={profileForm.imageUrl || `https://api.dicebear.com/9.x/glass/svg?seed=${dbUser?.id || "fallback"}&backgroundColor=111113`} 
                  alt={profileForm.name} 
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl bg-stone-900 text-stone-500 font-serif">
                  {profileForm.name?.[0] || "?"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 w-full space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-stone-300 text-xs font-bold uppercase tracking-wider">Display Name</Label>
                  <Input
                    id="displayName"
                    className="bg-black/50 border-white/10 focus:border-[#f8b81f]/50 text-white rounded-xl h-11"
                    placeholder="John Doe"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl" className="text-stone-300 text-xs font-bold uppercase tracking-wider">Profile Photo URL</Label>
                  <Input
                    id="avatarUrl"
                    className="bg-black/50 border-white/10 focus:border-[#f8b81f]/50 text-white rounded-xl h-11"
                    placeholder="https://images.unsplash.com/..."
                    value={profileForm.imageUrl}
                    onChange={(e) => setProfileForm(p => ({ ...p, imageUrl: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-stone-300 text-xs font-bold uppercase tracking-wider">Current Title</Label>
              <Input
                id="title"
                className="bg-black/50 border-white/10 focus:border-[#f8b81f]/50 text-white rounded-xl h-11"
                placeholder="e.g. Senior Frontend Engineer"
                value={profileForm.title}
                onChange={(e) => setProfileForm(p => ({ ...p, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-stone-300 text-xs font-bold uppercase tracking-wider">Company</Label>
              <Input
                id="company"
                className="bg-black/50 border-white/10 focus:border-[#f8b81f]/50 text-white rounded-xl h-11"
                placeholder="e.g. Google"
                value={profileForm.company}
                onChange={(e) => setProfileForm(p => ({ ...p, company: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Experience and Rates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-stone-300 text-xs font-bold uppercase tracking-wider block">Years of Experience</Label>
              <div className="flex flex-wrap gap-2">
                {YEARS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setProfileForm(p => ({ ...p, yearsExp: opt.value }))}
                    className={`text-xs px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                      profileForm.yearsExp === opt.value
                        ? "border-[#f8b81f]/40 bg-[#f8b81f]/10 text-[#f8b81f] font-bold"
                        : "border-white/10 bg-black/20 text-stone-500 hover:border-white/20 hover:text-stone-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditRate" className="text-stone-300 text-xs font-bold uppercase tracking-wider">Credit Rate (per session)</Label>
              <div className="relative">
                <Input
                  id="creditRate"
                  type="number"
                  min="1"
                  max="50"
                  className="bg-black/50 border-white/10 focus:border-[#f8b81f]/50 text-white rounded-xl h-11 pr-16"
                  value={profileForm.creditRate}
                  onChange={(e) => setProfileForm(p => ({ ...p, creditRate: Number(e.target.value) }))}
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-500 font-medium">Credits</span>
              </div>
            </div>
          </div>

          {/* Specialities */}
          <div className="space-y-3">
            <Label className="text-stone-300 text-xs font-bold uppercase tracking-wider block">Specialities</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(cat => cat.value !== null).map((cat) => {
                const active = profileForm.categories.includes(cat.value);
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      setProfileForm(prev => ({
                        ...prev,
                        categories: prev.categories.includes(cat.value)
                          ? prev.categories.filter(c => c !== cat.value)
                          : [...prev.categories, cat.value]
                      }));
                    }}
                    className={`text-xs px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                      active
                        ? "border-[#f8b81f]/40 bg-[#f8b81f]/10 text-[#f8b81f] font-bold"
                        : "border-white/10 bg-black/20 text-stone-500 hover:border-white/20 hover:text-stone-300"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-white/[0.01] border border-white/5">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-stone-300 text-xs font-bold uppercase tracking-wider">Availability Start Time</Label>
              <Input
                id="startTime"
                type="time"
                className="bg-black/50 border-white/10 focus:border-[#f8b81f]/50 text-white rounded-xl h-11 [color-scheme:dark]"
                value={profileForm.startTime}
                onChange={(e) => setProfileForm(p => ({ ...p, startTime: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-stone-300 text-xs font-bold uppercase tracking-wider">Availability End Time</Label>
              <Input
                id="endTime"
                type="time"
                className="bg-black/50 border-white/10 focus:border-[#f8b81f]/50 text-white rounded-xl h-11 [color-scheme:dark]"
                value={profileForm.endTime}
                onChange={(e) => setProfileForm(p => ({ ...p, endTime: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="bio" className="text-stone-300 text-xs font-bold uppercase tracking-wider">Professional Bio</Label>
              <span className="text-[10px] text-stone-500 font-mono">{(profileForm.bio || "").length}/300 chars</span>
            </div>
            <Textarea
              id="bio"
              rows={4}
              maxLength={300}
              className="bg-black/50 border-white/10 focus:border-[#f8b81f]/50 text-white rounded-2xl p-4 resize-none leading-relaxed"
              placeholder="Describe your background and mock interview structure..."
              value={profileForm.bio}
              onChange={(e) => setProfileForm(p => ({ ...p, bio: e.target.value }))}
              required
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-4 border-t border-white/5 pt-6">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl px-6 h-11 uppercase text-xs tracking-wider font-bold"
              onClick={() => setStatusFilter("all")}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gold"
              className="rounded-xl px-8 h-11 uppercase text-xs tracking-wider font-black shadow-[0_10px_30px_rgba(248,184,31,0.15)] cursor-pointer"
              disabled={saving || profileForm.categories.length === 0}
            >
              {saving ? "Saving Changes..." : "Save Profile"}
            </Button>
          </div>
        </form>
      ) : (
        /* RESPONSIVE CARD GRID */
        sortedAppointments.length > 0 ? (
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
        )
      )}
    </div>
  );
}
