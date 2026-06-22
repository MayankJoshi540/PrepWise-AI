import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAppointmentsForUser } from "@/actions/appointments";
import AppointmentsClient from "./AppointmentsClient";

export default async function MyAppointmentsPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const { role, appointments } = await getAppointmentsForUser();
  const userName = user.firstName || "Interviewer";

  return (
    <main className="min-h-screen bg-black pt-24 pb-12 relative overflow-hidden">
      <AppointmentsClient appointments={appointments} userRole={role} userName={userName} />
    </main>
  );
}