import { useClickOutside, useUpdateListTitle } from 'hooks';
import * as React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import * as styles from '../../list.css';

interface ListTitleProps {
  title: string;
  boardId: string;
  listId: string;
  dragProvided: DraggableProvided;
}

export function ListTitle({
  title,
  boardId,
  listId,
  dragProvided,
}: ListTitleProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const titleMutation = useUpdateListTitle({ boardId, listId });
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);

  const handleUpdateTitle = () => {
    titleMutation.mutate({ title: newTitle });
    setIsEditingTitle(false);
  };

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (!isEditingTitle) {
        return;
      }
      if (e.target === inputRef.current) {
        return;
      }
      setIsEditingTitle(false);
    },
    [isEditingTitle]
  );
  useClickOutside(handleClickOutside);


  React.useEffect(() => {
    if (!isEditingTitle) {
      return;
    }
    inputRef.current?.select();
  }, [isEditingTitle]);

  return isEditingTitle ? (
    <input
      ref={inputRef}
      type="text"
      className={styles.titleInput}
      value={newTitle}
      onChange={(e) => {
        if (!e.target.value) {
          return setNewTitle(title);
        }
        setNewTitle(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.code === 'Enter') {
          e.preventDefault();
          handleUpdateTitle();
        }
      }}
      onBlur={handleUpdateTitle}
    />
  ) : (
    <h2
      className={styles.listTitle}
      onClick={() => setIsEditingTitle(true)}
      {...dragProvided.dragHandleProps}
    >
      {title}
    </h2>
  );
}
