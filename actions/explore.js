"use server";

import { db } from "@/lib/prisma";

export async function getInterviewers() {
  try {
    const interviewers = await db.user.findMany({
      where: {
        role: "INTERVIEWER",
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        title: true,
        company: true,
        yearsExp: true,
        bio: true,
        categories: true,
        creditRate: true,
        availabilities: {
          select: {
            startTime: true,
            endTime: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return interviewers.map((i) => ({
      ...i,
      availabilities: i.availabilities.map((a) => ({
        ...a,
        startTime: a.startTime.toISOString(),
        endTime: a.endTime.toISOString(),
      })),
    }));
  } catch (error) {
    console.error("Error fetching interviewers:", error);
    return [];
  }
}
