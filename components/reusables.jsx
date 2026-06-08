import { cn } from "@/lib/utils";

export const GrayTitle = ({ children, className = "" }) => (
  <span className={cn(
    "bg-linear-to-b from-white via-white to-white/60 bg-clip-text text-transparent font-bold tracking-tight",
    className
  )}>
    {children}
  </span>
);

export const GoldTitle = ({ children, className = "" }) => (
  <span className={cn(
    "text-gradient-gold font-serif italic font-normal tracking-tight",
    className
  )}>
    {children}
  </span>
);

export const DecorativeLine = () => (
  <div className="h-px w-32 bg-gradient-to-r from-amber-400/50 via-amber-400/10 to-transparent mb-12" />
);

export const SectionLabel = ({ children, className = "" }) => (
  <div className={cn("inline-flex items-center gap-3 mb-6 group", className)}>
    <span className="w-8 h-px bg-amber-400/40 group-hover:w-12 transition-all duration-500" />
    <span className="text-[10px] font-black text-amber-400/80 tracking-[0.3em] uppercase">
      {children}
    </span>
  </div>
);

export const SectionHeading = ({ gray, gold, description, className = "" }) => (
  <div className={cn("max-w-4xl space-y-6", className)}>
    <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.05em] text-white">
      <GrayTitle>{gray}</GrayTitle>
      {gold && <><br /><GoldTitle>{gold}</GoldTitle></>}
    </h2>
    {description && (
      <p className="text-lg md:text-xl text-white/40 font-medium leading-relaxed max-w-2xl">
        {description}
      </p>
    )}
  </div>
);
