import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useCustomSession() {
  const session = useSession();
  const router = useRouter();

  // @ts-ignore
  const accessToken = session.data.accessToken as string;
  const firstName = session.data?.user?.name as string;
  const lastName = session.data?.user?.email as string;
  const username = session.data?.user?.image as string;
  const initials = session.data?.user
    ? `${firstName?.[0]}${lastName?.[0]}`
    : router.query.username?.[0];

  const customSession = {
    firstName,
    lastName,
    username,
    initials,
    accessToken,
    status: session.status,
  };

  return customSession;
}
