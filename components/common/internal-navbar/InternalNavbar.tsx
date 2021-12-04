import clsx from 'clsx';
import Link from 'next/link';
import * as styles from './internal-navbar.css';

interface InternalNavbarProps {
  username: string;
  colour?: 'translucent' | 'blue';
}

export function InternalNavbar({
  username,
  colour = 'translucent',
}: InternalNavbarProps) {
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
          <li className={styles.listItem}>Recent</li>
          <li className={styles.listItem}>Starred</li>
          <li className={styles.listItem}>Create</li>
        </ul>
        <div className={styles.rightNav}>
          <input type="search" />
          <div>AN</div>
        </div>
      </nav>
    </header>
  );
}
