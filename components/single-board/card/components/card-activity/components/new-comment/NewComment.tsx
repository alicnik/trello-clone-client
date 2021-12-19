import * as React from 'react';
import { useAddComment, useClickOutside, useCustomSession } from 'hooks';
import * as styles from './new-comment.css';
import * as baseStyles from '../../../description-editor/description-editor.css';
import { useBoardContext } from 'hooks';
import * as Collapsible from '@radix-ui/react-collapsible';

interface NewCommentProps {
  cardId: string;
  listId: string;
}

export function NewComment({ cardId, listId }: NewCommentProps) {
  const { initials } = useCustomSession();
  const boardId = useBoardContext();
  const mutation = useAddComment(cardId, listId, boardId);

  const [comment, setComment] = React.useState('');
  const [isAddingComment, setIsAddingComment] = React.useState(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const saveButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleAddComment = React.useCallback(() => {
    mutation.mutate({ body: comment });
    setComment('');
    textAreaRef.current?.blur();
    saveButtonRef.current?.blur();
    setIsAddingComment(false);
  }, [comment, mutation]);

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      console.log('click in outside');
      if (!isAddingComment) {
        return;
      }
      if (isAddingComment && comment && e.target === saveButtonRef.current) {
        handleAddComment();
        return;
      }
      if (
        e.target === textAreaRef.current ||
        e.target === saveButtonRef.current
      ) {
        console.log('the current thing');
        return;
      }
      setIsAddingComment(false);
    },
    [comment, handleAddComment, isAddingComment]
  );
  useClickOutside(handleClickOutside);

  React.useEffect(() => {
    if (!comment || !textAreaRef.current) return;
    textAreaRef.current.style.height = String(textAreaRef.current.scrollHeight);
  }, [comment]);

  return (
    <section className={styles.commentContainer}>
      <div className={styles.initials}>{initials}</div>
      <Collapsible.Root
        defaultOpen
        open={isAddingComment}
        onOpenChange={setIsAddingComment}
        className={styles.textAreaContainer}
      >
        <Collapsible.Trigger asChild>
          <textarea
            ref={textAreaRef}
            rows={1}
            placeholder="Write a comment..."
            className={styles.textArea}
            value={comment}
            onClick={(e) => isAddingComment && e.preventDefault()}
            onChange={(e) => setComment(e.target.value)}
            onFocus={() => {
              if (textAreaRef.current) {
                textAreaRef.current.rows = 2;
              }
              setIsAddingComment(true);
            }}
            onBlur={() => {
              if (textAreaRef.current) {
                textAreaRef.current.rows = 1;
              }
            }}
          />
        </Collapsible.Trigger>
        <Collapsible.Content className={styles.contentStyles}>
          <button
            ref={saveButtonRef}
            className={baseStyles.saveButton}
            onClick={(e) => {
              console.log('click');
              e.stopPropagation();
              handleAddComment();
            }}
          >
            Save
          </button>
        </Collapsible.Content>
      </Collapsible.Root>
    </section>
  );
}
