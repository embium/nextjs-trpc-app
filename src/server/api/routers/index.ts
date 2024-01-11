import { testRouter } from '@/server/api/routers/test';
import { router, createCallerFactory } from '@/server/api/trpc';

export const appRouter = router({
  test: testRouter,
});

export const createCaller = createCallerFactory(appRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
