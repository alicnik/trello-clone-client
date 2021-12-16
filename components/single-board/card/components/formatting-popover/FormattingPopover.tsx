import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';

interface FormattingPopoverProps {
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormattingPopover = React.forwardRef<
  HTMLButtonElement,
  FormattingPopoverProps
>(({ setPopoverOpen }, ref) => {
  return (
    <Popover.Root>
      <Popover.Trigger
        ref={ref}
        onMouseDown={() => setPopoverOpen((state) => !state)}
      >
        Formatting help
      </Popover.Trigger>
      <Popover.Content>Hello</Popover.Content>
    </Popover.Root>
  );
});

FormattingPopover.displayName = 'FormattingPopover';

export { FormattingPopover };
