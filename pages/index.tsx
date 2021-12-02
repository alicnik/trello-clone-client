import type { NextPage } from 'next';
import React from 'react';
import {
  Hero,
  Product,
  Features,
  PricingTour,
  Carousel,
  SignupCTA,
  MobileApps,
} from 'components/homepage';
import { Navbar, Footer } from 'components/common';

const Home: NextPage = () => {
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [intersectionRef, setIntersectionRef] =
    React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!intersectionRef) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => setIsScrolling(!entries[0].isIntersecting),
      { rootMargin: '-80% 0px 0px 0px' }
    );

    observer.observe(intersectionRef);

    return () => observer.unobserve(intersectionRef);
  }, [intersectionRef]);

  return (
    <>
      <Navbar isScrolling={isScrolling} />
      <Hero setIntersectionRef={setIntersectionRef} />
      <Product />
      <Features />
      <PricingTour />
      <Carousel />
      <SignupCTA />
      <MobileApps />
      <Footer />
    </>
  );
};

export default Home;
