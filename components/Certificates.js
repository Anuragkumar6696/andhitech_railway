'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';

const certificates = [
  { src: '/images/certificate1.png', title: 'ISO 9001:2015', desc: 'Quality Management System' },
  { src: '/images/certificate2.png', title: 'ISO 14001:2015', desc: 'Environmental Management' },
  { src: '/images/certificate3.png', title: 'RDSO Approved', desc: 'Railway Standards Organization' },
  { src: '/images/rocertificate.png', title: 'Industry Excellence', desc: 'Certified Manufacturing' },
];

export default function Certificates() {
  return (
    <section className="py-24 md:py-32 bg-[#f9f8f6] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="section-label mb-5">
              <span>Trust &amp; Compliance</span>
            </div>
            <h2 className="section-heading">
              Recognized for Excellence and{' '}
              <span>Industry Leadership</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-white px-5 py-4 rounded-xl shadow-sm border border-[#ede9e4]"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="text-[#1a1a1a] font-bold text-sm"
                style={{ fontFamily: 'var(--font-display)' }}>
                Fully Certified
              </div>
              <div className="text-[#999] text-xs">Compliant with global standards</div>
            </div>
          </motion.div>
        </div>

        {/* Certificate cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.65 }}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-[#ede9e4] hover:border-brand-orange/20 hover:-translate-y-1"
            >
              {/* Certificate image */}
              <div className="relative aspect-[3/4] mb-6 rounded-xl overflow-hidden bg-[#f9f8f6] border border-[#ede9e4]">
                <Image
                  src={cert.src}
                  alt={cert.title}
                  fill
                  className="object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center">
                <h3
                  className="text-base font-bold text-[#1a1a1a] mb-1 group-hover:text-brand-orange transition-colors"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {cert.title}
                </h3>
                <p
                  className="text-[#999] text-[11px] uppercase tracking-[0.14em] font-semibold"
                  style={{ fontFamily: 'var(--font-label)' }}
                >
                  {cert.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 text-[#aaa] text-sm">
            <Award size={16} className="text-brand-orange" />
            <span>Award-winning manufacturing processes and safety standards since 2013</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
