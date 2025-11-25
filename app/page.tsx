import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getSessionIdFromCookie } from "@/lib/session";
import HomeClient from "./HomeClient";

interface PageProps {
  searchParams: Promise<{ submission?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const submissionId = params.submission as Id<"submissions"> | undefined;
  const sessionId = await getSessionIdFromCookie();

  // Preload submission data if ID is provided
  const preloadedSubmission = submissionId
    ? await preloadQuery(api.submissions.get, { id: submissionId })
    : null;

  return (
    <HomeClient
      submissionId={submissionId ?? null}
      sessionId={sessionId}
      preloadedSubmission={preloadedSubmission}
    />
  );
}
