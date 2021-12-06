import * as React from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getSingleBoard } from 'utils/api/boards';
import type { Board } from 'utils/api/types';
import * as styles from './board-card.css';
import { FavouriteStar } from 'components';
import { getBackground } from 'utils';

interface BoardCardProps {
  initialBoard: Board;
  isFavourite?: boolean;
}

export function BoardCard({ initialBoard, isFavourite }: BoardCardProps) {
  const { data: board } = useQuery(
    ['boards', initialBoard.id],
    () => getSingleBoard(initialBoard.id),
    { initialData: initialBoard }
  );

  if (!board) {
    return null;
  }

  console.log(board.backgroundThumbnail);

  return (
    <Link key={board.id} href={`/boards/${board.id}`} passHref>
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
