import * as React from 'react';
import * as styles from './carousel.css';
import { Slide, Dot, NavigationButton } from './components';
import { testimonials } from './testimonials';

export const Carousel = () => {
  const [slideIndex, setSlideIndex] = React.useState(0);

  function handleNavigationClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.id === 'back') {
      setSlideIndex(
        slideIndex === 0 ? testimonials.length - 1 : slideIndex - 1
      );
    } else {
      setSlideIndex(
        slideIndex === testimonials.length - 1 ? 0 : slideIndex + 1
      );
    }
  }

  function handleDotClick(e: React.MouseEvent<HTMLButtonElement>) {
    setSlideIndex(Number(e.currentTarget.id));
  }

  return (
    <section id="carousel" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.navigation}>
          <div className={styles.dotContainer}>
            {testimonials.map((_, i) => (
              <Dot
                key={i}
                index={i}
                onClick={handleDotClick}
                selected={slideIndex === i}
              />
            ))}
          </div>
          <NavigationButton direction="back" onClick={handleNavigationClick} />
          <NavigationButton
            direction="forward"
            onClick={handleNavigationClick}
          />
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
