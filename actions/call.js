"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { StreamClient } from "@stream-io/node-sdk";

export const getCallData = async (callId) => {
  if (!callId) return { error: "Call not found" };

  const user = await currentUser();
  if (!user) return { error: "Unauthorized" };

  const booking = await db.booking.findUnique({
    where: { streamCallId: callId },
    include: {
      interviewer: {
        select: {
          id: true,
          clerkUserId: true,
          name: true,
          imageUrl: true,
          categories: true,
        },
      },
      interviewee: {
        select: {
          id: true,
          clerkUserId: true,
          name: true,
          imageUrl: true,
        },
      },
    },
  });

  if (!booking) return { error: "Call not found" };

  const isInterviewer = booking.interviewer.clerkUserId === user.id;
  const isInterviewee = booking.interviewee.clerkUserId === user.id;
  if (!isInterviewer && !isInterviewee) return { error: "Forbidden" };

  const streamClient = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_SECRET_KEY
  );

  const token = streamClient.generateUserToken({
    user_id: user.id,
    validity_in_seconds: 60 * 60,
  });

  return {
    token,
    isInterviewer,
    currentUser: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(),
      imageUrl: user.imageUrl,
    },
    booking: {
      id: booking.id,
      interviewer: booking.interviewer,
      interviewee: booking.interviewee,
      categories: booking.interviewer.categories || ["SYSTEM_DESIGN", "BEHAVIORAL"],
      startTime: booking.startTime.toISOString(),
      endTime: booking.endTime.toISOString(),
    },
  };
};

export const setupDeveloperTestCall = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!dbUser) throw new Error("User not found in database");

  // Define dummy counterpart info
  let counterpartClerkId, counterpartEmail, counterpartName, counterpartRole;
  if (dbUser.role === "INTERVIEWEE") {
    counterpartClerkId = "dummy_interviewer_id";
    counterpartEmail = "dummy_interviewer@prepwise.ai";
    counterpartName = "Senior Architect (Mock Advisor)";
    counterpartRole = "INTERVIEWER";
  } else {
    counterpartClerkId = "dummy_interviewee_id";
    counterpartEmail = "dummy_interviewee@prepwise.ai";
    counterpartName = "Candidate (Mock Student)";
    counterpartRole = "INTERVIEWEE";
  }

  // Find or create dummy counterpart in DB
  let counterpart = await db.user.findUnique({
    where: { clerkUserId: counterpartClerkId },
  });

  if (!counterpart) {
    counterpart = await db.user.create({
      data: {
        clerkUserId: counterpartClerkId,
        email: counterpartEmail,
        name: counterpartName,
        role: counterpartRole,
        imageUrl: `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(counterpartName)}&backgroundColor=111113`,
        credits: 100,
        categories: ["SYSTEM_DESIGN", "BEHAVIORAL", "FRONTEND", "BACKEND"]
      },
    });
  }

  // Check if a scheduled test booking already exists to reuse
  let booking = await db.booking.findFirst({
    where: {
      OR: [
        { intervieweeId: dbUser.id, interviewerId: counterpart.id },
        { intervieweeId: counterpart.id, interviewerId: dbUser.id }
      ],
      status: "SCHEDULED",
      streamCallId: { not: null }
    }
  });

  if (booking) {
    return { success: true, streamCallId: booking.streamCallId };
  }

  // Create new Stream Call
  const streamClient = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_SECRET_KEY
  );

  const intervieweeUser = dbUser.role === "INTERVIEWEE" ? dbUser : counterpart;
  const interviewerUser = dbUser.role === "INTERVIEWER" ? dbUser : counterpart;

  // Upsert users to Stream
  await streamClient.upsertUsers([
    {
      id: intervieweeUser.clerkUserId,
      name: intervieweeUser.name ?? "Interviewee",
      image: intervieweeUser.imageUrl ?? undefined,
      role: "user",
    },
    {
      id: interviewerUser.clerkUserId,
      name: interviewerUser.name ?? "Interviewer",
      image: interviewerUser.imageUrl ?? undefined,
      role: "user",
    },
  ]);

  const streamCallId = `devtest_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const call = streamClient.video.call("default", streamCallId);

  await call.getOrCreate({
    data: {
      created_by_id: intervieweeUser.clerkUserId,
      members: [
        { user_id: intervieweeUser.clerkUserId, role: "user" },
        { user_id: interviewerUser.clerkUserId, role: "host" },
      ],
      settings_override: {
        recording: { mode: "available", quality: "1080p" },
        screensharing: { enabled: true },
        transcription: { mode: "auto-on" },
      },
    },
  });

  // Create Booking in DB
  await db.booking.create({
    data: {
      intervieweeId: intervieweeUser.id,
      interviewerId: interviewerUser.id,
      startTime: new Date(),
      endTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour duration
      status: "SCHEDULED",
      creditsCharged: 0,
      streamCallId,
    },
  });

  return { success: true, streamCallId };
};