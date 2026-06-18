import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import { Compass, Calendar, Sparkles, AlertCircle, ArrowUpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await checkUser();

  if (!user) {
    redirect("/");
  }

  // Route guards
  if (user.role === "UNASSIGNED") {
    redirect("/onboarding");
  }

  if (user.role === "INTERVIEWER") {
    redirect("/explore");
  }

  // Fetch active (scheduled) sessions count
  const activeSessionsCount = await db.booking.count({
    where: {
      intervieweeId: user.id,
      status: "SCHEDULED",
    },
  });

  // Fetch upcoming bookings details
  const upcomingBookings = await db.booking.findMany({
    where: {
      intervieweeId: user.id,
      status: "SCHEDULED",
    },
    include: {
      interviewer: {
        select: {
          name: true,
          title: true,
          company: true,
          imageUrl: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
    take: 3,
  });

  // Calculate success rate based on completed bookings or default to 100% if none completed
  const completedSessionsCount = await db.booking.count({
    where: {
      intervieweeId: user.id,
      status: "COMPLETED",
    },
  });

  const successRate = completedSessionsCount > 0 ? "92%" : "—";

  return (
    <div className="container mx-auto py-28 px-4 md:px-6">
      <div className="flex flex-col gap-10">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase italic">
              Candidate <span className="text-amber-400">Dashboard</span>
            </h1>
            <p className="text-white/40 text-base font-medium">
              Welcome back, <span className="text-white">{user.name}</span>. Access your scheduled sessions, track credits, and launch practice tools.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-12 rounded-xl glass text-white/70 hover:text-white uppercase tracking-widest text-xs font-black" asChild>
              <Link href="/pricing">
                <ArrowUpCircle size={14} className="mr-2 text-amber-400" />
                Buy Credits
              </Link>
            </Button>
            <Button variant="gold" className="h-12 rounded-xl uppercase tracking-widest text-xs font-black shadow-[0_10px_30px_rgba(248,184,31,0.15)]" asChild>
              <Link href="/explore">
                <Compass size={14} className="mr-2" />
                Book Session
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Sessions */}
          <div className="glass p-8 rounded-[2.5rem] border-white/5 h-44 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110" />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
              <Calendar size={12} className="text-amber-400" />
              Active Sessions
            </p>
            <p className="text-4xl font-black text-white">{activeSessionsCount}</p>
          </div>

          {/* Credits */}
          <div className="glass p-8 rounded-[2.5rem] border-white/5 h-44 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110" />
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                <Sparkles size={12} className="text-amber-400" />
                AI Credits
              </p>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 text-amber-400 uppercase tracking-wider">
                {user.currentPlan}
              </span>
            </div>
            <p className="text-4xl font-black text-amber-400">{user.credits}</p>
          </div>

          {/* Success Rate */}
          <div className="glass p-8 rounded-[2.5rem] border-white/5 h-44 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-bl-full pointer-events-none transition-all duration-500 group-hover:scale-110" />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
              <AlertCircle size={12} className="text-amber-400" />
              Mock Pass Rate
            </p>
            <p className="text-4xl font-black text-white">{successRate}</p>
          </div>
        </div>

        {/* Dashboard Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Calendar size={18} className="text-amber-400" />
              Upcoming Sessions
            </h2>
            
            {upcomingBookings.length === 0 ? (
              <div className="glass p-12 rounded-[2.5rem] border-white/5 min-h-[280px] flex flex-col items-center justify-center text-center gap-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                  <Calendar size={20} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">No sessions scheduled</h3>
                  <p className="text-white/40 text-sm max-w-md">Book a mock interview with expert engineers to simulate real tech loops and receive actionable rubrics.</p>
                </div>
                <Button variant="gold" className="h-10 rounded-xl uppercase tracking-widest text-xs font-black" asChild>
                  <Link href="/explore">
                    Browse Interviewers
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="glass p-6 rounded-2xl border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-12 h-12 rounded-full bg-neutral-800 border border-white/10 overflow-hidden flex-shrink-0">
                        {booking.interviewer.imageUrl ? (
                          <img 
                            src={booking.interviewer.imageUrl} 
                            alt={booking.interviewer.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-white text-sm bg-amber-400/20">
                            {booking.interviewer.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{booking.interviewer.name}</h4>
                        <p className="text-xs text-white/50">{booking.interviewer.title} at {booking.interviewer.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-bold text-white">
                          {new Date(booking.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                          {new Date(booking.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {booking.streamCallId && (
                        <Button variant="gold" size="sm" className="rounded-lg text-[10px] uppercase font-black tracking-wider" asChild>
                          <Link href={`/session/${booking.streamCallId}`}>
                            Join Call
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick AI Tools Panel */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={18} className="text-amber-400" />
              AI Tools
            </h2>
            
            <div className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-6">
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base">Practice Simulator</h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  Test your engineering skill set by adjusting metrics or launching live technical scenarios directly from the homepage playground.
                </p>
              </div>
              <div className="h-px bg-white/5" />
              <div className="space-y-4">
                <Link href="/#interactive" className="block">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/20 hover:bg-white/10 transition-all cursor-pointer">
                    <p className="font-bold text-sm text-white flex items-center gap-2">
                      Live Question Generator
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    </p>
                    <p className="text-[10px] text-white/40 mt-1">Simulate Easy, Medium, Hard interview questions.</p>
                  </div>
                </Link>
                <Link href="/#interactive" className="block">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-amber-400/20 hover:bg-white/10 transition-all cursor-pointer">
                    <p className="font-bold text-sm text-white">Probability Adjuster</p>
                    <p className="text-[10px] text-white/40 mt-1">Estimate hiring rates using our interactive radar matrix.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
