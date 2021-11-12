import clsx from 'clsx';
import * as React from 'react';
import * as styles from './text-input.css';

type BaseProps = Partial<
  Pick<HTMLInputElement, 'type' | 'placeholder' | 'defaultValue' | 'className'>
>;

interface TextInputProps extends BaseProps {
  placeholder: string;
}

export function TextInput({
  type = 'text',
  placeholder,
  className,
  defaultValue,
}: TextInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={clsx(styles.input, className)}
      defaultValue={defaultValue}
    />
  );
}
