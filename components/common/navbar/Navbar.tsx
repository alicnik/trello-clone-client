import * as React from 'react';
import Link from 'next/link';
import { Button } from '../button';
import { Logo } from '../logos/TrelloLogo';
import * as styles from './navbar.css';
import clsx from 'clsx';

interface NavbarProps {
  isScrolling: boolean;
}

export const Navbar = ({ isScrolling }: NavbarProps) => {
  return (
    <header className={clsx(styles.header, isScrolling && styles.overlay)}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo} passHref>
          <Logo />
        </Link>
        <Button variant="link" to="/login">
          Log in
        </Button>
        <Button variant="filled" to="/signup" fontWeight="medium">
          Sign up
        </Button>
      </nav>
    </header>
  );
};
