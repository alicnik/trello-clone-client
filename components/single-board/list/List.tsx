import * as React from 'react';
import { List as ListI } from 'utils/api/types';
import { Draggable, Droppable } from '@adaptabletools/react-beautiful-dnd';
import * as styles from './list.css';
import { Card } from 'components/single-board';
import { AddCardSection, ListTitle } from './components';

interface ListProps {
  boardId: string;
  list: ListI;
  index: number;
}

export function List({ boardId, list, index }: ListProps) {
  const addCardButtonRef = React.useRef<HTMLButtonElement>(null);
  const [isAddingCard, setIsAddingCard] = React.useState(false);

  return (
    <Draggable draggableId={String(list.id)} index={index}>
      {(dragProvided) => (
        <div
          className={styles.list}
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
        >
          <ListTitle
            title={list.title}
            listId={list.id}
            boardId={boardId}
            dragProvided={dragProvided}
          />
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
                  <Card
                    key={card.id}
                    card={card}
                    listId={list.id}
                    index={index}
                  />
                ))}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
          {isAddingCard ? (
            <AddCardSection
              boardId={boardId}
              listId={list.id}
              isAddingCard={isAddingCard}
              setIsAddingCard={setIsAddingCard}
            />
          ) : (
            <button
              className={styles.addCard}
              ref={addCardButtonRef}
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
