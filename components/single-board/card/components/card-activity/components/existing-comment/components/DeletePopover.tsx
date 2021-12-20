import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as styles from './delete-popover.css';
import { PopoverHeader } from 'components/boards-index/board-card/components/background-picker/components';
import { useDeleteComment } from 'hooks';

interface DeletePopoverProps {
  commentId: string;
  cardId: string;
  listId: string;
}

export function DeletePopover({
  commentId,
  cardId,
  listId,
}: DeletePopoverProps) {
  const mutation = useDeleteComment(cardId, listId);

  const handleDelete = () => {
    mutation.mutate(commentId);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <span className={styles.controlLink}>Delete</span>
      </Popover.Trigger>
      <Popover.Content
        className={styles.deletePopoverContent}
        align="start"
        sideOffset={5}
      >
        <PopoverHeader
          heading="Delete comment?"
          style={{ paddingBottom: '0.5rem' }}
        />
        <p className={styles.deleteWarningText}>
          Deleting a comment is forever. There is no undo.
        </p>
        <button className={styles.deleteButton} onClick={handleDelete}>
          Delete comment
        </button>
      </Popover.Content>
    </Popover.Root>
  );
}
