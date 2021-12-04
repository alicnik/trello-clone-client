import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import * as styles from './board-card.css';
import { VscChromeClose } from 'react-icons/vsc';
import { unsplashData } from './unsplash';
import { createBoard } from 'utils/api/boards';
import { useRouter } from 'next/router';

export function CreateBoardCard() {
  const router = useRouter();
  const [unsplashPhotos, setUnsplashPhotos] = React.useState(unsplashData);
  const suggestedBackgrounds = unsplashPhotos
    .slice(0, 4)
    .map((photo) => `url("${photo.urls.thumb}")`)
    .concat([
      'rgb(0, 121, 191)',
      'rgb(210, 144, 52)',
      'rgb(81, 152, 57)',
      'rgb(176, 70, 50)',
    ]);
  const [form, setForm] = React.useState({
    boardName: '',
    background: suggestedBackgrounds[0] ?? 'rgba(0, 0, 0, 0)',
  });

  const getBackground = (value: string) => {
    return value.includes('unsplash')
      ? { backgroundImage: value }
      : { backgroundColor: value };
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, boardName: e.target.value });
  };

  const handleCreateBoardClick = async () => {
    try {
      const newBoard = await createBoard(form);
      router.push(`/boards/${newBoard.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Trigger asChild>
        <div className={clsx(styles.boardCard, styles.createBoardCard)}>
          <p className={styles.createBoardText}>Create new board</p>
        </div>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Content className={styles.content}>
        <div className={styles.dialogContentContainer}>
          <div
            className={styles.titleInputContainer}
            style={getBackground(form.background)}
          >
            <div
              className={styles.titleInputBackdrop}
              style={{
                backgroundImage: form.background.includes('unsplash')
                  ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'
                  : undefined,
              }}
            >
              <input
                type="text"
                className={styles.titleInput}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                placeholder="Add board title"
                aria-label="Add board title"
                value={form.boardName}
                onChange={handleTitleChange}
              />
              <DialogPrimitive.Close className={styles.closeIcon} asChild>
                <span>
                  <VscChromeClose />
                </span>
              </DialogPrimitive.Close>
            </div>
          </div>
          <div className={styles.backgroundChoices}>
            {suggestedBackgrounds.map((value) => {
              console.log(`url(${value})`);
              return (
                <button
                  key={value}
                  className={styles.backgroundThumbnail}
                  onClick={() => setForm({ ...form, background: value })}
                  style={getBackground(value)}
                />
              );
            })}
          </div>
        </div>
        <button
          className={clsx(
            styles.createBoardButton,
            !form.boardName && styles.buttonDisabled
          )}
          onClick={handleCreateBoardClick}
          disabled={!form.boardName}
        >
          Create board
        </button>
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
}
