'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronRight, Plus, X } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

const strip = (html, n = 22) =>
  (html || '').replace(/<[^>]*>/g, '').split(' ').slice(0, n).join(' ') + '…';

const ease = [.22, 1, .36, 1];

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

const CAT_META = {
  'LHB': { color: '#A0AABA', num: '01' },
  'Vande Bharat': { color: '#3B82F6', num: '02' },
  'Metro': { color: '#8B5CF6', num: '03' },
  'Brake': { color: '#EF4444', num: '04' },
  'Track': { color: '#F59E0B', num: '05' },
};

/* ── Featured Split Product Row ── */
function FeaturedProduct({ p, idx, total }) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgX = idx % 2 === 0
    ? useTransform(scrollYProgress, [0, 1], [-20, 20])
    : useTransform(scrollYProgress, [0, 1], [20, -20]);

  const imgSrc = getProductImage(p);
  const catName = p.category?.name || 'Engineering';
  const meta = CAT_META[catName] || { color: '#B88746', num: '0' + (idx + 1) };
  const isEven = idx % 2 === 0;

  const specs = [
    { label: 'Standard', val: 'RDSO / ISO 9001' },
    { label: 'Material', val: 'Grade A Steel' },
    { label: 'Application', val: catName + ' Systems' },
    { label: 'Lead Time', val: '4–6 Weeks' },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease }}
      className={`relative grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[520px] group overflow-hidden ${idx < total - 1 ? 'border-b border-white/[.04]' : ''
        }`}
    >
      {/* Image side */}
      <div className={`relative overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}
        style={{ minHeight: 380 }}>
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.12]">
          <Image
            src={imgSrc} alt={p.title} fill
            className="object-cover opacity-75 group-hover:opacity-95 transition-all duration-700 brightness-110 contrast-[1.05]"
            unoptimized
          />
        </motion.div>
        {/* Gradient */}
        <div className="absolute inset-0"
          style={{
            background: isEven
              ? 'linear-gradient(to right,#0B1F3A 0%,rgba(11,31,58,.1) 60%,transparent 100%)'
              : 'linear-gradient(to left,#0B1F3A 0%,rgba(11,31,58,.1) 60%,transparent 100%)',
          }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top,#0B1F3A 0%,transparent 40%)' }} />

        {/* Category badge */}
        <div className="absolute top-8 left-8">
          <span className="badge" style={{ borderColor: `${meta.color}30`, background: `${meta.color}12`, color: meta.color }}>
            {catName}
          </span>
        </div>

        {/* Large step number watermark */}
        <div
          className="absolute bottom-4 right-6 pointer-events-none select-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem,10vw,8rem)',
            lineHeight: 1,
            color: 'rgba(255,255,255,.025)',
            letterSpacing: '.02em',
          }}
        >
          {meta.num}
        </div>
      </div>

      {/* Text side */}
      <div className={`relative z-10 flex flex-col justify-center px-10 lg:px-16 py-14 ${!isEven ? 'lg:order-1' : ''}`}
        style={{ background: 'linear-gradient(135deg,#0B1F3A 0%,#080A0F 100%)' }}>

        {/* Accent rule */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ delay: .3, duration: .7 }}
          className="origin-left mb-8"
          style={{ width: 48, height: 2, background: `linear-gradient(90deg,${meta.color},${meta.color}40)` }}
        />

        <h3
          className="mb-5 leading-tight"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,3.5vw,3rem)', color: '#0B1F3A', letterSpacing: '.02em' }}
        >
          {p.title}
        </h3>
        <p className="text-[#B4BEC9] text-[.88rem] leading-relaxed mb-8 max-w-md font-light">
          {strip(p.description || p.content, 28)}
        </p>

        {/* Spec rows */}
        <div className="space-y-0 mb-10">
          {specs.map(({ label, val }) => (
            <div key={label} className="feature-item border-b border-white/[.08] py-4 flex items-center justify-between group/item">
              <span className="text-[#B88746] text-[.72rem] uppercase tracking-widest font-medium w-32 flex-shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>{label}</span>
              <span className="text-[#8C98AA] text-[.78rem] font-medium flex-1 text-right mr-4">{val}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#1C2540] flex-shrink-0" />
            </div>
          ))}
        </div>

        {/* Expandable specs toggle */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-3 mb-6 group/btn"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.22em', textTransform: 'uppercase', color: expanded ? meta.color : '#6B7A8E' }}
        >
          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300
            ${expanded ? 'border-current bg-current/10' : 'border-[#1C2540] group-hover/btn:border-current'}`}
            style={{ color: meta.color }}>
            {expanded ? <X size={8} /> : <Plus size={8} />}
          </div>
          {expanded ? 'Hide Details' : 'Technical Specs'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: .4, ease }}
              className="overflow-hidden"
            >
              <div className="rounded-xl p-6 mb-8 border" style={{ background: 'rgba(255,255,255,.02)', borderColor: 'rgba(255,255,255,.05)' }}>
                <p className="text-white/50 text-[.8rem] leading-relaxed mb-4">
                  All components are manufactured to RDSO specification and subjected to rigorous quality inspection including dimensional verification, material testing, and performance validation under simulated operating conditions.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {['RDSO Spec Compliant', 'Third-party Verified', 'Load tested 2× rated', 'Full documentation'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: meta.color }} />
                      <span className="text-white/50 text-[.72rem]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Link href={`/products/${p.slug || p.id}`}
          className="inline-flex items-center gap-3 group/cta"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: meta.color }}
        >
          <span>View Full Details</span>
          <div className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover/cta:bg-current/10"
            style={{ borderColor: `${meta.color}40` }}>
            <ArrowRight size={11} />
          </div>
        </Link>
      </div>

      {/* Connecting vertical rule */}
      <div className="absolute inset-y-0 w-px pointer-events-none hidden lg:block"
        style={{ left: isEven ? '50%' : '50%', background: `linear-gradient(to bottom,transparent,${meta.color}18,transparent)` }} />
    </motion.div>
  );
}

/* ── Compact grid card ── */
function CompactCard({ p, index }) {
  const imgSrc = getProductImage(p);
  const catName = p.category?.name || 'Engineering';
  const meta = CAT_META[catName] || { color: '#B88746', num: '00' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * .06, duration: .7, ease }}
      className="group"
    >
      <Link href={`/products/${p.slug || p.id}`}>
        <div className="pcard overflow-hidden h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden aspect-[16/10] sm:h-[200px]">
            <Image
              src={imgSrc} alt={p.title} fill
              className="object-cover opacity-55 group-hover:opacity-80 group-hover:scale-[1.06] transition-all duration-700"
              unoptimized
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,#0B0E15 0%,transparent 60%)' }} />
            <div className="absolute top-4 left-4">
              <span className="chip" style={{ background: meta.color }}>{catName}</span>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400"
              style={{ background: meta.color }}>
              <ArrowUpRight size={12} className="text-white" />
            </div>
          </div>
          {/* Info */}
          <div className="p-6 flex flex-col flex-1">
            <h4 className="text-white font-semibold text-[.92rem] mb-2.5 group-hover:text-[#B88746] transition-colors">{p.title}</h4>
            <p className="text-white/50 text-[.8rem] leading-relaxed mb-6 font-light line-clamp-3">
              {strip(p.description || p.content, 18)}
            </p>
            <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.18em', textTransform: 'uppercase', color: meta.color }}>
              <span>Explore</span>
              <ChevronRight size={9} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

const CATEGORIES = ['All', 'LHB', 'Vande Bharat', 'Metro', 'Brake', 'Track'];

const DEFAULT_PRODUCTS = [
  { id: 1, title: 'LHB Coach Axle & Wheel Disc', slug: 'lhb-coach-components', category: { name: 'LHB' }, icon: '/images/Axle-weel-disc.jpg', description: 'Precision-engineered LHB coach axle assemblies, wheel disc sets, and bogie components for Indian Railways rolling stock — certified to the highest RDSO standards.' },
  { id: 2, title: 'Vande Bharat HVAC Assemblies', slug: 'vande-bharat-assemblies', category: { name: 'Vande Bharat' }, icon: '/images/trainnew.jpg', description: 'Advanced HVAC components and interior fittings for the Vande Bharat Express including climate control modules and structural assemblies.' },
  { id: 3, title: 'Brake Disc & Caliper System', slug: 'brake-system-components', category: { name: 'Brake' }, icon: '/images/Brake-Disc-product.png', description: 'High-performance brake discs, pads, and caliper assemblies designed to meet RDSO and international railway safety standards under heavy cyclic loading.' },
  { id: 4, title: 'Air Spring Suspension Systems', slug: 'air-spring-systems', category: { name: 'Metro' }, icon: '/images/Air-Spring.jpg', description: 'Premium air spring suspension systems engineered for smooth ride quality in metro and mainline railway applications across diverse operating conditions.' },
  { id: 5, title: 'Tungsten Carbide Tamping Tools', slug: 'track-maintenance-equipment', category: { name: 'Track' }, icon: '/images/Tungsten-Carbide-Tamping-Tools.jpg', description: 'Tungsten carbide tamping tools and track maintenance components for ballast cleaning, tamping, and precision track geometry alignment operations.' },
  { id: 6, title: 'Metro Rail Brake Components', slug: 'metro-rail-components', category: { name: 'Metro' }, icon: '/images/weel.jpg', description: 'Purpose-built components for metro rail systems — suspension members, braking elements, and structural parts built for high-frequency urban cycle demands.' },
];

export default function Services({ initialData }) {
  const [products, setProducts] = useState(initialData || []);
  const [loading, setLoading] = useState(!initialData);
  const [activeCat, setActiveCat] = useState('All');
  const [viewMode, setViewMode] = useState('featured'); // 'featured' | 'grid'
  const sectionRef = useRef(null);

  useEffect(() => {
    if (initialData?.length) return;
    fetch('/api/proxy/products')
      .then(r => r.json())
      .then(d => { setProducts(d.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const source = products.length ? products : DEFAULT_PRODUCTS;
  const filtered = activeCat === 'All'
    ? source
    : source.filter(p => {
      const pCat = (p.category?.name || '').trim().toLowerCase();
      const pTitle = (p.title || '').trim().toLowerCase();
      const pSlug = (p.slug || '').trim().toLowerCase();
      const targetCat = activeCat.trim().toLowerCase();

      // Exact category match or category inclusion
      if (pCat === targetCat || pCat.includes(targetCat)) return true;

      // Special case for "Brake" category: also check title and slug
      if (targetCat === 'brake') {
        return pTitle.includes('brake') || pSlug.includes('brake');
      }

      return false;
    });

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: '#F7F5F0' }}>
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px divider-flame opacity-30 pointer-events-none" />

      {/* ── Section Header ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-24 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14">

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .75, ease }}
          >
            <span className="eyebrow mb-7 block">Product Portfolio</span>
            <h2 className="display-md">
              Precision-Engineered<br />
              for <span style={{ color: '#B88746' }}>Critical Infrastructure</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: .14, duration: .7, ease }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            {/* View toggle */}
            <div className="flex rounded-xl overflow-hidden border border-white/[.06]" style={{ background: '#F7F5F0' }}>
              {[['featured', 'Featured'], ['grid', 'All Products']].map(([mode, label]) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className="px-5 py-2.5 transition-all duration-300"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.56rem',
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    background: viewMode === mode ? '#B88746' : 'transparent',
                    color: viewMode === mode ? '#fff' : '#6B7A8E',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <Link href="/products" className="btn-wire py-3 px-7 text-[.6rem] group inline-flex items-center gap-2">
              <span>Full Catalogue</span>
              <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: .2 }}
          className="flex flex-wrap gap-2 mb-0"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className="px-5 py-2 rounded-full text-[.6rem] font-medium uppercase tracking-widest transition-all duration-300"
              style={{
                fontFamily: 'var(--font-mono)',
                background: activeCat === cat ? '#B88746' : 'rgba(255,255,255,.03)',
                color: activeCat === cat ? '#fff' : '#B8C2CF',
                border: activeCat === cat
                  ? '1px solid #B88746'
                  : '1px solid rgba(255,255,255,.055)',
                boxShadow: activeCat === cat
                  ? '0 8px 24px rgba(184,135,70,.2)'
                  : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Featured split-view ── */}
      {viewMode === 'featured' && !loading && (
        <div className="border-t border-white/[.04]">
          {filtered.slice(0, 4).map((p, i) => (
            <FeaturedProduct key={p.id || i} p={p} idx={i} total={Math.min(filtered.length, 4)} />
          ))}
        </div>
      )}

      {/* ── Grid view ── */}
      {viewMode === 'grid' && (
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 pb-24 relative z-10">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[380px] rounded-2xl animate-pulse bg-white/[.03] border border-white/[.04]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => (
                <CompactCard key={p.id || i} p={p} index={i} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Bottom CTA ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: .2, duration: .7, ease }}
          className="relative rounded-2xl overflow-hidden border border-white/[.05] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 px-10 py-10"
          style={{ background: 'linear-gradient(135deg,#0B1F3A 0%,#0F2847 100%)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(184,135,70,.5),transparent)' }} />
          <div className="absolute inset-0 bg-grid-fine opacity-20 pointer-events-none" />
          <div>
            <p className="text-white font-semibold text-[1.05rem] mb-1">Need a custom engineering solution?</p>
            <p className="text-[#6B7A8E] text-[.82rem]">Our engineering team designs and manufactures to your exact specifications.</p>
          </div>
          <Link href="/contact" className="btn-flame flex-shrink-0 group py-3.5 px-9 text-[.62rem] inline-flex items-center gap-2.5">
            <span>Discuss Your Project</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
