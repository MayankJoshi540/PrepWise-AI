"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const getAppointmentsForUser = async () => {
  const user = await currentUser();
  if (!user) return { role: null, appointments: [], dbUser: null };

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
    include: {
      availabilities: true,
    },
  });

  if (!dbUser) return { role: null, appointments: [], dbUser: null };

  const role = dbUser.role;

  const appointments = await db.booking.findMany({
    where: role === "INTERVIEWER" ? { interviewerId: dbUser.id } : { intervieweeId: dbUser.id },
    include: {
      interviewer: {
        select: {
          name: true,
          imageUrl: true,
          email: true,
          title: true,
          company: true,
          categories: true,
        },
      },
      interviewee: {
        select: {
          name: true,
          imageUrl: true,
          email: true,
        },
      },
      feedback: true,
    },
    orderBy: { startTime: "desc" },
  });

  // Serialize User dates
  const serializedUser = {
    ...dbUser,
    createdAt: dbUser.createdAt?.toISOString() || null,
    updatedAt: dbUser.updatedAt?.toISOString() || null,
    creditsLastAllocatedAt: dbUser.creditsLastAllocatedAt?.toISOString() || null,
    availabilities: dbUser.availabilities?.map(av => ({
      ...av,
      startTime: av.startTime.toISOString(),
      endTime: av.endTime.toISOString(),
    })) || [],
  };

  // Serialize Booking and Feedback dates
  const serializedAppointments = appointments.map(apt => ({
    ...apt,
    startTime: apt.startTime.toISOString(),
    endTime: apt.endTime.toISOString(),
    createdAt: apt.createdAt.toISOString(),
    updatedAt: apt.updatedAt.toISOString(),
    feedback: apt.feedback ? {
      ...apt.feedback,
      createdAt: apt.feedback.createdAt.toISOString(),
    } : null,
  }));

  return { role, appointments: serializedAppointments, dbUser: serializedUser };
};