import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { magic } from '../lib/magic-client';

import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [userMsg, setUserMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      if (email === 'kevinmcgrady47@gmail.com') {
        try {
          setIsLoading(true);
          const didToken = await magic.auth.loginWithMagicLink({ email });
          if (didToken) {
            router.push('/');
          }
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      } else {
        setIsLoading(false);
        setUserMsg('Something went worng!');
      }
    } else {
      setIsLoading(false);
      setUserMsg('Enter a valid email address');
    }
  };

  const handleOnChangeEmail = (e) => {
    setUserMsg('');
    setEmail(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix - Login</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href='/'>
            <div className={styles.logoWrapper}>
              <Image
                src='/static/netflix.svg'
                alt='Netflix logo'
                width='128px'
                height='34px'
              />
            </div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            className={styles.emailInput}
            type='text'
            placeholder='Email address'
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
            {isLoading ? 'Loading...' : 'Sign in'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
