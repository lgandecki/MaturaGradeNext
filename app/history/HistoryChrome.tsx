import { Header } from "@/app/components/Header";

interface HistoryChromeProps {
  children: React.ReactNode;
}

export function HistoryChrome({ children }: HistoryChromeProps) {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-5xl mx-auto relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-[-1] bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.15),transparent_50%)]" />

      <Header />

      <div className="w-full mb-8">{children}</div>
    </div>
  );
}
