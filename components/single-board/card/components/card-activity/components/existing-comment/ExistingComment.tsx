import * as React from 'react';
import { useCustomSession, useUpdateComment } from 'hooks';
import type { Comment } from 'utils/api/types';
import * as styles from './existing-comment.css';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import * as Collapsible from '@radix-ui/react-collapsible';
import { VscChromeClose } from 'react-icons/vsc';
import * as baseStyles from '../../../description-editor/description-editor.css';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-GB');

interface ExistingCommentProps {
  comment: Comment;
  cardId: string;
  listId: string;
}

export function ExistingComment({
  comment,
  cardId,
  listId,
}: ExistingCommentProps) {
  const { firstName, lastName, initials, username } = useCustomSession();

  const [isEditing, setIsEditing] = React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [commentBody, setCommentBody] = React.useState(comment.body);
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);

  console.log(comment);

  const mutation = useUpdateComment(comment.id, cardId, listId);

  const handleUpdate = () => {
    mutation.mutate({ body: commentBody });
    setIsEditing(false);
  };

  React.useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }
    // Recalculate textarea height/rows depending on number of line breaks
    if (!commentBody) {
      textAreaRef.current.rows = 1;
      return;
    }
    // Reset height to 0 before using scrollHeight as otherwise scrollHeight does
    // not update when content decreases in number of lines
    textAreaRef.current.style.height = '0';
    console.dir(textAreaRef.current.scrollHeight / 18);
    textAreaRef.current.rows = textAreaRef.current.scrollHeight / 18;
    // Reset height to auto once scrollHeight calculation is done to ensure expected UI
    textAreaRef.current.style.height = 'auto';
  }, [commentBody]);

  React.useEffect(() => {
    if (isEditing) {
      textAreaRef.current?.select();
    }
  }, [isEditing]);

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
        <Collapsible.Root
          className={styles.collapsibleBackground}
          style={{
            boxShadow: isEditing
              ? '0 4px 8px -2px #091e4240, 0 0 0 1px #091e4214'
              : '0 1px 2px -1px #091e4240, 0 0 0 1px #091e4214',
          }}
          open={isEditing}
          onOpenChange={setIsEditing}
        >
          <textarea
            ref={textAreaRef}
            className={styles.textArea}
            disabled={!isEditing}
            style={{
              pointerEvents: isEditing ? undefined : 'none',
            }}
            value={commentBody}
            onChange={(e) => {
              setCommentBody(e.target.value);
              setIsEmpty(!e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.code === 'Enter' && (!!e.metaKey || !!e.ctrlKey)) {
                e.preventDefault();
              }
            }}
          />
          {isEmpty && (
            <p className={styles.isEmptyMessage}>
              You haven&apos;t typed anything!
            </p>
          )}
          <Collapsible.Content className={styles.collapsibleContent}>
            <button
              className={baseStyles.saveButton}
              onClick={handleUpdate}
              disabled={!commentBody}
            >
              Save
            </button>
            <VscChromeClose
              className={baseStyles.closeIcon}
              onClick={() => {
                if (!commentBody) {
                  setCommentBody(comment.body);
                  setIsEmpty(false);
                }
                setIsEditing(false);
              }}
            />
          </Collapsible.Content>
        </Collapsible.Root>

        {comment.author?.username === username
          ? !isEditing && (
              <div className={styles.commentControls}>
                <span
                  className={styles.controlLink}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </span>{' '}
                - <span className={styles.controlLink}>Delete</span>
              </div>
            )
          : null}
      </div>
    </article>
  );
}
