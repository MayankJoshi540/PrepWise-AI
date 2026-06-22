"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  CalendarDays, 
  Clock, 
  User, 
  ShieldCheck, 
  Award, 
  Star, 
  Video, 
  CreditCard, 
  Activity, 
  CheckCircle, 
  Briefcase, 
  BookOpen 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GrayTitle } from "@/components/reusables";
import { toast } from "sonner";
import { updateInterviewerProfile, updateInterviewerAvailability } from "@/actions/interviewer";
import { CATEGORIES, YEARS_OPTIONS } from "@/lib/data";

const CATEGORY_LABEL = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  FULLSTACK: "Fullstack",
  DSA: "Algorithms & DSA",
  SYSTEM_DESIGN: "System Design",
  BEHAVIORAL: "Behavioral & HR",
  DEVOPS: "DevOps & Cloud",
  MOBILE: "Mobile Apps"
};

export default function InterviewerDashboard({ interviewer }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("sessions");
  
  // Profile settings state
  const [profileForm, setProfileForm] = useState({
    title: interviewer.title || "",
    company: interviewer.company || "",
    yearsExp: interviewer.yearsExp || 5,
    bio: interviewer.bio || "",
    categories: interviewer.categories || [],
    creditRate: interviewer.creditRate || 10,
  });
  
  // Availability settings state
  const initialAvail = interviewer.availabilities?.[0] || {
    startTime: new Date(new Date().setHours(9, 0, 0, 0)),
    endTime: new Date(new Date().setHours(18, 0, 0, 0)),
  };

  const getFormattedTime = (dateObj) => {
    const d = new Date(dateObj);
    const hours = String(d.getHours()).padStart(2, "0");
    const mins = String(d.getMinutes()).padStart(2, "0");
    return `${hours}:${mins}`;
  };

  const [availHours, setAvailHours] = useState({
    start: getFormattedTime(initialAvail.startTime),
    end: getFormattedTime(initialAvail.endTime),
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingAvail, setSavingAvail] = useState(false);

  // Toggle skill category selection
  const handleToggleCategory = (val) => {
    setProfileForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(val)
        ? prev.categories.filter((c) => c !== val)
        : [...prev.categories, val],
    }));
  };

  // Submit profile updates
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!profileForm.title.trim() || !profileForm.company.trim() || !profileForm.bio.trim()) {
      toast.error("Please fill out all profile fields");
      return;
    }
    if (profileForm.categories.length === 0) {
      toast.error("Please select at least one core category");
      return;
    }

    setSavingProfile(true);
    try {
      await updateInterviewerProfile(profileForm);
      toast.success("Profile details updated successfully");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  // Submit availability updates
  const handleSaveAvailability = async (e) => {
    e.preventDefault();
    const [startH] = availHours.start.split(":").map(Number);
    const [endH] = availHours.end.split(":").map(Number);
    
    if (startH >= endH) {
      toast.error("Start time must be before end time");
      return;
    }

    setSavingAvail(true);
    try {
      await updateInterviewerAvailability(availHours.start, availHours.end);
      toast.success("Availability hours updated successfully");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update availability");
    } finally {
      setSavingAvail(false);
    }
  };

  // Split sessions into upcoming and completed
  const upcomingSessions = interviewer.bookingsAsInterviewer.filter(
    (b) => b.status === "SCHEDULED"
  );
  const completedSessions = interviewer.bookingsAsInterviewer.filter(
    (b) => b.status === "COMPLETED" || b.status === "CANCELLED"
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ── Dashboard Welcomer Header ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
        <div>
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-400/5 px-2.5 py-1 rounded-lg border border-amber-400/10 uppercase tracking-widest w-fit">
            <ShieldCheck size={11} /> Coach Dashboard
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white mt-3">
            <GrayTitle>Welcome, {interviewer.name}</GrayTitle>
          </h1>
          <p className="text-xs text-stone-500 font-light mt-1 flex items-center gap-1.5">
            <Briefcase size={12} className="text-stone-600" />
            <span>{interviewer.title} at <span className="text-amber-400/80 font-bold">{interviewer.company}</span></span>
          </p>
        </div>

        {/* Dynamic credit balance box */}
        <div className="flex items-center gap-4 bg-white/[0.01] border border-white/5 px-5 py-3.5 rounded-2xl shrink-0 w-full md:w-auto shadow-inner">
          <div className="w-10 h-10 rounded-xl bg-amber-400/5 border border-amber-400/10 flex items-center justify-center text-amber-400">
            <CreditCard size={18} />
          </div>
          <div>
            <span className="text-[9px] text-stone-500 font-extrabold uppercase tracking-widest leading-none block">Credit Balance</span>
            <span className="text-2xl font-black text-white leading-none mt-1.5 block">
              {interviewer.creditBalance} <span className="text-xs text-stone-500 font-bold">cr</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Key Metrics Cards Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-white/5 bg-neutral-950/20 rounded-2xl p-5 hover:border-amber-400/10 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Scheduled Runs</span>
            <div className="w-7 h-7 rounded-lg bg-amber-400/5 border border-amber-400/10 flex items-center justify-center text-amber-450">
              <CalendarDays size={13} />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{upcomingSessions.length}</p>
          <p className="text-[10px] text-stone-500 font-light mt-1">Pending mock bookings</p>
        </div>

        <div className="border border-white/5 bg-neutral-950/20 rounded-2xl p-5 hover:border-amber-400/10 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Conducts</span>
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-400">
              <Activity size={13} />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{completedSessions.length}</p>
          <p className="text-[10px] text-stone-500 font-light mt-1">Sessions completed</p>
        </div>

        <div className="border border-white/5 bg-neutral-950/20 rounded-2xl p-5 hover:border-amber-400/10 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Credit Rate</span>
            <div className="w-7 h-7 rounded-lg bg-amber-400/5 border border-amber-400/10 flex items-center justify-center text-amber-450">
              <span className="text-[10px]">💎</span>
            </div>
          </div>
          <p className="text-2xl font-black text-amber-400">{profileForm.creditRate} <span className="text-xs text-stone-500 font-bold">cr</span></p>
          <p className="text-[10px] text-stone-500 font-light mt-1">Charged per session</p>
        </div>

        <div className="border border-white/5 bg-neutral-950/20 rounded-2xl p-5 hover:border-amber-400/10 transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Hours Slot</span>
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-400">
              <Clock size={13} />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{availHours.start} – {availHours.end}</p>
          <p className="text-[10px] text-stone-500 font-light mt-1">Active daily window</p>
        </div>
      </div>

      {/* ── Sub Navigation Tab Headers ── */}
      <div className="flex gap-2 border-b border-white/5 pb-0.5 mt-4">
        {[
          { id: "sessions", label: "Sessions Scheduler" },
          { id: "availability", label: "Hours Availability" },
          { id: "profile", label: "Profile Details" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider relative transition-all duration-300 cursor-pointer ${
              activeTab === tab.id
                ? "text-amber-450"
                : "text-stone-500 hover:text-stone-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-dash-tab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-400 shadow-[0_0_8px_rgba(248,184,31,0.4)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Tab Content Views ── */}
      <div className="min-h-[400px]">
        {activeTab === "sessions" && (
          <div className="flex flex-col gap-8">
            {/* Upcoming Mock Sessions Section */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Upcoming Sessions</h3>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10">
                  {upcomingSessions.length} Active
                </span>
              </div>
              
              {upcomingSessions.length === 0 ? (
                <div className="border border-dashed border-white/5 rounded-2xl p-10 text-center bg-white/[0.005]">
                  <CalendarDays size={20} className="mx-auto text-stone-700 mb-2" />
                  <p className="text-xs font-bold text-stone-400">No scheduled sessions</p>
                  <p className="text-[10px] text-stone-500 font-light mt-1">Candidates booking slots will appear here.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {upcomingSessions.map((b) => (
                    <div 
                      key={b.id}
                      className="border border-white/5 bg-neutral-950/20 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-400/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 shrink-0">
                          <User size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-200">{b.interviewee.name}</p>
                          <p className="text-[10px] text-stone-500 font-light truncate">{b.interviewee.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                        <div className="text-left md:text-right">
                          <p className="text-xs font-bold text-stone-300">
                            {new Date(b.startTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                          <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider mt-0.5">
                            {new Date(b.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>

                        {b.streamCallId && (
                          <Button variant="gold" size="sm" className="rounded-xl text-[10px] font-black uppercase tracking-wider" asChild>
                            <Link href={`/session/${b.streamCallId}`}>
                              <Video size={12} className="mr-1" />
                              Join Room
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Conducting History Section */}
            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Past / Completed Sessions</h3>
              
              {completedSessions.length === 0 ? (
                <div className="border border-white/5 rounded-2xl p-8 text-center bg-white/[0.002]">
                  <p className="text-[10px] text-stone-500 font-light">No historical conduction records.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {completedSessions.map((b) => (
                    <div 
                      key={b.id}
                      className="border border-white/5 bg-neutral-950/30 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-500 shrink-0">
                          <CheckCircle size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-300">{b.interviewee.name}</p>
                          <span className="text-[9px] font-bold text-stone-550 uppercase tracking-widest">
                            Completed · {b.creditsCharged} credits earned
                          </span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right text-[11px] text-stone-500">
                        <p className="font-bold">{new Date(b.startTime).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                        <p className="text-[9px]">{new Date(b.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "availability" && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-white/5 bg-neutral-950/20 p-6 md:p-8 rounded-3xl max-w-xl w-full flex flex-col gap-6"
          >
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Active Hours Settings</h3>
              <p className="text-xs text-stone-500 font-light mt-1">
                Define the start and end hours for your session availability calendar window.
              </p>
            </div>

            <Separator className="bg-white/5" />

            <form onSubmit={handleSaveAvailability} className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="avail-start">Start Hour</Label>
                  <select
                    id="avail-start"
                    value={availHours.start}
                    onChange={(e) => setAvailHours(p => ({ ...p, start: e.target.value }))}
                    className="h-10 rounded-xl border border-white/10 bg-neutral-950 px-3 text-xs text-stone-300 focus:border-amber-400 focus:outline-none"
                  >
                    {[...Array(24)].map((_, hr) => {
                      const formatted = String(hr).padStart(2, "0") + ":00";
                      return <option key={formatted} value={formatted}>{formatted}</option>;
                    })}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="avail-end">End Hour</Label>
                  <select
                    id="avail-end"
                    value={availHours.end}
                    onChange={(e) => setAvailHours(p => ({ ...p, end: e.target.value }))}
                    className="h-10 rounded-xl border border-white/10 bg-neutral-950 px-3 text-xs text-stone-300 focus:border-amber-400 focus:outline-none"
                  >
                    {[...Array(24)].map((_, hr) => {
                      const formatted = String(hr).padStart(2, "0") + ":00";
                      return <option key={formatted} value={formatted}>{formatted}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                <Clock size={14} className="text-amber-500/80 shrink-0 mt-0.5" />
                <p className="text-[10px] text-stone-500 font-light leading-relaxed">
                  Adjusting availability affects slot calculations immediately. Booked slots are preserved and skipped during overlap generation automatically.
                </p>
              </div>

              <Button
                type="submit"
                variant="gold"
                disabled={savingAvail}
                className="h-11 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-[0_2px_15px_rgba(248,184,31,0.15)] cursor-pointer"
              >
                {savingAvail ? "Updating Availability..." : "Save Availability Hours"}
              </Button>
            </form>
          </motion.div>
        )}

        {activeTab === "profile" && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-white/5 bg-neutral-950/20 p-6 md:p-8 rounded-3xl flex flex-col gap-6"
          >
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Interviewer Profile Settings</h3>
              <p className="text-xs text-stone-500 font-light mt-1">
                Edit the public information shown on your hiring expert booking card.
              </p>
            </div>

            <Separator className="bg-white/5" />

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-6 w-full">
              {/* Title & Company Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="prof-title">Current Job Title</Label>
                  <Input
                    id="prof-title"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="h-10 rounded-xl bg-neutral-950 border-white/10 text-stone-300 text-xs"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="prof-company">Company</Label>
                  <Input
                    id="prof-company"
                    value={profileForm.company}
                    onChange={(e) => setProfileForm(p => ({ ...p, company: e.target.value }))}
                    placeholder="e.g. Google, Stripe"
                    className="h-10 rounded-xl bg-neutral-950 border-white/10 text-stone-300 text-xs"
                  />
                </div>
              </div>

              {/* Experience and Rate Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="prof-exp">Years of Experience</Label>
                  <select
                    id="prof-exp"
                    value={profileForm.yearsExp}
                    onChange={(e) => setProfileForm(p => ({ ...p, yearsExp: Number(e.target.value) }))}
                    className="h-10 rounded-xl border border-white/10 bg-neutral-950 px-3 text-xs text-stone-300 focus:border-amber-400 focus:outline-none"
                  >
                    {YEARS_OPTIONS.map((y) => (
                      <option key={y.value} value={y.value}>{y.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="prof-rate">Credit Rate / Session</Label>
                  <Input
                    id="prof-rate"
                    type="number"
                    min="1"
                    max="50"
                    value={profileForm.creditRate}
                    onChange={(e) => setProfileForm(p => ({ ...p, creditRate: Number(e.target.value) }))}
                    className="h-10 rounded-xl bg-neutral-950 border-white/10 text-stone-300 text-xs"
                  />
                </div>
              </div>

              {/* Bio block */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="prof-bio">Profile Biography</Label>
                <Textarea
                  id="prof-bio"
                  rows={4}
                  maxLength={300}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                  placeholder="Share a short summary about your expertise, session goals, and background..."
                  className="rounded-xl bg-neutral-950 border-white/10 text-stone-300 text-xs leading-relaxed"
                />
                <span className="text-[10px] text-stone-650 text-right font-bold">
                  {profileForm.bio.length} / 300 characters
                </span>
              </div>

              {/* Specialties block */}
              <div className="flex flex-col gap-2">
                <Label>Interview Specialties</Label>
                <p className="text-[10px] text-stone-500 leading-normal -mt-1 mb-2">
                  Select the interview categories you are comfortable drilling candidates in.
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    if (!cat?.value) return null;
                    const active = profileForm.categories.includes(cat.value);
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => handleToggleCategory(cat.value)}
                        className={`text-xs px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                          active
                            ? "border-amber-400 bg-amber-400/5 text-amber-400 shadow-[0_2px_10px_rgba(248,184,31,0.06)]"
                            : "border-white/5 bg-white/[0.01] text-stone-500 hover:border-white/10 hover:text-stone-400"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Separator className="bg-white/5" />

              <Button
                type="submit"
                variant="gold"
                disabled={savingProfile}
                className="h-11 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-[0_2px_15px_rgba(248,184,31,0.15)] cursor-pointer"
              >
                {savingProfile ? "Saving Profile details..." : "Save Profile details"}
              </Button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
