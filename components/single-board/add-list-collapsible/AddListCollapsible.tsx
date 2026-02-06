import * as React from 'react';
import { FiPlus } from 'react-icons/fi';
import { VscChromeClose } from 'react-icons/vsc';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useAddList, useClickOutside } from 'hooks';
import * as styles from './add-list-collapsible.css';

interface AddListCollapsibleProps {
  boardId: string;
  listContainerRef: React.RefObject<HTMLDivElement | null>;
}

export function AddListCollapsible({
  boardId,
  listContainerRef,
}: AddListCollapsibleProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const addListButtonRef = React.useRef<HTMLDivElement>(null);

  const [isAddingList, setIsAddingList] = React.useState(false);
  const [newList, setNewList] = React.useState({ title: '' });
  const [scrollToEnd, setScrollToEnd] = React.useState(false);
  const mutation = useAddList();

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (!isAddingList) {
        return;
      }
      const descendants = Array.from(
        addListButtonRef.current?.querySelectorAll('*') || [],
      );
      const isInListInputContainer = [
        ...descendants,
        addListButtonRef.current,
      ].some((el) => el === e.target);
      if (isInListInputContainer) {
        return;
      }
      setIsAddingList(false);
    },
    [isAddingList],
  );
  useClickOutside(handleClickOutside);

  React.useEffect(() => {
    const scrollWidth = listContainerRef.current?.scrollWidth ?? 0;
    listContainerRef.current?.scrollTo({ top: 0, left: scrollWidth + 900 });
    setScrollToEnd(false);
  }, [listContainerRef, scrollToEnd]);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [isAddingList]);

  const handleAddList = () => {
    mutation.mutate({ boardId, newList });
    setNewList({ title: '' });
    setScrollToEnd(true);
  };

  return (
    <Collapsible.Root
      ref={addListButtonRef}
      className={styles.addListContainer}
      open={isAddingList}
      onOpenChange={setIsAddingList}
    >
      <Collapsible.Trigger asChild>
        {!isAddingList ? (
          <div className={styles.addListButton}>
            <FiPlus className={styles.plusIcon} />
            Add a list
          </div>
        ) : null}
      </Collapsible.Trigger>
      <Collapsible.Content className={styles.collapsibleContent}>
        {isAddingList && (
          <>
            <input
              ref={inputRef}
              className={styles.input}
              placeholder="Enter list title..."
              type="text"
              value={newList.title}
              onChange={(e) => setNewList({ title: e.target.value })}
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  e.preventDefault();
                  handleAddList();
                }
              }}
            />
            <div className={styles.addCardButtonContainer}>
              <button
                className={styles.addCardButton}
                disabled={!newList.title}
                onClick={handleAddList}
              >
                Add list
              </button>
              <VscChromeClose
                className={styles.closeIcon}
                onClick={() => setIsAddingList(false)}
              />
            </div>
          </>
        )}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
