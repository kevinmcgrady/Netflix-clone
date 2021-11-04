import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from '../components/loading/loading.component';
import { magic } from '../lib/magic-client';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(async () => {
    const isLoggedIn = await magic.user.isLoggedIn();

    if (isLoggedIn) {
      router.push('/');
    } else {
      router.push('/login');
    }
  }, []);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
};

export default MyApp;
