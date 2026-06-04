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
  { n: '500', sfx: '+', label: 'Components Delivered', sub: 'Railway & Metro Applications', desc: 'Precision-engineered components supplied to Indian Railways, Metro networks, and rail infrastructure projects nationwide.' },
  { n: '10',  sfx: '+', label: 'Years of Excellence', sub: 'Founded 2013', desc: 'Over a decade of continuous growth, engineering innovation, and trusted manufacturing partnerships across India.' },
  { n: '100', sfx: '+', label: 'Skilled Engineers', sub: 'In-house expertise', desc: 'A dedicated team of engineers, machinists, and quality specialists operating under one roof with advanced machinery.' },
  { n: '25',  sfx: '+', label: 'Product Variants', sub: 'Across all categories', desc: 'From HVAC systems to brake components, suspension systems to rolling stock parts — comprehensive railway solutions.' },
];

const ease = [.22, 1, .36, 1];

export default function Statistics() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#0B1F3A' }}>
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      {/* Copper radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 1000px 600px at 50% 50%,rgba(184,135,70,.06),transparent 70%)' }} />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: .8, ease }}
          className="text-center mb-16"
        >
          <div className="label mb-4 inline-block">Our Track Record</div>
          <h2 className="display-lg max-w-2xl mx-auto">
            Built on Decades of<br />
            <span style={{ color: '#B88746' }}>Railway Engineering</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[.05] rounded-xl overflow-hidden">
          {stats.map(({ n, sfx, label, sub, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .75, ease, delay: i * .1 }}
              className="bg-[#0B1F3A] p-8 xl:p-10 group hover:bg-[#0F2847] transition-colors duration-500 relative overflow-hidden"
            >
              {/* Copper accent top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#B88746]/0 group-hover:bg-[#B88746]/40 transition-all duration-500" />

              <div className="metric text-[#F7F5F0] mb-1">
                <AnimCounter end={parseInt(n)} suffix={sfx} />
              </div>
              <div className="text-[#B88746] text-sm font-semibold mb-1">{label}</div>
              <div className="text-white/40 text-[.7rem] uppercase tracking-wider mb-4" style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '.1em' }}>{sub}</div>
              <p className="text-white/35 text-[.8rem] leading-relaxed hidden group-hover:block transition-all">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: .8, delay: .4 }}
          className="mt-12 pt-8 border-t border-white/[.06] flex flex-wrap items-center justify-center gap-8 text-white/30 text-[.72rem] uppercase tracking-widest"
          style={{ fontFamily: 'Barlow Condensed, sans-serif' }}
        >
          {['Indian Railways Vendor', 'Metro Rail Projects', 'Vande Bharat Ecosystem', 'RDSO Approved', 'ISO 9001:2015', 'Make in India'].map(t => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#B88746]/50" />{t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
