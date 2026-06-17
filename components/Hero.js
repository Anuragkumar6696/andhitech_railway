'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

const ease = [.22, 1, .36, 1];

const heroStats = [
  { n: '10+',  label: 'Years of Excellence' },
  { n: '500+', label: 'Components Delivered' },
  { n: 'RDSO', label: 'Approved Vendor' },
  { n: 'ISO',  label: '9001:2015 Certified' },
];

export default function Hero({ initialData }) {
  const [banner, setBanner] = useState(initialData || null);
  const containerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 60));

  useEffect(() => {
    if (initialData) return;
    fetch('/api/proxy/home-banner', { headers: { 'Accept': 'application/json', 'x-nextjs-data': '1' } })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.results?.[0]) setBanner(d.results[0]); })
      .catch(() => {});
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, .65], [1, 0]);
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const bgImage = banner?.image ? getAbsoluteURL(banner.image) : '/images/trainnew.jpg';

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: '100vh', minHeight: 680, background: '#071529' }}
      aria-label="AND Hitech Industries — Railway Engineering"
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        {/* CSS background as primary layer — always loads */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
          }}
        />
        {/* Cinematic gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, #071529 0%, rgba(7,21,41,.78) 38%, rgba(7,21,41,.45) 65%, rgba(7,21,41,.55) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(7,21,41,.72) 0%, transparent 55%)',
          }}
        />
      </motion.div>

      {/* ── Subtle grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.6,
        }}
      />

      {/* ── Corner copper frames ── */}
      <div className="absolute top-28 left-8 md:left-16 w-8 h-8 border-l border-t border-[#B88746]/40 hidden md:block" aria-hidden="true" />
      <div className="absolute top-28 right-8 md:right-16 w-8 h-8 border-r border-t border-[#B88746]/20 hidden md:block" aria-hidden="true" />

      {/* ── Main content ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-center"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 w-full pt-24">

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, ease, delay: .2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '.65rem', fontWeight: 600,
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: '#B88746',
            }}>
              Railway Engineering & Manufacturing
            </span>
            <span className="w-10 h-px bg-[#B88746]/40" />
            <span style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '.65rem', fontWeight: 600,
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.3)',
            }}>
              Make in India
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: .35 }}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(3.4rem, 7.5vw, 8.5rem)',
              fontWeight: 700,
              lineHeight: .92,
              letterSpacing: '-.02em',
              color: '#F7F5F0',
              maxWidth: '900px',
              marginBottom: '24px',
            }}
          >
            Engineering the<br />
            Future of{' '}
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4A054 0%, #B88746 40%, #E8BB6A 70%, #B88746 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Rail Mobility
            </em>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .9, ease, delay: .5 }}
            style={{
              color: 'rgba(247,245,240,.58)',
              maxWidth: '500px',
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: 1.75,
              fontFamily: 'Inter, sans-serif',
              marginBottom: '36px',
            }}
          >
            AND Hitech Industries delivers advanced railway components, HVAC systems, and precision manufacturing that power the next generation of Indian rail.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, ease, delay: .65 }}
            className="flex flex-wrap gap-3 mb-9"
          >
            <Link href="/products" className="btn-primary group">
              <span>Explore Solutions</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about-us"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '13px 32px',
                border: '1px solid rgba(247,245,240,.22)',
                color: '#F7F5F0',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '.82rem', fontWeight: 500, letterSpacing: '.04em',
                borderRadius: '3px',
                textDecoration: 'none',
                transition: 'border-color .25s, background .25s',
              }}
            >
              Our Journey
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex gap-3 flex-wrap"
          >
            {['RDSO Approved', 'ISO 9001:2015', 'Vande Bharat Ecosystem', 'Make in India'].map(label => (
              <span key={label} className="badge">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B88746] flex-shrink-0" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .9, ease, delay: .9 }}
        className="absolute bottom-0 inset-x-0 z-20"
        style={{
          background: 'rgba(7,21,41,.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(184,135,70,.1)',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderLeft: '1px solid rgba(255,255,255,.04)' }}
          >
            {heroStats.map(({ n, label }) => (
              <div
                key={label}
                className="py-4 md:py-5 px-4 md:px-8"
                style={{ borderRight: '1px solid rgba(255,255,255,.04)' }}
              >
                <div
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.4rem, 2vw, 1.9rem)',
                    fontWeight: 700,
                    color: '#B88746',
                    lineHeight: 1,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '.6rem', fontWeight: 600,
                    letterSpacing: '.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,.35)',
                    marginTop: '5px',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: .4 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 z-20"
        aria-hidden="true"
      >
        <span style={{
          fontFamily: 'Barlow Condensed, monospace',
          fontSize: '.52rem', fontWeight: 600,
          letterSpacing: '.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,.25)',
          writingMode: 'vertical-rl',
          marginBottom: '6px',
        }}>
          Scroll
        </span>
        <div className="w-px h-14 bg-gradient-to-b from-[#B88746]/45 to-transparent" />
      </motion.div>
    </section>
  );
}
