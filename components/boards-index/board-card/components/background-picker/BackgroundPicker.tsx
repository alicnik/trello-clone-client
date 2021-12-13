import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as popoverStyles from './popover.css';
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
  unsplashPhotos: UnsplashItem[];
  setUnsplashPhotos: React.Dispatch<React.SetStateAction<UnsplashItem[]>>;
  backgroundContainerStyles?: string;
  side?: 'right' | 'bottom';
  alignOffset?: number;
  sideOffset?: number;
}

export function BackgroundPicker({
  form,
  setForm,
  unsplashPhotos,
  setUnsplashPhotos,
  backgroundContainerStyles,
  side = 'bottom',
  alignOffset = 0,
  sideOffset = -100,
  children,
}: React.PropsWithChildren<BackgroundPickerProps>) {
  const [view, setView] = React.useState<'all' | 'photos' | 'colours'>('all');
  return (
    <Popover.Root modal>
      <Popover.Anchor asChild>
        <div className={backgroundContainerStyles}>
          {children}

          <Popover.Content
            asChild
            sideOffset={sideOffset}
            align="start"
            side={side}
            alignOffset={alignOffset}
          >
            <section className={popoverStyles.content}>
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
