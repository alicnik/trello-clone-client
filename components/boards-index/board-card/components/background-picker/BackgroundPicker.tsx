import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import * as dialogStyles from '../create-board-card/dialog.css';
import * as popoverStyles from './popover.css';
import { VscChromeClose } from 'react-icons/vsc';
import { BsThreeDots } from 'react-icons/bs';
import { getBackground } from 'utils';
import { UnsplashItem } from '../unsplash';
import { ColoursView, PhotosAndColoursView } from './popover-views';
import { PhotosView } from './popover-views/PhotosView';

export interface Form {
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
  const [view, setView] = React.useState<'all' | 'photos' | 'colours'>('all');
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
              {console.log(view)}
              {view === 'all' ? (
                <PhotosAndColoursView
                  form={form}
                  setForm={setForm}
                  unsplashPhotos={unsplashPhotos}
                  setView={setView}
                />
              ) : view === 'colours' ? (
                <ColoursView form={form} setForm={setForm} setView={setView} />
              ) : (
                <PhotosView
                  form={form}
                  setForm={setForm}
                  unsplashPhotos={unsplashPhotos}
                  setUnsplashPhotos={setUnsplashPhotos}
                  setView={setView}
                />
              )}
            </section>
          </Popover.Content>
        </div>
      </Popover.Anchor>
    </Popover.Root>
  );
}
