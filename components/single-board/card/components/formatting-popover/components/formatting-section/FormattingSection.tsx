import * as styles from './formatting-section.css';

interface FormattingSectionProps {
  heading: string;
  isLast?: boolean;
}

export function FormattingSection({
  heading,
  isLast = false,
  children,
}: React.PropsWithChildren<FormattingSectionProps>) {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>{heading}</p>
        <code className={styles.code}>{children}</code>
      </div>
      {!isLast && <hr className={styles.hr} />}
    </>
  );
}
