import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAppointmentsForUser } from "@/actions/appointments";
import PageHeader from "@/components/reusables";
import AppointmentsClient from "./AppointmentsClient";

export default async function MyAppointmentsPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const { role, appointments } = await getAppointmentsForUser();

  const isInterviewer = role === "INTERVIEWER";

  return (
    <main className="min-h-screen bg-black pt-24">
      {/* ── Page header ── */}
      <PageHeader
        label={isInterviewer ? "Interviewer Portal" : "My appointments"}
        gray={isInterviewer ? "Your hosting" : "Your interview"}
        gold="sessions"
        description={
          isInterviewer
            ? "Manage and review all your scheduled candidate interviews and past session feedback reports."
            : "All your upcoming and past mock interviews in one place."
        }
      />

      <AppointmentsClient appointments={appointments} userRole={role} />
    </main>
  );
}