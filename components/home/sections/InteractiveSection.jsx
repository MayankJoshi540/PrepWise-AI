'use client';

import * as React from "react";
import { SectionLabel, SectionHeading } from "@/components/reusables";
import LiveQuestionGenerator from "../Interactive/LiveQuestionGenerator";
import ScoreSimulator from "../Interactive/ScoreSimulator";
import FeedbackPlayground from "../Interactive/FeedbackPlayground";
import RoadmapExplorer from "../Interactive/RoadmapExplorer";

export default function InteractiveSection() {
  return (
    <section id="interactive" className="relative py-32 overflow-hidden bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-24 space-y-6">
          <SectionLabel>Interactive Showcase</SectionLabel>
          <SectionHeading 
            gray="Experience the future of" 
            gold="Preparation." 
            className="mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
           <LiveQuestionGenerator />
           <ScoreSimulator />
           <FeedbackPlayground />
           <RoadmapExplorer />
        </div>
      </div>
    </section>
  );
}
