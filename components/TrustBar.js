'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getAbsoluteURL } from '@/utils/url';

const ease = [.22, 1, .36, 1];

const DEFAULT_LOGOS = [
  { name: 'Indian Railways', image: '/images/indian railways.png' },
  { name: 'Make In India', image: '/images/make-in-india.jpg' },
  { name: 'Metro Rail', image: '/images/Metro_logo.png' },
  { name: 'Aug Group', image: '/images/aug.png' },
];

const CREDIBILITY_ITEMS = [
  { label: 'RDSO Approved', desc: 'Research Designs & Standards Organisation — Ministry of Railways, Govt. of India' },
  { label: 'ISO 9001:2015', desc: 'International Quality Management System Certification' },
  { label: 'ISO 14001:2015', desc: 'Environmental Management System Certification' },
  { label: 'Make in India', desc: 'Government of India initiative — Atmanirbhar Bharat' },
];

export default function TrustBar({ initialData }) {
  const [logos, setLogos] = useState(initialData?.clientLogos || []);

  useEffect(() => {
    if (initialData?.clientLogos) return;
    fetch('/api/proxy/client-logos')
      .then(r => r.json())
      .then(d => setLogos(d.results || []))
      .catch(() => {});
  }, []);

  const displayLogos = logos.length ? logos : DEFAULT_LOGOS;
  const doubled = [...displayLogos, ...displayLogos];

  return (
    <section className="relative overflow-hidden" style={{ background: '#0F1420' }}>
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-35" />
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(227,81,15,.2),transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)' }} />

      {/* ── TRUSTED BY HEADER ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-14 pb-6 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .65, ease }}
          className="flex items-center gap-5"
        >
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.52rem', letterSpacing: '.32em', textTransform: 'uppercase', color: '#E3510F' }} className="block mb-1">
              Strategic Partnerships
            </span>
            <p className="text-[#4E5A6E] text-[.82rem]">Trusted by India&apos;s leading rail & infrastructure organisations</p>
          </div>
        </motion.div>

        {/* Credibility pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: .1, duration: .65, ease }}
          className="flex flex-wrap gap-2"
        >
          {CREDIBILITY_ITEMS.slice(0, 3).map(({ label }) => (
            <div key={label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E3510F]/15"
              style={{ background: 'rgba(227,81,15,.06)' }}
            >
              <span className="w-1 h-1 rounded-full bg-[#E3510F]" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.56rem', letterSpacing: '.12em', color: '#E3510F' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── PARTNER LOGO MARQUEE ── */}
      <div className="relative overflow-hidden pb-14">
        <div className="absolute left-0 inset-y-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg,#0F1420,transparent)' }} />
        <div className="absolute right-0 inset-y-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg,#0F1420,transparent)' }} />

        <div className="overflow-hidden">
          <div className="flex w-max ticker items-center" style={{ animationDuration: '40s' }}>
            {doubled.map((logo, i) => (
              <div key={i}
                className="flex-shrink-0 h-20 flex items-center px-10 opacity-55 hover:opacity-90 hover:scale-110 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
              >
                <Image
                  src={logo.image?.startsWith('http') ? logo.image : getAbsoluteURL(logo.image)}
                  alt={logo.name || 'Partner'}
                  width={180} height={70}
                  className="h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CERTIFICATIONS ROW ── */}
      <div className="border-t border-white/[.04]">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[.04]">
            {CREDIBILITY_ITEMS.map(({ label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .08, duration: .6, ease }}
                className="px-6 py-5 group cursor-default"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E3510F] group-hover:scale-150 transition-transform" />
                  <span className="text-[#EDF0F5] text-[.72rem] font-medium group-hover:text-[#E3510F] transition-colors" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '.08em' }}>
                    {label}
                  </span>
                </div>
                <p className="text-[#2E3848] text-[.66rem] leading-relaxed group-hover:text-[#3D4A5C] transition-colors">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
