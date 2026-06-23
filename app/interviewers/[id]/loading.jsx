export default function InterviewerProfileLoading() {
  return (
    <main className="bg-black min-h-screen pb-24 relative w-full">

      {/* ── Hero identity banner skeleton ── */}
      <section className="relative z-10 border-b border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16">
          {/* Back button */}
          <div className="h-9 w-36 rounded-xl skeleton mb-10" />

          <div className="flex flex-col md:flex-row gap-10 items-start md:items-end">
            {/* Avatar */}
            <div className="h-28 w-28 md:h-40 md:w-40 rounded-full skeleton flex-shrink-0" />

            {/* Name + title block */}
            <div className="flex-1 pb-2 space-y-4">
              {/* Category badges */}
              <div className="flex gap-3 flex-wrap">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 w-20 rounded-full skeleton-gold" />
                ))}
              </div>
              <div className="h-14 w-64 rounded-xl skeleton" />
              <div className="h-5 w-48 rounded-lg skeleton" />
            </div>

            {/* Experience badge */}
            <div className="glass p-6 rounded-[2rem] flex flex-col items-center justify-center min-w-[140px] border-white/5">
              <div className="h-3 w-20 rounded-full skeleton mb-3" />
              <div className="h-10 w-16 rounded-xl skeleton-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content grid skeleton ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

        {/* Left column: About + What to expect */}
        <div className="lg:col-span-2 space-y-20">

          {/* About section */}
          <section>
            <div className="h-3 w-16 rounded-full skeleton-gold mb-4" />
            <div className="h-8 w-64 rounded-xl skeleton mb-8" />
            <div className="glass p-10 rounded-[2.5rem] border-white/5 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 rounded-lg skeleton"
                  style={{ width: `${100 - i * 7}%` }}
                />
              ))}
            </div>
          </section>

          {/* What to expect */}
          <section>
            <div className="h-3 w-24 rounded-full skeleton-gold mb-4" />
            <div className="h-8 w-48 rounded-xl skeleton mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="glass p-8 rounded-[2rem] border-white/5">
                  <div className="w-12 h-12 rounded-2xl skeleton mb-6" />
                  <div className="h-5 w-32 rounded-lg skeleton mb-3" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-full rounded-lg skeleton" />
                    <div className="h-3 w-4/5 rounded-lg skeleton" />
                    <div className="h-3 w-3/5 rounded-lg skeleton" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column: Slot picker skeleton */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 glass rounded-[2.5rem] border-white/5 p-8 flex flex-col gap-6">
            <div className="h-6 w-36 rounded-lg skeleton" />
            <div className="h-px bg-white/5" />
            {/* Month nav */}
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 rounded-lg skeleton" />
              <div className="h-4 w-28 rounded-lg skeleton" />
              <div className="h-8 w-8 rounded-lg skeleton" />
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {[...Array(35)].map((_, i) => (
                <div key={i} className="aspect-square rounded-lg skeleton" />
              ))}
            </div>
            <div className="h-px bg-white/5" />
            {/* Time slots */}
            <div className="grid grid-cols-2 gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-9 rounded-xl skeleton" />
              ))}
            </div>
            <div className="h-12 w-full rounded-xl skeleton-gold mt-2" />
          </div>
        </div>

      </div>
    </main>
  );
}
