import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '@/server/api/routers';
import { auth as getAuth } from '@clerk/nextjs';
import { prisma } from '@/server/db';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => {
      const auth = getAuth();
      return {
        auth,
        prisma,
      };
    },
  });

export { handler as GET, handler as POST };
