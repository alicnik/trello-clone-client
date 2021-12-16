/* eslint-disable react/no-children-prop */

import * as React from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import ReactMarkdown from 'react-markdown';
import { Card } from 'utils/api/types';
import { FormattingPopover } from '../formatting-popover';

interface DescriptionEditorProps {
  card: Card;
}

export function DescriptionEditor({ card }: DescriptionEditorProps) {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const saveButtonRef = React.useRef<HTMLButtonElement>(null);
  const formattingButtonRef = React.useRef<HTMLButtonElement>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [description, setDescription] = React.useState(card.description ?? '');
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const handleClickOutside = React.useCallback(
    (e: MouseEvent) => {
      if (!isEditing) {
        return;
      }
      // Syncing render cycles between Radix-UI popover and mouse events
      // requires checking the data state of the popover on the previous render
      // This means you can click out of the popover to return to the editing state
      // then click again out of the editing area to leave editing state
      // Otherwise, clicking out of the popover immediately left the editing state
      if (
        popoverOpen &&
        formattingButtonRef.current?.dataset.state === 'closed'
      ) {
        setPopoverOpen(false);
        return;
      }
      if (
        e.target === textAreaRef.current ||
        e.target === saveButtonRef.current ||
        e.target === formattingButtonRef.current
      ) {
        return;
      }
      setIsEditing(false);
    },
    [isEditing, popoverOpen]
  );

  // React.useEffect(() => console.log(formattingButtonRef.current));

  React.useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  return isEditing || !description ? (
    <div>
      <textarea
        ref={textAreaRef}
        placeholder="Add a more detailed description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onClick={() => !isEditing && setIsEditing(true)}
      />
      {isEditing && (
        <div>
          <button ref={saveButtonRef}>Save</button>
          <VscChromeClose onClick={() => setIsEditing(false)} />
          <FormattingPopover
            ref={formattingButtonRef}
            setPopoverOpen={setPopoverOpen}
          />
        </div>
      )}
    </div>
  ) : (
    <div onClick={() => setIsEditing(true)}>
      <ReactMarkdown children={description} />
    </div>
  );
}
