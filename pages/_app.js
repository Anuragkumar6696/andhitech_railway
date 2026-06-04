import '@/styles/globals.css';
import '@/styles/tailwind.css';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import Script from 'next/script';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const lenisRef = useRef(null);

  /* ── Lenis smooth scrolling ── */
  useEffect(() => {
    let lenis = null;
    let raf   = null;

    const initLenis = async () => {
      try {
        const LenisModule = await import('@studio-freight/lenis');
        const Lenis = LenisModule.default || LenisModule.Lenis;
        lenis = new Lenis({
          duration:     1.3,
          easing:       (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation:  'vertical',
          smoothWheel:  true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.8,
          infinite:     false,
        });
        lenisRef.current = lenis;
        if (typeof window !== 'undefined') window.__lenis = lenis;

        function animate(time) {
          lenis.raf(time);
          raf = requestAnimationFrame(animate);
        }
        raf = requestAnimationFrame(animate);
      } catch (e) {
        if (typeof document !== 'undefined') {
          document.documentElement.style.scrollBehavior = 'smooth';
        }
      }
    };

    initLenis();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (lenis) lenis.destroy();
    };
  }, []);

  /* ── Route change → stop lenis ── */
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      lenisRef.current?.stop();
    };
    const handleStop = () => {
      setLoading(false);
      lenisRef.current?.start();
    };
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
        <title>AND Hitech Industries | Railway Engineering & Manufacturing</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        {/* DNS prefetch for API */}
        <link rel="dns-prefetch" href="https://admin.andhitech.in" />
        {/* Single preconnect block (no duplicates) */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        {/* Single consolidated font request - all weights in one call */}
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* jQuery from CDN — afterInteractive so it never blocks render */}
      <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="afterInteractive"/>
      <Script src="/js/bootstrap.min.js"   strategy="afterInteractive"/>
      <Script src="/js/validator.min.js"   strategy="afterInteractive"/>

      {/* Heavy plugins — lazy loaded, only needed for specific interactions */}
      <Script src="/js/swiper-bundle.min.js"         strategy="lazyOnload"/>
      <Script src="/js/jquery.waypoints.min.js"      strategy="lazyOnload"/>
      <Script src="/js/jquery.counterup.min.js"      strategy="lazyOnload"/>
      <Script src="/js/isotope.min.js"               strategy="lazyOnload"/>
      <Script src="/js/jquery.magnific-popup.min.js" strategy="lazyOnload"/>

      {loading && <Loader/>}
      <Component {...pageProps}/>
    </>
  );
}
