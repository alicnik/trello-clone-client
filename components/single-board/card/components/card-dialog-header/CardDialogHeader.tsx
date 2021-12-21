import * as React from 'react';
import * as styles from './card-dialog-header.css';
import * as Dialog from '@radix-ui/react-dialog';
import { VscChromeClose } from 'react-icons/vsc';
import { IoTrashOutline } from 'react-icons/io5';
import { Card } from 'utils/api/types';
import { useUpdateCard } from 'hooks';
import { DeleteConfirmation } from 'components/common';
import { useDeleteCard } from 'hooks/useDeleteCard';

interface CardDialogHeaderProps {
  card: Card;
}

export function CardDialogHeader({ card }: CardDialogHeaderProps) {
  const updateMutation = useUpdateCard({
    cardId: card.id,
    boardId: card.board.id,
  });
  const [newTitle, setNewTitle] = React.useState(card.title);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const deleteMutation = useDeleteCard();

  const handleSave = () => {
    updateMutation.mutate({ title: newTitle });
  };

  const handleDelete = () => {
    deleteMutation.mutate(card.id);
  };

  React.useEffect(() => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = '0';
    textAreaRef.current.rows = (textAreaRef.current.scrollHeight - 35) / 23 + 1;
    textAreaRef.current.style.height = 'auto';
  }, [newTitle]);

  return (
    <header className={styles.cardDialogHeader}>
      <span className={styles.cardIcon} />
      <div className={styles.titleContainer}>
        <textarea
          ref={textAreaRef}
          className={styles.cardDialogTitle}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleSave}
        />
        <p className={styles.listSubHeading}>in list {card.boardList.title}</p>
      </div>
      <div>
        <Dialog.Close asChild>
          <span>
            <VscChromeClose className={styles.closeIcon} />
          </span>
        </Dialog.Close>
        <DeleteConfirmation
          headingText="Delete card?"
          bodyText="Are you sure? There's no going back..."
          buttonText="Delete card"
          trigger={
            <span className={styles.deleteIcon}>
              <IoTrashOutline />
            </span>
          }
          onDelete={handleDelete}
        />
      </div>
    </header>
  );
}
