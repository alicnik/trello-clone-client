import {
  Button,
  FooterLanguageSelect,
  FooterLinks,
  FooterLogo,
  FooterWrapper,
  TextInput,
} from 'components/common';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { login } from 'utils/api';
import * as styles from '../styles/signup.css';

const SignUp: NextPage = () => {
  const router = useRouter();
  const [form, setForm] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
      router.push('/boards');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: 'url(/images/login-signup-bg-left.svg)' }}
      ></div>
      <div className={styles.content}>
        <div>
          <header className={styles.header}>
            <Image
              src="/images/logos/trello-logo-blue.svg"
              alt="Trello logo"
              width={197}
              height={43}
            />
          </header>
          <main className={styles.main}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h1 className={styles.formHeading}>Sign up for your account</h1>
              <TextInput
                type="text"
                name="username"
                placeholder="Enter username"
                className={styles.input}
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
              />
              <TextInput
                type="email"
                name="email"
                placeholder="Enter email"
                className={styles.input}
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <TextInput
                type="password"
                name="password"
                placeholder="Password"
                className={styles.input}
                value={form.password}
                onChange={handleChange}
                autoComplete="email"
              />
              <small className={styles.legal}>
                By signing up, you confirm that you&apos;ve read and accepted
                our Terms of Service and Privacy Policy.
              </small>
              <input
                type="submit"
                value="Continue"
                className={styles.button}
                disabled={!emailRegexp.test(form.email)}
              />
              <hr className={styles.hr} />
              <Link href="/login">
                <a className={styles.link}>Already have an account? Log In</a>
              </Link>
            </form>
          </main>
        </div>
        <FooterWrapper style={{ paddingBottom: 0 }}>
          <FooterLanguageSelect />
          <hr className={styles.hr} />
          <FooterLogo colour="blue" />
          <FooterLinks
            style={{ textDecoration: 'none', fontSize: 14, fontWeight: 300 }}
          />
        </FooterWrapper>
      </div>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: 'url(/images/login-signup-bg-right.svg)' }}
      ></div>
    </div>
  );
};

export default SignUp;

const emailRegexp = new RegExp('^[^@s]+@[^@s]+.[^@s]+$');
