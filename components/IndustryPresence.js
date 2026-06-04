'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const expoImages = [
  { src: '/images/gallery-1.jpg', alt: 'Industry Exhibition' },
  { src: '/images/gallery-2.jpg', alt: 'Product Showcase' },
  { src: '/images/gallery-3.jpg', alt: 'Railway Expo' },
  { src: '/images/gallery-4.jpg', alt: 'Engineering Demo' },
  { src: '/images/gallery-5.jpg', alt: 'Trade Exhibition' },
  { src: '/images/gallery-6.jpg', alt: 'Industry Presence' },
];

const highlights = [
  { title: 'International Rail Coach Expo 2026', subtitle: 'ICF Stadium, Chennai · March 2026', desc: 'And Hitech showcased its complete range of railway components including HVAC systems, brake components, and suspension systems at Hall B, Stalls 104 & 109.' },
  { title: 'InnoRail India', subtitle: 'Annual Railway Innovation Summit', desc: 'Participated as an exhibitor and presenter, demonstrating engineering capabilities and future product roadmap to railway procurement teams.' },
  { title: 'Make in India Exhibition', subtitle: 'National Manufacturing Showcase', desc: 'Featured as a leading indigenous manufacturer of railway components, contributing to India\'s self-reliance in railway engineering.' },
];

const ease = [.22, 1, .36, 1];

export default function IndustryPresence() {
  return (
    <section className="relative overflow-hidden section-gap" style={{ background: '#0B1F3A' }}>
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .8, ease }}
          className="text-center mb-14"
        >
          <div className="label mb-4 inline-block">Industry Presence</div>
          <h2 className="display-lg mb-4">
            Showcasing Innovation Across<br />
            <span style={{ color: '#B88746' }}>Railway Platforms</span>
          </h2>
          <p className="text-white/45 max-w-xl mx-auto text-[.9rem] leading-relaxed">
            From international expos to national industry summits, And Hitech demonstrates its engineering capabilities and builds partnerships with railway stakeholders across India.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-14">
          {expoImages.map(({ src, alt }, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: .97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: .6, ease, delay: i * .08 }}
              className={`relative overflow-hidden rounded-xl group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              style={{ height: i === 0 ? 420 : 196 }}
            >
              <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[#0B1F3A]/20 group-hover:bg-[#0B1F3A]/5 transition-colors duration-500" />
              <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-[#B88746]/40" />
            </motion.div>
          ))}
        </div>

        {/* Exhibition highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map(({ title, subtitle, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .65, ease, delay: i * .12 }}
              className="p-6 rounded-xl"
              style={{ background: 'rgba(15,40,71,.6)', border: '1px solid rgba(255,255,255,.07)' }}
            >
              <div className="text-[#B88746] text-[.65rem] uppercase tracking-widest mb-2" style={{ fontFamily: 'Barlow Condensed, sans-serif' }}>{subtitle}</div>
              <h3 className="text-white font-semibold text-[.92rem] mb-3">{title}</h3>
              <p className="text-white/40 text-[.8rem] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
