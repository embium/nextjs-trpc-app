'use server';

import { createCaller } from '@/server/api/routers';
import { auth as getAuth } from '@clerk/nextjs';
import { prisma } from '@/server/db';

const auth = getAuth();
export const api = createCaller({
  auth,
  prisma,
});
