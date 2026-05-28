'use client';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { getAbsoluteURL } from '@/utils/url';

export async function getStaticProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`);
    const d = await r.json();
    return { 
      props: { products: Array.isArray(d) ? d : d.results||[] },
      revalidate: 60
    };
  } catch { return { props: { products:[] }, revalidate: 60 }; }
}

const CATEGORIES = ['All','LHB','Vande Bharat','Metro','Brake','HVAC','Track'];
const CAT_COLORS = { 'LHB':'#E3510F','Vande Bharat':'#2563EB','Metro':'#7C3AED','Brake':'#DC2626','HVAC':'#059669','Track':'#D97706' };
const ease = [.22,1,.36,1];

const strip = (html, n=20) => (html||'').replace(/<[^>]*>/g,'').split(' ').slice(0,n).join(' ')+'…';

export default function Products({ products }) {
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All'
    ? products
    : products.filter(p => (p.category?.name||'').includes(activeCat));

  return (
    <div className="min-h-screen" style={{ background:'#050608' }}>
      <Head>
        <title>Products & Solutions | AND Hitech Industries</title>
        <meta name="description" content="Premium railway components and engineering solutions — LHB, Vande Bharat, Metro, Brake Systems, HVAC, Track Maintenance."/>
      </Head>

      <Header/>
      <PageBanner
        title="Products & Solutions"
        backgroundImage="/images/ourproductbg.jpg"
        currentPage="Products"
      />

      <section className="relative overflow-hidden section-gap" style={{ background:'#050608' }}>
        <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none"/>
        <div className="absolute inset-0 glow-left pointer-events-none opacity-60"/>

        <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
            <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.75, ease }}>
              <span className="eyebrow mb-7 block">Our Solutions</span>
              <h2 className="display-md">
                High-Performance Components<br/>for <span style={{ color:'#E3510F' }}>Critical Infrastructure</span>
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.14, duration:.7, ease }}
              className="text-[#8C98AA] leading-relaxed border-l-2 border-[#E3510F]/35 pl-7 text-[.95rem]"
            >
              At AHIL, we specialise in manufacturing high-performance railway components designed for safety, efficiency, and long-term reliability — from concept through to certified delivery.
            </motion.p>
          </div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity:0 }} whileInView={{ opacity:1 }}
            viewport={{ once:true }} transition={{ delay:.18 }}
            className="flex flex-wrap gap-2.5 mb-12"
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 rounded-full text-[.68rem] font-bold uppercase tracking-[.15em] transition-all duration-400 ${
                  activeCat===cat
                    ? 'bg-[#E3510F] text-white shadow-lg shadow-[#E3510F]/30 scale-105'
                    : 'bg-white/[.06] text-[#ADBAC7] border border-white/[.1] hover:border-[#E3510F]/50 hover:text-white hover:bg-white/[.1]'
                }`}
                style={{ fontFamily:'var(--font-mono)' }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(filtered.length ? filtered : products).map((p, i) => {
              const catName = p.category?.name || 'Engineering';
              const accent  = CAT_COLORS[catName] || '#E3510F';
              let imgSrc  = p.icon ? (p.icon.startsWith('http') ? p.icon : getAbsoluteURL(p.icon)) : '/images/hero-bg.jpg';
              
              // Image 18 to 19 replacement for dashboard module
              if (p.slug === 'dashboard-interface' || p.title?.toLowerCase().includes('dashboard') || p.icon?.includes('image18')) {
                imgSrc = '/images/products/products-index-19.jpg';
              }
              
              // IV Coupler thumbnail update
              if (p.slug === 'iv-coupler') {
                imgSrc = '/images/products/iv-coupler-v2/iv-final.png';
              }
              
              // Pantograph thumbnail update
              if (p.slug?.includes('pantograph')) {
                imgSrc = '/images/products/pantograph/image1.jpg';
              }

              // Vande Bharat Door thumbnail update
              if (p.slug?.includes('single-leaf-plug-door-vande-bharat-trains')) {
                imgSrc = '/images/products/vande-bharat-door/image1.jpg';
              }

              // Delhi Metro Brake thumbnail update
              if (p.slug?.includes('wheel-mounted-brake-disc-delhi-metro')) {
                imgSrc = '/images/products/delhi-metro-brake/image1.jpg';
              }

              // Air Suspension thumbnail update
              if (p.slug === 'air-suspension-control-equipment') {
                imgSrc = '/images/products/air-suspension-v2/as-1.jpg';
              }
              
              // Axle Brake thumbnail update
              if (p.slug?.includes('axle-mounted-brake-disc')) {
                imgSrc = '/images/products/axle-brake-v2/br-1.jpg';
              }
              
              // RMPU thumbnail update
               if (p.slug?.includes('roof-mounted-package-unit-rmpu-for-lhb-coaches')) {
                 imgSrc = '/images/products/rmpu-21.jpg';
               }
               
               // Vande Bharat Brake thumbnail update
               if (p.slug?.includes('wheel-mounted-brake-disc-vande-bharat')) {
                 imgSrc = '/images/products/wm-vb/vb-1.jpg';
               }
               
               // Split Axle Brake thumbnail update
               if (p.slug?.includes('split-axle-mounted-brake-disc')) {
                 imgSrc = '/images/products/split-brake/split-1.jpg';
               }
               
               // Brake Pads thumbnail update
               if (p.slug?.includes('brake-pads')) {
                 imgSrc = '/images/products/brake-pads/pad-1.jpg';
               }
               
               // LHB Dampers thumbnail update
               if (p.slug?.includes('lhb-dampers')) {
                 imgSrc = '/images/products/lhb-dampers/damper-1.jpg';
               }

              return (
                <motion.div
                  key={p.id||i}
                  initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:'-50px' }} transition={{ delay:(i%6)*.07, duration:.7, ease }}
                  className="group"
                >
                  <Link href={`/products/${p.slug||p.id}`}>
                    <div className="pcard flex flex-col h-full">
                      <div className="relative overflow-hidden flex-shrink-0" style={{ height:220 }}>
                        <Image
                          src={imgSrc} alt={p.title} fill
                          className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.07] transition-all duration-700 brightness-110 contrast-[1.05]"
                          unoptimized
                        />
                        <div className="absolute inset-0" style={{ background:'linear-gradient(to top,#0B0E15 0%,transparent 55%)' }}/>
                        <div className="absolute top-4 left-4">
                          <span className="chip" style={{ background:accent }}>{catName}</span>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:accent }}>
                            <ArrowUpRight size={14} className="text-white"/>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-px"
                          style={{ background:`linear-gradient(90deg,${accent}00,${accent}45,${accent}00)` }}/>
                      </div>
                      <div className="p-7 flex flex-col flex-grow">
                        <h3 className="text-[#EDF0F5] font-semibold text-[.95rem] mb-3 leading-snug group-hover:text-[#E3510F] transition-colors duration-300">
                          {p.title}
                        </h3>
                        <p className="text-[#4E5A6E] text-[.8rem] leading-relaxed flex-1 mb-6">
                          {strip(p.description || p.content)}
                        </p>
                        <div className="flex items-center gap-2 text-[.62rem] font-medium uppercase tracking-widest transition-colors duration-300"
                          style={{ color:accent, fontFamily:'var(--font-mono)' }}>
                          <span>View Details</span>
                          <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform"/>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
            {!filtered.length && !products.length && (
              <div className="col-span-3 text-center py-24 text-[#4E5A6E]">No products found.</div>
            )}
          </div>
        </div>
      </section>

      <ContactCTA/>
      <Footer/>
    </div>
  );
}
