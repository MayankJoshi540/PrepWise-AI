import { getInterviewers } from "@/actions/explore";
import { SectionHeading, SectionLabel } from "@/components/reusables";
import ExploreGrid from "./components/ExploreGrid";

export default async function ExplorePage() {
  const interviewers = await getInterviewers();

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      {/* Page header */}
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <SectionLabel>Explore</SectionLabel>
        <SectionHeading
          gray="Find your"
          gold="expert interviewer"
          description="Browse senior engineers from top companies."
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6">
        <ExploreGrid interviewers={interviewers} />
      </div>
    </main>
  );
}