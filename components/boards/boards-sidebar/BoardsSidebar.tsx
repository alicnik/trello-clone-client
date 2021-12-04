import Link from 'next/link';

import { HiOutlineTemplate } from 'react-icons/hi';
import { FaTrello } from 'react-icons/fa';
import { VscPulse } from 'react-icons/vsc';

import * as styles from './boards-sidebar.css';
import { useRouter } from 'next/router';

interface BoardsSidebarProps {
  username: string;
}

export function BoardsSidebar({ username }: BoardsSidebarProps) {
  const router = useRouter();
  const isOnBoardsPath = (router.pathname = '/[username]/boards');
  return (
    <aside className={styles.aside}>
      <ul className={styles.list}>
        <li>
          <Link href={`/${username}/boards`} passHref>
            <a
              className={styles.navLink}
              style={{
                color: isOnBoardsPath ? '#0079BF' : undefined,
                backgroundColor: isOnBoardsPath ? '#E4F0F6' : undefined,
              }}
            >
              <FaTrello /> <span>Boards</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/templates" passHref>
            <a className={styles.navLink} onClick={(e) => e.preventDefault()}>
              <HiOutlineTemplate /> <span>Templates</span>
            </a>
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: '/[username]',
              query: { username },
            }}
            passHref
          >
            <a className={styles.navLink}>
              <VscPulse /> <span>Home</span>
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
