import * as React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { register } from 'utils/api';
import { TextInput } from 'components/common';
import { AuthLayout } from 'components/signup-login';
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
      const res = await register(form);
      const username = res.data.username;
      router.push(`/${username}/boards`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthLayout>
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
          By signing up, you confirm that you&apos;ve read and accepted our
          Terms of Service and Privacy Policy.
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
    </AuthLayout>
  );
};

export default SignUp;

const emailRegexp = new RegExp('^[^@s]+@[^@s]+.[^@s]+$');
