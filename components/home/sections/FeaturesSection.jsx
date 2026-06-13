'use client';

import * as React from "react";
import FeatureNarrativeBlock from "../Features/FeatureNarrativeBlock";
import SessionVisual from "../Features/SessionVisual";
import ReportVisual from "../Features/ReportVisual";
import AnalyticsVisual from "../Features/AnalyticsVisual";

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 space-y-48">
      
      {/* Narrative Block 1 */}
      <FeatureNarrativeBlock
        label="The Engine"
        gray="Role-Specific"
        gold="Intelligent Coaching."
        desc="Stop practicing generic questions. Our engine adapts to your target role, level, and company, generating dynamic scenarios that test your limits."
        visual={<SessionVisual />}
      />

      {/* Narrative Block 2 */}
      <FeatureNarrativeBlock
        reversed
        label="The Insight"
        gray="Deep Technical"
        gold="Analysis Reports."
        desc="Get detailed scorecards after every session. We analyze your technical depth, communication clarity, and problem-solving strategies using FAANG rubrics."
        visual={<ReportVisual />}
      />

      {/* Narrative Block 3 */}
      <FeatureNarrativeBlock
        label="The Roadmap"
        gray="Data-Driven"
        gold="Success Paths."
        desc="Track your progress with visual analytics. Identify weak spots, monitor hiring readiness, and know exactly when you're ready for the real thing."
        visual={<AnalyticsVisual />}
      />

    </section>
  );
}
