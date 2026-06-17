import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import IndustrialTicker from '@/components/IndustrialTicker';
import Statistics from '@/components/Statistics';
import WhatWeDo from '@/components/WhatWeDo';
import Services from '@/components/services';
import WhyAndHitech from '@/components/WhyAndHitech';
import Certificates from '@/components/Certificates';
import ContactCTA from '@/components/ContactCTA';

export default function Home({ siteSettings, banner, products }) {
  return (
    <div className="page-bg min-h-screen">
      <Head>
        <title>{siteSettings?.meta_title || 'AND Hitech Industries | Railway Engineering & Manufacturing'}</title>
        <meta name="description" content={siteSettings?.meta_description || 'AND Hitech Industries — precision railway components, HVAC systems, brake components and rolling stock solutions for Indian Railways, Vande Bharat and Metro networks.'} />
        <meta name="keywords" content="railway components manufacturer India, railway engineering solutions, railway HVAC systems, rail coach components, RDSO approved vendor, Vande Bharat supplier" />
        <meta property="og:title" content="AND Hitech Industries | Railway Engineering & Manufacturing" />
        <meta property="og:description" content="Advanced railway systems and precision engineering for the next generation of Indian rail." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <Header initialData={siteSettings} />

      <main>
        {/* 1 · Hero — cinematic full-viewport */}
        <Hero initialData={banner} />

        {/* 2 · Brand ticker */}
        <IndustrialTicker />

        {/* 3 · Company overview + animated KPIs */}
        <Statistics />

        {/* 4 · Core Capabilities — image-led 4-card grid */}
        <WhatWeDo />

        {/* 5 · Products & Solutions — alternating full-bleed rows */}
        <Services initialData={products} />

        {/* 6 · Why AND Hitech — 6-card trust grid */}
        <WhyAndHitech />

        {/* 7 · Certifications — badge-style quality */}
        <Certificates />

        {/* 8 · Contact CTA */}
        <ContactCTA />
      </main>

      <Footer initialData={siteSettings} />
    </div>
  );
}

export async function getStaticProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  try {
    const [sR, bR, pR] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/site-settings/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home-banner/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`),
    ]);
    return {
      props: {
        siteSettings: (await sR.json()) || {},
        banner:       (await bR.json()).results?.[0] || null,
        products:     (await pR.json()).results || [],
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: { siteSettings: {}, banner: null, products: [] },
    };
  }
}
