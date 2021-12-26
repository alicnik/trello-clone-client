import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { signOut } from 'next-auth/react';
import * as styles from './dropdown-account-item.css';

export function DropdownAccountItem() {
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <div className={styles.container}>
      <p className={styles.logOut} onClick={handleLogout}>
        Log out
      </p>
    </div>
  );
}
