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
import { MessageSquare, Sparkles, Loader2, X } from "lucide-react";
import AIQuestionsPanel from "./AIQuestions";
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

  // ── Chat client — same token works for both Video + Chat SDKs ──
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
      <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center gap-3">
        <p className="text-stone-400 text-sm">Leaving call…</p>
      </div>
    );
  }

  return (
    <div className="min-h-[92vh] bg-[#0a0a0b] flex flex-col overflow-hidden relative">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
          <Badge
            variant="outline"
            className="border-white/10 text-stone-500 text-[10px] md:text-xs truncate max-w-[150px] md:max-w-none"
          >
            {booking.interviewer.name}
            <span className="text-stone-700 mx-1 md:mx-1.5">×</span>
            {booking.interviewee.name}
          </Badge>
          {isInterviewer && (
            <Badge
              variant="outline"
              className="border-amber-400/20 bg-amber-400/5 text-amber-400 text-[10px] md:text-xs shrink-0"
            >
              Interviewer
            </Badge>
          )}
        </div>

        {/* Toggle Panel Button */}
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="flex items-center gap-1 md:gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] md:text-xs font-medium text-stone-300 transition-colors cursor-pointer shrink-0"
        >
          <MessageSquare size={12} className={showPanel ? "text-[#f8b81f]" : ""} />
          <span>{showPanel ? "Hide Panel" : "Show Panel"}</span>
        </button>
      </div>

      {/* Body: video + side panel */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-0 relative">
        {/* ── LEFT: Video ── */}
        <div className="flex flex-col flex-1 min-w-0 h-full relative">
          <StreamTheme>
            <SpeakerLayout participantBarPosition="bottom" />
            <CallControls onLeave={handleLeave} />
          </StreamTheme>
        </div>

        {/* Scrim Overlay for mobile when panel is open */}
        {showPanel && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setShowPanel(false)}
          />
        )}

        {/* ── RIGHT: Chat / AI panel (Sidebar on desktop, slide-out overlay on mobile) ── */}
        {showPanel && (
          <div className="fixed inset-y-0 right-0 z-50 w-[85vw] max-w-[340px] flex flex-col border-l border-white/8 bg-[#0a0a0b] shadow-[0_0_50px_rgba(0,0,0,0.85)] lg:static lg:w-[340px] lg:inset-auto lg:z-0 lg:shadow-none lg:border-t-0 lg:border-l">
            {/* Panel Mobile Header */}
            <div className="flex lg:hidden items-center justify-between px-4 py-3 border-b border-white/8 shrink-0">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles size={12} />
                Session Panel
              </span>
              <button 
                onClick={() => setShowPanel(false)}
                className="text-stone-400 hover:text-white p-1 rounded bg-white/5 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
            {/* Tab switcher */}
            <div className="flex border-b border-white/8 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors ${
                  activeTab === "chat"
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                <MessageSquare size={13} />
                Chat
              </button>

              {/* AI Questions tab — interviewer only */}
              {isInterviewer && (
                <button
                  type="button"
                  onClick={() => setActiveTab("ai")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors ${
                    activeTab === "ai"
                      ? "text-amber-400 border-b-2 border-amber-400"
                      : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  <Sparkles size={13} />
                  AI Questions
                </button>
              )}
            </div>

            {/* Panel content */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {activeTab === "chat" ? (
                chatClient && chatChannel ? (
                  <Chat client={chatClient} theme="str-chat__theme-dark">
                    <Channel channel={chatChannel}>
                      <Window>
                        <MessageList />
                        <MessageComposer focus />
                      </Window>
                    </Channel>
                  </Chat>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 size={18} className="text-stone-600 animate-spin" />
                  </div>
                )
              ) : (
                <div className="p-4 h-full overflow-y-auto">
                  <AIQuestionsPanel categories={booking.categories} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}