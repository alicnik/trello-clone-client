import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { FavouriteStar } from 'components/common';
import { getBackground } from 'utils';
import { Board, User } from 'utils/api';
import * as styles from './dropdown-board-item.css';

interface DropdownboardItemProps {
  board: Board;
  user: User;
}

export function DropdownBoardItem({ board, user }: DropdownboardItemProps) {
  const isFavourite = user.starredBoards.some((b) => b.id === board.id);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  return (
    <DropdownMenu.Item
      className={styles.dropdownItem}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div
        className={styles.boardThumbnail}
        style={getBackground(board.backgroundThumbnail)}
      />
      <p className={styles.boardName}>{board.boardName}</p>
      {isFavourite || isMouseOver ? (
        <FavouriteStar
          board={board}
          isFavourite={isFavourite}
          className={styles.favourite}
        />
      ) : null}
    </DropdownMenu.Item>
  );
}
