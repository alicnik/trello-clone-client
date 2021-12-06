import * as React from 'react';
import * as popoverStyles from '../popover.css';
import { UnsplashItem } from '../../unsplash';
import { Form } from '..';
import { GridHeader, LargeThumbnail, PopoverHeader } from '../components';

export const colours = [
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

interface PhotosAndColoursViewProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  unsplashPhotos: UnsplashItem[];
  setView: React.Dispatch<React.SetStateAction<'all' | 'photos' | 'colours'>>;
}

export function PhotosAndColoursView({
  form,
  setForm,
  unsplashPhotos,
  setView,
}: PhotosAndColoursViewProps) {
  return (
    <>
      <PopoverHeader heading="Board background" />
      <div>
        <GridHeader heading="Photos" onClick={() => setView('photos')} />
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
                onClick={(value) => setForm({ ...form, background: value })}
                artistName={artistName}
                artistLink={artistLink}
              />
            );
          })}
        </div>
      </div>
      <div>
        <GridHeader heading="Colours" onClick={() => setView('colours')} />
        <div className={popoverStyles.grid}>
          {colours.slice(0, 6).map((colour) => (
            <LargeThumbnail
              key={colour}
              value={colour}
              form={form}
              onClick={(value) => setForm({ ...form, background: value })}
            />
          ))}
        </div>
      </div>
    </>
  );
}
