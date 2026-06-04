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
        <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center bg-[#0D1117] rounded-3xl border border-white/10 shadow-2xl p-16 md:p-24 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B88746] to-transparent opacity-50" />
              <div className="w-20 h-20 rounded-2xl bg-[#B88746]/10 flex items-center justify-center mx-auto mb-10 border border-[#B88746]/20">
                <Mail size={32} className="text-[#B88746]" />
              </div>
              <h3
                className="text-3xl md:text-4xl font-bold text-[#F0F2F5] mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Interested in <span className="text-[#B88746]">Working With Us?</span>
              </h3>
              <p className="text-[#8C98AA] text-lg leading-relaxed mb-12 max-w-md mx-auto font-light">
                We don&apos;t have any open positions right now, but we&apos;re always looking for talented engineers and innovators. Share your resume and we&apos;ll be in touch.
              </p>
              <a
                href="mailto:careers@andhitech.in"
                className="btn-flame inline-flex items-center gap-4 py-4 px-10 hover:shadow-[0_0_30px_rgba(184,135,70,0.4)] transition-all duration-500 group"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span className="group-hover:tracking-wider transition-all duration-500">Send Your Resume</span>
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
