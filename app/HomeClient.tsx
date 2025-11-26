"use client";

import { useState, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { HomeContent } from "@/app/components/HomeContent";

interface HomeClientProps {
  sessionId: string | null;
}

export default function HomeClient({ sessionId }: HomeClientProps) {
  // Track the submission ID when user creates one
  const [activeSubmissionId, setActiveSubmissionId] = useState<Id<"submissions"> | null>(null);

  // Query submission data when we have an ID
  const submission = useQuery(
    api.submissions.get,
    activeSubmissionId ? { id: activeSubmissionId } : "skip"
  );

  const handleSubmissionCreated = useCallback((newSubmissionId: Id<"submissions">) => {
    setActiveSubmissionId(newSubmissionId);
    // Update URL to /submission/[id] without triggering page reload
    window.history.pushState(null, "", `/submission/${newSubmissionId}`);
  }, []);

  const handleReset = useCallback(() => {
    setActiveSubmissionId(null);
    // Reset URL to /
    window.history.replaceState(null, "", "/");
  }, []);

  return (
    <HomeContent
      submission={submission}
      sessionId={sessionId}
      onSubmissionCreated={handleSubmissionCreated}
      onReset={handleReset}
    />
  );
}
