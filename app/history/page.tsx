import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getSessionIdFromCookie } from "@/lib/session";
import { auth } from "@clerk/nextjs/server";
import HistoryClient from "./HistoryClient";

export default async function HistoryPage() {
  const { userId } = await auth();
  const sessionId = await getSessionIdFromCookie();

  // Preload submissions - prefer userId if authenticated, fallback to sessionId
  let preloadedSubmissions = null;

  if (userId) {
    preloadedSubmissions = await preloadQuery(api.submissions.getByUser, { userId });
  } else if (sessionId) {
    preloadedSubmissions = await preloadQuery(api.submissions.getBySession, { sessionId });
  }

  return (
    <HistoryClient
      sessionId={sessionId}
      userId={userId}
      preloadedSubmissions={preloadedSubmissions}
    />
  );
}
