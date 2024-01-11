import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { Context } from '@/server/api/context';
import { ZodError } from 'zod';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError
            ? error.cause.flatten(
                (issue) => `${issue.path.pop()}: ${issue.message}`
              )
            : undefined,
      },
    };
  },
});

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.auth) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User has no access to this resource',
    });
  }
  return next({
    ctx: {
      ...ctx,
      // infers the `session` as non-nullable
      session: ctx.auth,
    },
  });
});

export const { router, createCallerFactory } = t;
export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(enforceUserIsAuthed);
