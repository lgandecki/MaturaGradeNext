import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import ConvexClientProvider from "./components/ConvexClientProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ClerkProvider>
  );
}
