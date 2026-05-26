'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function AnimCounter({ end, suffix = '', duration = 2200 }) {
  const [val, setVal]   = useState(0);
  const ref             = useRef(null);
  const started         = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const n = parseInt(String(end).replace(/\D/g, ''), 10);
        const start = Date.now();
        const tick = () => {
          const elapsed  = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 4);
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
    label: 'Satisfied Clients',
    sub: 'Railway, Metro & Industrial',
    desc: 'From Indian Railways to Metro networks, our clients trust us for critical components.',
    glyph: '——',
  },
  {
    n: '250', sfx: '+',
    label: 'Projects Delivered',
    sub: 'On time, every time',
    desc: 'Every project completed to specification and delivered with zero compromise on quality.',
    glyph: '——',
  },
  {
    n: '10', sfx: '+',
    label: 'Years of Excellence',
    sub: 'Founded in 2013',
    desc: 'Over a decade of continuous growth, innovation, and trusted engineering partnerships.',
    glyph: '——',
  },
  {
    n: '100', sfx: '+',
    label: 'Skilled Engineers',
    sub: 'In-house expert team',
    desc: 'A dedicated team of engineers, machinists, and quality specialists under one roof.',
    glyph: '——',
  },
];

const ease = [.22, 1, .36, 1];

export default function Statistics() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y    = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opBg = useTransform(scrollYProgress, [0, .3, .7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#0B0E15' }}>
      {/* Atmospheric grid */}
      <div className="absolute inset-0 bg-grid-fine opacity-45 pointer-events-none"/>

      {/* Scrolling radial glow */}
      <motion.div style={{ y, opacity: opBg }} className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 1200px 700px at 50% 50%,rgba(227,81,15,.07),transparent 68%)', y }}/>

      {/* Flame top stripe */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(227,81,15,.35),transparent)' }}/>
      <div className="absolute inset-x-0 bottom-0 h-px divider pointer-events-none"/>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-28 relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.7, ease }}
          className="flex items-center gap-5 mb-16"
        >
          <span className="eyebrow">Performance Metrics</span>
          <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,rgba(227,81,15,.2),transparent)' }}/>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:'.5rem', letterSpacing:'.3em', textTransform:'uppercase', color:'#1C2540' }}>
            As of 2024
          </span>
        </motion.div>

        {/* Stats — large format row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-white/[.04] border border-white/[.04] rounded-2xl overflow-hidden mb-8">
          {stats.map(({ n, sfx, label, sub, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i * .1, duration:.8, ease }}
              className="relative px-8 md:px-10 py-14 flex flex-col group cursor-default overflow-hidden"
              style={{ background: '#0B0E15' }}
            >
              {/* Hover fill */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600"
                style={{ background:'linear-gradient(135deg,rgba(227,81,15,.055) 0%,transparent 65%)' }}/>
              {/* Top sweep on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
                <div className="h-full w-full -translate-x-full group-hover:translate-x-0 transition-transform duration-600"
                  style={{ background:'linear-gradient(90deg,#E3510F,#FF6835)' }}/>
              </div>

              {/* Index mark */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <span style={{ fontFamily:'var(--font-mono)', fontSize:'.5rem', letterSpacing:'.3em', color:'#1C2540', textTransform:'uppercase' }}>
                  {`0${i+1}`}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#1C2540] group-hover:bg-[#E3510F] transition-colors duration-400"/>
              </div>

              {/* Big number */}
              <div
                className="relative z-10 transition-colors duration-400 mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(4rem,7vw,6rem)',
                  lineHeight: 1,
                  letterSpacing: '.01em',
                  color: '#EDF0F5',
                }}
              >
                <AnimCounter end={n} suffix={sfx} duration={1800 + i * 150}/>
              </div>

              <div className="text-[.62rem] uppercase tracking-[.24em] text-[#E3510F] font-medium mb-2 relative z-10"
                style={{ fontFamily:'var(--font-mono)' }}>
                {label}
              </div>
              <div className="text-[#3D4A5C] text-[.72rem] font-light mb-6 relative z-10 hidden md:block">{sub}</div>

              {/* Description — revealed on hover */}
              <div className="mt-auto text-[#4E5A6E] text-[.75rem] leading-relaxed relative z-10 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 transition-all duration-500 overflow-hidden hidden lg:block">
                {desc}
              </div>

              {/* Bottom accent */}
              <div className="mt-5 h-px w-0 group-hover:w-16 bg-gradient-to-r from-[#E3510F] to-[#FF6835] transition-all duration-600 rounded-full relative z-10"/>
            </motion.div>
          ))}
        </div>

        {/* Trust certification band */}
        <motion.div
          initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ delay:.45, duration:.7, ease }}
          className="flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-5 rounded-2xl border border-white/[.04]"
          style={{ background: '#080A0F' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"/>
            <span className="text-[#4E5A6E] text-[.83rem]">
              All metrics verified through third-party audits and RDSO certification processes
            </span>
          </div>
          <div className="flex items-center gap-6 flex-shrink-0 flex-wrap"
            style={{ fontFamily:'var(--font-mono)', fontSize:'.56rem', letterSpacing:'.2em' }}>
            {['ISO 9001','ISO 14001','RDSO','Make in India'].map((c, i) => (
              <span key={i} className="text-[#1C2540] uppercase hover:text-[#3D4A5C] transition-colors cursor-default">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
