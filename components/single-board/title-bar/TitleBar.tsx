import * as React from 'react';
import { useCustomSession, useUpdateBoard } from 'hooks';
import { Board } from 'utils/api';
import * as styles from './title-bar.css';
import { FavouriteStar } from 'components/common';
import { TitleBarPopover } from './title-bar-popover';

interface TitleBarProps {
  board: Board;
}

export function TitleBar({ board }: TitleBarProps) {
  const { username } = useCustomSession();
  const [boardName, setBoardName] = React.useState(board.boardName);

  const mutation = useUpdateBoard();

  const handleUpdateBoardName = () => {
    mutation.mutate({ ...board, boardName });
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        onBlur={handleUpdateBoardName}
      />
      <FavouriteStar
        board={board}
        className={styles.starContainer}
        isFavourite={board.starredBy.some((u) => u.username === username)}
      />
      <TitleBarPopover boardId={board.id} />
    </div>
  );
}
