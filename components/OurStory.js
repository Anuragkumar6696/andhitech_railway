'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function OurStory() {
  return (
    <section className="py-24 md:py-32 bg-surface overflow-hidden relative">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.8) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-10">

        {/* ── Top Row: Title + Images ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label mb-5">
              <span>Our Story</span>
            </div>
            <h2 className="section-heading max-w-lg">
              Transforming Industries Through{' '}
              <span>Innovation and Precision</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="rounded-xl overflow-hidden shadow-md group">
              <Image
                src="/images/storytopleft.jpg"
                alt="AND Hitech Operations"
                width={360}
                height={260}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-600"
                unoptimized
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md mt-8 group">
              <Image
                src="/images/storytopright.jpg"
                alt="AND Hitech Facility"
                width={360}
                height={260}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-600"
                unoptimized
              />
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Row: Image + Text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/storybottom.jpg"
                alt="AND Hitech Railway"
                width={680}
                height={480}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
            {/* Orange accent block */}
            <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-brand-orange rounded-xl -z-0 hidden md:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-[#3a3a3a] text-base md:text-lg leading-relaxed border-l-4 border-brand-orange pl-6">
              Founded in 2013, AHIL has steadily built a reputation for trust, reliability, and customer-centric manufacturing. Under the visionary leadership of Mr. Angad Singh, we have grown into a dynamic organization known for delivering innovative and efficient engineering solutions.
            </p>
            <p className="text-[#5a5a5a] text-base leading-relaxed">
              With a team of 100+ skilled professionals, we are committed to exceeding customer expectations through technical expertise, quality excellence, and responsive service. Today, AHIL proudly partners with clients — including Indian Railways, Metros, and PSUs — driving transformation through precision and innovation.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#e8e4e0]">
              {[
                { n: '10+', l: 'Years of Excellence' },
                { n: '100+', l: 'Skilled Professionals' },
                { n: '500+', l: 'Projects Delivered' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-extrabold text-brand-orange mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    {s.n}
                  </div>
                  <div className="text-[11px] text-[#888] uppercase tracking-wider font-semibold"
                    style={{ fontFamily: 'var(--font-label)' }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
