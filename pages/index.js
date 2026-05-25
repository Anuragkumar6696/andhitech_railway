import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Services from '@/components/services';
import OurProcess from '@/components/OurProcess';
import Certificates from '@/components/Certificates';
import OurTestimonial from '@/components/OurTestimonial';
import Statistics from '@/components/Statistics';
import ContactCTA from '@/components/ContactCTA';

export default function Home({ siteSettings }) {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>{siteSettings?.meta_title || 'AND HITECH INDUSTRIES LTD | Premium Industrial Solutions'}</title>
        <meta name="description" content={siteSettings?.meta_description || 'Engineering excellence in Railway Rolling Stock and HVAC systems.'} />
        <meta name="keywords" content={siteSettings?.meta_keywords || 'railway components, HVAC systems, precision engineering, AND Hitech'} />
      </Head>

      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Statistics />
        <Services />
        <OurProcess />
        <Certificates />
        <OurTestimonial />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/site-settings/`);
    const siteSettings = await res.json();
    return {
      props: {
        siteSettings: siteSettings || {},
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {
      props: {
        siteSettings: {},
      },
    };
  }
}
