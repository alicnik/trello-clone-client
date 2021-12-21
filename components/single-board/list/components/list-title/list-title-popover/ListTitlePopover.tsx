import { BsThreeDots } from 'react-icons/bs';
import * as Popover from '@radix-ui/react-popover';
import * as styles from './list-title-popover.css';
import { PopoverHeader } from 'components/boards-index/board-card/components/background-picker/components';
import { useDeleteList } from 'hooks';
import { DeleteConfirmation } from 'components/common';

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
          <DeleteConfirmation
            headingText="Delete list?"
            bodyText="Deleting a list is forever. There is no undo."
            buttonText="Delete list"
            side="right"
            trigger={<p className={styles.option}>Delete this list</p>}
            onDelete={handleDeleteList}
          />
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
