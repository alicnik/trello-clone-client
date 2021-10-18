import type { NextPage } from 'next';
import React from 'react';
import { Hero } from '../components/hero';
import { Navbar } from '../components/navbar';
import { Product } from '../components/product';

const Home: NextPage = () => {
  const [intersectionRef, setIntersectionRef] =
    React.useState<HTMLElement | null>(null);

  return (
    <>
      <Navbar intersectionRef={intersectionRef} />
      <Hero setIntersectionRef={setIntersectionRef} />
      <Product />
    </>
  );
};

export default Home;
