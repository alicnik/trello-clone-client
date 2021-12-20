import * as React from 'react';
import { useCustomSession } from 'hooks';
import type { Comment } from 'utils/api/types';
import * as styles from './existing-comment.css';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import * as Collapsible from '@radix-ui/react-collapsible';
import { VscChromeClose } from 'react-icons/vsc';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-GB');

interface ExistingCommentProps {
  comment: Comment;
}

export function ExistingComment({ comment }: ExistingCommentProps) {
  const { firstName, lastName, initials, username } = useCustomSession();

  const [isEditing, setIsEditing] = React.useState(false);
  const [commentBody, setCommentBody] = React.useState(comment.body);

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
        <Collapsible.Root open={isEditing} onOpenChange={setIsEditing}>
          <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === 'Enter' && (!!e.metaKey || !!e.ctrlKey)) {
                e.preventDefault();
              }
            }}
          />
          <Collapsible.Content>
            <button>Save</button>
            <VscChromeClose onClick={() => setIsEditing(false)} />
          </Collapsible.Content>
        </Collapsible.Root>
        {isEditing
          ? null
          : comment.author?.username === username && (
              <div className={styles.commentControls}>
                <span
                  className={styles.controlLink}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </span>{' '}
                - <span className={styles.controlLink}>Delete</span>
              </div>
            )}
      </div>
    </article>
  );
}
