import * as React from 'react';
import { useAddComment, useInitials } from 'hooks';

import * as styles from './new-comment.css';
import * as baseStyles from '../../../description-editor/description-editor.css';
import { useBoardContext } from 'hooks/useBoardContext';
import { content } from 'components/common/internal-navbar/components/navbar-item/navbar-item.css';

interface NewCommentProps {
  cardId: string;
  listId: string;
}

export function NewComment({ cardId, listId }: NewCommentProps) {
  const initials = useInitials();
  const boardId = useBoardContext();
  const mutation = useAddComment(cardId, listId, boardId);

  const [comment, setComment] = React.useState('');
  const [isAddingComment, setIsAddingComment] = React.useState(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const saveButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClickOutsideRef = React.useRef<(e: MouseEvent) => void>();

  const handleAddComment = () => {
    mutation.mutate({ body: comment });
    setComment('');
    textAreaRef.current?.blur();
    saveButtonRef.current?.blur();
  };

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (!isAddingComment) {
        return;
      }
      if (
        e.target === textAreaRef.current ||
        e.target === saveButtonRef.current
      ) {
        return;
      }
      setIsAddingComment(false);
    },
    [isAddingComment]
  );

  React.useEffect(() => {
    if (handleClickOutsideRef.current) {
      window.removeEventListener('mousedown', handleClickOutsideRef.current);
    }
    window.addEventListener('mousedown', handleClickOutside);
    handleClickOutsideRef.current = handleClickOutside;
    return () => {
      if (handleClickOutsideRef.current) {
        window.removeEventListener('mousedown', handleClickOutsideRef.current);
      }
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  React.useEffect(() => {
    if (!comment || !textAreaRef.current) return;
    textAreaRef.current.style.height = String(
      textAreaRef.current?.scrollHeight
    );
  }, [comment]);

  return (
    <section className={styles.commentContainer}>
      <div className={styles.initials}>{initials}</div>
      <div
        className={styles.textAreaContainer}
        style={{
          padding: isAddingComment ? '0.75rem 0.75rem 3.3rem' : 0,
        }}
      >
        <textarea
          ref={textAreaRef}
          placeholder="Write a comment..."
          className={styles.textArea}
          style={{ padding: isAddingComment ? 0 : '0.75rem 0.75rem 0' }}
          value={comment}
          onClick={() => setIsAddingComment(true)}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className={styles.controls}>
          <button
            ref={saveButtonRef}
            className={baseStyles.saveButton}
            onClick={(e) => {
              e.stopPropagation();
              handleAddComment();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
}
