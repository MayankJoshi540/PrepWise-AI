"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * Server Action to fetch the current authenticated user's database role.
 * Returing only the role field makes it lightweight and fast.
 */
export async function getDbUserRole() {
  try {
    const { userId } = await auth();
    if (!userId) return null;

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { role: true },
    });
    
    return user ? user.role : null;
  } catch (error) {
    console.error("Error in getDbUserRole server action:", error);
    return null;
  }
}
