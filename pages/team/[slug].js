import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageBanner from '@/components/PageBanner';
import TeamDetailContent from '@/components/Team/TeamDetailContent';
import Head from 'next/head';

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/team/`);
    const data = await res.json();
    const paths = (data.results || []).map((member) => ({
      params: { slug: member.slug },
    }));
    return { paths, fallback: 'blocking' };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/team/${params.slug}/`);
    if (!res.ok) return { notFound: true };
    const member = await res.json();
    return { props: { member }, revalidate: 300 };
  } catch (error) {
    console.error('Error fetching team member:', error);
    return { notFound: true };
  }
}

export default function TeamDetailPage({ member }) {
  return (
    <>
      <Head>
        <title>{member.name}</title>
        <meta name="description" content={member.bio || 'Meet our team member.'} />
      </Head>
      <Header />
      <PageBanner
        title={member.name}
        backgroundImage={
          member.image?.startsWith('http')
            ? member.image
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${member.image}`
        }
        currentPage={member.name}
      />
      <TeamDetailContent member={member} />
      <Footer />
    </>
  );
}
