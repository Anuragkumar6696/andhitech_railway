'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { getAbsoluteURL } from '@/utils/url';

export default function Hero({ initialData }) {
  const [banner, setBanner] = useState(initialData || null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      if (video.readyState >= 2) setVideoLoaded(true);
    }
    const timer = setTimeout(() => setVideoLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, [banner]);

  useEffect(() => {
    if (initialData) return;
    async function fetchBanner() {
      try {
        const res = await fetch('/api/proxy/home-banner');
        const data = await res.json();
        if (data.results && data.results.length > 0) setBanner(data.results[0]);
      } catch (error) {
        console.error('Failed to fetch hero banner:', error);
      }
    }
    fetchBanner();
  }, []);

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.25 } }
  };
  const item = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0e0e0e]">

      {/* ── Background Media ── */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-[#0e0e0e]/30 z-10" />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 z-[11] opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}
        />
        <video
          ref={videoRef}
          key={banner?.video ? getAbsoluteURL(banner.video) : 'default-video'}
          autoPlay muted loop playsInline preload="auto"
          poster="/images/hero-bg.jpg"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          onPlaying={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-55' : 'opacity-0'}`}
        >
          <source src={banner?.video ? getAbsoluteURL(banner.video) : '/images/andhitechvideo.mp4'} type="video/mp4" />
          <source src="/images/andhitechvideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Main Content ── */}
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-20 pt-36 pb-32">
        <motion.div
          className="max-w-3xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Label */}
          <motion.div variants={item} className="mb-7">
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-brand-orange"
              style={{ fontFamily: 'var(--font-label, "Barlow Condensed", sans-serif)' }}>
              <span className="block w-8 h-[2px] bg-brand-orange" />
              Engineering the Future
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-extrabold text-white leading-[1.05] mb-8"
            style={{
              fontFamily: 'var(--font-display, "Montserrat", sans-serif)',
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            <span dangerouslySetInnerHTML={{
              __html: banner?.title || 'AND HITECH <em style="font-style:normal;color:#e3510f">INDUSTRIES</em> LTD'
            }} />
          </motion.h1>

          {/* Body */}
          <motion.div
            variants={item}
            className="text-base md:text-lg text-white/65 mb-11 leading-relaxed max-w-xl"
            dangerouslySetInnerHTML={{
              __html: banner?.content ||
                'Premium Railway Rolling Stock and HVAC Engineering Solutions. We provide world-class products for sustainable infrastructure.'
            }}
          />

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link
              href={banner?.button_link || '/products'}
              className="btn-premium flex items-center gap-3 group"
            >
              <span>{banner?.button_text || 'Explore Our Solutions'}</span>
              <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <ArrowRight size={16} />
              </span>
            </Link>
            <Link
              href="/about-us"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            >
              <span className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-orange group-hover:bg-brand-orange/10 transition-all">
                <Play size={14} className="fill-current ml-0.5" />
              </span>
              <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: 'var(--font-label)' }}>Our Story</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Stats Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 right-0 z-20 hidden lg:block"
      >
        <div className="flex divide-x divide-white/10 bg-[#0e0e0e]/50 backdrop-blur-xl border-t border-l border-white/8">
          {[
            { value: '10+', label: 'Years of Excellence' },
            { value: '500+', label: 'Projects Delivered' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((s, i) => (
            <div key={i} className="px-10 py-7 text-center">
              <div className="text-3xl font-extrabold text-white mb-1 tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}>
                {s.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-bold"
                style={{ fontFamily: 'var(--font-label)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/30 font-bold"
          style={{ fontFamily: 'var(--font-label)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} className="text-brand-orange" />
        </motion.div>
      </motion.div>
    </section>
  );
}
