"use client";
import { UserProfile } from "@clerk/nextjs";
import { Header } from "@/app/components/Header";

export default function UserPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center max-w-4xl mx-auto relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-30 z-[-1] bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.15),transparent_50%)]" />

      <Header />

      <UserProfile
        appearance={{
          elements: {
            rootBox: "w-full",
            cardBox: "w-full shadow-xl",
          },
        }}
      />
    </div>
  );
}
