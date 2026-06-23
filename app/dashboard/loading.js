export default function DashboardLoading() {
  return (
    <div className="container mx-auto py-28 px-4 md:px-6">
      <div className="flex flex-col gap-10">

        {/* Welcome Section Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="h-12 w-72 rounded-xl skeleton" />
            <div className="h-4 w-96 rounded-lg skeleton" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-32 rounded-xl skeleton" />
            <div className="h-12 w-36 rounded-xl skeleton-gold" />
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="glass p-8 rounded-[2.5rem] border-white/5 h-44 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="h-3 w-28 rounded-full skeleton" />
              <div className="h-10 w-16 rounded-xl skeleton" />
            </div>
          ))}
        </div>

        {/* Dashboard Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Upcoming Sessions Skeleton */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="h-6 w-44 rounded-lg skeleton" />
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="glass p-6 rounded-2xl border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-full skeleton flex-shrink-0" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 rounded-lg skeleton" />
                      <div className="h-3 w-48 rounded-lg skeleton" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="space-y-1.5">
                      <div className="h-3 w-24 rounded-lg skeleton" />
                      <div className="h-3 w-16 rounded-lg skeleton" />
                    </div>
                    <div className="h-8 w-20 rounded-lg skeleton-gold" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tools Panel Skeleton */}
          <div className="flex flex-col gap-6">
            <div className="h-6 w-24 rounded-lg skeleton" />
            <div className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-6">
              <div className="space-y-2">
                <div className="h-4 w-36 rounded-lg skeleton" />
                <div className="h-3 w-full rounded-lg skeleton" />
                <div className="h-3 w-4/5 rounded-lg skeleton" />
              </div>
              <div className="h-px bg-white/5" />
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-white/5 skeleton"
                  >
                    <div className="h-4 w-40 rounded-lg" />
                    <div className="h-3 w-full rounded-lg mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
