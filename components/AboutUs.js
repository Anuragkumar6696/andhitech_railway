'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutUs() {
  const features = [
    'Railway Rolling Stock Components',
    'Advanced HVAC Systems & Components',
    'Precision Manufacturing Excellence',
    'State-of-the-art Facilities',
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── Left: Image Composition ── */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/aboutback.jpg"
                alt="Precision Engineering"
                width={600}
                height={700}
                className="w-full h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700"
              />
              {/* Subtle color tint on hover */}
              <div className="absolute inset-0 bg-brand-orange/0 hover:bg-brand-orange/5 transition-colors duration-500" />
            </motion.div>

            {/* Overlapping secondary image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-10 -right-8 z-20 w-3/5 rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white hidden md:block"
            >
              <Image
                src="/images/aboutfront.jpg"
                alt="AND Hitech Facility"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -top-6 -left-6 z-30 bg-brand-orange text-white p-7 rounded-2xl shadow-xl hidden md:block"
            >
              <div className="text-4xl font-extrabold mb-0.5 leading-none"
                style={{ fontFamily: 'var(--font-display)' }}>
                10+
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] font-bold opacity-80"
                style={{ fontFamily: 'var(--font-label)' }}>
                Years of Innovation
              </div>
            </motion.div>

            {/* Decorative dot */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-brand-orange/6 -z-10 hidden md:block" />
          </div>

          {/* ── Right: Content ── */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <div className="section-label mb-5">
                <span>About Our Company</span>
              </div>
              <h2 className="section-heading mb-6">
                Leading the Way in <span>Industrial Precision</span>
              </h2>
              <p className="text-[#555] text-base md:text-[17px] leading-relaxed">
                Established in 2013, AND HITECH INDUSTRIES LTD (AHIL) has emerged as a trusted name in precision manufacturing, specializing in high-quality components for Railway Rolling Stock and advanced HVAC systems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#f9f8f6] transition-colors group cursor-default"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange transition-colors duration-300">
                    <CheckCircle2 size={13} className="text-brand-orange group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[#2a2a2a] font-semibold text-sm">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="pt-6 border-t border-[#ede9e4] flex flex-col sm:flex-row items-center gap-6"
            >
              <Link href="/about-us" className="btn-premium flex items-center gap-3 group w-full sm:w-auto justify-center">
                <span>Discover More</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-orange shadow">
                  <Image
                    src="/images/andhitechmd.jpg"
                    alt="Managing Director"
                    width={48} height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-[#1a1a1a] font-bold text-sm"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    Managing Director
                  </div>
                  <div className="text-[#999] text-xs italic">Engineering Excellence Since 2013</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
