'use client';

import * as React from "react";
import { useScroll } from "motion/react";
import { 
  HeroSection, 
  TrustSection, 
  InteractiveSection, 
  FeaturesSection, 
  CTASection, 
  Footer 
} from "@/components/home";

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
      <Footer />
    </div>
  );
}
