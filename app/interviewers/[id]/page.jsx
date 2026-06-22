import { currentUser } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/prisma";
import { getInterviewerProfile } from "@/actions/booking";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GrayTitle, GoldTitle, SectionLabel } from "@/components/reusables";
import SlotPicker from "./_components/SlotPicker";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABEL, EXPECT_ITEMS } from "@/lib/data";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animate-ui/FadeIn";

export default async function InterviewerProfilePage({ params }) {
  const { id } = await params;

  const user = await currentUser();
  if (!user) redirect("/");

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
    select: { role: true, credits: true },
  });

  if (!dbUser) redirect("/");
  if (dbUser.role === "UNASSIGNED") redirect("/onboarding");

  const interviewer = await getInterviewerProfile(id);

  if (!interviewer) notFound();

  // Use a sleek, abstract generated pattern for the placeholder instead of a fake face
  const fallbackImage = `https://api.dicebear.com/9.x/glass/svg?seed=${interviewer.id}&backgroundColor=111113`;

  return (
    <main className="bg-black min-h-screen pb-24 relative w-full">
      {/* ── Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none h-full">
        <StarsBackground factor={0.03} speed={60} pointerEvents={false} className="h-full w-full absolute top-0 left-0" />
        <div className="absolute top-0 inset-x-0 h-screen bg-[radial-gradient(circle_at_50%_20%,rgba(248,184,31,0.08)_0%,transparent_50%)]" />
      </div>

       {/* ── Hero identity banner ── */}
      <section className="relative z-10 border-b border-white/5 overflow-hidden">
        <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16">
          <Link href="/explore">
            <Button variant="ghost" className="mb-10 -ml-4 text-white/40 hover:text-amber-400 hover:bg-amber-400/10 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Explore
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-end">
            <Avatar className="h-28 w-28 md:h-40 md:w-40 border border-white/10 shadow-2xl rounded-full overflow-hidden bg-black ring-4 ring-black">
              <AvatarImage src={interviewer.imageUrl || fallbackImage} className="object-cover rounded-full" />
              <AvatarFallback className="text-4xl bg-stone-900 text-stone-500 font-serif rounded-full">
                {interviewer.name?.charAt(0) || "I"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {interviewer.categories?.map((cat) => (
                  <Badge key={cat} className="glass text-amber-400 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-black hover:border-amber-400/30 transition-all">
                    {CATEGORY_LABEL[cat] || cat}
                  </Badge>
                ))}
              </div>
              <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[0.9] tracking-tight text-white mb-2">
                <GrayTitle>{interviewer.name}</GrayTitle>
              </h1>
              <p className="text-lg md:text-xl text-white/60 font-medium">
                {interviewer.title} <span className="text-amber-400/40 mx-2">@</span> <GoldTitle>{interviewer.company}</GoldTitle>
              </p>
            </div>
            
            <div className="glass p-6 rounded-[2rem] flex flex-col items-center justify-center min-w-[140px] border-white/5 hover:border-amber-400/20 transition-all duration-500">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-2">Experience</span>
              <span className="text-4xl font-black text-amber-400 tracking-tighter">{interviewer.yearsExp}<span className="text-xl text-amber-400/50 ml-1">yrs</span></span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Main content grid ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        <div className="lg:col-span-2 space-y-20">
          {/* About section */}
          <FadeIn delay={0.1}>
            <section>
              <SectionLabel>About Me</SectionLabel>
              <h2 className="mb-8 text-3xl font-black tracking-tight text-white">
                Professional <GoldTitle>Background</GoldTitle>
              </h2>
              <div className="glass p-10 rounded-[2.5rem] border-white/5">
                <p className="text-white/60 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium">
                  {interviewer.bio || "No bio provided."}
                </p>
              </div>
            </section>
          </FadeIn>

          {/* What to expect */}
          <FadeIn delay={0.2}>
            <section>
              <SectionLabel>The Experience</SectionLabel>
              <h2 className="mb-8 text-3xl font-black tracking-tight text-white">
                What to <GoldTitle>Expect</GoldTitle>
              </h2>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {EXPECT_ITEMS.map((item, idx) => (
                  <StaggerItem key={idx} className="glass p-8 rounded-[2rem] border-white/5 hover:border-amber-400/20 transition-all duration-500 group">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                      {item[0]}
                    </div>
                    <h3 className="text-lg font-black text-white mb-3 tracking-tight">{item[1]}</h3>
                    <p className="text-sm font-medium text-white/40 leading-relaxed">{item[2]}</p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>
          </FadeIn>
        </div>

        {/* Sidebar / Booking panel */}
        <FadeIn delay={0.3} className="lg:col-span-1 flex justify-center lg:block">
          <div className="sticky top-28 origin-top transform scale-[0.85] md:scale-95 mx-auto w-full max-w-[400px] lg:max-w-none lg:-ml-2 xl:-ml-4">
            <SlotPicker
              interviewer={interviewer}
              interviewerCredits={interviewer.creditRate || 1}
              userCredits={dbUser.credits}
            />
          </div>
        </FadeIn>
      </div>
    </main>
  );
}