export const GrayTitle = ({ children }) => (
  <span className="bg-linear-to-b from-white via-white to-stone-400 bg-clip-text text-transparent">
    {children}
  </span>
);
export const GoldTitle = ({ children }) => (
  <span className="bg-linear-to-b from-[#f8b81f] via-[#ffc73c] to-[#c79116] bg-clip-text text-transparent">
    {children}
  </span>
);
export const DecorativeLine = () => (
  <div className="h-px w-24 bg-white/20 mb-8" />
);
export const SectionLabel = ({ children }) => (
  <p className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 tracking-[0.14em] uppercase mb-4">
    <span className="w-4 h-px bg-white/40" />
    {children}
  </p>
);
export const SectionHeading = ({ gray, gold }) => (
  <h2
    className={`font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.025em]`}
  >
    <GrayTitle>{gray}</GrayTitle>
    <br />
    <GoldTitle>{gold}</GoldTitle>
  </h2>
);
