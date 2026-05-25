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
    if (typeof window !== 'undefined' && window.WOW) {
      new window.WOW().init();
    }

    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>AND Hitech | Premium Industrial Solutions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Core Libraries */}
      <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="afterInteractive"
      />
      <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/js/validator.min.js" strategy="afterInteractive" />

      {/* UI Effects - Lazy Loaded for Speed */}
      <Script src="/js/jquery.slicknav.js" strategy="lazyOnload" />
      <Script src="/js/swiper-bundle.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.waypoints.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.counterup.min.js" strategy="lazyOnload" />
      <Script src="/js/isotope.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.magnific-popup.min.js" strategy="lazyOnload" />
      <Script src="/js/SmoothScroll.js" strategy="lazyOnload" />
      <Script src="/js/parallaxie.js" strategy="lazyOnload" />
      <Script src="/js/gsap.min.js" strategy="lazyOnload" />
      <Script src="/js/magiccursor.js" strategy="lazyOnload" />
      <Script src="/js/SplitText.js" strategy="lazyOnload" />
      <Script src="/js/ScrollTrigger.min.js" strategy="lazyOnload" />
      <Script src="/js/jquery.mb.YTPlayer.min.js" strategy="lazyOnload" />
      <Script src="/js/wow.js" strategy="lazyOnload" />

      {/* Site-Specific Scripts */}
      <Script src="/js/function.js" strategy="lazyOnload" />
      <Script src="/js/custom.js" strategy="lazyOnload" />

      {loading && <Loader />}
      <Component {...pageProps} />
    </>
  );
}
