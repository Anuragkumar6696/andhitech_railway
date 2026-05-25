'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="py-24 md:py-32 bg-[#0e0e0e] overflow-hidden relative">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Gradient blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-orange/8 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange inline-block" />
              <span
                className="text-white/60 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Ready to Start?
              </span>
            </div>

            <h2
              className="font-extrabold text-white mb-8 leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Have a Project in Mind?{' '}
              <br className="hidden md:block" />
              <span className="text-brand-orange">Let's Build It Together.</span>
            </h2>

            <p className="text-white/45 text-base md:text-lg mb-14 max-w-2xl mx-auto leading-relaxed">
              Our team of expert engineers is ready to provide you with the most efficient and high-performance industrial solutions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/contact" className="btn-premium group flex items-center gap-3 px-10 py-4">
                <span>Get a Free Quote</span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <ArrowRight size={16} />
                </span>
              </Link>

              <a
                href="mailto:Info@andhitech.in"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center group-hover:border-brand-orange group-hover:bg-brand-orange/10 transition-all">
                  <Mail size={18} />
                </div>
                <span
                  className="font-bold text-sm tracking-wide"
                  style={{ fontFamily: 'var(--font-label)' }}
                >
                  Info@andhitech.in
                </span>
              </a>

              <a
                href="tel:01125710064"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center group-hover:border-brand-orange group-hover:bg-brand-orange/10 transition-all">
                  <Phone size={18} />
                </div>
                <span
                  className="font-bold text-sm tracking-wide"
                  style={{ fontFamily: 'var(--font-label)' }}
                >
                  011-25710064
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
