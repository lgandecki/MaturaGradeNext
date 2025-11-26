export default function HistoryLoading() {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-5xl mx-auto relative">
      <div className="fixed inset-0 pointer-events-none opacity-30 z-[-1] bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.15),transparent_50%)]" />

      <div className="w-full mb-8 animate-pulse">
        <div className="w-32 h-4 bg-muted rounded mb-2" />
        <div className="w-64 h-3 bg-muted rounded mb-6" />
        <div className="w-16 h-1 bg-accent mb-8" />
      </div>

      <div className="w-full space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl border border-border/60 bg-white shadow-sm flex items-center px-6 gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="w-40 h-3 bg-muted rounded" />
              <div className="w-72 h-3 bg-muted rounded" />
            </div>
            <div className="w-16 h-8 rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
