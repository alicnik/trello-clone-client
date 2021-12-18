import { useCustomSession } from 'hooks';
import type { Comment } from 'utils/api/types';
import * as styles from './existing-comment.css';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-GB');

interface ExistingCommentProps {
  comment: Comment;
}

export function ExistingComment({ comment }: ExistingCommentProps) {
  const { firstName, lastName, initials, username } = useCustomSession();

  return (
    <article className={styles.container}>
      <div className={styles.initials}>{initials}</div>
      <div className={styles.innerContainer}>
        <div className={styles.metaInfoContainer}>
          <span className={styles.fullName}>{firstName + ' ' + lastName}</span>
          <span className={styles.creationDate}>
            {timeAgo.format(new Date(comment.created))}
          </span>
        </div>
        <p className={styles.commentBody}>{comment.body}</p>
        {comment.author?.username === username && (
          <div>
            <span>Edit</span>
            <span>Delete</span>
          </div>
        )}
      </div>
    </article>
  );
}
