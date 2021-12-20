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
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const saveButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleAddComment = React.useCallback(() => {
    mutation.mutate({ body: comment });
    setComment('');
    textAreaRef.current?.blur();
    // saveButtonRef.current?.blur();
    setIsAddingComment(false);
  }, [comment, mutation]);

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (!isAddingComment) {
        return;
      }
      if (isAddingComment && comment && e.target === saveButtonRef.current) {
        handleAddComment();
        return;
      }
      if (isAddingComment && comment) {
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
    [comment, handleAddComment, isAddingComment]
  );
  useClickOutside(handleClickOutside);

  React.useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }
    // Recalculate textarea height/rows depending on number of line breaks
    if (!comment) {
      textAreaRef.current.rows = 1;
      return;
    }
    // Reset height to 0 before using scrollHeight as otherwise scrollHeight does
    // not update when content decreases in number of lines
    textAreaRef.current.style.height = '0';
    textAreaRef.current.rows = (textAreaRef.current.scrollHeight - 38) / 24 + 1;
    // Reset height to auto once scrollHeight calculation is done to ensure expected UI
    textAreaRef.current.style.height = 'auto';
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
            placeholder="Write a comment..."
            className={styles.textArea}
            value={comment}
            onClick={(e) => isAddingComment && e.preventDefault()}
            onChange={(e) => setComment(e.target.value)}
            onFocus={() => setIsAddingComment(true)}
            onKeyDown={(e) => {
              if (e.code === 'Enter' && (!!e.metaKey || !!e.ctrlKey)) {
                e.preventDefault();
                handleAddComment();
              }
            }}
          />
        </Collapsible.Trigger>
        <Collapsible.Content className={styles.contentStyles}>
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
        </Collapsible.Content>
      </Collapsible.Root>
    </section>
  );
}
