import clsx from 'clsx';
import Image from 'next/image';
import * as styles from './feature-block.css';

interface FeatureBlockProps {
  heading: string;
  subHeading?: string;
  summary: string;
  imageSrc?: string;
  imageAlt?: string;
  imageHeight?: number;
  imageWidth?: number;
  imageOrder?: 'start' | 'end';
}

export const FeatureBlock = ({
  heading,
  subHeading,
  summary,
  imageHeight,
  imageWidth,
  imageSrc,
  imageOrder,
  imageAlt,
  children,
}: React.PropsWithChildren<FeatureBlockProps>) => {
  return (
    <article className={styles.container}>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
      )}
      <div
        className={clsx(
          styles.textContainer,
          imageOrder === 'end' && styles.imageAtEnd
        )}
      >
        {subHeading && <h5 className={styles.subHeading}>{subHeading}</h5>}
        <h2 className={styles.heading}>{heading}</h2>
        <p className={clsx(styles.summaryText, imageSrc && styles.greyText)}>
          {summary}
        </p>
        {children}
      </div>
    </article>
  );
};
