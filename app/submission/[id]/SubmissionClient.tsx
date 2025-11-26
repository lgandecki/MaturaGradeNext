"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePreloadedQuery, useQuery, Preloaded } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { HomeContent } from "@/app/components/HomeContent";

interface SubmissionClientProps {
  submissionId: Id<"submissions">;
  sessionId: string | null;
  preloadedSubmission: Preloaded<typeof api.submissions.get>;
}

export default function SubmissionClient({
  submissionId: initialSubmissionId,
  sessionId,
  preloadedSubmission,
}: SubmissionClientProps) {
  const router = useRouter();

  // Track the current submission ID (can change if user creates a new submission)
  const [activeSubmissionId, setActiveSubmissionId] = useState<Id<"submissions"> | null>(initialSubmissionId);

  // Use preloaded data for the initial submission
  const preloaded = usePreloadedQuery(preloadedSubmission);

  // Use live query for any new submissions created on this page
  const liveSubmission = useQuery(
    api.submissions.get,
    activeSubmissionId && activeSubmissionId !== initialSubmissionId
      ? { id: activeSubmissionId }
      : "skip"
  );

  // Determine which submission to display
  const submission = activeSubmissionId === null
    ? undefined
    : activeSubmissionId === initialSubmissionId
      ? preloaded
      : liveSubmission;

  const handleSubmissionCreated = useCallback((newSubmissionId: Id<"submissions">) => {
    setActiveSubmissionId(newSubmissionId);
    // Update URL without triggering page reload
    window.history.pushState(null, "", `/submission/${newSubmissionId}`);
  }, []);

  const handleReset = useCallback(() => {
    // Navigate to the static main page
    router.push("/");
  }, [router]);

  return (
    <HomeContent
      submission={submission}
      sessionId={sessionId}
      onSubmissionCreated={handleSubmissionCreated}
      onReset={handleReset}
    />
  );
}
