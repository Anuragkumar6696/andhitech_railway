import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import WhatWeDo from '@/components/WhatWeDo';
import Statistics from '@/components/Statistics';
import Services from '@/components/services';
import OurProcess from '@/components/OurProcess';
import Certificates from '@/components/Certificates';
import ContactCTA from '@/components/ContactCTA';
import IndustrialTicker from '@/components/IndustrialTicker';

export default function Home({ siteSettings, banner, products, testimonials, clientLogos }) {
  return (
    <div className="bg-[#050608] min-h-screen">
      <Head>
        <title>{siteSettings?.meta_title || 'AND Hitech Industries | Engineering the Future of Rail'}</title>
        <meta name="description" content={siteSettings?.meta_description || 'Premium Railway Rolling Stock components and advanced HVAC engineering solutions — RDSO approved, ISO certified, built for safety and the future of transit.'} />
        <meta name="keywords" content={siteSettings?.meta_keywords || 'railway components, HVAC systems, precision engineering, RDSO approved, LHB, Vande Bharat, Metro Rail'} />
        {/* Open Graph */}
        <meta property="og:title" content="AND Hitech Industries | Engineering the Future of Rail" />
        <meta property="og:description" content="Premium Railway Rolling Stock components — RDSO Approved, ISO 9001:2015 Certified." />
        <meta property="og:type" content="website" />
      </Head>

      <Header initialData={siteSettings} />

      <main>
        {/* 1 · CINEMATIC HERO — scroll-linked train storytelling */}
        <Hero initialData={banner} />

        {/* 2 · TRUST BAR — partner logos + credibility row */}
        <TrustBar initialData={{ clientLogos }} />

        {/* 3 · INDUSTRIAL TICKER — brand momentum strip */}
        <IndustrialTicker />

        {/* 4 · CORE CAPABILITIES — bento grid */}
        <WhatWeDo />

        {/* 5 · PERFORMANCE METRICS + COMPANY TIMELINE */}
        <Statistics />

        {/* 6 · FEATURED PRODUCTS — split-screen showcase */}
        <Services initialData={products} />

        {/* 7 · TICKER (inverted) — momentum between sections */}
        <IndustrialTicker inverted />

        {/* 8 · MANUFACTURING PROCESS TIMELINE */}
        <OurProcess />

        {/* 9 · CERTIFICATIONS & QUALITY */}
        <Certificates />

        {/* 10 · CONTACT CTA — dual-track conversion */}
        <ContactCTA />
      </main>

      <Footer initialData={siteSettings} />
    </div>
  );
}

export async function getStaticProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  try {
    const [sR, bR, pR, tR, lR] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/site-settings/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home-banner/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/client-logos/`),
    ]);
    return {
      props: {
        siteSettings: (await sR.json()) || {},
        banner: (await bR.json()).results?.[0] || null,
        products: (await pR.json()).results || [],
        testimonials: (await tR.json()).results || [],
        clientLogos: (await lR.json()).results || [],
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: {
        siteSettings: {}, banner: null,
        products: [], testimonials: [], clientLogos: [],
      },
    };
  }
}
