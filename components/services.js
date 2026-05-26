'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

const strip = (html, n=20) =>
  (html||'').replace(/<[^>]*>/g,'').split(' ').slice(0,n).join(' ')+'…';

const ease = [.22,1,.36,1];

/* ── Category label map ── */
const CAT_COLORS = {
  'LHB':          '#E3510F',
  'Vande Bharat': '#2563EB',
  'Metro':        '#7C3AED',
  'Brake':        '#DC2626',
  'HVAC':         '#059669',
  'Track':        '#D97706',
};

function ProductCard({ p, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] });
  const y = useTransform(scrollYProgress, [0,1], [30,-30]);

  const imgSrc = p.icon ? getAbsoluteURL(p.icon) : '/images/hero-bg.jpg';
  const catName = p.category?.name || 'Engineering';
  const accent   = CAT_COLORS[catName] || '#E3510F';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-60px' }} transition={{ delay:index*.07, duration:.75, ease }}
      className="group"
    >
      <Link href={`/products/${p.slug || p.id}`}>
        <div className="pcard flex flex-col h-full overflow-hidden">
          {/* Image container */}
          <div className="relative overflow-hidden" style={{ height:220 }}>
            <motion.div style={{ y }} className="absolute inset-0 scale-[1.08]">
              <Image
                src={imgSrc}
                alt={p.title}
                fill
                className="object-cover opacity-65 group-hover:opacity-90 transition-opacity duration-700"
                unoptimized
              />
            </motion.div>
            {/* Gradient overlay */}
            <div className="absolute inset-0" style={{ background:'linear-gradient(to top,#0B0E15 0%,transparent 55%)' }}/>
            {/* Category chip */}
            <div className="absolute top-4 left-4">
              <span className="chip" style={{ background:accent }}>
                {catName}
              </span>
            </div>
            {/* Arrow badge */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-400">
              <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-xl" style={{ background:accent }}>
                <ArrowUpRight size={14} className="text-white"/>
              </div>
            </div>
            {/* Line accent at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{ background:`linear-gradient(90deg,${accent}00,${accent}50,${accent}00)` }}/>
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-7">
            <h3 className="text-[#EDF0F5] font-semibold text-[.94rem] mb-3 leading-snug group-hover:text-[#E3510F] transition-colors duration-300">
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
}

/* ── Category filter ── */
const CATEGORIES = ['All','LHB','Vande Bharat','Metro','Brake','HVAC','Track'];

export default function Services({ initialData }) {
  const [products,  setProducts]  = useState(initialData || []);
  const [loading,   setLoading]   = useState(!initialData);
  const [activeCat, setActiveCat] = useState('All');

  useEffect(() => {
    if (initialData?.length) return;
    fetch('/api/proxy/products')
      .then(r => r.json())
      .then(d => { setProducts(d.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCat === 'All'
    ? products
    : products.filter(p => (p.category?.name||'').includes(activeCat));

  return (
    <section className="relative overflow-hidden section-gap" style={{ background:'#0B0E15' }}>
      <div className="absolute inset-0 bg-grid-fine opacity-45 pointer-events-none"/>
      <div className="absolute inset-x-0 top-0 h-px divider-flame opacity-35 pointer-events-none"/>
      <div className="absolute inset-x-0 bottom-0 h-px divider pointer-events-none"/>
      {/* Left glow */}
      <div className="absolute inset-0 glow-left pointer-events-none opacity-70"/>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-10">
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.75, ease }}
          >
            <span className="eyebrow mb-7 block">Product Portfolio</span>
            <h2 className="display-md">Precision-Engineered<br/>for <span style={{ color:'#E3510F' }}>Critical Infrastructure</span></h2>
          </motion.div>
          <motion.div
            initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:.14, duration:.7, ease }}
          >
            <Link href="/products" className="btn-wire py-3 px-8 text-[.62rem] group inline-flex items-center gap-2.5">
              <span>View All Products</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </motion.div>
        </div>

        {/* ── Category filter pills ── */}
        <motion.div
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ delay:.2 }}
          className="flex flex-wrap gap-2.5 mb-12"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 rounded-full text-[.62rem] font-medium uppercase tracking-widest transition-all duration-300 ${
                activeCat === cat
                  ? 'bg-[#E3510F] text-white shadow-lg shadow-[#E3510F]/25'
                  : 'bg-white/[.04] text-[#4E5A6E] border border-white/[.06] hover:border-[#E3510F]/35 hover:text-[#E3510F]'
              }`}
              style={{ fontFamily:'var(--font-mono)' }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Product grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length:6 }).map((_, i) => (
              <div key={i} className="h-[400px] rounded-2xl animate-pulse bg-white/[.03] border border-white/[.04]"/>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <ProductCard key={p.id || i} p={p} index={i}/>
            ))}
          </div>
        ) : (
          /* Fallback default products if API returns empty */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { id:1, title:'LHB Coach Components',           category:{name:'LHB'},          icon:'/images/Axle-weel-disc.jpg',    description:'Precision-engineered LHB coach axle assemblies, wheel disc sets, and bogie components for Indian Railways rolling stock.' },
              { id:2, title:'Vande Bharat Assemblies',        category:{name:'Vande Bharat'},  icon:'/images/trainnew.jpg',          description:'Advanced components for the Vande Bharat Express, including HVAC units, interior fittings, and structural assemblies.' },
              { id:3, title:'Brake System Components',        category:{name:'Brake'},         icon:'/images/Brake-Disc-product.png',description:'High-performance brake discs, brake pads, and caliper assemblies meeting RDSO and international safety standards.' },
              { id:4, title:'Air Spring Systems',             category:{name:'HVAC'},          icon:'/images/Air-Spring.jpg',        description:'Premium air spring suspension systems for smooth ride quality in metro and mainline railway applications.' },
              { id:5, title:'Track Maintenance Equipment',    category:{name:'Track'},         icon:'/images/Track-Maintenance.jpg', description:'Tungsten carbide tamping tools and track maintenance components for ballast cleaning and track alignment operations.' },
              { id:6, title:'Metro Rail Components',          category:{name:'Metro'},         icon:'/images/weel.jpg',              description:'Purpose-built components for metro rail systems including suspension, braking, and structural members.' },
            ].filter(p => activeCat==='All' || p.category.name===activeCat).map((p, i) => (
              <ProductCard key={i} p={{ ...p, slug: p.id }} index={i}/>
            ))}
          </div>
        )}

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ delay:.3, duration:.7, ease }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 rounded-2xl border border-white/[.05]"
          style={{ background:'linear-gradient(135deg,#0B0E15 0%,#0F1420 100%)' }}
        >
          <div>
            <p className="text-[#EDF0F5] font-semibold text-[1rem] mb-1">
              Need a custom engineering solution?
            </p>
            <p className="text-[#4E5A6E] text-[.82rem]">Our team can design and manufacture to your exact specifications.</p>
          </div>
          <Link href="/contact" className="btn-flame flex-shrink-0 group py-3.5 px-9 text-[.62rem] inline-flex items-center gap-2.5">
            <span>Discuss Your Project</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform"/>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
