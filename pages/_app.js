import '@/styles/globals.css';
import '@/styles/tailwind.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import Script from 'next/script';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop  = () => setLoading(false);

    router.events.on('routeChangeStart',    handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError',    handleStop);

    return () => {
      router.events.off('routeChangeStart',    handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError',    handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>AND Hitech Industries | Engineering the Future of Rail</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {/* Google Fonts — Bebas Neue + DM Sans + DM Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Core utility scripts */}
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="afterInteractive"/>
      <Script src="/js/bootstrap.min.js"   strategy="afterInteractive"/>
      <Script src="/js/validator.min.js"   strategy="afterInteractive"/>

      {/* UI enhancement scripts — lazy */}
      <Script src="/js/swiper-bundle.min.js"           strategy="lazyOnload"/>
      <Script src="/js/jquery.waypoints.min.js"        strategy="lazyOnload"/>
      <Script src="/js/jquery.counterup.min.js"        strategy="lazyOnload"/>
      <Script src="/js/isotope.min.js"                 strategy="lazyOnload"/>
      <Script src="/js/jquery.magnific-popup.min.js"   strategy="lazyOnload"/>

      {loading && <Loader/>}
      <Component {...pageProps}/>
    </>
  );
}
