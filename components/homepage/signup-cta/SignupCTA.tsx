import * as React from 'react';
import { Button, TextInput } from 'components/common';
import * as styles from './signup-cta.css';

export const SignupCTA = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.text}>
          Sign up and get started with Trello today. A world of productive
          teamwork awaits!
        </p>
        <form className={styles.form}>
          <TextInput
            type="email"
            placeholder="Email"
            defaultValue={
              typeof window !== 'undefined'
                ? window.localStorage.getItem('signup-email') ?? ''
                : ''
            }
          />
          <Button variant="filled" background="green">
            Sign up
          </Button>
        </form>
      </div>
    </section>
  );
};
