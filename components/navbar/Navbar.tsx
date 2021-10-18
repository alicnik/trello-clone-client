import * as React from 'react';
import Link from 'next/link';
import { Button } from '../button';
import { Logo } from '../logos/TrelloLogo';
import styles from './navbar.module.scss';
import clsx from 'clsx';

interface NavbarProps {
  intersectionRef: HTMLElement | null;
}

export const Navbar = ({ intersectionRef }: NavbarProps) => {
  const [isOverlay, setIsOverlay] = React.useState(false);

  React.useLayoutEffect(() => {
    if (!intersectionRef) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setIsOverlay(!entries[0].isIntersecting),
      { rootMargin: '-580px 0px 0px 0px' }
    );

    observer.observe(intersectionRef);

    return () => observer.unobserve(intersectionRef);
  }, [intersectionRef]);

  return (
    <header className={clsx(styles.header, isOverlay && styles.overlay)}>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.logo}>
            <Logo />
          </a>
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
