"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function completeOnboarding(data) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const updatedUser = await db.user.update({
      where: { clerkUserId: userId },
      data: {
        role: data.role,
        ...(data.role === "INTERVIEWER" && {
          title: data.title,
          company: data.company,
          yearsExp: data.yearsExp,
          bio: data.bio,
          categories: data.categories,
        }),
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error completing onboarding:", error);
    throw new Error("Failed to complete onboarding");
  }
}
