import { Button } from 'components/common';
import Image from 'next/image';
import * as styles from './pricing-tour.css';

export const PricingTour = () => {
  return (
    <section id="pricing-tour" className={styles.section}>
      <div className={styles.container}>
        <PricingTourItem
          imgSrc="/images/price-tags.svg"
          buttonText="Trello pricing"
        >
          <h3 className={styles.heading}>See our pricing</h3>
          <p className={styles.text}>
            Whether you&apos;re a team of 2 or 2,000, there&apos;s a Trello
            tailor-made for your organization.
          </p>
        </PricingTourItem>
        <PricingTourItem imgSrc="/images/compass.svg" buttonText="Tour Trello">
          <h3 className={styles.heading}>Take a Trello tour</h3>
          <p className={styles.text}>
            Explore the world of boards and beyond in Trello. Dive deeper into
            our most popular features.
          </p>
        </PricingTourItem>
      </div>
    </section>
  );
};

interface PricingTourItemProps {
  imgSrc: string;
  buttonText: string;
}

const PricingTourItem = ({
  imgSrc,
  buttonText,
  children,
}: React.PropsWithChildren<PricingTourItemProps>) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={imgSrc}
          alt={`${buttonText} illustration`}
          height={161}
          width={134}
          layout="fixed"
        />
      </div>
      <div className={styles.textContainer}>
        {children}
        <Button variant="outlined" className={styles.button}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
