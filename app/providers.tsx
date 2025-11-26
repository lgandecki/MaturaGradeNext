import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import ConvexClientProvider from "./components/ConvexClientProvider";
import { AuthClaimHandler } from "./components/AuthClaimHandler";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>
        <AuthClaimHandler />
        {children}
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
