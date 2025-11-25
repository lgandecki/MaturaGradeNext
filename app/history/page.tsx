import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getSessionIdFromCookie } from "@/lib/session";
import HistoryClient from "./HistoryClient";

export default async function HistoryPage() {
  const sessionId = await getSessionIdFromCookie();

  // Preload submissions for this session (only if sessionId exists)
  const preloadedSubmissions = sessionId
    ? await preloadQuery(api.submissions.getBySession, { sessionId })
    : null;

  return <HistoryClient sessionId={sessionId} preloadedSubmissions={preloadedSubmissions} />;
}
