'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

/*
 * Services — Products & Solutions
 * Layout: alternating full-bleed image + text rows
 * Images: always left-right alternating, object-fit cover, no broken boxes
 * Falls back to curated static products if API unavailable
 */

const ease = [.22, 1, .36, 1];

const strip = (html, n = 24) =>
  (html || '').replace(/<[^>]*>/g, '').split(' ').slice(0, n).join(' ') + '…';

/* ── Map product slugs to the correct local image ── */
const getProductImage = (p) => {
  const slug = (p.slug || '').toLowerCase();
  const icon = p.icon || '';

  if (icon.startsWith('http')) return icon;
  if (icon && !icon.includes('image18')) return getAbsoluteURL(icon);

  if (slug.includes('roof-mounted-package-unit') || slug.includes('rmpu'))
    return '/images/products/rmpu-25.jpg';
  if (slug.includes('axle-mounted-brake-disc'))
    return '/images/products/axle-brake-v2/br-1.jpg';
  if (slug.includes('wheel-mounted-brake-disc-vande-bharat'))
    return '/images/products/wm-vb/vb-1.jpg';
  if (slug.includes('wheel-mounted-brake-disc-delhi-metro'))
    return '/images/products/delhi-metro-brake/image1.jpg';
  if (slug.includes('split-axle-mounted-brake-disc'))
    return '/images/products/split-brake/split-1.jpg';
  if (slug.includes('brake-pads'))
    return '/images/products/brake-pads/pad-new-homepage.jpg';
  if (slug.includes('brake-blocks'))
    return '/images/products/brake-blocks/main.jpg';
  if (slug.includes('air-suspension'))
    return '/images/products/air-suspension-v2/as-1.jpg';
  if (slug.includes('lhb-dampers'))
    return '/images/products/lhb-dampers/damper-1.jpg';
  if (slug.includes('iv-coupler'))
    return '/images/products/iv-coupler-v2/iv-2.jpg';
  if (slug.includes('pantograph'))
    return '/images/products/pantograph/main.jpg';
  if (slug.includes('single-leaf-plug-door'))
    return '/images/products/vande-bharat-door/main.jpg';
  if (slug.includes('tamping'))
    return '/images/products/tamping-tool-main.jpg';
  if (slug.includes('dashboard') || icon.includes('image18'))
    return '/images/products/products-index-19.jpg';

  return '/images/production-unit-final.jpg';
};

/* ── Static fallback products ── */
const STATIC_PRODUCTS = [
  {
    id: 1, slug: 'roof-mounted-package-unit-rmpu-for-lhb-coaches',
    title: 'Roof Mounted Package Units (RMPU)',
    category: { name: 'LHB' },
    description: 'Complete HVAC climate solutions for LHB and Vande Bharat rolling stock. Engineered to maintain optimal cabin conditions across all weather extremes, compliant with RDSO specifications.',
    specs: ['RDSO Compliant', 'LHB Compatible', 'Vande Bharat'],
  },
  {
    id: 2, slug: 'axle-mounted-brake-disc',
    title: 'Axle-Mounted Brake Discs',
    category: { name: 'Brake' },
    description: 'High-performance braking components for demanding railway operations. Precision-manufactured with certified metallurgy and verified fatigue performance to RDSO standards.',
    specs: ['Grade A Steel', 'RDSO Approved', 'Indian Railways'],
  },
  {
    id: 3, slug: 'air-suspension-control-equipment',
    title: 'Air Suspension Systems',
    category: { name: 'Metro' },
    description: 'Engineered air springs and suspension control delivering superior ride quality, passenger comfort, and operational stability across Indian Railways and Metro applications.',
    specs: ['Air Spring Technology', 'Long Service Life', 'ISO 9001:2015'],
  },
  {
    id: 4, slug: 'iv-coupler',
    title: 'IV Coupler Systems',
    category: { name: 'Vande Bharat' },
    description: 'High-integrity coupling solutions for modern rolling stock. Designed for the dynamic load requirements of semi-high-speed and conventional rail with precision-machined interfaces.',
    specs: ['CNC Precision', 'Dynamic Load Tested', 'Full Documentation'],
  },
];

/* ── Category accent colours ── */
const CAT_COLOR = {
  'LHB':           '#A0AABA',
  'Vande Bharat':  '#3B82F6',
  'Metro':         '#8B5CF6',
  'Brake':         '#EF4444',
  'Track':         '#F59E0B',
};

/* ── Single alternating product row ── */
function ProductRow({ p, idx }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const imgSrc  = getProductImage(p);
  const catName = p.category?.name || 'Engineering';
  const accent  = CAT_COLOR[catName] || '#B88746';
  const isEven  = idx % 2 === 0;
  const specs   = p.specs || ['RDSO / ISO 9001', 'Grade A Steel', catName + ' Systems', '4–6 Weeks Lead'];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: .9, ease }}
      className="group"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 520,
        borderBottom: '1px solid rgba(255,255,255,.04)',
      }}
    >
      {/* ── Image panel ── */}
      <div
        style={{
          position: 'relative', overflow: 'hidden',
          minHeight: 360,
          order: isEven ? 0 : 1,
          background: '#0F2847',
        }}
      >
        <motion.div style={{ y: imgY, position: 'absolute', inset: 0 }} className="absolute inset-0 scale-[1.08]">
          <Image
            src={imgSrc}
            alt={p.title}
            fill
            className="object-cover transition-all duration-700 group-hover:opacity-95"
            style={{ opacity: 0.72, filter: 'brightness(1.08) contrast(1.04)' }}
            sizes="50vw"
            unoptimized
          />
        </motion.div>

        {/* Side gradient — blends into text panel */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: isEven
              ? 'linear-gradient(to right,rgba(11,31,58,.14) 0%,transparent 55%)'
              : 'linear-gradient(to left,rgba(11,31,58,.14) 0%,transparent 55%)',
          }}
        />
        {/* Bottom gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0B1F3A 0%, transparent 38%)' }} />

        {/* Category badge */}
        <div style={{ position: 'absolute', top: 28, left: 28 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px',
            border: `1px solid ${accent}35`,
            background: `${accent}14`,
            color: accent,
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '.6rem', fontWeight: 600,
            letterSpacing: '.2em', textTransform: 'uppercase',
            borderRadius: '2px',
          }}>
            {catName}
          </span>
        </div>

        {/* Watermark number */}
        <div style={{
          position: 'absolute', bottom: 16, right: 20,
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(5rem,9vw,8rem)',
          fontWeight: 700, lineHeight: 1,
          color: 'rgba(255,255,255,.025)',
          pointerEvents: 'none', userSelect: 'none',
        }}>
          {String(idx + 1).padStart(2, '0')}
        </div>
      </div>

      {/* ── Text panel ── */}
      <div
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(40px,5vw,72px) clamp(32px,5vw,64px)',
          background: 'linear-gradient(135deg,#0B1F3A 0%,#071529 100%)',
          order: isEven ? 1 : 0,
        }}
      >
        {/* Accent bar */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ delay: .3, duration: .7 }}
          style={{ width: 48, height: 2, background: `linear-gradient(90deg,${accent},${accent}50)`, transformOrigin: 'left', marginBottom: '28px' }}
        />

        {/* Tag */}
        <div style={{
          fontFamily: 'Barlow Condensed, sans-serif',
          fontSize: '.6rem', fontWeight: 600,
          letterSpacing: '.25em', textTransform: 'uppercase',
          color: accent, marginBottom: '14px',
        }}>
          {catName} · {p.category?.name || 'Engineering'}
        </div>

        <h3 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(1.7rem,2.8vw,2.6rem)',
          fontWeight: 600, color: '#F7F5F0',
          lineHeight: 1.1, marginBottom: '18px',
        }}>
          {p.title}
        </h3>

        <p style={{ fontSize: '.86rem', color: 'rgba(255,255,255,.42)', lineHeight: 1.8, marginBottom: '28px', maxWidth: '420px' }}>
          {strip(p.description || p.content, 26)}
        </p>

        {/* Spec tags */}
        <div className="flex flex-wrap gap-2 mb-9">
          {specs.map(s => (
            <span key={s} style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '.6rem', fontWeight: 600,
              letterSpacing: '.14em', textTransform: 'uppercase',
              padding: '4px 10px',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: '2px', color: 'rgba(255,255,255,.35)',
            }}>
              {s}
            </span>
          ))}
        </div>

        <Link
          href={`/products/${p.slug || p.id}`}
          className="btn-copper inline-flex items-center gap-2 group/btn"
          style={{ alignSelf: 'flex-start' }}
        >
          <span>View Product</span>
          <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services({ initialData }) {
  const [products, setProducts] = useState(initialData?.length ? initialData : []);
  const [loading, setLoading]   = useState(!initialData?.length);

  useEffect(() => {
    if (initialData?.length) return;
    fetch('/api/proxy/products', { headers: { 'Accept': 'application/json', 'x-nextjs-data': '1' } })
      .then(r => r.json())
      .then(d => { setProducts(d.results || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const source = products.length ? products : STATIC_PRODUCTS;
  const featured = source.slice(0, 4);

  return (
    <section className="relative overflow-hidden" style={{ background: '#0B1F3A' }} aria-label="Products and solutions">
      {/* Section header */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, ease }}
          >
            <div style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '.65rem', fontWeight: 600,
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: 'rgba(184,135,70,.6)', marginBottom: '16px',
            }}>
              Products & Solutions
            </div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.4rem,4.5vw,5rem)',
              fontWeight: 700, lineHeight: .95,
              letterSpacing: '-.015em', color: '#F7F5F0',
            }}>
              Engineered for<br />
              <span style={{ color: '#B88746' }}>Every Rail Application</span>
            </h2>
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg,#B88746,transparent)', marginTop: '20px' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .75, ease, delay: .15 }}
            className="flex flex-col items-start gap-4"
          >
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.88rem', lineHeight: 1.8, maxWidth: '420px' }}>
              Precision-manufactured components for Indian Railways, Metro networks, and Vande Bharat — every product RDSO approved and fully documented.
            </p>
            <Link href="/products" className="btn-copper inline-flex items-center gap-2 group">
              <span>Full Product Catalogue</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Alternating product rows */}
      {loading ? (
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 pb-24">
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              height: 200, marginBottom: '4px',
              background: 'rgba(255,255,255,.03)',
              borderRadius: '4px',
              animation: 'pulse 2s infinite',
            }} />
          ))}
        </div>
      ) : (
        <div style={{ borderTop: '1px solid rgba(255,255,255,.04)' }}>
          {featured.map((p, i) => (
            <ProductRow key={p.id || i} p={p} idx={i} />
          ))}
        </div>
      )}

      {/* Bottom CTA banner */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: .2, duration: .7, ease }}
          style={{
            position: 'relative', overflow: 'hidden', borderRadius: '4px',
            border: '1px solid rgba(255,255,255,.06)',
            background: 'linear-gradient(135deg,#0F2847 0%,#0B1F3A 100%)',
            padding: 'clamp(32px,4vw,48px) clamp(32px,4vw,56px)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap',
          }}
        >
          {/* Top copper line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1.5px',
            background: 'linear-gradient(90deg,transparent,rgba(184,135,70,.5),transparent)',
          }} />
          <div>
            <p style={{ color: '#F7F5F0', fontWeight: 600, fontSize: '1.05rem', marginBottom: '6px' }}>
              Need a custom engineering solution?
            </p>
            <p style={{ color: '#6B7A8E', fontSize: '.84rem' }}>
              Our engineering team designs and manufactures to your exact specifications.
            </p>
          </div>
          <Link href="/contact" className="btn-primary flex-shrink-0 group inline-flex items-center gap-2">
            <span>Discuss Your Project</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
