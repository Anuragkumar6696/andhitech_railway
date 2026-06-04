'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Zap, Award } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

const ease = [.22, 1, .36, 1];

/* ─── STATS BAR ─── */
const heroStats = [
  { n: '10+', label: 'Years Engineering Excellence' },
  { n: '500+', label: 'Railway Components Delivered' },
  { n: 'RDSO', label: 'Approved Vendor' },
  { n: 'ISO', label: '9001:2015 Certified' },
];

export default function Hero({ initialData }) {
  const [banner, setBanner] = useState(initialData || null);
  const containerRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
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
  const imgY    = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, .6], [1, 0]);
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  const bgImage = banner?.image ? getAbsoluteURL(banner.image) : '/images/trainnew.jpg';

  return (
    <section ref={containerRef} className="relative h-screen min-h-[680px] overflow-hidden" style={{ background: '#071529' }}>

      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src={bgImage}
          alt="Indian Railways — Engineering Excellence"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          onLoad={() => setVideoReady(true)}
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(0deg, #071529 0%, rgba(7,21,41,.7) 40%, rgba(7,21,41,.35) 70%, rgba(7,21,41,.5) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(7,21,41,.6) 0%, transparent 50%, rgba(7,21,41,.2) 100%)'
        }} />
      </motion.div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Corner copper frame */}
      <div className="absolute top-28 left-8 md:left-16 w-8 h-8 border-l border-t border-[#B88746]/50 hidden md:block" />
      <div className="absolute top-28 right-8 md:right-16 w-8 h-8 border-r border-t border-[#B88746]/30 hidden md:block" />

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-center"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 w-full pt-24">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, ease, delay: .2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="label text-[#B88746]">Railway Engineering & Manufacturing</span>
            <span className="w-12 h-px bg-[#B88746]/50" />
            <span className="label text-white/40">Make in India</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: .35 }}
            className="display-xl max-w-4xl mb-6"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Engineering the Future<br />
            <span style={{
              background: 'linear-gradient(135deg, #D4A054 0%, #B88746 40%, #E8BB6A 70%, #B88746 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              of Rail Mobility
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .9, ease, delay: .5 }}
            className="text-white/65 max-w-xl text-[1rem] leading-relaxed mb-10 font-light"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            And Hitech Industries delivers advanced railway systems, precision engineering,
            and manufacturing excellence that support the next generation of Indian rail transportation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, ease, delay: .65 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/products" className="btn-primary text-[.84rem] py-3.5 px-8 group">
              <span>Explore Solutions</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about-us" className="btn-secondary text-[.84rem] py-3.5 px-8">
              Our Journey
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex gap-4 mt-10 flex-wrap"
          >
            {[
              { label: 'RDSO Approved' },
              { label: 'ISO 9001:2015' },
              { label: 'Vande Bharat Ecosystem' },
              { label: 'Make in India' },
            ].map(({ label }) => (
              <span key={label} className="badge">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B88746] inline-block" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Stats bar at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .9, ease, delay: .9 }}
        className="absolute bottom-0 inset-x-0 z-20"
        style={{ background: 'rgba(7,21,41,.85)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(184,135,70,.15)' }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[.06]">
            {heroStats.map(({ n, label }) => (
              <div key={label} className="py-4 md:py-5 px-4 md:px-8 first:pl-0">
                <div className="text-[#B88746] font-bold text-lg md:text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{n}</div>
                <div className="text-white/45 text-[.65rem] mt-0.5 uppercase tracking-wider" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '.1em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: .4 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 z-20"
      >
        <span className="text-white/30 text-[.52rem] tracking-[.3em] uppercase rotate-90 mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#B88746]/50 to-transparent" />
      </motion.div>
    </section>
  );
}
