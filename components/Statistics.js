'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function AnimCounter({ end, suffix = '', duration = 1900 }) {
  const [val, setVal] = useState(0);
  const ref   = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const n     = parseInt(String(end).replace(/\D/g, ''), 10);
          const start = Date.now();
          const tick  = () => {
            const elapsed  = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased    = 1 - Math.pow(1 - progress, 3);
            setVal(Math.round(eased * n));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const stats = [
  { n:'500', sfx:'+', label:'Satisfied Clients',   sub:'Railway, Metro & Industrial' },
  { n:'250', sfx:'+', label:'Projects Delivered',  sub:'On time, every time'         },
  { n:'10',  sfx:'+', label:'Years of Excellence', sub:'Founded 2013'                },
  { n:'100', sfx:'+', label:'Skilled Engineers',   sub:'In-house expert team'        },
];

const ease = [.22, 1, .36, 1];

export default function Statistics() {
  return (
    <section className="relative overflow-hidden bg-[#07080C]">
      {/* Subtle diagonal stripe bg */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'repeating-linear-gradient(-55deg,transparent,transparent 40px,rgba(255,255,255,.007) 40px,rgba(255,255,255,.007) 80px)'
      }}/>
      {/* Center glow */}
      <div className="absolute inset-0 glow-center pointer-events-none z-[1]"/>
      {/* Flame rules */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E3510F]/45 to-transparent"/>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[.05] to-transparent"/>

      <div className="relative z-10 max-w-screen-xl mx-auto px-5 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#0D1117] border border-white/[.06] rounded-2xl overflow-hidden divide-x divide-white/[.05]">
          {stats.map(({ n, sfx, label, sub }, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:22 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay: i * .1, duration: .7, ease }}
              className="px-6 md:px-10 py-12 text-center group"
            >
              <div className="metric text-[#F0F2F5] mb-2 group-hover:text-[#E3510F] transition-colors duration-300">
                <AnimCounter end={n} suffix={sfx} duration={1800 + i * 150}/>
              </div>
              <div className="text-[.6rem] uppercase tracking-[.22em] text-[#E3510F] font-mono font-medium mb-1">{label}</div>
              <div className="text-[#4A5568] text-[.75rem] hidden md:block">{sub}</div>
              {/* Underline hover */}
              <div className="mt-5 h-px w-0 group-hover:w-12 bg-[#E3510F] mx-auto transition-all duration-500 rounded-full"/>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
