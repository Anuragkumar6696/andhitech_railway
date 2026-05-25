import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import WhatWeDo from '@/components/WhatWeDo';
import Services from '@/components/services';
import OurProcess from '@/components/OurProcess';
import Certificates from '@/components/Certificates';
import OurTestimonial from '@/components/OurTestimonial';
import Statistics from '@/components/Statistics';
import ContactCTA from '@/components/ContactCTA';

export default function Home({ siteSettings, banner, products, testimonials, clientLogos }) {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>{siteSettings?.meta_title || 'AND HITECH INDUSTRIES LTD | Premium Industrial Solutions'}</title>
        <meta name="description" content={siteSettings?.meta_description || 'Engineering excellence in Railway Rolling Stock and HVAC systems.'} />
        <meta name="keywords" content={siteSettings?.meta_keywords || 'railway components, HVAC systems, precision engineering, AND Hitech'} />
      </Head>

      <Header initialData={siteSettings} />
      <main>
        <Hero initialData={banner} />
        <AboutUs />
        <WhatWeDo />
        <Statistics />
        <Services initialData={products} />
        <OurProcess />
        <Certificates />
        <OurTestimonial initialData={{ testimonials, clientLogos }} />
        <ContactCTA />
      </main>
      <Footer initialData={siteSettings} />
    </div>
  );
}

export async function getStaticProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  try {
    const [settingsRes, bannerRes, productsRes, testimonialsRes, logosRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/site-settings/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home-banner/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/testimonials/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/client-logos/`),
    ]);
    const siteSettings = await settingsRes.json();
    const bannerData = await bannerRes.json();
    const productsData = await productsRes.json();
    const testimonialsData = await testimonialsRes.json();
    const logosData = await logosRes.json();
    return {
      props: {
        siteSettings: siteSettings || {},
        banner: bannerData.results?.[0] || null,
        products: productsData.results || [],
        testimonials: testimonialsData.results || [],
        clientLogos: logosData.results || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { siteSettings: {}, banner: null, products: [], testimonials: [], clientLogos: [] },
    };
  }
}
