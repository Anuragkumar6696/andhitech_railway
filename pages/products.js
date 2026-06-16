'use client';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import PageBanner from '@/components/PageBanner';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';
import { useState, useMemo } from 'react';
import { getAbsoluteURL } from '@/utils/url';

export async function getStaticProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/`);
    const d = await r.json();
    return {
      props: { products: Array.isArray(d) ? d : d.results || [] },
      revalidate: 60,
    };
  } catch { return { props: { products: [] }, revalidate: 60 }; }
}

const CATEGORIES = ['All', 'LHB', 'Vande Bharat', 'Metro', 'Brake', 'Track'];
const CAT_COLORS = {
  'All': '#E3510F',
  'LHB': '#E3510F',
  'Vande Bharat': '#2563EB',
  'Metro': '#7C3AED',
  'Brake': '#DC2626',
  'Track': '#D97706',
};
const CAT_DESC = {
  'All': 'Complete portfolio — all railway product lines',
  'LHB': 'Linke Hofmann Busch coach components',
  'Vande Bharat': 'Semi-high-speed train systems',
  'Metro': 'Urban metro & rapid transit components',
  'Brake': 'Brake discs, pads, and blocks',
  'Track': 'Track maintenance and tooling equipment',
};
const ease = [.22, 1, .36, 1];

const strip = (html, n = 22) => (html || '').replace(/<[^>]*>/g, '').split(' ').slice(0, n).join(' ') + '…';

const getProductImage = (p) => {
  let imgSrc = p.icon ? (p.icon.startsWith('http') ? p.icon : getAbsoluteURL(p.icon)) : '/images/hero-bg.jpg';
  const slug = (p.slug || '').toLowerCase();
  if (slug === 'dashboard-interface' || p.title?.toLowerCase().includes('dashboard') || p.icon?.includes('image18')) {
    imgSrc = '/images/products/products-index-19.jpg';
  } else if (slug === 'iv-coupler') {
    imgSrc = '/images/products/iv-coupler-v2/iv-2.jpg';
  } else if (slug === 'air-suspension-control-equipment') {
    imgSrc = '/images/products/air-suspension-v2/as-1.jpg';
  } else if (slug.includes('axle-mounted-brake-disc')) {
    imgSrc = '/images/products/axle-brake-v2/br-1.jpg';
  } else if (slug.includes('roof-mounted-package-unit-rmpu-for-lhb-coaches')) {
    imgSrc = '/images/products/rmpu-25.jpg';
  } else if (slug.includes('wheel-mounted-brake-disc-vande-bharat')) {
    imgSrc = '/images/products/wm-vb/vb-1.jpg';
  } else if (slug.includes('split-axle-mounted-brake-disc')) {
    imgSrc = '/images/products/split-brake/split-1.jpg';
  } else if (slug.includes('brake-pads')) {
    imgSrc = '/images/products/brake-pads/pad-new-homepage.jpg';
  } else if (slug.includes('lhb-dampers')) {
    imgSrc = '/images/products/lhb-dampers/damper-1.jpg';
  } else if (slug.includes('single-leaf-plug-door-vande-bharat-trains')) {
    imgSrc = '/images/products/vande-bharat-door/main.jpg';
  } else if (slug.includes('pantograph')) {
    imgSrc = '/images/products/pantograph/main.jpg';
  } else if (slug.includes('brake-blocks')) {
    imgSrc = '/images/products/brake-blocks/main.jpg';
  } else if (slug.includes('wheel-mounted-brake-disc-delhi-metro')) {
    imgSrc = '/images/products/delhi-metro-brake/image1.jpg';
  } else if (slug.includes('iv-coupler')) {
    imgSrc = '/images/products/iv-coupler-v2/iv-final.png';
  } else if (slug.includes('tamping-tools') || slug.includes('tamping-tool')) {
    imgSrc = '/images/products/tamping-tool-main.jpg';
  }
  return imgSrc;
};

function ProductCard({ p, idx }) {
  const imgSrc = getProductImage(p);
  const catName = p.category?.name || 'Engineering';
  const catColor = CAT_COLORS[catName] || '#E3510F';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: .96 }}
      transition={{ delay: idx * .04, duration: .55, ease }}
      className="group relative overflow-hidden rounded-2xl border border-white/[.06] bg-[#0B0E15] hover:border-[#E3510F]/25 transition-all duration-500"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,.4)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <Image
          src={imgSrc}
          alt={p.title || 'Product'}
          fill
          className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E15] via-[#0B0E15]/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="badge text-[.52rem]" style={{ borderColor: `${catColor}30`, background: `${catColor}14`, color: catColor }}>
            {catName}
          </span>
        </div>

        {/* Quick view arrow */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#050608]/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
          <ArrowUpRight size={14} className="text-[#E3510F]" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-[#EDF0F5] text-[.92rem] font-medium mb-2 group-hover:text-white transition-colors leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
          {p.title}
        </h3>

        {/* Desc */}
        <p className="text-[#4E5A6E] text-[.76rem] leading-relaxed mb-5 group-hover:text-[#5C6A7E] transition-colors">
          {strip(p.description || p.short_description, 16)}
        </p>

        {/* Specs line */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[.04]">
          {[
            { l: 'Standard', v: 'RDSO' },
            { l: 'Cert', v: 'ISO 9001' },
          ].map(({ l, v }) => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#E3510F]" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.52rem', letterSpacing: '.12em', color: '#3D4A5C' }}>{l}: </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.52rem', color: '#6A7888' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href={`/products/${p.slug}`}
          className="flex items-center justify-between group/link"
        >
          <span className="text-[#8C98AA] group-hover/link:text-[#E3510F] text-[.72rem] font-medium transition-colors" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.1em' }}>
            View Details
          </span>
          <ArrowRight size={13} className="text-[#E3510F] group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Products({ products }) {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = products;

    // Category filter
    if (activeCat !== 'All') {
      list = list.filter(p => {
        const pCat = (p.category?.name || '').trim().toLowerCase();
        const pTitle = (p.title || '').trim().toLowerCase();
        const pSlug = (p.slug || '').trim().toLowerCase();
        const targetCat = activeCat.trim().toLowerCase();
        if (pCat === targetCat || pCat.includes(targetCat)) return true;
        if (targetCat === 'brake') return pTitle.includes('brake') || pSlug.includes('brake');
        return false;
      });
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.category?.name || '').toLowerCase().includes(q)
      );
    }

    return list;
  }, [products, activeCat, search]);

  return (
    <div className="min-h-screen" style={{ background: '#050608' }}>
      <Head>
        <title>Products & Solutions | AND Hitech Industries</title>
        <meta name="description" content="Premium railway components and engineering solutions — LHB, Vande Bharat, Metro, Brake Systems, Track Maintenance. RDSO approved, ISO 9001:2015 certified." />
      </Head>

      <Header />
      <PageBanner title="Products & Solutions" backgroundImage="/images/page-header-bg.jpg" currentPage="Products" />

      {/* ── FILTER SECTION ── */}
      <section className="relative overflow-hidden" style={{ background: '#07080C' }}>
        <div className="absolute inset-0 bg-grid-eng opacity-35 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(227,81,15,.15),transparent)' }} />

        <div className="max-w-screen-xl mx-auto px-5 md:px-10 py-12 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="eyebrow mb-3 block">Product Portfolio</span>
              <h2 className="display-sm">
                {filtered.length} {activeCat !== 'All' ? activeCat + ' ' : ''}
                <span style={{ color: '#E3510F' }}>Product{filtered.length !== 1 ? 's' : ''}</span>
              </h2>
            </div>

            {/* Search */}
            <div className="relative flex-shrink-0">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4E5A6E]" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-5 py-3 rounded-xl border border-white/[.07] text-[#EDF0F5] text-[.82rem] w-64 outline-none focus:border-[#E3510F]/40 transition-colors"
                style={{ background: 'rgba(255,255,255,.04)', fontFamily: 'var(--font-body)' }}
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => {
              const isActive = activeCat === cat;
              const color = CAT_COLORS[cat] || '#E3510F';
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className="relative transition-all duration-300 text-[.68rem] font-medium"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    padding: '8px 18px',
                    borderRadius: isActive ? 0 : '8px',
                    background: isActive ? color : 'rgba(255,255,255,.04)',
                    color: isActive ? '#fff' : '#5C6A7E',
                    border: `1px solid ${isActive ? color : 'rgba(255,255,255,.07)'}`,
                    clipPath: isActive ? 'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))' : 'none',
                  }}
                >
                  {cat}
                </button>
              );
            })}

            {/* Category description */}
            {activeCat !== 'All' && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg ml-2"
                style={{ background: 'rgba(227,81,15,.06)', border: '1px solid rgba(227,81,15,.12)' }}
              >
                <span className="text-[#E3510F]/60 text-[.64rem]" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.1em' }}>
                  {CAT_DESC[activeCat] || activeCat}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS GRID ── */}
      <section className="py-16 relative" style={{ background: '#050608' }}>
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id || p.slug || i} p={p} idx={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <SlidersHorizontal size={32} className="text-[#E3510F]/40 mx-auto mb-4" />
              <p className="text-[#4E5A6E] text-[.9rem] mb-2">No products found for &ldquo;{search}&rdquo; in {activeCat}</p>
              <button onClick={() => { setSearch(''); setActiveCat('All'); }} className="text-[#E3510F] text-[.78rem] hover:underline" style={{ fontFamily: 'var(--font-mono)' }}>
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── BESPOKE DEVELOPMENT CTA ── */}
      <section className="py-16 relative overflow-hidden" style={{ background: '#0B0E15' }}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(227,81,15,.2),transparent)' }} />
        <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .7, ease }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <div>
              <span className="eyebrow mb-4 block">Custom Development</span>
              <h3 className="display-sm mb-4">
                Can&apos;t find what you need?<br />
                <span style={{ color: '#E3510F' }}>We engineer it.</span>
              </h3>
              <p className="text-[#6A7888] text-[.88rem] leading-relaxed">
                AHIL undertakes bespoke component design and manufacturing for specific railway requirements. Share your specifications and our engineering team will develop a custom solution.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link href="/contact" className="btn-flame group inline-flex items-center gap-2">
                <span>Submit Specifications</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:+911144766444" className="btn-wire inline-flex items-center gap-2">
                <span>Call Engineering Team</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
}
