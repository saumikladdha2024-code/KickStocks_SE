// Loading skeleton primitives — a shimmering sweep on a dark panel,
// matched to the same radii/colors as the real content so layout doesn't jump.

export function SkeletonBlock({ className = "", style }) {
  return (
    <div className={`relative overflow-hidden rounded-sm bg-base-raised ${className}`} style={style}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

export function SkeletonText({ width = "100%", className = "" }) {
  return <SkeletonBlock className={`h-3 ${className}`} style={{ width }} />;
}

// Mirrors OpportunityCard's layout so the swap-in feels seamless.
export function OpportunityCardSkeleton() {
  return (
    <div className="panel flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <SkeletonBlock className="h-5 w-16" />
          <SkeletonBlock className="h-3 w-24" />
        </div>
        <SkeletonBlock className="h-6 w-14 rounded-full" />
      </div>
      <div className="flex items-center gap-4">
        <SkeletonBlock className="h-16 w-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-3/4" />
          <SkeletonBlock className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}

// Mirrors a single row of ScannerRankingsTable.
export function TableRowSkeleton() {
  return (
    <tr className="border-b border-base-border">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-4 py-3.5">
          <SkeletonBlock className="h-3.5 w-full max-w-[80px]" />
        </td>
      ))}
    </tr>
  );
}

export function SignalStripSkeleton() {
  return (
    <div className="flex items-center gap-8 px-4 py-2.5">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonBlock key={i} className="h-3.5 w-20 shrink-0" />
      ))}
    </div>
  );
}