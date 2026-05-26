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

export default function Home({ siteSettings, banner, products, testimonials, clientLogos }) {
  return (
    <div className="bg-[#07080C] min-h-screen">
      <Head>
        <title>{siteSettings?.meta_title || 'AND Hitech Industries | Engineering the Future of Rail'}</title>
        <meta name="description" content={siteSettings?.meta_description || 'Premium Railway Rolling Stock components and advanced HVAC engineering solutions — built for safety, precision and the future of transit.'} />
        <meta name="keywords"    content={siteSettings?.meta_keywords    || 'railway components, HVAC systems, precision engineering, RDSO approved'} />
      </Head>

      <Header initialData={siteSettings}/>

      <main>
        {/* 1 · CINEMATIC HERO — 200vh scroll-linked train */}
        <Hero initialData={banner}/>

        {/* 2 · TRUSTED BY + TESTIMONIALS */}
        <OurTestimonial initialData={{ testimonials, clientLogos }}/>

        {/* 3 · CORE CAPABILITIES — BENTO GRID */}
        <WhatWeDo/>

        {/* 4 · INTERACTIVE STATS */}
        <Statistics/>

        {/* 5 · FEATURED PRODUCTS */}
        <Services initialData={products}/>

        {/* 6 · PROCESS TIMELINE */}
        <OurProcess/>

        {/* 7 · CERTIFICATIONS & QUALITY */}
        <Certificates/>

        {/* 8 · CONTACT CTA */}
        <ContactCTA/>
      </main>

      <Footer initialData={siteSettings}/>
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
      props: {
        siteSettings: {}, banner: null,
        products: [], testimonials: [], clientLogos: [],
      },
    };
  }
}
