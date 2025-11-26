"use client";
import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getSessionIdClient } from "@/lib/session-client";

/**
 * This component automatically claims anonymous submissions for the logged-in user.
 * When a user logs in or registers, it finds all submissions with their sessionId
 * and associates them with their userId.
 */
export function AuthClaimHandler() {
  const { user, isLoaded } = useUser();
  const claimSubmissions = useMutation(api.submissions.claimSubmissions);
  const hasClaimed = useRef(false);

  useEffect(() => {
    if (!isLoaded || !user || hasClaimed.current) return;

    const sessionId = getSessionIdClient();
    if (!sessionId) return;

    // Claim all submissions from this session for the logged-in user
    claimSubmissions({ sessionId, userId: user.id })
      .then((count) => {
        if (count > 0) {
          console.log(`Claimed ${count} submission(s) for user`);
        }
      })
      .catch(console.error);

    hasClaimed.current = true;
  }, [isLoaded, user, claimSubmissions]);

  return null; // This component renders nothing
}
