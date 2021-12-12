import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import {
  Hero,
  Product,
  Features,
  PricingTour,
  Carousel,
  SignupCTA,
  MobileApps,
} from 'components/homepage';
import {
  Navbar,
  FooterWrapper,
  FooterLanguageSelect,
  FooterLinks,
  FooterLogo,
  FooterCopyrightNotice,
} from 'components/common';

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
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Navbar isScrolling={isScrolling} />
      <Hero setIntersectionRef={setIntersectionRef} />
      <Product />
      <Features />
      <PricingTour />
      <Carousel />
      <SignupCTA />
      <MobileApps />
      <FooterWrapper>
        <FooterLanguageSelect />
        <FooterLinks />
        <FooterLogo colour="grey" />
        <FooterCopyrightNotice />
      </FooterWrapper>
    </>
  );
};

export default Home;
