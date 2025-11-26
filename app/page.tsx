import HomeClient from "./HomeClient";

// Force static generation - no server-side data fetching
export const dynamic = "force-static";

export default function Home() {
  // Session ID will be handled by server action when grading
  // This allows the page to be fully static
  return <HomeClient sessionId={null} />;
}
