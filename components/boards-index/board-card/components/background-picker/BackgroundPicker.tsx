import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import * as dialogStyles from '../create-board-card/dialog.css';
import * as popoverStyles from './popover.css';
import { VscChromeClose } from 'react-icons/vsc';
import { BsThreeDots } from 'react-icons/bs';
import { getBackground } from 'utils';
import { UnsplashItem } from '../unsplash';

interface Form {
  boardName: string;
  background: string;
}

interface BackgroundPickerProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  suggestedBackgrounds: string[];
  unsplashPhotos: UnsplashItem[];
  setUnsplashPhotos: React.Dispatch<React.SetStateAction<UnsplashItem[]>>;
}

export function BackgroundPicker({
  form,
  setForm,
  suggestedBackgrounds,
  unsplashPhotos,
  setUnsplashPhotos,
}: BackgroundPickerProps) {
  const colours = [
    'rgb(0, 121, 191)',
    'rgb(210, 144, 52)',
    'rgb(81, 152, 57)',
    'rgb(176, 70, 50)',
    'rgb(137, 96, 158)',
    'rgb(205, 90, 145)',
    'rgb(75, 191, 107)',
    'rgb(0, 174, 204)',
    'rgb(131, 140, 145)',
  ];
  return (
    <Popover.Root modal>
      <Popover.Anchor asChild>
        <div className={dialogStyles.backgroundChoices}>
          {suggestedBackgrounds.map((value) => {
            return (
              <button
                key={value}
                className={clsx(
                  dialogStyles.backgroundThumbnail,
                  form.background === value && dialogStyles.chosenBackground
                )}
                onClick={() => setForm({ ...form, background: value })}
                style={getBackground(value)}
              />
            );
          })}
          <Popover.Trigger asChild>
            <button className={dialogStyles.backgroundThumbnail}>
              <BsThreeDots className={popoverStyles.ellipsisIcon} />
            </button>
          </Popover.Trigger>
          <Popover.Content asChild sideOffset={-100} align="start">
            <section className={popoverStyles.content}>
              <header className={popoverStyles.header}>
                <h3 className={popoverStyles.title}>Board background</h3>
                <Popover.Close className={popoverStyles.closeButton} asChild>
                  <span>
                    <VscChromeClose />
                  </span>
                </Popover.Close>
              </header>
              <div>
                <GridHeader heading="Photos" />
                <div className={popoverStyles.grid}>
                  {unsplashPhotos.slice(0, 6).map((photo) => {
                    const photoUrl = `url("${photo.urls.thumb}")`;
                    const artistName = photo.user.name;
                    const artistLink = photo.user.links.html;
                    return (
                      <LargeThumbnail
                        key={photoUrl}
                        value={photoUrl}
                        form={form}
                        setForm={setForm}
                        artistName={artistName}
                        artistLink={artistLink}
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                <GridHeader heading="Colours" />
                <div className={popoverStyles.grid}>
                  {colours.slice(0, 6).map((colour) => (
                    <LargeThumbnail
                      key={colour}
                      value={colour}
                      form={form}
                      setForm={setForm}
                    />
                  ))}
                </div>
              </div>
            </section>
          </Popover.Content>
        </div>
      </Popover.Anchor>
    </Popover.Root>
  );
}

function GridHeader({ heading }: { heading: string }) {
  return (
    <header className={popoverStyles.gridHeader}>
      <h4 className={popoverStyles.gridHeaderTitle}>{heading}</h4>
      <button className={popoverStyles.seeMoreButton}>See more</button>
    </header>
  );
}

interface LargeThumbnailProps {
  value: string;
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  artistName?: string;
  artistLink?: string;
}

function LargeThumbnail({
  value,
  form,
  setForm,
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
      onClick={() => setForm({ ...form, background: value })}
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
