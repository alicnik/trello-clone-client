import clsx from 'clsx';
import * as React from 'react';
import * as styles from './text-input.css';

type BaseProps = Partial<
  Pick<
    HTMLInputElement,
    | 'type'
    | 'placeholder'
    | 'defaultValue'
    | 'className'
    | 'value'
    | 'autocapitalize'
  >
>;

interface TextInputProps extends BaseProps {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  autoComplete?: string;
}

export function TextInput({
  name,
  value,
  onChange,
  className,
  autoComplete,
  ...props
}: TextInputProps) {
  return (
    <input
      name={name}
      className={clsx(styles.input, className)}
      onChange={onChange}
      autoComplete={autoComplete}
      {...props}
    />
  );
}
