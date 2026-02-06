import * as React from 'react';
import { Card as CardI } from 'utils/api/types';
import { Draggable } from '@adaptabletools/react-beautiful-dnd';
import * as styles from './card.css';
import * as Dialog from '@radix-ui/react-dialog';
import {
  CardActivity,
  CardDialogHeader,
  DescriptionEditor,
} from './components';
import { GrTextAlignFull } from 'react-icons/gr';
import { FaRegComment } from 'react-icons/fa';

interface CardProps {
  card: CardI;
  listId: string;
  index: number;
}

export function Card({ card, listId, index }: CardProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <div
              className={styles.card}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {card.title}
              {card.description && (
                <>
                  <br />
                  <GrTextAlignFull className={styles.descriptionIcon} />
                </>
              )}
              {card.comments && card.comments.length > 0 && (
                <>
                  {card.description ? null : <br />}
                  <span className={styles.commentsIconContainer}>
                    <FaRegComment className={styles.commentsIcon} />{' '}
                    <span>{String(card.comments.length)}</span>
                  </span>
                </>
              )}
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay}>
              <Dialog.Content
                aria-label={card.title}
                className={styles.content}
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                <CardDialogHeader card={card} />
                <DescriptionEditor card={card} />
                <CardActivity card={card} listId={listId} />
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </Draggable>
  );
}
