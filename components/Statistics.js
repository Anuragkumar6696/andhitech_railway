'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function AnimCounter({ end, suffix = '', duration = 2200 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const n = parseInt(String(end).replace(/\D/g, ''), 10);
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setVal(Math.round(eased * n));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const stats = [
  {
    n: '500', sfx: '+',
    label: 'Projects Delivered',
    sub: 'Indian Railways · Metro · PSU',
    desc: 'From RDSO-approved brake systems to LHB coach components — delivered on time, every time.',
    accent: '#E3510F',
  },
  {
    n: '10', sfx: '+',
    label: 'Years of Excellence',
    sub: 'Founded 2013',
    desc: 'Over a decade of continuous growth, certification milestones, and trusted engineering relationships.',
    accent: '#3B82F6',
  },
  {
    n: '100', sfx: '+',
    label: 'Skilled Engineers',
    sub: 'In-house Expert Team',
    desc: 'A dedicated team of design engineers, CNC machinists, and quality specialists under one roof.',
    accent: '#10B981',
  },
  {
    n: '15', sfx: '+',
    label: 'Product Lines',
    sub: 'Across Rail Segments',
    desc: 'Brake systems, air suspension, HVAC, couplers, pantographs, tamping tools — a complete portfolio.',
    accent: '#8B5CF6',
  },
];

const MILESTONES = [
  { year: '2013', label: 'Founded', desc: 'Incorporated in New Delhi with a mission to serve Indian Railways' },
  { year: '2015', label: 'RDSO Approval', desc: 'First RDSO-approved components delivered to Indian Railways' },
  { year: '2018', label: 'HVAC Expansion', desc: 'Advanced into HVAC systems for Metro rail networks' },
  { year: '2022', label: 'ISO 14001', desc: 'Environmental Management System certification achieved' },
  { year: '2024', label: '500+ Delivered', desc: 'Pan-India operations — 500+ projects and growing' },
];

const ease = [.22, 1, .36, 1];

export default function Statistics() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#0B0E15' }}>
      <div className="absolute inset-0 bg-grid-fine opacity-45 pointer-events-none" />
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 1200px 700px at 50% 50%,rgba(227,81,15,.07),transparent 68%)', y }} />
      <div className="absolute inset-x-0 top-0 h-[1.5px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(227,81,15,.35),transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent)' }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .7, ease }}
          className="flex items-center gap-5 mb-16"
        >
          <span className="eyebrow">Performance Metrics</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,rgba(227,81,15,.2),transparent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.5rem', letterSpacing: '.3em', textTransform: 'uppercase', color: '#1C2540' }}>
            As of 2024
          </span>
        </motion.div>

        {/* ── STAT CARDS GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map(({ n, sfx, label, sub, desc, accent }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * .1, duration: .75, ease }}
              className="bento-cell group cursor-default relative overflow-hidden"
              style={{ padding: '2rem' }}
            >
              {/* Accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `radial-gradient(circle at top right, ${accent}18, transparent 70%)` }} />

              {/* Accent line */}
              <div className="w-8 h-[2px] mb-6 transition-all duration-500 group-hover:w-12"
                style={{ background: `linear-gradient(90deg,${accent},transparent)` }} />

              {/* Number */}
              <div
                className="mb-3 transition-colors duration-500"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem,6vw,4.5rem)',
                  lineHeight: 1,
                  color: '#EDF0F5',
                }}
              >
                <AnimCounter end={n} suffix={sfx} />
              </div>

              {/* Label */}
              <div className="text-[#EDF0F5] text-[.88rem] font-medium mb-1 group-hover:text-white">{label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.18em', color: accent, textTransform: 'uppercase' }} className="mb-4">
                {sub}
              </div>
              <p className="text-[#3D4A5C] text-[.76rem] leading-relaxed group-hover:text-[#4E5A6E] transition-colors">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── MILESTONE TIMELINE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7, ease }}
          className="relative"
        >
          {/* Header */}
          <div className="flex items-center gap-5 mb-10">
            <span className="eyebrow">Company Timeline</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,rgba(227,81,15,.2),transparent)' }} />
          </div>

          {/* Timeline track */}
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-5 left-0 right-0 h-px hidden md:block" style={{ background: 'linear-gradient(90deg,transparent,rgba(227,81,15,.3) 10%,rgba(227,81,15,.3) 90%,transparent)' }} />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {MILESTONES.map(({ year, label, desc }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * .1, duration: .65, ease }}
                  className="relative group"
                >
                  {/* Dot */}
                  <div className="relative w-10 h-10 rounded-full border border-[#E3510F]/30 flex items-center justify-center mb-4 bg-[#0B0E15] group-hover:border-[#E3510F] group-hover:bg-[#E3510F]/10 transition-all duration-400">
                    <div className="w-2 h-2 rounded-full bg-[#E3510F] group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Year */}
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', lineHeight: 1, color: '#EDF0F5' }} className="mb-1">
                    {year}
                  </div>

                  {/* Label */}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.18em', color: '#E3510F', textTransform: 'uppercase' }} className="mb-2">
                    {label}
                  </div>

                  {/* Desc */}
                  <p className="text-[#3D4A5C] text-[.72rem] leading-relaxed group-hover:text-[#5C6A7E] transition-colors">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: .3, duration: .7, ease }}
          className="mt-16 pt-10 border-t border-white/[.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-[#3D4A5C] text-[.82rem] max-w-md">
            Behind every metric is a commitment to engineering integrity and the advancement of India&apos;s rail infrastructure.
          </p>
          <Link href="/about-us" className="btn-ghost inline-flex items-center gap-2 group">
            <span className="text-[#EDF0F5]">Read Our Full Story</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-[#E3510F]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
