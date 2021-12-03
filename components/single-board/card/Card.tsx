import {Card as CardI} from 'utils/api/types'
import {Draggable} from 'react-beautiful-dnd'
import * as styles from './card.css'

interface CardProps {
  card: CardI;
  index: number;
}

export function Card({ card, index }: CardProps) {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className={styles.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
}