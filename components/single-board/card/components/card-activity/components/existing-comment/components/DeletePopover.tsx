import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as styles from './delete-popover.css';
import { PopoverHeader } from 'components/boards-index/board-card/components/background-picker/components';
import { useDeleteComment } from 'hooks';
import { DeleteConfirmation } from 'components/common';

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
    <DeleteConfirmation
      headingText="Delete comment?"
      bodyText="Deleting a comment is forever. There is no undo."
      buttonText="Delete comment"
      trigger={<span className={styles.controlLink}>Delete</span>}
      onDelete={handleDelete}
    />
  );
}
