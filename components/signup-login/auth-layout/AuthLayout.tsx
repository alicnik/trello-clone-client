import Image from 'next/image';
import {
  FooterWrapper,
  FooterLanguageSelect,
  FooterLogo,
  FooterLinks,
} from 'components/common';
import * as styles from './auth-layout.css';

export function AuthLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className={styles.container}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: 'url(/images/login-signup-bg-left.svg)' }}
      ></div>
      <div className={styles.content}>
        <div>
          <header className={styles.header}>
            <Image
              src="/images/logos/trello-logo-blue.svg"
              alt="Trello logo"
              width={197}
              height={43}
            />
          </header>
          <main className={styles.main}>{children}</main>
        </div>
        <FooterWrapper style={{ paddingBottom: 0 }}>
          <FooterLanguageSelect />
          <hr className={styles.hr} />
          <FooterLogo colour="blue" />
          <FooterLinks
            style={{ textDecoration: 'none', fontSize: 14, fontWeight: 300 }}
          />
        </FooterWrapper>
      </div>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: 'url(/images/login-signup-bg-right.svg)' }}
      ></div>
    </div>
  );
}
