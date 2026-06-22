import { getInterviewerDashboardData } from "@/actions/interviewer";
import InterviewerDashboard from "./_components/InterviewerDashboard";
import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";

export default async function AppointmentsPage() {
  const user = await checkUser();
  if (!user) redirect("/");
  
  if (user.role === "UNASSIGNED") redirect("/onboarding");
  if (user.role === "INTERVIEWEE") redirect("/dashboard");

  let interviewer;
  try {
    interviewer = await getInterviewerDashboardData();
  } catch (err) {
    console.error("Failed to load interviewer dashboard data:", err);
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-black relative overflow-x-hidden pt-28 pb-20">
      {/* Background Grids & Accent Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-amber-500/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[650px] h-[650px] bg-amber-600/[0.015] rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <InterviewerDashboard interviewer={interviewer} />
      </div>
    </main>
  );
}
