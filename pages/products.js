'use client';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export async function getServerSideProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`);
    const d = await r.json();
    return { props: { products: Array.isArray(d) ? d : d.results||[] } };
  } catch { return { props: { products: [] } }; }
}

export default function Products({ products }) {
  return (
    <div className="bg-[#07080C] min-h-screen">
      <Head>
        <title>Products & Services | AND Hitech</title>
        <meta name="description" content="Premium industrial products and services for railways and beyond." />
      </Head>
      <Header />
      <PageBanner title="Products & Services" backgroundImage="/images/page-header-bg.jpg" currentPage="Products & Services" />

      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
              <span className="eyebrow mb-5 block">Our Solutions</span>
              <h2 className="display-md">High-Performance Components<br/>for <span style={{color:'#E3510F'}}>Critical Infrastructure</span></h2>
            </motion.div>
            <p className="text-[#9BA5B4] text-sm leading-relaxed border-l-2 border-[#E3510F]/40 pl-6 italic">
              &ldquo;At AHIL, we specialize in manufacturing high-performance components designed for safety, efficiency, and reliability.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay:(i%6)*0.07, duration:0.65 }}
                className="product-card group flex flex-col">
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <Image src={p.icon} alt={p.title} fill className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080C] via-[#07080C]/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#E3510F] text-white text-[9px] font-medium uppercase tracking-widest px-3 py-1" style={{fontFamily:'var(--font-mono)',clipPath:'polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))'}}>
                      {p.category?.name||'Engineering'}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-[#E3510F] flex items-center justify-center">
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-[#F0F2F5] font-semibold text-base mb-3 group-hover:text-[#E3510F] transition-colors leading-snug">{p.title}</h3>
                  <p className="text-[#5A6478] text-sm leading-relaxed mb-7 line-clamp-3 flex-grow">
                    {p.content?.replace(/<[^>]*>/g,'')||'Precision engineered for maximum efficiency and long-term reliability.'}
                  </p>
                  <Link href={`/products/${p.slug}`}
                    className="flex items-center gap-2 text-[#9BA5B4] hover:text-[#E3510F] transition-colors text-xs uppercase tracking-wider font-medium pt-5 border-t border-white/5 group/link"
                    style={{fontFamily:'var(--font-mono)'}}>
                    <span>View Details</span>
                    <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
            {!products.length && <div className="col-span-3 text-center py-20 text-[#4A5568]">No products found.</div>}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
