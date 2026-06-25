import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAppointmentsForUser } from "@/actions/appointments";
import AppointmentsClient from "./AppointmentsClient";
import { db } from "@/lib/prisma";

export default async function MyAppointmentsPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const { role, appointments } = await getAppointmentsForUser();
  const userName = user.firstName || "Interviewer";

  let dbUser = null;
  if (role === "INTERVIEWER") {
    dbUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
      include: {
        availabilities: true,
      },
    });
  }

  return (
    <main className="min-h-screen bg-black pt-24 pb-12 relative overflow-hidden">
      <AppointmentsClient 
        appointments={appointments} 
        userRole={role} 
        userName={userName} 
        dbUser={dbUser}
      />
    </main>
  );
}