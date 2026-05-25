'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

export default function PageBanner({ title, backgroundImage, currentPage }) {
  const displayTitle = title?.replace(/-/g, ' ') || '';
  const words = displayTitle.split(' ');
  const lastWord = words.pop();

  return (
    <section className="relative h-[360px] md:h-[440px] flex items-center overflow-hidden bg-[#0e0e0e]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0e0e0e]/65 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-[#0e0e0e]/20 z-10" />
        <Image
          src={backgroundImage || '/images/page-header-bg.jpg'}
          alt={title || 'Banner'}
          fill
          className="object-cover scale-[1.04]"
          priority
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[11] opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '56px 56px' }}
      />

      {/* Diagonal accent */}
      <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-brand-orange/8 skew-x-[-6deg] translate-x-16 pointer-events-none z-[12]" />

      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-20">
        <div className="max-w-3xl">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-2 mb-6"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 text-white/45 hover:text-brand-orange transition-colors text-[11px] font-bold uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              <Home size={12} />
              <span>Home</span>
            </Link>
            <ChevronRight size={12} className="text-white/25" />
            <span
              className="text-white/60 text-[11px] font-bold uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              {currentPage?.replace(/-/g, ' ')}
            </span>
          </motion.nav>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="font-extrabold text-white leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {words.join(' ')}{' '}
            <span className="text-brand-orange">{lastWord}</span>
          </motion.h1>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.75, delay: 0.45 }}
            className="mt-6 w-16 h-[3px] bg-brand-orange rounded-full origin-left"
          />
        </div>
      </div>
    </section>
  );
}
