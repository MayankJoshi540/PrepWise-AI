export default function OnboardingLoading() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col gap-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="h-3 w-20 rounded-full skeleton-gold mx-auto mb-4" />
          <div className="h-10 w-72 rounded-xl skeleton mx-auto" />
          <div className="h-4 w-80 rounded-lg skeleton mx-auto" />
        </div>

        {/* Card */}
        <div className="glass rounded-[2.5rem] border-white/5 p-10 flex flex-col gap-8">

          {/* Role selection */}
          <div className="space-y-4">
            <div className="h-3 w-24 rounded-full skeleton" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="glass rounded-2xl border-white/5 p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl skeleton" />
                  <div className="h-4 w-28 rounded-lg skeleton" />
                  <div className="h-3 w-full rounded-lg skeleton" />
                  <div className="h-3 w-4/5 rounded-lg skeleton" />
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Form fields */}
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 rounded-full skeleton" />
                <div className="h-11 w-full rounded-xl skeleton" />
              </div>
            ))}
          </div>

          {/* Submit button */}
          <div className="h-12 w-full rounded-xl skeleton-gold mt-2" />
        </div>

      </div>
    </main>
  );
}
