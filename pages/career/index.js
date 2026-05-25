import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import JobList from '@/components/Career/JobList';
import Benefits from '@/components/Career/Benefits';
import JoinUs from '@/components/Career/JoinUs';
import Head from 'next/head';

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    const data = await res.json();

    return {
      props: {
        jobs: data.results || [],
      },
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return {
      props: {
        jobs: [],
      },
    };
  }
}

export default function CareerPage({ jobs }) {
  return (
    <>
    <Head>
  <title>Career</title>
  <meta name="description" content="Explore career opportunities at our company." />
</Head>
      <Header />
      <PageBanner
        title="Career"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Career"
      />

      {jobs.length === 0 ? (
        <div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-8 col-lg-6">
      <div className="p-4 p-md-5 bg-white border rounded-3 shadow-sm text-center">
        {/* briefcase icon (inline SVG, no extra lib) */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="mb-3 text-secondary">
          <path d="M10 2h4a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v3H1V8a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2Zm4 4V4h-4v2h4Zm9 7v5a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-5h7v1a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1h7Z"/>
        </svg>
        <h5 className="mb-2">Interested in working with us? </h5>
        <p className="text-muted mb-0">Kindly share your resume at <a href="mailto:careers@andhitech.in">careers@andhitech.in</a>.</p>
      </div>
    </div>
  </div>
</div>

      ) : (
        <JobList jobs={jobs} />
      )}

      <JoinUs />
      <Footer />
    </>
  );
}
