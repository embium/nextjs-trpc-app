import { router, publicProcedure, protectedProcedure } from '@/server/api/trpc';

export const testRouter = router({
  hello: publicProcedure.query(async ({ ctx }) => {
    return 'It works!';
  }),
});
