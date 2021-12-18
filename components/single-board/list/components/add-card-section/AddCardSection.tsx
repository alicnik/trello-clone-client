import { useAddCard } from 'hooks';
import * as React from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import * as styles from '../../list.css';

interface AddCardSectionProps {
  boardId: string;
  listId: string;
  isAddingCard: boolean;
  setIsAddingCard: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddCardSection({
  boardId,
  listId,
  isAddingCard,
  setIsAddingCard,
}: AddCardSectionProps) {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const addCardButtonRef = React.useRef<HTMLButtonElement>(null);
  const handleClickOutsideRef = React.useRef<(e: MouseEvent) => void>();
  const [cardToAdd, setCardToAdd] = React.useState({
    title: '',
    board: { id: boardId },
  });
  const mutation = useAddCard();

  const handleAddCard = React.useCallback(() => {
    mutation.mutate({
      boardId,
      listId,
      newCard: cardToAdd,
    });
    setCardToAdd({ board: { id: boardId }, title: '' });
  }, [boardId, cardToAdd, listId, mutation]);

  React.useEffect(() => {
    if (isAddingCard && !cardToAdd.title) {
      textAreaRef.current?.focus();
    }
  }, [isAddingCard, cardToAdd.title]);

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      console.log('running in AddCardSection');
      if (!isAddingCard) {
        return;
      }
      if (
        e.target === addCardButtonRef.current ||
        e.target === textAreaRef.current
      ) {
        return;
      }
      if (cardToAdd.title) {
        handleAddCard();
      }
      setIsAddingCard(false);
    },
    [cardToAdd.title, handleAddCard, isAddingCard, setIsAddingCard]
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

  return (
    <div>
      <textarea
        ref={textAreaRef}
        className={styles.textarea}
        placeholder="Enter a title for this card..."
        value={cardToAdd.title}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            e.preventDefault();
            if (cardToAdd.title) {
              handleAddCard();
            }
          }
        }}
        onChange={(e) => {
          setCardToAdd({ ...cardToAdd, title: e.currentTarget.value });
        }}
      />
      <div className={styles.addCardButtonContainer}>
        <button
          ref={addCardButtonRef}
          className={styles.addCardButton}
          disabled={!cardToAdd.title}
          onClick={handleAddCard}
        >
          Add card
        </button>
        <VscChromeClose
          className={styles.closeIcon}
          onClick={() => setIsAddingCard(false)}
        />
      </div>
    </div>
  );
}
