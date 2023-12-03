import * as React from 'react';
import * as styles from './learn-more-expandable.css';

export const LearnMoreExpandable = ({ children }: React.PropsWithChildren) => {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>Learn more</summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
};
