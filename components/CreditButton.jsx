"use client";

import { useState } from "react";
import { Coins } from "lucide-react";
import UpgradeModal from "./UpgradeModal";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function CreditButton({ role, credits, className }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (role === "INTERVIEWER") {
      window.location.href = "/dashboard";
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "border-amber-400/20 text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 hover:border-amber-400/40 font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer gap-2",
          className
        )}
        onClick={handleClick}
      >
        <Coins size={14} className="animate-pulse text-amber-400" />
        <span>
          {credits} {role === "INTERVIEWER" ? "Earned" : "Credits"}
        </span>
      </Button>

      <UpgradeModal open={open} onOpenChange={setOpen} />
    </>
  );
}