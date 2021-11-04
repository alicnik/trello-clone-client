import Link from 'next/link';
import * as React from 'react';
import * as styles from './button.css';
import clsx from 'clsx';

interface ButtonProps {
  variant: 'filled' | 'outlined' | 'link';
  fontWeight?: 'regular' | 'medium';
  className?: string;
  to?: string;
}

export const Button = ({
  variant,
  to,
  className,
  fontWeight = 'regular',
  children,
}: React.PropsWithChildren<ButtonProps>) => {
  const classes = clsx(styles.button, styles[variant], styles[fontWeight]);

  if (to) {
    return (
      <Link href={to}>
        <a className={clsx(classes, className)}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={clsx(classes, styles.buttonNoLink, className)}>
      {children}
    </button>
  );
};
