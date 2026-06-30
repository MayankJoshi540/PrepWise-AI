"use client";

import { useEffect, useCallback, useState } from "react";

// Stream Video
import {
  StreamTheme,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
  CallingState,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

// Stream Chat
import {
  Chat,
  Channel,
  MessageList,
  MessageComposer,
  Window,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

import { Badge } from "@/components/ui/badge";
import { MessageSquare, Sparkles, Loader2, X, AlertCircle } from "lucide-react";
import AIQuestionsPanel from "./AIQuestionsPanel";
import { completeBooking } from "@/actions/booking";

// ─── Call UI (inside StreamCall context) ─────────────────────────────────────

export default function CallUI({
  callId,
  isInterviewer,
  booking,
  onLeave,
  apiKey,
  token,
  currentUser,
}) {
  const { useCallCallingState } = useCallStateHooks();
  const call = useCall();
  const callingState = useCallCallingState();

  const [activeTab, setActiveTab] = useState("chat");
  const [showPanel, setShowPanel] = useState(true);
  const [panelWidth, setPanelWidth] = useState(340);
  const [isResizing, setIsResizing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startResizing = useCallback((mouseDownEvent) => {
    mouseDownEvent.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const newWidth = window.innerWidth - e.clientX;
      const maxWidth = Math.min(600, window.innerWidth * 0.45);
      const clampedWidth = Math.max(240, Math.min(maxWidth, newWidth));
      setPanelWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  // Auto-stop recording before leaving
  const handleLeave = useCallback(async () => {
    try {
      if (call) {
        const isRecording = call.state?.recording;
        if (isRecording) {
          await call.stopRecording().catch(() => {});
        }
        await call.leave().catch(() => {});
      }
      await completeBooking(booking.id).catch((err) => {
        console.error("Failed to complete booking status:", err);
      });
    } finally {
      onLeave();
    }
  }, [call, booking.id, onLeave]);

  // ── Chat client ──
  const chatClient = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: {
      id: currentUser.id,
      name: currentUser.name,
      image: currentUser.imageUrl,
    },
  });

  const [chatChannel, setChatChannel] = useState(null);

  useEffect(() => {
    if (!chatClient) return;

    const channel = chatClient.channel("messaging", callId, {
      name: "Interview Chat",
      members: [
        booking.interviewer.clerkUserId,
        booking.interviewee.clerkUserId,
      ],
    });

    channel
      .watch()
      .then(() => setChatChannel(channel))
      .catch(console.error);

    return () => {
      if (chatClient && chatClient.user) {
        try {
          channel.stopWatching().catch(() => {});
        } catch (err) {
          // Ignore synchronous disconnect errors
        }
      }
    };
  }, [chatClient, callId, booking]);

  if (callingState === CallingState.LEFT) {
    return (
      <div className="min-h-dvh bg-[#070708] flex flex-col items-center justify-center gap-3">
        <Loader2 size={24} className="text-amber-400 animate-spin" />
        <p className="text-stone-500 text-xs font-mono uppercase tracking-wider">Disconnecting session…</p>
      </div>
    );
  }

  return (
    <div className="h-dvh bg-[#070708] flex flex-col overflow-hidden relative font-sans antialiased text-stone-200">
      
      {/* ─── PREMIUM GLOWING HEADER ─── */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-white/5 bg-black/40 backdrop-blur-md shrink-0 relative z-30">
        <div className="flex flex-wrap items-center gap-3 min-w-0">
          
          {/* Active status beacon */}
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400 font-mono">LIVE FEED</span>
          </div>

          {/* Call Session metadata badge */}
          <div className="flex items-center gap-2 border border-white/5 bg-white/[0.02] px-3 py-1.5 rounded-xl shrink-0">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">ID:</span>
            <span className="text-[10px] font-mono text-amber-400 font-bold">{callId.slice(0, 10)}...</span>
          </div>

          {/* Participant badges */}
          <div className="hidden md:flex items-center gap-2 border border-white/5 bg-white/[0.01] px-3 py-1.5 rounded-xl">
            <span className="text-[10px] font-black text-white/60 uppercase tracking-wider">{booking.interviewer.name}</span>
            <span className="text-white/20 text-xs">×</span>
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">{booking.interviewee.name}</span>
          </div>

          {isInterviewer && (
            <span className="text-[9px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md uppercase tracking-widest shrink-0">
              Interviewer Console
            </span>
          )}
        </div>

        {/* Toggle Panel Button */}
        <button
          onClick={() => setShowPanel(!showPanel)}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer shrink-0 ${
            showPanel 
              ? "border-amber-400/30 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20" 
              : "border-white/10 bg-white/5 text-stone-300 hover:bg-white/10"
          }`}
        >
          <MessageSquare size={12} />
          <span>{showPanel ? "Close Console" : "Open Console"}</span>
        </button>
      </div>

      {/* ─── CALL LAYOUT BODY ─── */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 relative z-10">
        
        {/* ── LEFT: Video feed area with dark radial backdrop ── */}
        <StreamTheme className="h-full w-full flex flex-col flex-1 min-w-0 bg-[#050506] relative overflow-hidden">
          {/* Subtle atmospheric center ambient light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(248,184,31,0.035)_0%,transparent_70%)] pointer-events-none z-0" />
          
          {/* Video Grid */}
          <div className="flex-1 min-h-0 relative z-10 p-4 overflow-hidden flex flex-col items-stretch justify-stretch">
            <SpeakerLayout participantBarPosition="bottom" />
          </div>

          {/* Control Bar - Guaranteed to be visible and unclipped during zoom */}
          <div className="h-20 shrink-0 border-t border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-center z-20 relative px-4 [&_.str-video__call-controls]:relative [&_.str-video__call-controls]:bottom-0 [&_.str-video__call-controls]:left-0 [&_.str-video__call-controls]:transform-none [&_.str-video__call-controls]:bg-transparent [&_.str-video__call-controls]:border-0">
            <CallControls onLeave={handleLeave} />
          </div>
        </StreamTheme>

        {/* Mobile Scrim Backdrop Overlay */}
        {showPanel && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setShowPanel(false)}
          />
        )}

        {/* Resizable Divider Handle (Desktop Only) */}
        {showPanel && (
          <div
            onMouseDown={startResizing}
            className={`hidden lg:block w-1.5 hover:w-2 bg-white/5 hover:bg-amber-400/40 cursor-col-resize transition-all h-full z-20 shrink-0 select-none relative ${
              isResizing ? "bg-amber-400/60 w-2" : ""
            }`}
          >
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/10" />
          </div>
        )}

        {/* ── RIGHT: Chat / AI Console Side Panel ── */}
        <div 
          style={isDesktop ? { width: showPanel ? panelWidth : 0 } : undefined}
          className={`fixed inset-y-0 right-0 z-50 flex flex-col border-l border-white/5 bg-[#080809]/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.85)] lg:static lg:inset-auto lg:z-0 lg:shadow-none lg:border-t-0 lg:border-l transition-all duration-150 ease-out ${
            !showPanel
              ? "hidden lg:flex lg:w-0 lg:opacity-0 lg:border-l-0 overflow-hidden"
              : "w-[85vw] max-w-[360px] lg:max-w-none flex"
          }`}
        >
          {/* Panel Mobile Header */}
          <div className="flex lg:hidden items-center justify-between px-4 py-3.5 border-b border-white/5 bg-black/20 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Sparkles size={12} className="animate-pulse" />
              Session Console
            </span>
            <button 
              onClick={() => setShowPanel(false)}
              className="text-stone-400 hover:text-white p-1 rounded-lg bg-white/5 border border-white/5 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Premium Dock-styled Tab Switcher */}
          <div className="flex bg-white/[0.02] border border-white/5 rounded-xl p-1 mx-4 mt-4 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === "chat"
                  ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                  : "text-stone-500 hover:text-stone-300 hover:bg-white/[0.01] border border-transparent"
              }`}
            >
              <MessageSquare size={13} />
              Chat Feed
            </button>

            {/* AI Questions tab — interviewer only */}
            {isInterviewer && (
              <button
                type="button"
                onClick={() => setActiveTab("ai")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                  activeTab === "ai"
                    ? "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                    : "text-stone-500 hover:text-stone-300 hover:bg-white/[0.01] border border-transparent"
                }`}
              >
                <Sparkles size={13} />
                AI Console
              </button>
            )}
          </div>

          {/* Panel content area */}
          <div className="flex-1 min-h-0 overflow-hidden mt-4">
            {activeTab === "chat" ? (
              chatClient && chatChannel ? (
                <div className="h-full flex flex-col px-4 pb-4">
                  <Chat client={chatClient} theme="str-chat__theme-dark">
                    <Channel channel={chatChannel}>
                      <Window>
                        <MessageList />
                        <MessageComposer focus />
                      </Window>
                    </Channel>
                  </Chat>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <Loader2 size={18} className="text-stone-600 animate-spin" />
                  <p className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">Securing chat socket…</p>
                </div>
              )
            ) : (
              <div className="px-4 pb-4 h-full overflow-hidden">
                <AIQuestionsPanel categories={booking.categories} />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}