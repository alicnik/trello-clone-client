import Link from 'next/link';
import * as React from 'react';
import * as styles from './button.css';
import clsx from 'clsx';

interface ButtonProps {
  variant: 'filled' | 'outlined' | 'link';
  background?: 'blue' | 'green';
  fontWeight?: 'regular' | 'medium';
  className?: string;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = ({
  variant,
  background = 'blue',
  to,
  type = 'button',
  disabled,
  className,
  fontWeight = 'regular',
  children,
}: React.PropsWithChildren<ButtonProps>) => {
  const classes = clsx(
    styles.button,
    variant !== 'link' && styles[background],
    styles[variant],
    styles[fontWeight]
  );

  if (to) {
    return (
      <Link href={to} className={clsx(classes, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={clsx(classes, styles.buttonNoLink, className)}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
