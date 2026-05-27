import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import JobList from '@/components/Career/JobList';
import Benefits from '@/components/Career/Benefits';
import JoinUs from '@/components/Career/JoinUs';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export async function getStaticProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    const data = await res.json();
    return { 
      props: { jobs: data.results || [] },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return { props: { jobs: [] }, revalidate: 60 };
  }
}

export default function CareerPage({ jobs }) {
  return (
    <>
      <Head>
        <title>Career | AND Hitech</title>
        <meta name="description" content="Explore career opportunities at AND Hitech Industries Ltd." />
      </Head>

      <Header />
      <PageBanner
        title="Career"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Career"
      />

      {jobs.length === 0 ? (
        <section className="py-24 bg-[#f9f8f6]">
          <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto text-center bg-white rounded-2xl border border-[#ede9e4] shadow-sm p-16"
            >
              <div className="w-16 h-16 rounded-xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-7">
                <Mail size={28} className="text-brand-orange" />
              </div>
              <h3
                className="text-2xl font-bold text-[#1a1a1a] mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Interested in Working With Us?
              </h3>
              <p className="text-[#777] text-sm leading-relaxed mb-8">
                We don't have any open positions right now, but we're always looking for talented people. Share your resume and we'll be in touch.
              </p>
              <a
                href="mailto:careers@andhitech.in"
                className="btn-premium inline-flex items-center gap-3 text-white font-bold text-lg tracking-wide hover:text-[#E3510F] transition-colors"
              >
                <Mail size={20} className="text-[#E3510F]" />
                <span style={{ textShadow: '0 0 20px rgba(227,81,15,0.2)' }}>careers@andhitech.in</span>
              </a>
            </motion.div>
          </div>
        </section>
      ) : (
        <JobList jobs={jobs} />
      )}

      <Benefits />
      <JoinUs />
      <Footer />
    </>
  );
}
