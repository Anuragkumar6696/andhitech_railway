'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

export async function getServerSideProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  try {
    const [productsRes, logosRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/client-logos/`),
    ]);
    const productsData = await productsRes.json();
    const logosData = await logosRes.json();
    return {
      props: {
        products: Array.isArray(productsData) ? productsData : productsData.results || [],
        clientLogos: Array.isArray(logosData) ? logosData : logosData.results || [],
      },
    };
  } catch (error) {
    console.error('Failed to fetch product data:', error);
    return { props: { products: [], clientLogos: [] } };
  }
}

export default function Products({ products }) {
  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Products &amp; Services | AND Hitech</title>
        <meta name="description" content="Explore our premium industrial products and services for railways and beyond." />
      </Head>

      <Header />
      <PageBanner
        title="Products & Services"
        backgroundImage="/images/page-header-bg.jpg"
        currentPage="Products & Services"
      />

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-end">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="section-label mb-5">
                  <span>Our Solutions</span>
                </div>
                <h2 className="section-heading">
                  High-Performance Components for{' '}
                  <span>Critical Infrastructure</span>
                </h2>
              </motion.div>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[#777] text-[15px] italic leading-relaxed border-l-4 border-brand-orange pl-6">
                "At AHIL, we specialize in manufacturing high-performance components designed for safety, efficiency, and reliability."
              </p>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 6) * 0.08, duration: 0.65 }}
                className="group card-premium"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={product.icon}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Category */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="bg-brand-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm"
                      style={{ fontFamily: 'var(--font-label)' }}
                    >
                      {product.category?.name || 'Engineering'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3
                    className="text-[19px] font-bold text-[#1a1a1a] mb-3 group-hover:text-brand-orange transition-colors leading-snug"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {product.title}
                  </h3>
                  <p className="text-[#777] text-sm leading-relaxed mb-7 line-clamp-3">
                    {product.content?.replace(/<[^>]*>/g, '') ||
                      'Precision engineered component designed for maximum efficiency and long-term reliability.'}
                  </p>

                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-3 text-[#1a1a1a] font-bold text-[12px] uppercase tracking-wider group/link hover:text-brand-orange transition-colors"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    <span>View Details</span>
                    <div className="w-9 h-9 rounded-full border border-[#e0ddd8] flex items-center justify-center group-hover/link:bg-brand-orange group-hover/link:border-brand-orange group-hover/link:text-white transition-all duration-300">
                      <ArrowRight size={15} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-24 text-[#aaa]">No products found.</div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
