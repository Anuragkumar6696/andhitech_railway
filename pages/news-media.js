import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';
import Image from 'next/image';

export async function getServerSideProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const API = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/+$/, '');

  try {
    const res = await fetch(`${API}/news-media/`);
    if (!res.ok) throw new Error('Failed to fetch press data');
    const data = await res.json();
    
    // Normalize image URLs if they are relative
    const pressItems = (data.results || []).map(item => ({
      ...item,
      image: item.image?.startsWith('http') ? item.image : `${API}${item.image}`
    }));

    return {
      props: {
        pressItems
      }
    };
  } catch (err) {
    console.error('Error loading press releases:', err);
    return {
      props: {
        pressItems: []
      }
    };
  }
}

export default function PressPage({ pressItems }) {
  return (
    <>
      <Head>
        <title>News & Media | AND Hitech</title>
        <meta name="description" content="Latest News, Features, and Mentions about AND Hitech Industries Ltd." />
      </Head>
      <Header />
      <PageBanner title="News & Media" backgroundImage="/images/page-header-bg.jpg" currentPage="News & Media" />

      <div className="section-title text-center mt-12">
        <h2 className="text-4xl font-bold">
          Press Release & <span className="text-brand-orange">Media</span>
        </h2>
        <p className="text-gray-500 mt-2">Latest News, Features, and Mentions</p>
      </div>

      <section className="container mx-auto py-16 px-4">
        {pressItems.length === 0 ? (
          <div className="text-center py-10">No press releases found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressItems.map((item) => (
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full group" key={item.id}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.image || "/images/page-header-bg.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">{item.excerpt || item.content?.replace(/<[^>]*>/g, '').slice(0, 150)}</p>
                  <div className="mt-auto">
                    <a 
                      href={item.link || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-brand-orange text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-dark transition-colors"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
