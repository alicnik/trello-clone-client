import * as React from 'react';
import * as styles from './carousel.css';
import { Slide } from './components/slide';
import { testimonials } from './testimonials';

export const Carousel = () => {
  const [slideIndex, setSlideIndex] = React.useState(0);

  function handleNextSlide() {
    setSlideIndex(slideIndex === testimonials.length - 1 ? 0 : slideIndex + 1);
  }

  function handlePreviousSlide() {
    setSlideIndex(slideIndex === 0 ? testimonials.length - 1 : slideIndex - 1);
  }

  return (
    <section id="carousel" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.navigation}>
          <button className={styles.button} onClick={handlePreviousSlide}>
            {'<'}
          </button>
          <button className={styles.button} onClick={handleNextSlide}>
            {'>'}
          </button>
        </div>
        <div className={styles.outerSlider}>
          <div
            className={styles.innerSlider}
            style={{
              transform: `translateX(${-960 * slideIndex}px)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <Slide key={testimonial.attribution} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
