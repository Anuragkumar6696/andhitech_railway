'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, ChevronLeft, ChevronRight } from 'lucide-react';

/*
 * Certificates — Quality & Compliance section
 * Layout: 2-col header, 4 cert cards (dark), quality process strip, lightbox
 * Background: navy (#0B1F3A)
 */

const certs = [
  { src: '/images/certificate1.png',  title: 'ISO 9001:2015',   subtitle: 'Quality Management System',    tag: 'Certified' },
  { src: '/images/certificate2.png',  title: 'ISO 14001:2015',  subtitle: 'Environmental Management',     tag: 'Compliant' },
  { src: '/images/certificate3.png',  title: 'RDSO Approved',   subtitle: 'Railway Standards Body · Govt. India', tag: 'Approved Vendor' },
  { src: '/images/rocertificate.png', title: 'Excellence Award', subtitle: 'Manufacturing & Innovation',  tag: 'Awarded 2023' },
];

const qualities = [
  'Rigorous incoming material inspection — chemical composition, mechanical properties, and dimensional checks at every delivery.',
  'In-process quality checkpoints throughout manufacturing with real-time monitoring on CNC machining centres.',
  'Final product testing against RDSO & ISO standards before dispatch, with comprehensive test reports provided.',
  'Fully traceable documentation for every component, from raw material batch to certified final delivery.',
];

const ease = [.22, 1, .36, 1];

/* ── Lightbox ── */
function CertLightbox({ startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(null);
  const total = certs.length;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const goPrev = useCallback(() => { setDirection(-1); setCurrent(c => (c - 1 + total) % total); }, [total]);
  const goNext = useCallback(() => { setDirection(1);  setCurrent(c => (c + 1) % total); }, [total]);

  const onTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = e => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  const variants = {
    enter:  dir => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit:   dir => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: .22 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(3,4,5,.97)', backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      data-lenis-prevent
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={onClose}
    >
      {/* Close */}
      <button
        aria-label="Close lightbox" onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 20, zIndex: 10,
          width: '44px', height: '44px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,.1)',
          background: 'rgba(0,0,0,.5)',
          color: 'rgba(255,255,255,.6)', fontSize: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'color .2s, border-color .2s',
        }}
      >
        <X size={18} />
      </button>

      {/* Counter */}
      <div style={{
        position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
        padding: '6px 16px', borderRadius: '20px',
        background: 'rgba(0,0,0,.5)', border: '1px solid rgba(255,255,255,.08)',
        color: 'rgba(255,255,255,.5)', fontSize: '13px', fontFamily: 'monospace', letterSpacing: '.08em',
        zIndex: 10,
      }}>
        {current + 1} / {total}
      </div>

      {/* Prev */}
      <button
        aria-label="Previous certificate"
        onClick={e => { e.stopPropagation(); goPrev(); }}
        style={{
          position: 'absolute', left: '20px', zIndex: 10,
          width: '44px', height: '44px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,.1)', background: 'rgba(0,0,0,.5)',
          color: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Next */}
      <button
        aria-label="Next certificate"
        onClick={e => { e.stopPropagation(); goNext(); }}
        style={{
          position: 'absolute', right: '20px', zIndex: 10,
          width: '44px', height: '44px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,.1)', background: 'rgba(0,0,0,.5)',
          color: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Image */}
      <div
        style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1400px', padding: '80px' }}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current} custom={direction} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: .28, ease }}
            style={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <Image
              src={certs[current].src} alt={certs[current].title}
              fill className="object-contain"
              unoptimized priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 10 }}>
        {certs.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to certificate ${i + 1}`}
            onClick={e => { e.stopPropagation(); setDirection(i > current ? 1 : -1); setCurrent(i); }}
            style={{
              width: i === current ? 20 : 6, height: 6,
              borderRadius: i === current ? 3 : '50%',
              background: i === current ? '#B88746' : 'rgba(255,255,255,.2)',
              transition: 'all .3s', border: 'none', cursor: 'pointer', padding: 0,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main ── */
export default function Certificates() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section
      className="relative overflow-hidden section-gap"
      style={{ background: '#0B1F3A' }}
      aria-label="Certifications and quality"
    >
      <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 800px 600px at 50% -5%,rgba(184,135,70,.05),transparent 68%)' }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(184,135,70,.18),transparent)' }}
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, ease }}
          >
            <div style={{
              fontFamily: 'Barlow Condensed, sans-serif', fontSize: '.65rem', fontWeight: 600,
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: 'rgba(184,135,70,.6)', marginBottom: '16px',
            }}>
              Trust & Compliance
            </div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.4rem,4.5vw,5rem)',
              fontWeight: 700, lineHeight: .95,
              letterSpacing: '-.015em', color: '#F7F5F0',
            }}>
              Enterprise-Grade<br />
              <span style={{ color: '#B88746' }}>Quality Assurance</span>
            </h2>
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg,#B88746,transparent)', marginTop: '20px' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: .15, duration: .8, ease }}
          >
            <p style={{ color: 'rgba(255,255,255,.4)', fontSize: '.88rem', lineHeight: 1.8, marginBottom: '24px' }}>
              Every component leaves our facility with full certification documentation, traceable manufacturing records, and compliance to RDSO, ISO, and international railway safety standards.
            </p>
            {/* Quality points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {qualities.slice(0, 2).map((q, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(184,135,70,.1)', border: '1px solid rgba(184,135,70,.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px',
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B88746' }} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,.45)', fontSize: '.82rem', lineHeight: 1.7 }}>{q}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Certificate cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {certs.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * .1, duration: .65, ease }}
              className="group"
              onClick={() => setLightboxIndex(i)}
              style={{
                border: '1px solid rgba(184,135,70,.14)',
                borderRadius: '4px', padding: '28px 20px',
                textAlign: 'center', cursor: 'pointer',
                background: 'rgba(255,255,255,.02)',
                transition: 'border-color .35s, background .35s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(184,135,70,.4)';
                e.currentTarget.style.background = 'rgba(184,135,70,.04)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(184,135,70,.14)';
                e.currentTarget.style.background = 'rgba(255,255,255,.02)';
              }}
            >
              {/* Tag */}
              <span style={{
                display: 'inline-block', marginBottom: '20px',
                padding: '4px 10px',
                background: 'rgba(184,135,70,.1)', border: '1px solid rgba(184,135,70,.25)',
                borderRadius: '2px',
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '.58rem', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase',
                color: '#B88746',
              }}>
                {c.tag}
              </span>

              {/* Certificate image */}
              <div style={{
                position: 'relative', width: '100%', aspectRatio: '3/4',
                borderRadius: '4px', overflow: 'hidden',
                background: '#0B1F3A', border: '1px solid rgba(255,255,255,.05)',
                marginBottom: '20px',
              }}>
                <Image
                  src={c.src} alt={c.title} fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.05]"
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.65 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.65'}
                  unoptimized
                />
              </div>

              <div style={{
                fontFamily: 'Outfit, sans-serif', fontSize: '.9rem', fontWeight: 600,
                color: '#F7F5F0', marginBottom: '4px',
                transition: 'color .3s',
              }}
                className="group-hover:text-[#B88746]"
              >
                {c.title}
              </div>
              <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.3)' }}>{c.subtitle}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Quality process strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: .3, duration: .75, ease }}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px',
            background: 'rgba(255,255,255,.04)',
            border: '1px solid rgba(255,255,255,.05)', borderRadius: '4px', overflow: 'hidden',
          }}
        >
          {qualities.map((q, i) => (
            <div key={i} style={{
              background: '#0B1F3A', padding: '24px 28px',
              display: 'flex', alignItems: 'flex-start', gap: '14px',
            }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, marginTop: '2px',
                background: 'rgba(184,135,70,.1)', border: '1px solid rgba(184,135,70,.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B88746' }} />
              </div>
              <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.45)', lineHeight: 1.7 }}>{q}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Bottom trust banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: .4, duration: .75, ease }}
          style={{
            position: 'relative', marginTop: '24px', borderRadius: '4px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,.05)',
            background: 'linear-gradient(135deg,#0F2847 0%,#0B1F3A 100%)',
            padding: '28px 32px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '24px', flexWrap: 'wrap',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1.5px', background: 'linear-gradient(90deg,transparent,#B88746,rgba(184,135,70,.2),transparent)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '6px', flexShrink: 0,
              background: 'rgba(184,135,70,.1)', border: '1px solid rgba(184,135,70,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ShieldCheck size={20} color="#B88746" />
            </div>
            <div>
              <div style={{ color: '#F7F5F0', fontWeight: 600, fontSize: '.92rem' }}>
                Certified & RDSO Approved Manufacturer
              </div>
              <div style={{ color: 'rgba(255,255,255,.35)', fontSize: '.76rem', marginTop: '3px' }}>
                Trusted by Indian Railways and Metro networks since 2013
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {['ISO 9001', 'ISO 14001', 'RDSO', 'Make in India'].map(label => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0F766E' }} />
                <span style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '.62rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.35)',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <CertLightbox startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
