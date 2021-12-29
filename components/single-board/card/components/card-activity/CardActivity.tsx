import * as React from 'react';
import { GrList } from 'react-icons/gr';
import { Card } from 'utils/api';
import * as styles from './card-activity.css';
import * as baseStyles from '../description-editor/description-editor.css';
import clsx from 'clsx';
import { CardDetails, ExistingComment, NewComment } from './components';

interface CardActivityProps {
  card: Card;
  listId: string;
}

export function CardActivity({ card, listId }: CardActivityProps) {
  const [isShowDetails, setIsShowDetails] = React.useState(false);
  const orderedComments =
    card.comments?.sort((commentA, commentB) => {
      if (commentA.created > commentB.created) {
        return -1;
      }
      return 1;
    }) ?? [];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <GrList className={styles.icon} />
        <h2 className={clsx(baseStyles.heading, styles.headingMargin)}>
          Activity
        </h2>
        <button
          className={baseStyles.greyButton}
          onClick={() => setIsShowDetails(!isShowDetails)}
        >
          {isShowDetails ? 'Hide details' : 'Show details'}
        </button>
      </header>
      <NewComment cardId={card.id} listId={listId} />
      {orderedComments.map((comment) => (
        <ExistingComment
          key={comment.id}
          comment={comment}
          cardId={card.id}
          listId={listId}
        />
      ))}
      {isShowDetails && (
        <CardDetails listName={card.boardList.title} dateAdded={card.created} />
      )}
    </div>
  );
}
