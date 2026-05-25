import React from 'react';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PageBanner from '@/components/PageBanner';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';

export async function getServerSideProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const API = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/+$/, '');
  try {
    const res = await fetch(`${API}/news-media/`);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    const pressItems = (data.results || []).map((item) => ({
      ...item,
      image: item.image?.startsWith('http') ? item.image : `${API}${item.image}`,
    }));
    return { props: { pressItems } };
  } catch (err) {
    console.error('Error loading press releases:', err);
    return { props: { pressItems: [] } };
  }
}

export default function PressPage({ pressItems }) {
  return (
    <>
      <Head>
        <title>News &amp; Media | AND Hitech</title>
        <meta name="description" content="Latest News, Features, and Mentions about AND Hitech Industries Ltd." />
      </Head>

      <Header />
      <PageBanner
        title="News & Media"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="News & Media"
      />

      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">

          {/* Section header */}
          <div className="mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-label mb-5"><span>Press &amp; Coverage</span></div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <h2 className="section-heading max-w-xl">
                  Press Release &amp; <span>Media</span>
                </h2>
                <p className="text-[#777] text-sm max-w-sm leading-relaxed">
                  Latest news, features, and mentions about AND Hitech Industries.
                </p>
              </div>
            </motion.div>
          </div>

          {pressItems.length === 0 ? (
            <div className="text-center py-20 text-[#aaa]">No press releases found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {pressItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 6) * 0.08, duration: 0.65 }}
                  className="group card-premium flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={item.image || '/images/page-header-bg.jpg'}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-grow">
                    <h3
                      className="text-[17px] font-bold text-[#1a1a1a] mb-3 line-clamp-2 group-hover:text-brand-orange transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[#777] text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {item.excerpt || item.content?.replace(/<[^>]*>/g, '').slice(0, 140)}
                    </p>
                    <div className="pt-5 border-t border-[#ede9e4] flex items-center justify-between">
                      <span className="text-[#bbb] text-xs flex items-center gap-1.5">
                        <Calendar size={12} />
                        {item.date || 'Recent'}
                      </span>
                      <a
                        href={item.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-brand-orange font-bold text-[11px] uppercase tracking-wider group/link hover:underline"
                        style={{ fontFamily: 'var(--font-label)' }}
                      >
                        <span>Read More</span>
                        <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
