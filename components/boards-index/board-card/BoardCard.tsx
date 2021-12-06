import * as React from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getSingleBoard } from 'utils/api/boards';
import type { Board } from 'utils/api/types';
import * as styles from './board-card.css';
import { FavouriteStar } from 'components';

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

  return (
    <Link key={board.id} href={`/boards/${board.id}`} passHref>
      <div
        className={styles.boardCard}
        style={{
          background: board.background || 'rgb(0, 121, 191)',
        }}
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

// export function CreateBoardCard() {
//   return (
//     <div className={clsx(styles.boardCard, styles.createBoardCard)}>
//       <p className={styles.createBoardText}>Create new board</p>
//     </div>
//   );
// }
