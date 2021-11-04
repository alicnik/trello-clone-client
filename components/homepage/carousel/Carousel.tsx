import * as styles from './carousel.css';

export const Carousel = () => {
  return (
    <section id="carousel" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.navigation}></div>
        <div className={styles.slider}></div>
      </div>
    </section>
  );
};
