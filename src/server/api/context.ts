import { prisma } from '@/server/db';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { inferAsyncReturnType } from '@trpc/server';
import { auth as getAuth } from '@clerk/nextjs';
import { GetServerSidePropsContext } from 'next';
import { NextRequest } from 'next/server';

type CreateContextOptions = {
  auth: any | null;
};

export const createContextInner = (opts: CreateContextOptions) => {
  return {
    auth: opts.auth,
    prisma,
  };
};

export const createContext = (opts: CreateNextContextOptions) => {
  const auth = getAuth();
  return createContextInner({
    auth,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
