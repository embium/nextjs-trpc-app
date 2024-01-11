import { prisma } from '@/server/db';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { inferAsyncReturnType } from '@trpc/server';
import {
  SignedInAuthObject,
  SignedOutAuthObject,
  getAuth,
} from '@clerk/nextjs/server';

type CreateContextOptions = {
  auth: SignedInAuthObject | SignedOutAuthObject;
};

export const createContextInner = (opts: CreateContextOptions) => {
  return {
    auth: opts.auth,
    prisma,
  };
};

export const createContext = (opts: CreateNextContextOptions) => {
  const auth = getAuth(opts.req);
  return createContextInner({
    auth,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
