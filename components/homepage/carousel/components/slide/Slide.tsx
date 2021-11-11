import * as React from 'react';
import Image from 'next/image';
import * as styles from './slide.css';
import { Testimonial as SlideProps } from '../../testimonials';

export const Slide = ({
  text,
  attribution,
  industry,
  logoSrc,
  altText,
}: SlideProps) => {
  return (
    <figure className={styles.quoteContainer}>
      <blockquote className={styles.quote}>{text}</blockquote>
      <figcaption className={styles.caption}>
        <div className={styles.attributionContainer}>
          <p>
            {attribution.split(' - ').map((part, i) => (
              <React.Fragment key={part}>
                {i === 0 ? (
                  <span className={styles.attributionName}>{`${part} - `}</span>
                ) : (
                  part
                )}
              </React.Fragment>
            ))}
          </p>
          <p>
            Industry: <span className={styles.industry}>{industry}</span>
          </p>
        </div>
        <Image
          src={logoSrc}
          alt={altText}
          width={165}
          height={66}
          layout="fixed"
        />
      </figcaption>
    </figure>
  );
};
