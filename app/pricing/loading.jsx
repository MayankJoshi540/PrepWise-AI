export default function PricingLoading() {
  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Hero section skeleton */}
      <section className="pt-40 pb-20 flex flex-col items-center text-center px-4 gap-6">
        <div className="h-3 w-24 rounded-full skeleton-gold" />
        <div className="h-14 w-96 rounded-2xl skeleton" />
        <div className="h-14 w-80 rounded-2xl skeleton" />
        <div className="h-4 w-96 rounded-lg skeleton" />
        {/* Toggle */}
        <div className="h-11 w-52 rounded-full skeleton mt-4" />
      </section>

      {/* Pricing cards skeleton */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`glass rounded-[2.5rem] border-white/5 p-8 flex flex-col gap-6 ${
                i === 1 ? "border-amber-400/20 md:scale-105" : ""
              }`}
            >
              {/* Plan name + badge */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-24 rounded-lg skeleton" />
                {i === 1 && (
                  <div className="h-5 w-16 rounded-full skeleton-gold" />
                )}
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="h-10 w-28 rounded-xl skeleton" />
                <div className="h-3 w-16 rounded-lg skeleton" />
              </div>

              <div className="h-px bg-white/5" />

              {/* Features */}
              <div className="flex flex-col gap-3">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full skeleton-gold flex-shrink-0" />
                    <div
                      className="h-3 rounded-lg skeleton"
                      style={{ width: `${55 + j * 8}%` }}
                    />
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div
                className={`h-12 w-full rounded-xl mt-auto ${
                  i === 1 ? "skeleton-gold" : "skeleton"
                }`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ section skeleton */}
      <section className="max-w-3xl mx-auto px-4 md:px-6 pb-32">
        <div className="h-8 w-48 rounded-xl skeleton mx-auto mb-10" />
        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="glass rounded-2xl border-white/5 px-6 py-5 flex items-center justify-between"
            >
              <div className="h-4 w-72 rounded-lg skeleton" />
              <div className="w-5 h-5 rounded-full skeleton flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
