'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="relative py-20 bg-brand-orange overflow-hidden">
      {/* Geometric texture */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-[-8deg] translate-x-20 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="max-w-2xl"
          >
            <h3
              className="font-extrabold text-white leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                letterSpacing: '-0.02em',
              }}
            >
              Innovative Products and Solutions for Railways, Metros, Wagons, and more.
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="flex-shrink-0"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-white text-brand-orange font-bold px-8 py-4 rounded-sm hover:bg-[#0e0e0e] hover:text-white transition-all duration-300 group"
              style={{ fontFamily: 'var(--font-label)', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              <span>Explore Products</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
