/* eslint-disable react/no-children-prop */

import * as React from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import ReactMarkdown from 'react-markdown';
import { Card } from 'utils/api/types';
import { FormattingPopover } from '../formatting-popover';
import { GrTextAlignFull } from 'react-icons/gr';
import * as styles from './description-editor.css';
import * as markdownStyles from './markdown-styles.css';
import { useClickOutside, useUpdateCard } from 'hooks';

interface DescriptionEditorProps {
  card: Card;
}

export function DescriptionEditor({ card }: DescriptionEditorProps) {
  const mutation = useUpdateCard({ cardId: card.id, boardId: card.board.id });
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const saveButtonRef = React.useRef<HTMLButtonElement>(null);
  const formattingButtonRef = React.useRef<HTMLButtonElement>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [description, setDescription] = React.useState(card.description ?? '');
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const parsedDescription = description
    .replace(/(?<![-=])\n(?![-=])/g, '\n\n')
    .replace(/\n\n\n/g, '\n\n &nbsp; \n\n');

  const handleSave = React.useCallback(() => {
    mutation.mutate({ description });
    setIsEditing(false);
  }, [description, mutation]);

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
      if (description !== card.description) {
        handleSave();
      }
      setIsEditing(false);
    },
    [card.description, description, handleSave, isEditing, popoverOpen]
  );
  useClickOutside(handleClickOutside);

  React.useEffect(() => {
    if (!isEditing || !textAreaRef.current) {
      return;
    }
    textAreaRef.current.focus();
    textAreaRef.current.setSelectionRange(
      description.length,
      description.length
    );
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  }, [description.length, isEditing]);

  return (
    <div>
      <div className={styles.titleContainer}>
        <GrTextAlignFull className={styles.icon} />
        <h2 className={styles.heading}>Description</h2>
        {!isEditing && (
          <button
            className={styles.greyButton}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
      {isEditing || !description ? (
        <>
          <textarea
            ref={textAreaRef}
            className={styles.textArea}
            placeholder="Add a more detailed description..."
            value={description}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                e.preventDefault();
                if (description) {
                  handleSave();
                }
              }
            }}
            onChange={(e) => setDescription(e.target.value)}
            onClick={(e) => !isEditing && setIsEditing(true)}
          />
          {isEditing && (
            <div className={styles.controlsContainer}>
              <button
                ref={saveButtonRef}
                className={styles.saveButton}
                onClick={handleSave}
              >
                Save
              </button>
              <VscChromeClose
                className={styles.closeIcon}
                onClick={() => setIsEditing(false)}
              />
              <FormattingPopover
                ref={formattingButtonRef}
                setPopoverOpen={setPopoverOpen}
              />
            </div>
          )}
        </>
      ) : (
        <div
          className={styles.markdownContainer}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.nodeName === 'A') {
              return;
            }
            setIsEditing(true);
          }}
        >
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className={markdownStyles.h1} {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className={markdownStyles.h2} {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className={markdownStyles.p} {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className={markdownStyles.ul} {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className={markdownStyles.li} {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className={markdownStyles.a} {...props} />
              ),
            }}
          >
            {parsedDescription}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
