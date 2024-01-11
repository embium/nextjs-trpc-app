'use client';

import { trpc } from '../_trpc/client';

export default function Page() {
  const { data: content } = trpc.test.hello.useQuery();
  return <div>{content}</div>;
}
