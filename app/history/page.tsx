"use client";

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, History, FileText, Calendar, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Get sessionId from localStorage
const getSessionId = (): string => {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("sessionId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("sessionId", id);
  }
  return id;
};

const MAX_SCORE = 35;

export default function HistoryPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string>("");

  // Initialize sessionId on mount
  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  // Fetch submissions for this session
  const submissions = useQuery(
    api.submissions.getBySession,
    sessionId ? { sessionId } : "skip"
  );

  // Filter to only completed submissions
  const completedSubmissions = useMemo(() => {
    if (!submissions) return [];
    return submissions.filter((s) => s.status === "completed" && s.result);
  }, [submissions]);

  // Calculate stats
  const stats = useMemo(() => {
    if (completedSubmissions.length === 0) return { average: 0, count: 0 };
    const total = completedSubmissions.reduce((sum, s) => sum + (s.result?.totalScore ?? 0), 0);
    return {
      average: total / completedSubmissions.length,
      count: completedSubmissions.length,
    };
  }, [completedSubmissions]);

  // Format date and time from timestamp
  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }),
      time: date.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" }),
    };
  };

  // Get preview text (first 80 chars)
  const getPreview = (text: string) => {
    if (text.length <= 80) return text;
    return text.substring(0, 80) + "...";
  };

  const handleSubmissionClick = (submissionId: string) => {
    router.push(`/?submission=${submissionId}`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-5xl mx-auto relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-[-1] bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.15),transparent_50%)]" />

      <div className="w-full mb-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="pl-0 hover:bg-transparent hover:text-primary/70 text-muted-foreground mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do strony głównej
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">Historia wyników</h1>
            <p className="text-muted-foreground">Przegląd Twoich dotychczasowych prac i postępów</p>
          </div>

          <div className="bg-white px-4 py-2 rounded-lg border border-border shadow-sm flex gap-6 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs uppercase tracking-wider">Średnia</span>
              <span className="font-bold text-lg text-primary">
                {stats.average.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">/ {MAX_SCORE}</span>
              </span>
            </div>
            <div className="w-px bg-border" />
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs uppercase tracking-wider">Prac</span>
              <span className="font-bold text-lg text-primary">{stats.count}</span>
            </div>
          </div>
        </div>

        <div className="w-16 h-1 bg-accent mb-8" />

        {/* Loading state */}
        {submissions === undefined && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Ładowanie historii...</p>
          </div>
        )}

        {/* Empty state */}
        {submissions && completedSubmissions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-6">
              <History className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-serif font-medium text-muted-foreground/70 mb-2">Brak wyników</h3>
            <p className="text-muted-foreground/60 max-w-md">
              Nie masz jeszcze żadnych ocenionych prac. Wróć na stronę główną i prześlij swoją pierwszą rozprawkę.
            </p>
            <Link href="/" className="mt-6">
              <Button>Oceń pierwszą pracę</Button>
            </Link>
          </div>
        )}

        {/* Submissions list */}
        {completedSubmissions.length > 0 && (
          <div className="grid gap-4">
            {completedSubmissions.map((item) => {
              const { date, time } = formatDateTime(item.createdAt);
              const score = item.result?.totalScore ?? 0;
              const ratio = score / MAX_SCORE;

              return (
                <Card
                  key={item._id}
                  onClick={() => handleSubmissionClick(item._id)}
                  className="p-6 bg-white shadow-sm hover:shadow-md transition-all border-border/60 hover:border-accent/30 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white via-white/50 to-transparent z-10 md:hidden pointer-events-none" />

                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative z-20">
                    <div className="flex gap-4 items-start md:items-center flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <FileText size={20} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif font-bold text-lg text-primary group-hover:text-accent transition-colors">
                            Rozprawka
                          </h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground hidden md:inline-block">
                            {score} pkt
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 max-w-md">{getPreview(item.text)}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground/70 md:hidden pt-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {time}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0 border-t md:border-t-0 pt-4 md:pt-0 border-dashed border-border">
                      <div className="flex-col items-end text-right hidden md:flex">
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                          <Calendar size={12} /> {date}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={12} /> {time}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-serif font-bold text-primary leading-none mb-1">
                            {score}{" "}
                            <span className="text-sm text-muted-foreground font-normal">/ {MAX_SCORE}</span>
                          </div>
                          <div
                            className={cn(
                              "text-xs font-bold uppercase tracking-wider",
                              ratio >= 0.6 ? "text-green-600" : "text-amber-600"
                            )}
                          >
                            {Math.round(ratio * 100)}%
                          </div>
                        </div>

                        <div
                          className={cn(
                            "w-2 h-12 rounded-full",
                            ratio >= 0.8
                              ? "bg-green-500"
                              : ratio >= 0.5
                                ? "bg-amber-400"
                                : "bg-red-400"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
