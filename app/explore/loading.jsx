export default function ExploreLoading() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      {/* Page Header Skeleton */}
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="h-3 w-16 rounded-full skeleton-gold mb-4" />
        <div className="h-10 w-80 rounded-xl skeleton mb-3" />
        <div className="h-4 w-64 rounded-lg skeleton" />
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-8">

          {/* Filters bar skeleton */}
          <div className="flex flex-col gap-4">
            {/* Search bar */}
            <div className="h-10 w-72 rounded-lg skeleton" />
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 rounded-lg skeleton"
                  style={{ width: `${60 + i * 8}px` }}
                />
              ))}
            </div>
          </div>

          {/* Result count placeholder */}
          <div className="h-3 w-28 rounded-full skeleton" />

          {/* Interviewer cards grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="glass rounded-[1.5rem] border-white/5 overflow-hidden"
              >
                {/* Card top: avatar + name */}
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full skeleton flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-32 rounded-lg skeleton" />
                      <div className="h-3 w-40 rounded-lg skeleton" />
                    </div>
                  </div>
                  {/* Category badges */}
                  <div className="flex gap-2 flex-wrap">
                    {[...Array(2)].map((_, j) => (
                      <div key={j} className="h-5 w-16 rounded-full skeleton-gold" />
                    ))}
                  </div>
                  {/* Bio lines */}
                  <div className="space-y-1.5">
                    <div className="h-3 w-full rounded-lg skeleton" />
                    <div className="h-3 w-4/5 rounded-lg skeleton" />
                  </div>
                </div>
                {/* Card footer */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
                  <div className="h-3 w-20 rounded-full skeleton" />
                  <div className="h-8 w-24 rounded-xl skeleton-gold" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
