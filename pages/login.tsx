import * as React from 'react';
import { AuthLayout } from 'components/signup-login';
import type { NextPage } from 'next';
import Link from 'next/link';
import * as styles from 'styles/signup-login.css';
import { TextInput } from 'components/common';
import { signIn } from 'next-auth/react';

const Login: NextPage = () => {
  const [form, setForm] = React.useState({
    username: '',
    password: '',
  });
  const [missingUsername, setMissingUsername] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!form.username) {
      setMissingUsername(true);
      return;
    }
    e.preventDefault();
    try {
      signIn('credentials', {
        ...form,
        callbackUrl: `/${form.username}/boards`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthLayout>
      <form className={styles.form} onSubmit={handleSubmit}>
        {missingUsername ? (
          <p className={styles.error}>Missing username!</p>
        ) : null}
        <h1 className={styles.formHeading}>Log in to Trello</h1>
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
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          value={form.password}
          onChange={handleChange}
          autoComplete="email"
        />
        <input type="submit" value="Continue" className={styles.button} />
        <hr className={styles.hr} />
        <Link href="/signup">
          <a className={styles.link}>Sign up for an account</a>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default Login;
