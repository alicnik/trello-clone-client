import * as React from 'react';
import { Board, List as ListI, Card as CardI } from 'utils/api/types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import * as styles from './list.css';
import { Card } from 'components/single-board';
import { useAddCard } from 'hooks/useAddCard';
import { VscChromeClose } from 'react-icons/vsc';

interface ListProps {
  boardId: string;
  list: ListI;
  index: number;
  // onAddCard: ({ listId, newCard }: { listId: string; newCard: Pick<CardI, 'title'> }) => void;
}

export function List({ boardId, list, index }: ListProps) {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const addCardButtonRef = React.useRef<HTMLButtonElement>(null);
  const [cardToAdd, setCardToAdd] = React.useState({
    title: '',
    board: { id: boardId },
  });
  const [isAddingCard, setIsAddingCard] = React.useState(false);
  const mutation = useAddCard();
  // console.log(list);

  const handleAddCard = React.useCallback(() => {
    mutation.mutate({
      boardId,
      listId: list.id,
      newCard: cardToAdd,
    });
    setCardToAdd({ board: { id: boardId }, title: '' });
  }, [boardId, cardToAdd, list.id, mutation]);

  React.useEffect(() => {
    if (isAddingCard && !cardToAdd.title) {
      textAreaRef.current?.focus();
    }
  }, [isAddingCard, cardToAdd.title]);

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (!isAddingCard) {
        return;
      }
      if (
        e.target === addCardButtonRef.current ||
        e.target === textAreaRef.current
      ) {
        return;
      }
      if (cardToAdd.title) {
        handleAddCard();
      }
      setIsAddingCard(false);
    },
    [cardToAdd.title, handleAddCard, isAddingCard]
  );

  React.useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <Draggable draggableId={String(list.id)} index={index}>
      {(dragProvided) => (
        <div
          className={styles.list}
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
        >
          <h2 className={styles.listTitle} {...dragProvided.dragHandleProps}>
            {list.title}
          </h2>
          <Droppable
            droppableId={String(list.id)}
            type="card"
            ignoreContainerClipping
          >
            {(dropProvided) => (
              <div
                className={styles.cardsContainer}
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
              >
                {list.cards?.map((card, index) => (
                  <Card key={card.id} card={card} index={index} />
                ))}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
          {isAddingCard ? (
            <div>
              <textarea
                ref={textAreaRef}
                className={styles.textarea}
                placeholder="Enter a title for this card..."
                value={cardToAdd.title}
                onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                    e.preventDefault();
                    if (cardToAdd.title) {
                      handleAddCard();
                    }
                  }
                }}
                onChange={(e) => {
                  setCardToAdd({ ...cardToAdd, title: e.currentTarget.value });
                }}
              />
              <div className={styles.addCardButtonContainer}>
                <button
                  ref={addCardButtonRef}
                  className={styles.addCardButton}
                  disabled={!cardToAdd.title}
                  onClick={handleAddCard}
                >
                  Add card
                </button>
                <VscChromeClose
                  className={styles.closeIcon}
                  onClick={() => setIsAddingCard(false)}
                />
              </div>
            </div>
          ) : (
            <button
              className={styles.addCard}
              onClick={() => setIsAddingCard(true)}
            >
              + Add a card
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
}
