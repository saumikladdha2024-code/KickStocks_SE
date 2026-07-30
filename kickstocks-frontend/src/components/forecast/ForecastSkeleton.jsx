import { SkeletonBlock } from "../common/Skeleton";

export default function ForecastSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <div className="panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-9 w-24" />
            <SkeletonBlock className="h-6 w-32 rounded-full" />
          </div>
          <SkeletonBlock className="h-3 w-48" />
          <SkeletonBlock className="h-12 w-40" />
        </div>
        <div className="flex flex-col gap-2.5">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-6 w-32" />
          <SkeletonBlock className="h-4 w-40" />
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-col gap-4">
        <SkeletonBlock className="h-5 w-48" />
        <SkeletonBlock className="h-[296px] w-full rounded-lg" />
      </div>

      {/* Table */}
      <div className="flex flex-col gap-4">
        <SkeletonBlock className="h-5 w-36" />
        <div className="panel overflow-hidden">
          <div className="border-b border-base-border bg-base-raised/40 px-4 py-3">
            <div className="flex gap-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-3 w-16" />
              ))}
            </div>
          </div>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex gap-8 border-b border-base-border/60 px-4 py-3.5 last:border-0">
              {Array.from({ length: 5 }).map((_, j) => (
                <SkeletonBlock key={j} className="h-3.5 w-16" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Commentary */}
      <div className="rounded-lg border border-base-border bg-base-panel p-6">
        <div className="flex items-center justify-between border-b border-base-border pb-4">
          <SkeletonBlock className="h-5 w-48" />
          <SkeletonBlock className="h-6 w-28 rounded-full" />
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-3 w-full max-w-lg" />
          ))}
        </div>
        <SkeletonBlock className="mt-5 h-16 w-full rounded-md" />
      </div>
    </div>
  );
}