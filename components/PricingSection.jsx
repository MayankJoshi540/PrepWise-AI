"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { CheckoutButton, SubscriptionDetailsButton } from "@clerk/nextjs/experimental";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/data";

const PLAN_RANK = {
  free: 0,
  starter: 1,
  pro: 2,
};

/**
 * HIGH-PRIORITY STACKING CONTEXT
 * Forces Clerk's portal to the absolute top of the viewport.
 * Standard z-index (9999) is sometimes insufficient for glass/filter layers.
 */
const CLERK_BILLING_APPEARANCE = {
  elements: {
    drawerRoot: {
      zIndex: 1000000, // Absolute top
    },
    drawerOverlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(10px)",
      zIndex: 999999,
    },
    drawerContent: {
      zIndex: 1000001,
      boxShadow: "0 0 100px rgba(0,0,0,0.5)",
    },
  },
};

export default function PricingSection() {
  const { isLoaded, userId, has } = useAuth();
  const [isBillingOpen, setIsBillingOpen] = useState(false);

  const isSignedIn = !!userId;

  // Plan Detection Logic
  const isOnPro = isSignedIn && has({ plan: "pro" });
  const isOnStarter = isSignedIn && has({ plan: "starter" });
  const isOnFree = isSignedIn && !isOnStarter && !isOnPro;

  const activePlanSlug = isOnPro
    ? "pro"
    : isOnStarter
    ? "starter"
    : isOnFree
    ? "free"
    : null;

  /**
   * PRO-GRADE MODAL MANAGEMENT
   * Detects the injection of the Clerk portal and locks the body scroll.
   * This prevents background content from sliding while the user checkouts.
   */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const portal = document.querySelector(".cl-billing-portal, .cl-checkout-drawer");
      const isOpen = !!portal;
      
      if (isOpen !== isBillingOpen) {
        setIsBillingOpen(isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
        // Optional: Add a slight scale to the body for depth
        // document.body.style.transition = "transform 0.3s ease";
        // document.body.style.transform = isOpen ? "scale(0.98)" : "scale(1)";
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      document.body.style.overflow = "";
    };
  }, [isBillingOpen]);

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[400px] bg-white/5 rounded-[2.5rem]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {PLANS.map((plan) => {
        const isActive = activePlanSlug === plan.slug;
        const isDowngrade = isSignedIn && activePlanSlug && PLAN_RANK[plan.slug] < PLAN_RANK[activePlanSlug];

        return (
          <div
            key={plan.name}
            className={`relative rounded-[3rem] p-10 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 ${
              plan.featured
                ? "bg-[#141417] border-2 border-amber-400/30 shadow-[0_20px_50px_rgba(248,184,31,0.05)]"
                : "bg-[#0f0f11] border border-white/5 hover:border-amber-400/20"
            } ${isActive ? "ring-2 ring-amber-400/50" : ""}`}
          >
            {plan.featured && !isActive && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-black tracking-widest uppercase px-5 py-1.5 rounded-full whitespace-nowrap shadow-[0_10px_30px_rgba(248,184,31,0.3)]">
                Most Popular
              </span>
            )}

            <p className="text-[10px] font-black text-stone-500 tracking-[0.2em] uppercase mb-6">
              {plan.name}
            </p>

            <div className="flex items-end gap-1.5 mb-2">
              <span className="font-black text-5xl leading-none tracking-tighter text-white">
                {plan.price}
              </span>
              <span className="text-xs text-stone-500 font-bold mb-1 tracking-widest uppercase">
                /mo
              </span>
            </div>

            <p className="text-[11px] font-black text-amber-400/80 tracking-widest uppercase mb-8">
              {plan.credits}
            </p>

            <div className="h-px bg-white/5 mb-8" />

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-stone-400 font-medium">
                  <div className="w-5 h-5 rounded-full bg-amber-400/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-amber-400 text-[10px]">✓</span>
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              {isActive ? (
                <Button
                  variant="outline"
                  disabled
                  className="w-full h-14 rounded-2xl opacity-40 cursor-not-allowed border-amber-400/20 text-amber-400 text-[11px] font-black uppercase tracking-widest"
                >
                  ✓ Current plan
                </Button>
              ) : isSignedIn ? (
                isDowngrade || (plan.planId === null && activePlanSlug !== "free") ? (
                  <SubscriptionDetailsButton appearance={CLERK_BILLING_APPEARANCE}>
                    <Button variant="outline" className="w-full h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">
                      {plan.planId === null ? "Downgrade to Free" : "Downgrade"}
                    </Button>
                  </SubscriptionDetailsButton>
                ) : plan.planId === null ? (
                  <Button variant="outline" disabled className="w-full h-14 rounded-2xl opacity-40 text-[11px] font-black uppercase tracking-widest">
                    Included
                  </Button>
                ) : (
                  <CheckoutButton
                    planId={plan.planId}
                    planPeriod="month"
                    appearance={CLERK_BILLING_APPEARANCE}
                  >
                    <Button
                      variant={plan.featured ? "gold" : "outline"}
                      className="w-full h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-[0_15px_30px_rgba(248,184,31,0.1)] hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      {activePlanSlug === "free" ? "Get started →" : "Upgrade →"}
                    </Button>
                  </CheckoutButton>
                )
              ) : (
                <SignInButton mode="modal">
                  <Button
                    variant={plan.featured ? "gold" : "outline"}
                    className="w-full h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all"
                  >
                    {plan.planId === null ? "Start Free →" : "Get started →"}
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
