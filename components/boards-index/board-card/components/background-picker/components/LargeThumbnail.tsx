import * as React from 'react';
import { Form } from '../BackgroundPicker';
import * as dialogStyles from '../../create-board-card/dialog.css';
import * as popoverStyles from '../popover.css';
import clsx from 'clsx';
import { getBackground } from 'utils';

interface LargeThumbnailProps {
  value: string;
  form: Form;
  onClick: (value: string) => void;
  artistName?: string;
  artistLink?: string;
}

export function LargeThumbnail({
  value,
  form,
  onClick,
  artistName,
  artistLink,
}: LargeThumbnailProps) {
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  return (
    <div
      className={clsx(
        dialogStyles.backgroundThumbnail,
        popoverStyles.backgroundThumbnailLarge,
        form.background === value && dialogStyles.chosenBackground
      )}
      onClick={() => onClick(value)}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      style={getBackground(value)}
    >
      {isMouseOver && artistName ? (
        <a
          title={artistName}
          href={artistLink}
          className={clsx(
            isMouseOver && popoverStyles.artistWhenMouseOverParent,
            popoverStyles.artist
          )}
          target="_blank"
          rel="noreferrer"
        >
          {artistName}
        </a>
      ) : null}
    </div>
  );
}
