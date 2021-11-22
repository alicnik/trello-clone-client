import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as styles from './mobile-apps.css';

export function MobileApps() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Trello also works great on your smaller screen.
      </p>
      <Link
        href="https://apps.apple.com/app/trello-organize-anything/id461504587"
        passHref
      >
        <Image
          src="/images/logos/app-store.svg"
          layout="fixed"
          alt="app store logo"
          width={217}
          height={64}
        />
      </Link>
      <Link
        href="https://play.google.com/store/apps/details?id=com.trello"
        passHref
      >
        <Image
          src="/images/logos/google-play.svg"
          layout="fixed"
          alt="app store logo"
          width={217}
          height={64}
        />
      </Link>
    </div>
  );
}
