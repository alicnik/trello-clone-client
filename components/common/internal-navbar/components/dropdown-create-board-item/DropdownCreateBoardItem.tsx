import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Popover from '@radix-ui/react-popover';
import * as styles from './dropdown-create-board-item.css';
import {
  unsplashData,
  UnsplashItem,
} from 'components/boards-index/board-card/components/unsplash';
import { BackgroundPicker } from 'components/boards-index/board-card/components/background-picker';
import { getBackground } from 'utils';
import clsx from 'clsx';
import { BsThreeDots } from 'react-icons/bs';
import { createBoard } from 'utils/api';
import { useRouter } from 'next/router';
import { useNavbarContext } from '..';
import { useCustomSession } from 'hooks';

export interface Form {
  boardName: string;
  background: string;
}

export function DropdownCreateBoardItem() {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { accessToken } = useCustomSession();
  const [unsplashPhotos, setUnsplashPhotos] =
    React.useState<UnsplashItem[]>(unsplashData);
  const suggestedUnsplashPhotos = unsplashPhotos
    .slice(0, 4)
    .map((photo) => photo.urls.thumb);
  const suggestedColourBackgrounds = [
    'rgb(0, 121, 191)',
    'rgb(210, 144, 52)',
    'rgb(81, 152, 57)',
    'rgb(176, 70, 50)',
    'rgb(137, 96, 158)',
  ];

  const [form, setForm] = React.useState<Form>(() => {
    const existingValues = sessionStorage.getItem(
      'dropdown-create-board-values'
    );
    if (existingValues) {
      return JSON.parse(existingValues);
    }
    return {
      boardName: '',
      background: suggestedUnsplashPhotos[0],
    };
  });
  const [touched, setTouched] = React.useState(false);
  const { closeDropdown } = useNavbarContext();

  React.useEffect(() => {
    sessionStorage.setItem(
      'dropdown-create-board-values',
      JSON.stringify(form)
    );
  }, [form]);

  const handleCreateBoardClick = async () => {
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
      closeDropdown();
      sessionStorage.removeItem('dropdown-create-board-values');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div
        className={styles.boardPreview}
        style={getBackground(form.background)}
      >
        <div className={styles.previewOverlay} />
      </div>
      <p className={styles.subheading}>Background</p>
      <BackgroundPicker
        form={form}
        setForm={setForm}
        unsplashPhotos={unsplashPhotos}
        setUnsplashPhotos={setUnsplashPhotos}
        side="right"
        shouldOffsetAlignment={true}
        alignOffset={-100}
        sideOffset={8}
        asModal={false}
      >
        <div className={styles.thumbnailContainer}>
          {suggestedUnsplashPhotos.map((value) => (
            <Thumbnail
              key={value}
              background={value}
              thumbnailStyles={styles.unsplashThumbnail}
              form={form}
              setForm={setForm}
            />
          ))}
        </div>
        <div className={styles.thumbnailContainer}>
          {suggestedColourBackgrounds.map((value) => (
            <Thumbnail
              key={value}
              background={value}
              thumbnailStyles={styles.colourThumbnail}
              form={form}
              setForm={setForm}
            />
          ))}
          <Popover.Trigger asChild>
            <button className={styles.colourThumbnail}>
              <BsThreeDots className={styles.ellipsisIcon} />
            </button>
          </Popover.Trigger>
        </div>
      </BackgroundPicker>

      <label
        htmlFor="board-title"
        className={clsx(styles.subheading, styles.boardTitleLabel)}
      >
        Board title
      </label>
      <input
        type="text"
        ref={inputRef}
        className={styles.boardTitleInput}
        value={form.boardName}
        onChange={(e) => setForm({ ...form, boardName: e.target.value })}
        onBlur={() => setTouched(true)}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            e.preventDefault();
            handleCreateBoardClick();
          }
        }}
      />
      {!form.boardName && touched && (
        <p className={styles.error}>
          <span role="img" aria-label="wave" className={styles.errorEmoji}>
            👋
          </span>{' '}
          Board title is required
        </p>
      )}
      <input
        type="submit"
        value="Create"
        className={styles.submitButton}
        disabled={!form.boardName}
        onClick={handleCreateBoardClick}
      />
    </div>
  );
}

interface ThumbnailProps {
  background: string;
  thumbnailStyles: string;
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}

export function Thumbnail({
  background,
  thumbnailStyles,
  form,
  setForm,
}: ThumbnailProps) {
  return (
    <button
      key={background}
      className={clsx(
        thumbnailStyles,
        form.background === background && styles.chosenBackground
      )}
      onClick={() => setForm({ ...form, background })}
      style={getBackground(background)}
    />
  );
}
