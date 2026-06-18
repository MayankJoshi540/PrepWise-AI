import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";

export default async function OnboardingPage() {
  const user = await checkUser();

  // If user is not synced or not signed in, they will be caught by proxy.js.
  // But as a fallback, if no user is found, redirect to home.
  if (!user) {
    redirect("/");
  }

  // Redirect if they are already onboarded
  if (user.role === "INTERVIEWEE") {
    redirect("/dashboard");
  } else if (user.role === "INTERVIEWER") {
    redirect("/explore");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-24 flex flex-col items-center">
      <OnboardingForm />
    </main>
  );
}
