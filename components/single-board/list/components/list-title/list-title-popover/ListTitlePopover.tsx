import { BsThreeDots } from 'react-icons/bs';
import * as Popover from '@radix-ui/react-popover';
import * as styles from './list-title-popover.css';
import { PopoverHeader } from 'components/boards-index/board-card/components/background-picker/components';
import { useDeleteList } from 'hooks';

interface ListTitlePopoverProps {
  listId: string;
}

export function ListTitlePopover({ listId }: ListTitlePopoverProps) {
  const mutation = useDeleteList();

  const handleDeleteList = () => {
    mutation.mutate(listId);
  };
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <span className={styles.trigger}>
          <BsThreeDots />
        </span>
      </Popover.Trigger>
      <Popover.Content className={styles.content} align="start">
        <PopoverHeader
          heading="List Actions"
          style={{
            paddingBottom: '0.75rem',
            margin: '0 0.5rem',
          }}
        />
        <div className={styles.container}>
          <p className={styles.option} onClick={handleDeleteList}>
            Delete this list
          </p>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
