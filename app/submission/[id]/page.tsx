import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getSessionIdFromCookie } from "@/lib/session";
import SubmissionClient from "./SubmissionClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SubmissionPage({ params }: PageProps) {
  const { id } = await params;
  const submissionId = id as Id<"submissions">;
  const sessionId = await getSessionIdFromCookie();

  const preloadedSubmission = await preloadQuery(api.submissions.get, { id: submissionId });

  return (
    <SubmissionClient
      submissionId={submissionId}
      sessionId={sessionId}
      preloadedSubmission={preloadedSubmission}
    />
  );
}
