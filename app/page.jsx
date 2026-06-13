'use client';

import * as React from "react";
import { useScroll } from "motion/react";
import { 
  HeroSection, 
  TrustSection, 
  InteractiveSection, 
  FeaturesSection, 
  CTASection 
} from "@/components/home";
import { SectionHeading, SectionLabel } from "@/components/reusables";

/**
 * HOME PAGE - ELITE REDESIGN
 */
export default function Home() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative w-full bg-black">
      <HeroSection />
      <TrustSection />
      <InteractiveSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
