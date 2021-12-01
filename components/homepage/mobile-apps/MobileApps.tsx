import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as styles from './mobile-apps.css';

export function MobileApps() {
  return (
    <section className={styles.backdrop}>
      <div className={styles.container}>
        <p className={styles.text}>
          Trello also works great on your smaller screen.
        </p>
        <Link
          href="https://apps.apple.com/app/trello-organize-anything/id461504587"
          passHref
        >
          <a className={styles.imageWrapper}>
            <Image
              src="/images/logos/app-store.svg"
              alt="app store logo"
              width={150}
              height={45}
            />
          </a>
        </Link>
        <Link
          href="https://play.google.com/store/apps/details?id=com.trello"
          passHref
        >
          <a className={styles.imageWrapper}>
            <Image
              src="/images/logos/google-play.svg"
              alt="app store logo"
              width={150}
              height={45}
            />
          </a>
        </Link>
      </div>
    </section>
  );
}
