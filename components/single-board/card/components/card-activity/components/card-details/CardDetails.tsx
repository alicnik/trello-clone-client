import * as styles from './card-details.css';
import { useCustomSession } from 'hooks';

interface CardDetailsProps {
  listName: string;
  dateAdded: Date;
}

export function CardDetails({ listName, dateAdded }: CardDetailsProps) {
  const { firstName, lastName, initials } = useCustomSession();
  const creationDate = new Date(dateAdded);

  return (
    <article className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.initials}>{initials}</div>
        <div>
          <p className={styles.cardAddedInfo}>
            <strong>{firstName + ' ' + lastName}</strong> added this card to{' '}
            {listName}
          </p>
          <p className={styles.dateAdded}>
            {creationDate.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            }) +
              ' at ' +
              creationDate.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
          </p>
        </div>
      </div>
    </article>
  );
}
