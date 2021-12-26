import { BsThreeDots } from 'react-icons/bs';
import * as Popover from '@radix-ui/react-popover';
import * as styles from './title-bar-popover.css';
import { PopoverHeader } from 'components/boards-index/board-card/components/background-picker/components';
import { useDeleteBoard } from 'hooks';
import { DeleteConfirmation } from 'components/common';

interface TitleBarPopoverProps {
  boardId: string;
}

export function TitleBarPopover({ boardId }: TitleBarPopoverProps) {
  const mutation = useDeleteBoard();

  const handleDeleteBoard = () => {
    mutation.mutate(boardId);
  };
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <span className={styles.trigger}>
          <BsThreeDots />
        </span>
      </Popover.Trigger>
      <Popover.Content className={styles.content} align="start">
        <PopoverHeader
          heading="Board Actions"
          style={{
            paddingBottom: '0.75rem',
            margin: '0 0.5rem',
          }}
        />
        <div className={styles.container}>
          <DeleteConfirmation
            headingText="Delete Board?"
            bodyText="Deleting a board is forever. There is no undo."
            buttonText="Delete board"
            side="right"
            trigger={<p className={styles.option}>Delete this board</p>}
            onDelete={handleDeleteBoard}
          />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
