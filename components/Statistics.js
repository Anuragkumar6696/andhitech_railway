'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

function AnimCounter({ end, suffix='', duration=1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const n = parseInt(String(end).replace(/\D/g,''), 10);
    let v = 0;
    const step = Math.max(1, Math.ceil(n / (duration / 16)));
    const id = setInterval(() => {
      v = Math.min(v + step, n);
      setVal(v);
      if (v >= n) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const stats = [
  { n:'500', sfx:'+', label:'Satisfied Clients',     sub:'Railway, Metro & Industrial' },
  { n:'250', sfx:'+', label:'Projects Delivered',    sub:'On time, every time' },
  { n:'10',  sfx:'+', label:'Years of Excellence',   sub:'Founded 2013' },
  { n:'100', sfx:'+', label:'Skilled Engineers',     sub:'In-house team' },
];

export default function Statistics() {
  return (
    <section className="relative overflow-hidden bg-[#07080C]">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ourprocess.jpg" alt="Manufacturing" fill className="object-cover opacity-[.12]"/>
        <div className="absolute inset-0" style={{background:'linear-gradient(90deg,#07080C 0%,rgba(7,8,12,.85) 50%,#07080C 100%)'}}/>
      </div>

      {/* Flame top + bottom */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E3510F]/45 to-transparent"/>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[.05] to-transparent"/>
      <div className="absolute inset-0 glow-center pointer-events-none z-[1]"/>

      <div className="relative z-10 max-w-screen-xl mx-auto px-5 md:px-10 py-20 md:py-28">
        {/* Grid — full bleed, no outer border */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[.05]">
          {stats.map(({ n, sfx, label, sub }, i) => (
            <motion.div key={i} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{delay:i*.1,duration:.7}}
              className="px-6 md:px-10 py-12 text-center group">
              <div className="metric text-[#F0F2F5] mb-2 group-hover:text-[#E3510F] transition-colors duration-400">
                <AnimCounter end={n} suffix={sfx} duration={1800 + i*150}/>
              </div>
              <div className="text-[.62rem] uppercase tracking-[.22em] text-[#E3510F] font-mono font-medium mb-1">{label}</div>
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
