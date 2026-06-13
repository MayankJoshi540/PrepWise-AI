'use client';

import * as React from "react";
import Image from "next/image";
import { LOGOS } from "@/lib/data";

export default function TrustSection() {
  return (
    <section className="relative py-24 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-16">
          Aspiring engineers land roles at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-30 hover:opacity-100 transition-opacity duration-1000">
           {LOGOS.slice(0, 6).map((logo) => (
             <div key={logo.alt} className="h-6 w-auto relative grayscale brightness-200">
               <Image src={logo.src} alt={logo.alt} width={100} height={30} className="object-contain" />
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
