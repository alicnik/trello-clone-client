import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getSingleUser } from 'utils/api';
import { DropdownBoardItem } from '..';

interface DropdownBoardsContentProps {
  type: 'recent' | 'starred';
}

export function DropdownBoardsContent({ type }: DropdownBoardsContentProps) {
  const {
    query: { username },
  } = useRouter();
  const { data: session, status } = useSession();
  const { data: user } = useQuery(['users', username], () => {
    if (status === 'loading' || !session) return;
    return getSingleUser(username as string, session?.accessToken as string);
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
