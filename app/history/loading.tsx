import { HistoryChrome } from "./HistoryChrome";

export default function HistoryLoading() {
  return (
    <HistoryChrome>
      {/* Title + Stats skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="animate-pulse">
          <div className="h-9 w-64 bg-muted rounded mb-2" />
          <div className="h-5 w-80 bg-muted/70 rounded" />
        </div>

        <div className="bg-white px-4 py-2 rounded-lg border border-border shadow-sm flex gap-6 animate-pulse">
          <div className="flex flex-col">
            <div className="h-3 w-12 bg-muted/70 rounded mb-1" />
            <div className="h-6 w-16 bg-muted rounded" />
          </div>
          <div className="w-px bg-border" />
          <div className="flex flex-col">
            <div className="h-3 w-8 bg-muted/70 rounded mb-1" />
            <div className="h-6 w-8 bg-muted rounded" />
          </div>
        </div>
      </div>

      <div className="w-16 h-1 bg-accent mb-8" />

      {/* List skeleton */}
      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-border/60 bg-white shadow-sm flex items-center gap-4 animate-pulse"
          >
            <div className="w-12 h-12 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 bg-muted rounded" />
              <div className="h-4 w-64 bg-muted/70 rounded" />
            </div>
            <div className="hidden md:flex flex-col items-end gap-1">
              <div className="h-3 w-20 bg-muted/70 rounded" />
              <div className="h-3 w-16 bg-muted/70 rounded" />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="h-7 w-16 bg-muted rounded mb-1" />
                <div className="h-3 w-10 bg-muted/70 rounded" />
              </div>
              <div className="w-2 h-12 rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </HistoryChrome>
  );
}
