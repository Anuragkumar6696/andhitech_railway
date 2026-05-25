'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function InfraSection({ title, description, sections = [], subTitle }) {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const abs = (url) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `${API}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const words = (title || '').trim().split(/\s+/).filter(Boolean);
  const lastWord = words.pop();
  const firstPart = words.join(' ');

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center mb-4">
                <span className="text-brand-orange uppercase tracking-widest text-sm font-bold">{subTitle || 'Our Infrastructure'}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-6">
                {firstPart} <span className="text-brand-orange">{lastWord}</span>
              </h2>
              {description && (
                <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
              )}
            </div>
          </motion.div>

          {/* Right Section - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((item, idx) => {
              const iconSrc = abs(item.icon);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-brand-dark/5 transition-all duration-500 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-500">
                    {iconSrc ? (
                      <Image
                        src={iconSrc}
                        width={32}
                        height={32}
                        alt={item.section_title || 'Infra Icon'}
                        className="group-hover:brightness-0 group-hover:invert transition-all"
                        unoptimized
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded-lg" />
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-orange transition-colors">{item.section_title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.section_content}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
