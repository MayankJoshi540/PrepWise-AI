"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getInterviewerDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      availabilities: {
        take: 1,
      },
      bookingsAsInterviewer: {
        include: {
          interviewee: {
            select: {
              name: true,
              email: true,
              imageUrl: true,
            },
          },
        },
        orderBy: {
          startTime: "asc",
        },
      },
    },
  });

  if (!user || user.role !== "INTERVIEWER") {
    throw new Error("Interviewer profile not found");
  }

  return user;
}

export async function updateInterviewerProfile(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.update({
    where: { clerkUserId: userId },
    data: {
      title: data.title,
      company: data.company,
      yearsExp: Number(data.yearsExp),
      bio: data.bio,
      categories: data.categories,
      creditRate: Number(data.creditRate),
    },
  });

  revalidatePath("/appointments");
  revalidatePath(`/interviewers/${user.id}`);
  return user;
}

export async function updateInterviewerAvailability(startTimeStr, endTimeStr) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  // Create date objects using a dummy date with the selected hours/minutes
  const [startHour, startMin] = startTimeStr.split(":").map(Number);
  const [endHour, endMin] = endTimeStr.split(":").map(Number);

  const dummyDate = new Date();
  const startTime = new Date(new Date(dummyDate).setHours(startHour, startMin, 0, 0));
  const endTime = new Date(new Date(dummyDate).setHours(endHour, endMin, 0, 0));

  // Delete existing and create new
  await db.availability.deleteMany({
    where: { interviewerId: user.id },
  });

  const availability = await db.availability.create({
    data: {
      interviewerId: user.id,
      startTime,
      endTime,
      status: "AVAILABLE",
    },
  });

  revalidatePath("/appointments");
  revalidatePath(`/interviewers/${user.id}`);
  return availability;
}
