import * as React from 'react';
import { Form } from '..';
import { UnsplashItem } from '../../unsplash';
import { LargeThumbnail, PopoverHeader } from '../components';
import * as styles from '../popover.css';
import { unsplashData } from '../../unsplash';

interface PhotosViewProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  unsplashPhotos: UnsplashItem[];
  setUnsplashPhotos: React.Dispatch<React.SetStateAction<UnsplashItem[]>>;
  setView: React.Dispatch<React.SetStateAction<'all' | 'photos' | 'colours'>>;
}

export function PhotosView({
  form,
  setForm,
  unsplashPhotos,
  setUnsplashPhotos,
  setView,
}: PhotosViewProps) {
  // React.useEffect(() => setUnsplashPhotos((prev) => prev), [setUnsplashPhotos]);
  return (
    <>
      <PopoverHeader
        heading={
          <>
            Photos by{' '}
            <a href="http://www.unsplash.com" className={styles.unsplashLink}>
              Unsplash
            </a>{' '}
          </>
        }
        showBackButton={true}
        goBack={() => setView('all')}
      />{' '}
      <div className={styles.allPhotosGrid}>
        {unsplashData.map((photo, index) => {
          return (
            <LargeThumbnail
              key={photo.id}
              value={photo.urls.thumb}
              form={form}
              onClick={(value) => {
                if (index > 3) {
                  const otherPhotos = unsplashPhotos.filter(
                    (p) => p.id !== photo.id
                  );
                  const newPhotos = [photo, ...otherPhotos];
                  setUnsplashPhotos(newPhotos);
                }
                setForm({ ...form, background: value });
              }}
              artistName={photo.user.name}
              artistLink={photo.user.links.html}
            />
          );
        })}
      </div>
    </>
  );
}
