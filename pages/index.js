import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import OurTestimonial from '@/components/OurTestimonial';
import WhatWeDo from '@/components/WhatWeDo';
import Statistics from '@/components/Statistics';
import Services from '@/components/services';
import OurProcess from '@/components/OurProcess';
import Certificates from '@/components/Certificates';
import ContactCTA from '@/components/ContactCTA';
import IndustrialTicker from '@/components/IndustrialTicker';
import RailwayTimeline from '@/components/RailwayTimeline';
import VandeBharat from '@/components/VandeBharat';
import WhyAndHitech from '@/components/WhyAndHitech';
import IndustryPresence from '@/components/IndustryPresence';

export default function Home({ siteSettings, banner, products, testimonials, clientLogos }) {
  return (
    <div className="page-bg min-h-screen">
      <Head>
        <title>{siteSettings?.meta_title || 'AND Hitech Industries | Railway Engineering & Manufacturing'}</title>
        <meta name="description" content={siteSettings?.meta_description || 'AND Hitech Industries — precision railway components, HVAC systems, brake components and rolling stock solutions for Indian Railways, Vande Bharat and Metro networks.'} />
        <meta name="keywords" content="railway components manufacturer India, railway engineering solutions, railway HVAC systems, rail coach components, railway manufacturing company, RDSO approved vendor, Vande Bharat supplier" />
        <meta property="og:title" content="AND Hitech Industries | Railway Engineering & Manufacturing" />
        <meta property="og:description" content="Advanced railway systems and precision engineering excellence for the next generation of Indian rail transportation." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <Header initialData={siteSettings} />

      <main>
        {/* 1 · Hero */}
        <Hero initialData={banner} />

        {/* 2 · Ticker */}
        <IndustrialTicker />

        {/* 3 · Company Overview + Stats */}
        <Statistics />

        {/* 4 · Indian Railway Timeline */}
        <RailwayTimeline />

        {/* 5 · Vande Bharat Section */}
        <VandeBharat />

        {/* 6 · Core Capabilities */}
        <WhatWeDo />

        {/* 7 · Products & Solutions */}
        <Services initialData={products} />

        {/* 8 · Manufacturing Process */}
        <OurProcess />

        {/* 9 · Industry Presence (Expo) */}
        <IndustryPresence />

        {/* 10 · Why AND Hitech */}
        <WhyAndHitech />

        {/* 11 · Testimonials & Partners */}
        <OurTestimonial initialData={{ testimonials, clientLogos }} />

        {/* 12 · Certifications */}
        <Certificates />

        {/* 13 · Contact CTA */}
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
        banner:       (await bR.json()).results?.[0] || null,
        products:     (await pR.json()).results || [],
        testimonials: (await tR.json()).results || [],
        clientLogos:  (await lR.json()).results || [],
      },
      revalidate: 60,
    };
  } catch {
    return {
      props: { siteSettings: {}, banner: null, products: [], testimonials: [], clientLogos: [] },
    };
  }
}
