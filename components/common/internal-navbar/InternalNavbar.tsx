import * as React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { removeToken } from 'utils/api/lib';
import { NavbarItem } from './components/navbar-item';
import * as styles from './internal-navbar.css';
import { DropdownBoardsContent } from './components';
import { DropdownCreateBoardItem } from './components/dropdown-create-board-item';
import { DropdownAccountItem } from './components/dropdown-account-item';
import { useCustomSession } from 'hooks';

interface InternalNavbarProps {
  username: string;
  colour?: 'translucent' | 'blue';
}

export function InternalNavbar({
  username,
  colour = 'translucent',
}: InternalNavbarProps) {
  const { initials } = useCustomSession();

  return (
    <header
      className={clsx(
        styles.header,
        colour === 'translucent' ? styles.blurredHeader : styles.blueHeader
      )}
    >
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href={`/${username}/boards`} passHref>
              <div className={styles.logo} />
            </Link>
          </li>
          <NavbarItem title="Recent" label="Recent boards">
            <DropdownBoardsContent type="recent" />
          </NavbarItem>
          <NavbarItem title="Starred" label="Starred boards">
            <DropdownBoardsContent type="starred" />
          </NavbarItem>
          <NavbarItem
            className={styles.createButton}
            title="Create"
            label="Create"
            withChevron={false}
          >
            <DropdownCreateBoardItem />
          </NavbarItem>
        </ul>
        <div className={styles.rightNav}>
          <input type="search" />
          <NavbarItem
            title={initials ?? 'YOU'}
            label="Account"
            withChevron={false}
            className={styles.userButton}
          >
            <DropdownAccountItem />
          </NavbarItem>
        </div>
      </nav>
    </header>
  );
}
