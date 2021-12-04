import * as styles from './board-card-list.css';
import { HiOutlineStar } from 'react-icons/hi';
import type { Board } from 'utils/api/types';
import { BoardCard } from '../board-card';
import { CreateBoardCard } from '..';

interface BoardCardListProps {
  boards: Board[];
  userId: string;
  isStarredList: boolean;
}

export function BoardCardList({
  boards,
  userId,
  isStarredList,
}: BoardCardListProps) {
  if (isStarredList) {
    return (
      <div className={styles.boardListWrapper}>
        <h2 className={styles.boardListTitle}>
          <HiOutlineStar /> Starred Boards
        </h2>
        <div>
          {boards
            .filter((board) => board.starredBy.some((u) => u.id === userId))
            .map((board) => (
              <BoardCard
                key={board.id}
                initialBoard={board}
                isFavourite={true}
              />
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.boardListContainer}>
      {boards.map((board) => {
        const isFavourite = board.starredBy.some((u) => u.id === userId);
        return (
          <BoardCard
            key={board.id}
            initialBoard={board}
            isFavourite={isFavourite}
          />
        );
      })}
      <CreateBoardCard />
    </div>
  );
}
