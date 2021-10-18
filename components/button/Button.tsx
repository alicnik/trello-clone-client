import Link from 'next/link';
import * as React from 'react';
import styles from './button.module.scss';
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
  const classes = `${styles.button} ${styles[variant]} ${styles[fontWeight]}`;
  if (to) {
    return (
      <Link href={to}>
        <a className={clsx(classes, className)}>{children}</a>
      </Link>
    );
  }
  return (
    <button className={clsx(classes, styles['button-nolink'], className)}>
      {children}
    </button>
  );
};
