import * as React from 'react';
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FavouriteStar } from 'components/common';
import { getBackground } from 'utils';
import { Board, User } from 'utils/api';
import * as styles from './dropdown-board-item.css';
import { useCustomSession } from 'hooks';
import { useQueryClient } from 'react-query';

interface DropdownboardItemProps {
  board: Board;
  user: User;
}

export function DropdownBoardItem({ board, user }: DropdownboardItemProps) {
  const queryClient = useQueryClient();
  const { username } = useCustomSession();
  const isFavourite = user.starredBoards.some((b) => b.id === board.id);
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const queryBoard = queryClient.getQueryData<Board>(['boards', board.id]);

  return (
    <Link href={`/${username}/boards/${board.id}`} passHref>
      <DropdownMenu.Item
        className={styles.dropdownItem}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        {/* <div> */}
        <div
          className={styles.boardThumbnail}
          style={getBackground(board.backgroundThumbnail)}
        />
        <p className={styles.boardName}>{board.boardName}</p>
        {/* </div> */}
        {isFavourite || isMouseOver ? (
          <FavouriteStar
            board={queryBoard ? { ...board, ...queryBoard } : board}
            isFavourite={isFavourite}
            className={styles.favourite}
          />
        ) : null}
      </DropdownMenu.Item>
    </Link>
  );
}
