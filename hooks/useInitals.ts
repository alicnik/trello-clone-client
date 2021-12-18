import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export function useInitials() {
  const session = useSession();
  const router = useRouter();
  const initials = session.data?.user
    ? `${session.data.user.firstName[0]}${session.data.user.lastName[0]}`
    : router.query.username?.[0];
  return initials;
}
