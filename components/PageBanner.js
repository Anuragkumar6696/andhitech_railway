'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function PageBanner({ title, backgroundImage, currentPage }) {
  const displayTitle = title?.replace(/-/g, ' ') || '';
  const words = displayTitle.split(' ');
  const lastWord = words.pop();

  return (
    <section className="relative h-[400px] md:h-[500px] flex items-center overflow-hidden bg-brand-dark">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-dark/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10" />
        <Image
          src={backgroundImage || "/images/page-header-bg.jpg"}
          alt={title || "Banner"}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center mb-6"
          >
            <nav className="flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-brand-orange">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white/60">{currentPage?.replace(/-/g, ' ')}</span>
            </nav>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
          >
            {words.join(' ')} <span className="text-brand-orange">{lastWord}</span>
          </motion.h1>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 right-0 w-1/4 h-full bg-brand-orange/10 skew-x-12 translate-x-1/2 pointer-events-none" />
    </section>
  );
}
