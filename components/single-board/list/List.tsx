import { List as ListI } from 'utils/api/types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import * as styles from './list.css';
import { Card } from 'components/single-board';

interface ListProps {
  list: ListI;
  index: number;
}

export function List({ list, index }: ListProps) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(dragProvided) => (
        <div
          className={styles.list}
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
        >
          <h2 className={styles.listTitle} {...dragProvided.dragHandleProps}>
            {list.title}
          </h2>
          <Droppable droppableId={list.id} type="card" ignoreContainerClipping>
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
          <button className={styles.addCard}>+ Add a card</button>
        </div>
      )}
    </Draggable>
  );
}
