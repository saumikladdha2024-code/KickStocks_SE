import { SkeletonBlock } from "../common/Skeleton";

// Mirrors the loaded page layout (banner, score cards, market stats, AI
// insights, final score breakdown) so there's no layout shift when real data
// arrives. PriceChart isn't mirrored here — it mounts once /analyze resolves
// and manages its own loading skeleton independently via useHistory.
export default function AnalysisSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {/* Banner */}
      <div className="panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-10 w-10 rounded-full" />
            <div className="flex flex-col gap-2">
              <SkeletonBlock className="h-7 w-24" />
              <SkeletonBlock className="h-3 w-32" />
            </div>
          </div>
          <SkeletonBlock className="h-8 w-40" />
          <SkeletonBlock className="h-3 w-64" />
        </div>
        <SkeletonBlock className="h-[132px] w-[132px] rounded-full" />
      </div>

      {/* Score cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="panel flex flex-col gap-4 p-5">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-8 w-32" />
            <SkeletonBlock className="h-1.5 w-full rounded-full" />
          </div>
        ))}
      </div>

      {/* AI Explanation panel */}
      <div className="rounded-lg border border-base-border bg-base-panel p-6">
        <div className="flex items-center justify-between border-b border-base-border pb-4">
          <SkeletonBlock className="h-5 w-44" />
          <SkeletonBlock className="h-6 w-24 rounded-full" />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-5/6" />
        </div>
        <div className="mt-5 flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-3 w-full max-w-sm" />
          ))}
        </div>
        <SkeletonBlock className="mt-5 h-14 w-full rounded-md" />
      </div>

      {/* Market stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-[60px] rounded" />
        ))}
      </div>

      {/* AI insights */}
      <div className="panel flex flex-col gap-3 p-5">
        <SkeletonBlock className="h-5 w-32" />
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-3 w-full max-w-md" />
        ))}
      </div>

      {/* Final score breakdown */}
      <div className="flex flex-col gap-4">
        <SkeletonBlock className="h-5 w-48" />
        <SkeletonBlock className="h-64 w-full rounded-lg" />
      </div>
    </div>
  );
}
