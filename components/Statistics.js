'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Briefcase, Award, Globe } from 'lucide-react';

function AnimatedNumber({ target, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    let start = 0;
    const step = Math.ceil(num / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { icon: Users, value: '500', suffix: '+', label: 'Happy Clients', desc: 'Trusted partnerships built on quality' },
  { icon: Briefcase, value: '250', suffix: '+', label: 'Projects Completed', desc: 'Delivered on time, every time' },
  { icon: Award, value: '15', suffix: '+', label: 'Industry Awards', desc: 'Recognized for excellence' },
  { icon: Globe, value: '10', suffix: '+', label: 'Global Partners', desc: 'Collaborative global network' },
];

export default function Statistics() {
  return (
    <section className="relative py-20 bg-brand-orange overflow-hidden">
      {/* Geometric pattern */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />
      {/* Diagonal accent */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-[-8deg] translate-x-20 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-screen-xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
                className="text-center text-white group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/15 mb-5 group-hover:bg-white/25 transition-colors">
                  <Icon size={22} className="text-white" />
                </div>
                <div
                  className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight leading-none"
                  style={{ fontFamily: 'var(--font-display, "Montserrat", sans-serif)' }}
                >
                  <AnimatedNumber target={`${stat.value}${stat.suffix}`} suffix={stat.suffix} duration={1600 + idx * 150} />
                </div>
                <div
                  className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/90 mb-1"
                  style={{ fontFamily: 'var(--font-label, "Barlow Condensed", sans-serif)' }}
                >
                  {stat.label}
                </div>
                <div className="text-white/55 text-xs hidden md:block">{stat.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
