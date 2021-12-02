import Link from 'next/link';
import * as React from 'react';
import * as styles from './footer.css';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <select className={styles.dropdown}>
        <option value="en-GB">English (UK)</option>
      </select>
      <ul className={styles.list}>
        <li>
          <Link href="/templates">Templates</Link>
        </li>
        <li>
          <Link href="/pricing">Pricing</Link>
        </li>
        <li>
          <Link href="#">Apps</Link>
        </li>
        <li>
          <Link href="#">Jobs</Link>
        </li>
        <li>
          <Link href="#">Blog</Link>
        </li>
        <li>
          <Link href="#">Developers</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="#">Help</Link>
        </li>
        <li>
          <Link href="/legal">Legal</Link>
        </li>
        <li>
          <Link href="#">Cookie Settings</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy</Link>
        </li>
      </ul>
      <Image
        src="/images/logos/atlassian-logo-gray-small.svg"
        alt="Atlassian logo"
        className={styles.image}
        width={150}
        height={20}
      />
      <small className={styles.copyright}>
        &copy; Copyright 2021. All rights reserved.
      </small>
    </footer>
  );
}
