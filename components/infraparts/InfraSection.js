'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function InfraSection({ title, description, sections = [], subTitle }) {
  const words = (title || '').trim().split(/\s+/).filter(Boolean);
  const lastWord = words.pop();
  const firstPart = words.join(' ');

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:sticky lg:top-28"
          >
            <div>
              <div className="section-label mb-5">
                <span>{subTitle || 'Our Infrastructure'}</span>
              </div>
              <h2 className="section-heading mb-6">
                {firstPart} <span>{lastWord}</span>
              </h2>
              {description && (
                <p className="text-[#555] text-[16px] leading-relaxed">{description}</p>
              )}
            </div>

            {/* Accent */}
            <div className="w-20 h-1 bg-brand-orange rounded-full" />
          </motion.div>

          {/* Right: Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sections.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group bg-[#f9f8f6] p-8 rounded-2xl border border-[#ede9e4] hover:bg-white hover:shadow-xl hover:shadow-[#0e0e0e]/6 hover:border-brand-orange/20 transition-all duration-500"
              >
                {item.icon ? (
                  <div className="w-14 h-14 rounded-xl bg-white shadow-sm border border-[#ede9e4] flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-400">
                    <Image
                      src={item.icon}
                      width={30}
                      height={30}
                      alt={item.section_title || 'Icon'}
                      className="group-hover:brightness-0 group-hover:invert transition-all"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-6">
                    <div className="w-6 h-6 rounded-md bg-brand-orange/30" />
                  </div>
                )}
                <h4
                  className="text-[17px] font-bold text-[#1a1a1a] mb-3 group-hover:text-brand-orange transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.section_title}
                </h4>
                <p className="text-[#777] text-sm leading-relaxed">{item.section_content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
