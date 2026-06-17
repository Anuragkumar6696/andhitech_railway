'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

function AnimCounter({ end, suffix = '', duration = 2200 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const n = parseInt(String(end).replace(/\D/g, ''), 10);
        const start = Date.now();
        const tick = () => {
          const elapsed  = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 4);
          setVal(Math.round(eased * n));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{val}{suffix}</span>;
}

const stats = [
  { n: 500, sfx: '+', label: 'Components Delivered',  sub: 'Railway & Metro Applications' },
  { n: 10,  sfx: '+', label: 'Years of Excellence',   sub: 'Founded 2013' },
  { n: 100, sfx: '+', label: 'Skilled Engineers',      sub: 'In-house Expertise' },
  { n: 25,  sfx: '+', label: 'Product Variants',       sub: 'Across All Categories' },
];

const ease = [.22, 1, .36, 1];

export default function Statistics() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#0B1F3A' }} aria-label="Company overview">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Copper glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 900px 500px at 80% 50%,rgba(184,135,70,.05),transparent 70%)' }}
      />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 relative z-10">

        {/* ── Two-column header ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, ease }}
          >
            <div style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '.65rem', fontWeight: 600,
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: 'rgba(184,135,70,.6)',
              marginBottom: '16px',
            }}>
              Who We Are
            </div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.4rem,4.5vw,5rem)',
              fontWeight: 700, lineHeight: .95,
              letterSpacing: '-.015em', color: '#F7F5F0',
            }}>
              India's Precision<br />
              <span style={{ color: '#B88746' }}>Railway Partner</span>
            </h2>
            <div style={{
              width: '40px', height: '2px',
              background: 'linear-gradient(90deg,#B88746,transparent)',
              margin: '20px 0',
            }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, ease, delay: .15 }}
            className="flex flex-col justify-end"
          >
            <p style={{ color: 'rgba(255,255,255,.42)', fontSize: '.88rem', lineHeight: 1.8, maxWidth: '420px', marginBottom: '16px' }}>
              AND Hitech Industries is a certified railway component manufacturer headquartered in Jaipur. Since 2013, we have supplied HVAC systems, brake components, suspension parts, and precision rolling stock solutions to Indian Railways, Metro networks, and the Vande Bharat programme.
            </p>
            <p style={{ color: 'rgba(255,255,255,.28)', fontSize: '.82rem', lineHeight: 1.8, maxWidth: '420px', marginBottom: '28px' }}>
              RDSO approved and ISO 9001:2015 certified. Our CNC manufacturing infrastructure delivers sub-millimeter precision at scale.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/about-us"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '11px 24px',
                  border: '1px solid rgba(184,135,70,.3)', color: '#B88746',
                  fontFamily: 'Outfit, sans-serif', fontSize: '.78rem', fontWeight: 500,
                  letterSpacing: '.04em', borderRadius: '3px', textDecoration: 'none',
                  transition: 'background .25s, color .25s',
                }}
              >
                Our Story
              </Link>
              <Link href="/products" className="btn-primary" style={{ padding: '11px 24px', fontSize: '.78rem' }}>
                View Products
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Stats grid ── */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,.05)', borderRadius: '4px' }}
        >
          {stats.map(({ n, sfx, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .7, ease, delay: i * .1 }}
              className="group relative"
              style={{
                padding: '40px 32px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none',
                transition: 'background .4s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#0F2847'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Copper top accent on hover */}
              <div
                className="absolute top-0 left-0 right-0 opacity-0 group-hover:opacity-100"
                style={{ height: '2px', background: 'rgba(184,135,70,.45)', transition: 'opacity .4s' }}
              />
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.6rem,4vw,3.8rem)',
                fontWeight: 700, color: '#F7F5F0', lineHeight: 1, marginBottom: '8px',
              }}>
                <AnimCounter end={n} suffix={sfx} />
              </div>
              <div style={{ fontSize: '.82rem', fontWeight: 600, color: '#B88746', marginBottom: '4px' }}>{label}</div>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '.6rem', fontWeight: 600,
                letterSpacing: '.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,.2)',
              }}>{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Trust strip ── */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: .8, delay: .4 }}
          className="mt-12 pt-8 flex flex-wrap items-center justify-center gap-8"
          style={{
            borderTop: '1px solid rgba(255,255,255,.05)',
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '.6rem', fontWeight: 600,
            letterSpacing: '.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.22)',
          }}
        >
          {['Indian Railways Vendor', 'Metro Rail Projects', 'Vande Bharat Ecosystem', 'RDSO Approved', 'ISO 9001:2015', 'Make in India'].map(t => (
            <span key={t} className="flex items-center gap-2">
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(184,135,70,.4)', display: 'inline-block', flexShrink: 0 }} />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
