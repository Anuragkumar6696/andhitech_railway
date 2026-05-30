'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, ShieldCheck, Settings2, Wrench, ArrowRight, Layers, Zap, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

const caps = [
  { Icon: Cpu, title: 'Automation & Smart Manufacturing', desc: 'Integrated production systems and modern technologies streamlining operations at scale with precision and reliability across all production lines.' },
  { Icon: ShieldCheck, title: 'Advanced Quality Control', desc: 'Multi-stage testing protocols ensuring uncompromised product performance and safety at every manufacturing checkpoint.' },
  { Icon: Settings2, title: 'Process Engineering', desc: 'Enhanced engineering workflows delivering greater speed, accuracy, and scalability across production cycles.' },
  { Icon: Wrench, title: 'Custom Product Development', desc: 'Tailored component design and fabrication delivering real-world engineering solutions exactly on time.' },
];

const facts = [
  { n: '100+', l: 'Skilled Engineers' },
  { n: '500+', l: 'Components Built' },
  { n: '10+', l: 'Years Excellence' },
];

const ease = [.22, 1, .36, 1];

/* ── Engineering schematic SVG ── */
function EngineeringSchematic() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 460" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="wdGrad2" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#E3510F" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="500" height="460" fill="url(#wdGrad2)" />
      {/* Grid */}
      <g stroke="rgba(255,255,255,.035)" strokeWidth="1" fill="none">
        {[70, 140, 210, 280, 350, 420].map(y => <line key={`h${y}`} x1="0" y1={y} x2="500" y2={y} />)}
        {[70, 140, 210, 280, 350, 420].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="460" />)}
      </g>

      {/* Outer targeting ring  */}
      {[130, 95, 65, 38].map((r, i) => (
        <circle key={r} cx="250" cy="230" r={r}
          fill={i === 3 ? 'rgba(227,81,15,.07)' : 'none'}
          stroke={`rgba(227,81,15,${.04 + i * .04})`}
          strokeWidth={i === 3 ? 1.5 : 1}
        />
      ))}

      {/* Crosshairs dashed */}
      <line x1="250" y1="160" x2="250" y2="300" stroke="rgba(227,81,15,.22)" strokeWidth="1" strokeDasharray="4 5" />
      <line x1="180" y1="230" x2="320" y2="230" stroke="rgba(227,81,15,.22)" strokeWidth="1" strokeDasharray="4 5" />

      {/* Tick marks on outer ring */}
      <g stroke="rgba(227,81,15,.45)" strokeWidth="2.5" fill="none">
        {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
          const rad = deg * Math.PI / 180;
          return (
            <line key={deg}
              x1={250 + 120 * Math.cos(rad)} y1={230 + 120 * Math.sin(rad)}
              x2={250 + 130 * Math.cos(rad)} y2={230 + 130 * Math.sin(rad)}
            />
          );
        })}
      </g>

      {/* Corner frames */}
      <g stroke="rgba(227,81,15,.45)" strokeWidth="2" fill="none">
        <path d="M 18,18 L 18,50 M 18,18 L 50,18" />
        <path d="M 482,18 L 482,50 M 482,18 L 450,18" />
        <path d="M 18,442 L 18,410 M 18,442 L 50,442" />
        <path d="M 482,442 L 482,410 M 482,442 L 450,442" />
      </g>

      {/* Data labels */}
      {[
        [65, 55, 'PITCH CONTROL'], [65, 75, 'AXL: 240 mm'],
        [310, 55, 'SPEC: RDSO'], [310, 75, 'REV 14.2'],
      ].map(([x, y, t]) => (
        <text key={t} x={x} y={y} fill="rgba(227,81,15,.28)" fontSize="7.5" fontFamily="monospace" letterSpacing="2">{t}</text>
      ))}

      {/* Animated scan line would be handled in React */}
    </svg>
  );
}

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden section-gap" style={{ background: '#050608' }}>
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <motion.div style={{ y: bgY }} className="absolute inset-0 glow-right pointer-events-none opacity-55" />
      <div className="absolute inset-x-0 top-0 h-px divider pointer-events-none" />
      {/* Diagonal texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(-52deg,transparent,transparent 44px,rgba(255,255,255,.005) 44px,rgba(255,255,255,.005) 88px)',
      }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .75, ease }}
          >
            <span className="eyebrow mb-7 block">Core Capabilities</span>
            <h2 className="display-md">
              Empowering Industry<br />Through&nbsp;<span style={{ color: '#E3510F' }}>Precision</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: .14, duration: .75, ease }}
          >
            <div className="border-l-2 border-[#E3510F]/35 pl-7">
              <p className="text-[#8C98AA] leading-relaxed text-[.96rem] mb-5 font-light">
                End-to-end manufacturing solutions combining innovation, precision, and efficiency — from concept engineering through international certification.
              </p>
              <Link href="/about-us" className="btn-ghost inline-flex items-center gap-2 group">
                <span className="text-[#EDF0F5]">Learn About AHIL</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-[#E3510F]" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Asymmetric bento grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">

          {/* Large left showcase cell */}
          <motion.div
            initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: .9, ease }}
            className="lg:col-span-5 row-span-2 story-card relative overflow-hidden group cursor-default"
            style={{ minHeight: 500 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F1420] via-[#141B2D] to-[#0B0E15]">
              <EngineeringSchematic />
              {/* Animated scan line */}
              <motion.div
                animate={{ y: ['-100%', '600px'] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: 'linear' }}
                className="absolute left-0 right-0 h-24 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom,transparent,rgba(227,81,15,.06),transparent)', top: 0 }}
              />
            </div>

            {/* Bottom-to-top fade overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/20 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: 'linear-gradient(135deg,rgba(227,81,15,.06) 0%,transparent 55%)' }} />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-px h-16" style={{ background: 'linear-gradient(to bottom,rgba(227,81,15,.7),transparent)' }} />
            <div className="absolute top-0 left-0 h-px w-16" style={{ background: 'linear-gradient(90deg,rgba(227,81,15,.7),transparent)' }} />
            <div className="absolute bottom-0 right-0 w-px h-10" style={{ background: 'linear-gradient(to top,rgba(227,81,15,.25),transparent)' }} />
            <div className="absolute bottom-0 right-0 h-px w-10" style={{ background: 'linear-gradient(90deg,rgba(227,81,15,.25),transparent)' }} />

            {/* Content */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <p className="mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '.56rem', letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(227,81,15,.7)' }}>
                Est. 2013 · New Delhi
              </p>
              <h3 className="mb-7" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem,3.2vw,2.4rem)', lineHeight: '.92', color: '#EDF0F5' }}>
                Precision.<br />Safety.<br />Performance.
              </h3>
              <Link href="/contact" className="btn-flame inline-flex py-3 px-7 text-[.62rem] gap-2 group">
                <span>Start a Project</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* 4 capability cards — right 7 cols */}
          {caps.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * .08, duration: .65, ease }}
              className="lg:col-span-7 xl:col-span-3 cell p-7 group flex flex-col gap-5 cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-400"
                style={{ background: 'rgba(227,81,15,.08)', border: '1px solid rgba(227,81,15,.15)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E3510F'; e.currentTarget.style.border = '1px solid #E3510F'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(227,81,15,.08)'; e.currentTarget.style.border = '1px solid rgba(227,81,15,.15)'; }}
              >
                <Icon size={19} className="text-[#E3510F] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3
                  className="text-[#E3510F] mb-2.5 group-hover:text-[#F2F4F7] transition-colors duration-300"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '1.5',
                    letterSpacing: '0.02em',
                  }}
                >
                  {title}
                </h3>
                <p className="text-[#B4BEC9] font-weighttext-[.85rem] leading-relaxed font-light">{desc}</p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-[#E3510F]/0 via-[#E3510F]/15 to-[#E3510F]/0 group-hover:via-[#E3510F]/35 transition-all duration-500" />
            </motion.div>
          ))}

          {/* Wide facts bar */}
          <motion.div
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: .3, duration: .7, ease }}
            className="lg:col-span-12 cell px-10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl"
          >
            <p className="text-[#8C98AA] text-[.95rem] leading-relaxed max-w-xl font-light">
              From design and procurement to precision manufacturing and rigorous testing — AHIL manages the full production lifecycle with certified quality at every stage.
            </p>
            <div className="flex gap-12 flex-shrink-0 flex-wrap items-center">
              {facts.map(({ n, l }, i) => (
                <div key={i} className="text-center">
                  <div className="text-[2.4rem] font-bold text-[#E3510F] leading-none mb-3" style={{ fontFamily: 'var(--font-display)' }}>{n}</div>
                  <div
                    className="text-[.54rem] text-[#] uppercase tracking-wider"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {l}
                  </div>                </div>
              ))}
              <Link href="/products" className="btn-wire py-3 px-6 text-[.62rem] hidden md:inline-flex items-center gap-2 group">
                <span>View Products</span>
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
