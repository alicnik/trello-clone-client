import * as React from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getSingleBoard } from 'utils/api/boards';
import type { Board } from 'utils/api/types';
import * as styles from './board-card.css';
import { FavouriteStar } from 'components';
import { getBackground } from 'utils';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface BoardCardProps {
  initialBoard: Board;
  isFavourite?: boolean;
}

export function BoardCard({ initialBoard, isFavourite }: BoardCardProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const username = initialBoard.owner?.username ?? router.query.username;
  const { data: board } = useQuery(
    ['boards', initialBoard.id],
    () => {
      if (status === 'loading') return;
      return getSingleBoard(initialBoard.id, session?.accessToken as string);
    },
    { initialData: initialBoard }
  );

  if (!board) {
    return null;
  }

  return (
    <Link
      key={board.id}
      href={`/${username}/boards/${board.id}`}
      prefetch={false}
      passHref
    >
      <div
        className={styles.boardCard}
        style={getBackground(board.backgroundThumbnail)}
      >
        <h2 className={styles.boardCardTitle}>{board.boardName}</h2>
        <span className={styles.favourite}>
          {isFavourite ? (
            <FavouriteStar board={board} isFavourite={true} />
          ) : (
            <FavouriteStar board={board} isFavourite={false} />
          )}
        </span>
      </div>
    </Link>
  );
}
