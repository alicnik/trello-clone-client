import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as styles from './delete-confirmation.css';
import { PopoverHeader } from 'components/boards-index/board-card/components/background-picker/components';

interface DeleteConfirmationProps {
  headingText: string;
  bodyText: string;
  buttonText: string;
  onDelete: () => void;
  trigger: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function DeleteConfirmation({
  headingText,
  bodyText,
  buttonText,
  onDelete,
  trigger,
  align = 'start',
  side = 'bottom',
}: DeleteConfirmationProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Content
        className={styles.content}
        align={align}
        side={side}
        sideOffset={5}
      >
        <PopoverHeader
          heading={headingText}
          style={{ paddingBottom: '0.5rem' }}
        />
        <p className={styles.body}>{bodyText}</p>
        <button className={styles.button} onClick={onDelete}>
          {buttonText}
        </button>
      </Popover.Content>
    </Popover.Root>
  );
}
