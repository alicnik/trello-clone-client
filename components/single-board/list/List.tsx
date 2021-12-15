import * as React from 'react';
import { Board, List as ListI, Card as CardI } from 'utils/api/types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import * as styles from './list.css';
import { Card } from 'components/single-board';
import { useAddCard } from 'hooks/useAddCard';

interface ListProps {
  boardId: string;
  list: ListI;
  index: number;
  // onAddCard: ({ listId, newCard }: { listId: string; newCard: Pick<CardI, 'title'> }) => void;
}

export function List({ boardId, list, index }: ListProps) {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const [cardToAdd, setCardToAdd] = React.useState({
    title: '',
    board: { id: boardId },
  });
  const [isAddingCard, setIsAddingCard] = React.useState(false);
  const mutation = useAddCard();
  // console.log(list);

  const handleAddCard = () => {
    mutation.mutate({
      boardId,
      listId: list.id,
      newCard: cardToAdd,
    });
    setCardToAdd({ board: { id: boardId }, title: '' });
  };

  React.useEffect(() => {
    if (isAddingCard && !cardToAdd.title) {
      textAreaRef.current?.focus();
    }
  }, [isAddingCard, cardToAdd.title]);

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
                {list.cards.map((card, index) => (
                  <Card key={card.id} card={card} index={index} />
                ))}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
          {isAddingCard ? (
            <>
              <textarea
                ref={textAreaRef}
                placeholder="Enter a title for this card..."
                value={cardToAdd.title}
                onChange={(e) =>
                  setCardToAdd({ ...cardToAdd, title: e.target.value })
                }
              />
              <button disabled={!cardToAdd.title} onClick={handleAddCard}>
                Add card
              </button>
              <button onClick={() => setIsAddingCard(false)}>X</button>
            </>
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
