import { api } from '../_trpc/server';

export default async function Page() {
  const content = await api.test.hello();
  return <div>{content}</div>;
}
