import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Button, TextInput } from 'components/common';
import * as styles from './hero.css';

interface HeroProps {
  setIntersectionRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export const Hero = ({ setIntersectionRef }: HeroProps) => {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements[0] as HTMLInputElement;
    localStorage.setItem('signup-email', input.value);
    router.push('/signup');
  }

  return (
    <section id="hero" className={styles.hero} ref={setIntersectionRef}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h1 className={styles.heading}>
            Trello helps teams move work forward.
          </h1>
          <p className={styles.text}>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is
            unique—accomplish it all with Trello.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextInput
              type="email"
              placeholder="Email"
              defaultValue={
                typeof window !== 'undefined'
                  ? window.localStorage.getItem('signup-email') ?? ''
                  : ''
              }
            />
            <Button variant="filled">Sign up—it&apos;s free!</Button>
          </form>
        </div>
        <div className={styles.imageContainer}>
          <Image
            priority
            src="/images/hero-image.png"
            alt="hero"
            width={931}
            height={1205}
          />
        </div>
      </div>
    </section>
  );
};
