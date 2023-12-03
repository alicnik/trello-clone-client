import Image from "next/legacy/image";

import {
  Button,
  CostCoLogo,
  FenderLogo,
  GoogleLogo,
  SquareSpaceLogo,
} from '../..';
import * as styles from './product.css';

export const Product = () => {
  return (
    <section id="product">
      <div className={styles.container}>
        <h2 className={styles.heading}>
          It’s more than work. It’s a way of working together.
        </h2>
        <p className={styles.text}>
          Start with a Trello board, lists, and cards. Customize and expand with
          more features as your teamwork grows. Manage projects, organize tasks,
          and build team spirit—all in one place.
        </p>
        <Button variant="outlined" to="/signup" className={styles.button}>
          Start doing →
        </Button>
        <Image
          priority
          src="/images/product-image.png"
          alt="product"
          width={1902}
          height={1334}
        />
        <p className={styles.usedByText}>
          Join over 1,000,000 teams worldwide that are using Trello to get more
          done.
        </p>
        <div className={styles.logos}>
          <GoogleLogo />
          <FenderLogo />
          <SquareSpaceLogo />
          <CostCoLogo />
        </div>
      </div>
    </section>
  );
};
