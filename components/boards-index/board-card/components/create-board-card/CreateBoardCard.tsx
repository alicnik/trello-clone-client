import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import * as baseStyles from '../../board-card.css';
import * as dialogStyles from './dialog.css';
import { VscChromeClose } from 'react-icons/vsc';
import { unsplashData, UnsplashItem } from '../unsplash';
import { createBoard } from 'utils/api/boards';
import { useRouter } from 'next/router';
import { getBackground } from 'utils';
import { BackgroundPicker } from '../background-picker/BackgroundPicker';
import * as Popover from '@radix-ui/react-popover';
import * as popoverStyles from '../background-picker/popover.css';
import { BsThreeDots } from 'react-icons/bs';
import { useCustomSession } from 'hooks';
import { FaSpinner } from 'react-icons/fa';

export function CreateBoardCard() {
  const router = useRouter();
  const { accessToken } = useCustomSession();
  const [unsplashPhotos, setUnsplashPhotos] =
    React.useState<UnsplashItem[]>(unsplashData);
  const suggestedBackgrounds = unsplashPhotos
    .slice(0, 4)
    .map((photo) => photo.urls.thumb)
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
  const [isLoading, setIsLoading] = React.useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, boardName: e.target.value });
  };

  const handleCreateBoard = async () => {
    setIsLoading(true);
    let newBoard;
    try {
      if (form.background.includes('unsplash')) {
        const fullImgUrl = unsplashData.find((p) =>
          form.background.includes(p.urls.thumb)
        )?.urls.full;
        if (!fullImgUrl) throw new Error();
        newBoard = await createBoard(
          {
            ...form,
            background: fullImgUrl,
            backgroundThumbnail: form.background,
          },
          accessToken
        );
      } else {
        newBoard = await createBoard(
          {
            ...form,
            backgroundThumbnail: form.background,
          },
          accessToken
        );
      }

      const username = router.query.username;
      router.push({
        pathname: `/${username}/boards/${newBoard.id}`,
        query: { username },
      });
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Overlay className={dialogStyles.overlay} />
      <DialogPrimitive.Trigger asChild>
        <div className={clsx(baseStyles.boardCard, baseStyles.createBoardCard)}>
          <p className={baseStyles.createBoardText}>Create new board</p>
        </div>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Content
        className={dialogStyles.content}
        aria-label="Create new board"
      >
        <div className={dialogStyles.dialogContentContainer}>
          <div
            className={dialogStyles.titleInputContainer}
            style={getBackground(form.background)}
          >
            <div
              className={dialogStyles.titleInputBackdrop}
              style={{
                backgroundImage: form.background.includes('unsplash')
                  ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'
                  : undefined,
              }}
            >
              <input
                type="text"
                className={dialogStyles.titleInput}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                placeholder="Add board title"
                aria-label="Add board title"
                value={form.boardName}
                onChange={handleTitleChange}
                onKeyDown={(e) => {
                  if (e.code === 'Enter') {
                    e.preventDefault();
                    setIsLoading(true);
                    handleCreateBoard();
                  }
                }}
              />
              <DialogPrimitive.Close className={dialogStyles.closeIcon} asChild>
                <span>
                  <VscChromeClose />
                </span>
              </DialogPrimitive.Close>
            </div>
          </div>
          <BackgroundPicker
            form={form}
            setForm={setForm}
            unsplashPhotos={unsplashPhotos}
            setUnsplashPhotos={setUnsplashPhotos}
            backgroundContainerStyles={dialogStyles.backgroundChoices}
            asModal={true}
          >
            {suggestedBackgrounds.map((value) => {
              return (
                <button
                  key={value}
                  className={clsx(
                    dialogStyles.backgroundThumbnail,
                    form.background === value && dialogStyles.chosenBackground
                  )}
                  onClick={() => setForm({ ...form, background: value })}
                  style={getBackground(value)}
                />
              );
            })}
            <Popover.Trigger asChild>
              <button className={dialogStyles.backgroundThumbnail}>
                <BsThreeDots className={popoverStyles.ellipsisIcon} />
              </button>
            </Popover.Trigger>
          </BackgroundPicker>
        </div>
        <button
          className={clsx(
            dialogStyles.createBoardButton,
            !form.boardName && dialogStyles.buttonDisabled
          )}
          onClick={() => {
            setIsLoading(true);
            handleCreateBoard();
          }}
          disabled={!form.boardName || isLoading}
        >
          {isLoading ? (
            <FaSpinner className={dialogStyles.spinner} />
          ) : (
            'Create board'
          )}
        </button>
      </DialogPrimitive.Content>
    </DialogPrimitive.Root>
  );
}
