import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-black">
      <section className="relative min-h-screen overflow-hidden bg-black">
        <StarsBackground
          factor={0.03}
          speed={110}
          pointerEvents={false}
          className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_50%_88%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(ellipse_at_bottom,_#222222_0%,_#090909_42%,_#000000_100%)]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.18)_100%)]" />
        <div className="pointer-events-none relative z-10 min-h-screen">
          <h1 className="sr-only">PrepWise AI</h1>
        </div>
      </section>
    </div>
  );
}
