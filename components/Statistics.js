'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function AnimCounter({ end, suffix='', duration=2000 }) {
  const [val, setVal] = useState(0);
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const n     = parseInt(String(end).replace(/\D/g,''), 10);
        const start = Date.now();
        const tick  = () => {
          const elapsed  = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          setVal(Math.round(eased * n));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold:0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const stats = [
  { n:'500', sfx:'+', label:'Satisfied Clients',   sub:'Railway, Metro & Industrial',  desc:'From Indian Railways to Metro networks, our clients trust us for critical components.' },
  { n:'250', sfx:'+', label:'Projects Delivered',  sub:'On time, every time',           desc:'Every project completed to specification and delivered with zero compromise on quality.' },
  { n:'10',  sfx:'+', label:'Years of Excellence', sub:'Founded in 2013',               desc:'Over a decade of continuous growth, innovation, and trusted engineering partnerships.' },
  { n:'100', sfx:'+', label:'Skilled Engineers',   sub:'In-house expert team',          desc:'A dedicated team of engineers, machinists, and quality specialists under one roof.' },
];

const ease = [.22,1,.36,1];

export default function Statistics() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end start'] });
  const y = useTransform(scrollYProgress, [0,1], [0,-30]);

  return (
    <section ref={ref} className="relative overflow-hidden section-gap-sm" style={{ background:'#0B0E15' }}>
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-grid-fine opacity-50 pointer-events-none"/>
      <div className="absolute inset-0 glow-center pointer-events-none"/>
      <div className="absolute inset-x-0 top-0 h-px divider-flame opacity-40 pointer-events-none"/>
      <div className="absolute inset-x-0 bottom-0 h-px divider pointer-events-none"/>

      {/* Atmospheric side glows */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(227,81,15,.06),transparent 70%)' }}/>
        <div className="absolute top-1/2 right-0 w-80 h-80 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(227,81,15,.04),transparent 70%)' }}/>
      </motion.div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:.7, ease }}
          className="flex items-center gap-5 mb-16"
        >
          <span className="eyebrow">Performance Metrics</span>
          <div className="flex-1 h-px" style={{ background:'linear-gradient(90deg,rgba(227,81,15,.2),transparent)' }}/>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#141B2D] rounded-2xl overflow-hidden border border-white/[.045]">
          {stats.map(({ n, sfx, label, sub, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*.1, duration:.75, ease }}
              className="relative bg-[#0B0E15] px-8 md:px-10 py-12 group cursor-default overflow-hidden"
            >
              {/* Hover fill */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background:'linear-gradient(135deg,rgba(227,81,15,.06) 0%,transparent 60%)' }}/>
              {/* Top accent line that grows on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-[#E3510F] to-[#FF6835] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"/>
              </div>

              <div className="relative z-10 text-center">
                <div className="metric text-[#EDF0F5] group-hover:text-[#E3510F] transition-colors duration-400 mb-2">
                  <AnimCounter end={n} suffix={sfx} duration={1900+i*120}/>
                </div>
                <div className="text-[.6rem] uppercase tracking-[.24em] text-[#E3510F] font-medium mb-1.5" style={{ fontFamily:'var(--font-mono)' }}>
                  {label}
                </div>
                <div className="text-[#4E5A6E] text-[.72rem] font-light hidden md:block">{sub}</div>
                {/* Description on hover */}
                <div className="mt-5 text-[#8C98AA] text-[.75rem] leading-relaxed hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-400 max-h-0 group-hover:max-h-20 overflow-hidden transition-all">
                  {desc}
                </div>
                <div className="mt-5 h-px w-0 group-hover:w-14 bg-gradient-to-r from-[#E3510F] to-[#FF6835] mx-auto transition-all duration-500 rounded-full"/>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust band */}
        <motion.div
          initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ delay:.4, duration:.7, ease }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-5 rounded-2xl border border-white/[.045]"
          style={{ background:'#0B0E15' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"/>
            <span className="text-[#8C98AA] text-[.85rem]">
              All metrics verified through third-party audits and RDSO certification processes
            </span>
          </div>
          <div className="flex items-center gap-6 flex-shrink-0" style={{ fontFamily:'var(--font-mono)', fontSize:'.6rem', letterSpacing:'.18em' }}>
            {['ISO 9001','ISO 14001','RDSO'].map((c, i) => (
              <span key={i} className="text-[#3D4A5C] uppercase">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
