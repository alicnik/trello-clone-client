import Link from 'next/link';
import * as React from 'react';
import * as styles from './footer.css';
import Image from 'next/image';

interface FooterWrapperProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function FooterWrapper({ style, children }: FooterWrapperProps) {
  return (
    <footer className={styles.footer} style={style}>
      {children}
    </footer>
  );
}

export function FooterLanguageSelect() {
  return (
    <select className={styles.dropdown}>
      <option value="en-GB">English (UK)</option>
    </select>
  );
}

export function FooterLinks({ style }: { style?: React.CSSProperties }) {
  return (
    <ul className={styles.list} style={style}>
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
  );
}

const logos = {
  blue: '/images/logos/atlassian-logo-blue-small.svg',
  grey: '/images/logos/atlassian-logo-gray-small.svg',
};

export function FooterLogo({ colour }: { colour: 'blue' | 'grey' }) {
  return (
    <Image
      src={logos[colour]}
      alt="Atlassian logo"
      className={styles.image}
      width={150}
      height={20}
    />
  );
}

export function FooterCopyrightNotice() {
  return (
    <small className={styles.copyright}>
      &copy; Copyright 2021. All rights reserved.
    </small>
  );
}
