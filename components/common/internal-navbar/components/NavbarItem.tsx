import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as styles from './navbar-item.css';
import { VscChromeClose } from 'react-icons/vsc';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { Board, getSingleUser, User } from 'utils/api';
import { getBackground } from 'utils';
import { FavouriteStar } from 'components/common';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface NavbarItemProps {
  title: string;
  label: string;
  type?: 'recent' | 'starred';
}

export function NavbarItem({ title, label, type = 'recent' }: NavbarItemProps) {
  const {
    query: { username },
  } = useRouter();
  const { data: session, status } = useSession();
  const { data: user } = useQuery(['users', username], () => {
    if (status === 'loading' || !session) return;
    return getSingleUser(username as string, session?.accessToken as string);
  });
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef(null);
  const [hasInteractedOutside, setHasInteractedOutside] = React.useState(false);

  if (!user) return null;

  const { recentBoards, starredBoards } = user;

  return (
    <DropdownMenu.Root modal={false} open={open}>
      <DropdownMenu.Trigger asChild>
        <li
          className={styles.listItem}
          ref={triggerRef}
          onClick={() => {
            console.log('hasInteractedOutside', hasInteractedOutside);
            if (hasInteractedOutside) {
              setHasInteractedOutside(false);
              return;
            }
            console.log('open is currently', open);
            setOpen(!open);
          }}
        >
          {title}
          <HiOutlineChevronDown className={styles.downChevron} />
        </li>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className={styles.content}
        sideOffset={15}
        align="start"
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;
          const isTriggerElement =
            target === triggerRef.current ||
            target.parentElement === triggerRef.current ||
            target.parentElement.parentElement === triggerRef.current;
          if (isTriggerElement) {
            setHasInteractedOutside(true);
          }
          setOpen(false);
        }}
      >
        <header className={styles.labelContainer}>
          <DropdownMenu.Label className={styles.label}>
            {label}
          </DropdownMenu.Label>
          <span className={styles.closeButton} onClick={() => setOpen(false)}>
            <VscChromeClose />
          </span>
        </header>
        {type === 'recent'
          ? recentBoards.map((board) => (
              <DropdownMenuItem key={board.id} board={board} user={user} />
            ))
          : starredBoards.map((board) => (
              <DropdownMenuItem key={board.id} board={board} user={user} />
            ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

interface DropdownMenuItemProps {
  board: Board;
  user: User;
}

function DropdownMenuItem({ board, user }: DropdownMenuItemProps) {
  const isFavourite = user.starredBoards.some((b) => b.id === board.id);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  return (
    <DropdownMenu.Item
      className={styles.dropdownItem}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div
        className={styles.boardThumbnail}
        style={getBackground(board.backgroundThumbnail)}
      />
      <p className={styles.boardName}>{board.boardName}</p>
      {isFavourite || isMouseOver ? (
        <FavouriteStar
          board={board}
          isFavourite={isFavourite}
          className={styles.favourite}
        />
      ) : null}
    </DropdownMenu.Item>
  );
}
