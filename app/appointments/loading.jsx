export default function AppointmentsLoading() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col gap-6 relative z-10 pb-16">

        {/* Page header skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-3">
            <div className="h-12 w-72 rounded-xl skeleton" />
            <div className="h-4 w-96 rounded-lg skeleton" />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-10 w-32 rounded-xl skeleton" />
            <div className="h-10 w-32 rounded-xl skeleton" />
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="flex justify-start">
          <div className="h-12 w-full sm:w-[350px] rounded-full skeleton" />
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="glass rounded-[2rem] border-white/5 overflow-hidden flex flex-col"
            >
              {/* Card header */}
              <div className="p-6 flex items-start gap-4 border-b border-white/5">
                <div className="w-12 h-12 rounded-full skeleton flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 rounded-lg skeleton" />
                  <div className="h-3 w-44 rounded-lg skeleton" />
                </div>
                <div className="h-6 w-20 rounded-full skeleton-gold" />
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded skeleton" />
                  <div className="h-3 w-36 rounded-lg skeleton" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded skeleton" />
                  <div className="h-3 w-24 rounded-lg skeleton" />
                </div>
              </div>

              {/* Card footer */}
              <div className="px-6 pb-6 pt-2 flex gap-2">
                <div className="h-9 flex-1 rounded-xl skeleton" />
                <div className="h-9 flex-1 rounded-xl skeleton-gold" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
