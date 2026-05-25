import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
import JobDetail from '@/components/Career/JobDetail';
import Head from 'next/head';

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs/${params.slug}/`);
    if (!res.ok) {
      return { notFound: true };
    }

    const job = await res.json();

    return {
      props: {
        job,
      },
    };
  } catch (error) {
    console.error('Error fetching job detail:', error);
    return {
      notFound: true,
    };
  }
}

export default function CareerDetails({ job }) {
  return (
    <>
    <Head>
  <title>{job?.meta_title || job?.title || 'Job Detail'}</title>
  <meta name="description" content={job?.meta_description || 'Explore career opportunities at our company.'} />
</Head>
      <Header />
      <PageBanner
        title={job?.title || 'Job Not Found'}
        backgroundImage="/images/page-header-bg.jpg"
        currentPage={job?.title || 'Job Detail'}
      />
      <div className="page-service-single">
        <div className="container">
          <div className="row">
            {job ? (
              <JobDetail job={job} />
            ) : (
              <div className="col-12 text-center py-5">
                <h2>Job not found.</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
