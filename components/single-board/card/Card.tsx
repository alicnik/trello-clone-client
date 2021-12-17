import * as React from 'react';
import { Card as CardI } from 'utils/api/types';
import { Draggable } from 'react-beautiful-dnd';
import * as styles from './card.css';
import * as Dialog from '@radix-ui/react-dialog';
import { CardDialogHeader, DescriptionEditor } from './components';
import { GrTextAlignFull } from 'react-icons/gr';

interface CardProps {
  card: CardI;
  index: number;
}

export function Card({ card, index }: CardProps) {
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
                  <GrTextAlignFull />
                </>
              )}
            </div>
          </Dialog.Trigger>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content
            aria-label={card.title}
            className={styles.content}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <CardDialogHeader card={card} />
            <DescriptionEditor card={card} />
          </Dialog.Content>
        </Dialog.Root>
      )}
    </Draggable>
  );
}
