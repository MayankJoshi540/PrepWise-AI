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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return interviewers;
  } catch (error) {
    console.error("Error fetching interviewers:", error);
    return [];
  }
}
