"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const getAppointmentsForUser = async () => {
  const user = await currentUser();
  if (!user) return { role: null, appointments: [] };

  const dbUser = await db.user.findUnique({ where: { clerkUserId: user.id } });
  if (!dbUser) return { role: null, appointments: [] };

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

  return { role, appointments };
};