import { useCustomSession } from 'hooks';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getSingleUser } from 'utils/api';
import { DropdownBoardItem } from '..';

interface DropdownBoardsContentProps {
  type: 'recent' | 'starred';
}

export function DropdownBoardsContent({ type }: DropdownBoardsContentProps) {
  const { username, accessToken, status } = useCustomSession();
  const { data: user } = useQuery({
    queryKey: ['users', username],
    queryFn: () => {
      if (status === 'loading') return;
      return getSingleUser(username, accessToken);
    },
  });

  if (!user) return null;

  const { recentBoards, starredBoards } = user;

  return (
    <>
      {type === 'recent'
        ? recentBoards?.map((board) => (
            <DropdownBoardItem key={board.id} board={board} user={user} />
          ))
        : starredBoards?.map((board) => (
            <DropdownBoardItem key={board.id} board={board} user={user} />
          ))}
    </>
  );
}
