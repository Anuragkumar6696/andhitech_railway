'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/*
 * WhatWeDo — Core Capabilities
 * Layout: section header (2-col) + 4 image-led cards
 * Replaces: text-heavy feature list + image mosaic
 */

const caps = [
  {
    title: 'HVAC & Climate Systems',
    desc: 'Roof-mounted package units for Vande Bharat, LHB coaches, and Metro — meeting all RDSO specifications.',
    img: '/images/products/rmpu-25.jpg',
    tag: 'LHB · Vande Bharat',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B88746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/>
      </svg>
    ),
  },
  {
    title: 'Brake Components',
    desc: 'Axle-mounted and wheel-mounted brake discs and pads certified to railway safety standards.',
    img: '/images/products/axle-brake-v2/br-1.jpg',
    tag: 'Indian Railways · Metro',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B88746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
        <path d="m12 2 0 3M12 19l0 3M2 12l3 0M19 12l3 0"/>
      </svg>
    ),
  },
  {
    title: 'Suspension Systems',
    desc: 'Air springs and suspension components for smooth, safe ride quality across all rail applications.',
    img: '/images/products/air-suspension-v2/as-1.jpg',
    tag: 'All Rolling Stock',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B88746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3h10l2 9H5L7 3z"/><path d="M12 12v9M9 21h6"/>
      </svg>
    ),
  },
  {
    title: 'Precision Engineering',
    desc: 'CNC-machined rolling stock components on DN Solutions machinery at sub-millimeter tolerances.',
    img: '/images/production-unit-final.jpg',
    tag: 'Custom Manufacturing',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B88746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
];

const ease = [.22, 1, .36, 1];

export default function WhatWeDo() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#F7F5F0' }} aria-label="Core capabilities">
      <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px divider-light pointer-events-none" />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 relative z-10">

        {/* ── Section header ── */}
        <div className="flex items-end justify-between gap-8 flex-wrap mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .8, ease }}
          >
            <div className="label-dark mb-4">Core Capabilities</div>
            <h2 className="display-lg-dark leading-tight">
              Engineering Solutions<br />
              <span className="text-copper">Across Rail Systems</span>
            </h2>
            <div className="accent mt-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .75, ease, delay: .15 }}
            style={{ maxWidth: '380px' }}
          >
            <p style={{ color: '#6B7A8E', fontSize: '.88rem', lineHeight: 1.8 }}>
              From HVAC climate control to precision braking — our product portfolio spans the critical systems that keep Indian Railways running safely and efficiently.
            </p>
          </motion.div>
        </div>

        {/* ── 4-card capabilities grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {caps.map(({ title, desc, img, tag, icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .7, ease, delay: i * .1 }}
              className="group"
              style={{
                background: '#fff',
                border: '1px solid rgba(11,31,58,.08)',
                borderRadius: '4px',
                overflow: 'hidden',
                transition: 'border-color .35s, transform .35s, box-shadow .35s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(184,135,70,.35)';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 24px 64px rgba(11,31,58,.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(11,31,58,.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div style={{ height: 200, overflow: 'hidden', position: 'relative', background: '#0B1F3A' }}>
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,31,58,.5) 0%, transparent 60%)' }} />
                {/* Tag overlay */}
                <div style={{
                  position: 'absolute', bottom: 12, left: 14,
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '.58rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase',
                  color: 'rgba(247,245,240,.55)',
                }}>
                  {tag}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '24px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '6px',
                  background: 'rgba(184,135,70,.08)', border: '1px solid rgba(184,135,70,.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '14px',
                }}>
                  {icon}
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '.95rem', fontWeight: 600, color: '#0B1F3A', marginBottom: '8px' }}>
                  {title}
                </div>
                <p style={{ fontSize: '.8rem', color: '#6B7A8E', lineHeight: 1.7 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .7, ease, delay: .2 }}
          className="text-center mt-12"
        >
          <Link href="/products" className="btn-primary group inline-flex items-center gap-2">
            <span>View All Products</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
