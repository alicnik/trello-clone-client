import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as parentStyles from '../description-editor/description-editor.css';
import * as styles from './formatting-popover.css';
import { PopoverHeader } from 'components/boards-index/board-card/components/background-picker/components';
import { FormattingSection } from './components';

interface FormattingPopoverProps {
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormattingPopover = React.forwardRef<
  HTMLButtonElement,
  FormattingPopoverProps
>(({ setPopoverOpen }, ref) => {
  return (
    <Popover.Root modal={true}>
      <Popover.Trigger
        ref={ref}
        className={parentStyles.greyButton}
        onMouseDown={() => setPopoverOpen((state) => !state)}
      >
        Formatting help
      </Popover.Trigger>
      <Popover.Content
        className={styles.content}
        side="right"
        align="center"
        sideOffset={-130}
        avoidCollisions
        id="formatting-popover-content"
      >
        <PopoverHeader
          heading="Formatting help"
          style={{ paddingBottom: '0.5rem' }}
        />
        <p className={styles.preamble}>
          Trello uses Markdown for formatting. Here are the basics. See the
          complete syntax.
        </p>
        <hr />
        <FormattingSection heading="First Level Header">
          Making Scrambled Eggs: A Primer
          <br />
          ===============================
        </FormattingSection>
        <FormattingSection heading="Second Level Header">
          1.1: Preparation
          <br />
          ----------------
        </FormattingSection>
        <FormattingSection heading="Paragraphs">
          Add two new lines to start a new paragraph. Crack two eggs into the
          bowl and whisk.
        </FormattingSection>
        <FormattingSection heading="Bold">
          **Carefully** crack the eggs.
        </FormattingSection>
        <FormattingSection heading="Emphasis">
          Whisk the eggs *vigorously*.
        </FormattingSection>
        <FormattingSection heading="Lists">
          Ingredients:
          <br />- Eggs
          <br />- Oil
          <br />- *Optional:* milk
        </FormattingSection>
        <FormattingSection heading="Links">
          To download a PDF version of the recipe, [click
          here](https://example.com/scrambled-eggs.pdf).
        </FormattingSection>
        <FormattingSection heading="Images" isLast>
          ![The Finished Dish](https://example.com/eggs.png)
        </FormattingSection>
      </Popover.Content>
    </Popover.Root>
  );
});

FormattingPopover.displayName = 'FormattingPopover';

export { FormattingPopover };
