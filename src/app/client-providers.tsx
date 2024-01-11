'use client';

import { ClerkProvider } from '@clerk/nextjs';
import TRPCProvider from './_trpc/Provider';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <TRPCProvider>{children}</TRPCProvider>
    </ClerkProvider>
  );
}
