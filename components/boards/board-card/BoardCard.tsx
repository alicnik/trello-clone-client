import Link from 'next/link';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import type { Board } from 'utils/api/types';
import * as styles from './board-card.css';

interface BoardCardProps {
  board?: Board;
  isFavourite?: boolean;
  createNew?: boolean;
}

export function BoardCard({ board, isFavourite, createNew = false }: BoardCardProps) {
  if (createNew) {
    return (
      <div
        className={styles.boardCard}
        style={{
          background: 'lightGrey',
        }}
      >
        <p className={styles.createBoardText}>Create new board</p>
      </div>
    );
  }

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
          {isFavourite ? <HiStar /> : <HiOutlineStar />}
        </span>
      </div>
    </Link>
  );
}
