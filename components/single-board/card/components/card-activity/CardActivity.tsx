import * as React from 'react';
import { GrList } from 'react-icons/gr';
import { Card } from 'utils/api';
import * as styles from './card-activity.css';
import * as baseStyles from '../description-editor/description-editor.css';
import clsx from 'clsx';
import { ExistingComment, NewComment } from './components';

interface CardActivityProps {
  card: Card;
  listId: string
}

export function CardActivity({ card, listId }: CardActivityProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <GrList className={styles.icon} />
        <h2 className={clsx(baseStyles.heading, styles.headingMargin)}>
          Activity
        </h2>
        <button className={baseStyles.greyButton}>Show details</button>
      </header>
      <NewComment cardId={card.id} listId={listId}/>
      {card.comments.map((comment) => (
        <ExistingComment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
