'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ease = [.22, 1, .36, 1];

const milestones = [
  { year: '2013', event: 'Company founded in New Delhi with a vision to serve Indian Railways' },
  { year: '2015', event: 'First RDSO approved components delivered to Indian Railways' },
  { year: '2018', event: 'Expanded into advanced HVAC systems for metro rail networks' },
  { year: '2022', event: 'ISO 14001:2015 certification achieved for environmental management' },
  { year: '2024', event: '500+ projects delivered — Pan-India operations and growing' },
];

export default function OurStory() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const imgParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const lineH       = useTransform(scrollYProgress, [.1, .8], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden section-gap" style={{ background: '#0B1F3A' }}>
      <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none"/>
      <div className="absolute inset-0 glow-right pointer-events-none opacity-40"/>
      <div className="absolute inset-x-0 top-0 h-px divider pointer-events-none"/>
      <div className="absolute inset-x-0 bottom-0 h-px divider pointer-events-none"/>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-end">
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.75, ease }}
          >
            <span className="eyebrow mb-7 block">Our Story</span>
            <h2 className="display-md">
              Transforming Industries<br/>Through <span style={{ color:'#B88746' }}>Innovation</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:.14, duration:.75, ease }}
            className="space-y-6"
          >
            <p className="text-[#6B7A8E] leading-relaxed border-l-2 border-[#B88746]/35 pl-7 text-[.96rem]">
              Founded in 2013, AHIL has steadily built a reputation for trust, reliability, and customer-centric manufacturing. Under visionary leadership, we've grown into a dynamic organisation known for innovative engineering solutions.
            </p>
            <p className="text-[#3D4A5C] leading-relaxed text-[.88rem] pl-7">
              With 100+ skilled professionals, we partner with Indian Railways, Metros, and PSUs — driving transformation through precision and innovation that meets the highest global standards.
            </p>
          </motion.div>
        </div>

        {/* ── Cinematic split: image + timeline ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Image mosaic */}
          <motion.div
            initial={{ opacity:0, x:-28 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:.95, ease }}
            className="relative lg:sticky lg:top-32"
          >
            {/* Main image with parallax */}
            <div className="rounded-2xl overflow-hidden border border-white/[.05] relative group" style={{ height: 480 }}>
              <motion.div style={{ y: imgParallax }} className="absolute inset-0 scale-[1.12]">
                <Image
                  src="/images/storybottom.jpg"
                  alt="AND Hitech Railway Manufacturing"
                  fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                  unoptimized
                />
              </motion.div>
              <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(11,14,21,.7) 0%,transparent 50%)' }}/>
              {/* Bottom label */}
              <div className="absolute bottom-6 left-7 right-7 flex items-center gap-3">
                <div className="h-px flex-1" style={{ background:'linear-gradient(90deg,rgba(184,135,70,.6),transparent)' }}/>
                <span className="text-[#6B7A8E] text-[.66rem]" style={{ fontFamily:'var(--font-mono)' }}>Manufacturing Excellence Since 2013</span>
              </div>
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-px h-16" style={{ background:'linear-gradient(to bottom,#B88746,transparent)' }}/>
              <div className="absolute top-0 left-0 h-px w-16" style={{ background:'linear-gradient(90deg,#B88746,transparent)' }}/>
            </div>

            {/* Overlapping second image */}
            <div className="absolute -bottom-10 -right-8 w-[48%] rounded-xl overflow-hidden border-4 border-[#0B1F3A] shadow-2xl hidden md:block z-10">
              <Image
                src="/images/storytopleft.jpg"
                alt="AHIL Production" width={320} height={220}
                className="w-full object-cover opacity-80"
                unoptimized
              />
              <div className="absolute inset-0" style={{ background:'linear-gradient(135deg,transparent 45%,rgba(11,14,21,.5))' }}/>
            </div>

            {/* Year badge */}
            <div className="absolute -top-5 -left-5 hidden md:flex flex-col items-center justify-center text-white z-20"
              style={{ width:88, height:88, background:'#B88746', clipPath:'polygon(0 0,calc(100%-10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100%-10px))' }}>
              <span className="text-2xl font-bold leading-none" style={{ fontFamily:'var(--font-display)' }}>10+</span>
              <span className="text-[.48rem] uppercase tracking-wider opacity-80 mt-0.5" style={{ fontFamily:'var(--font-mono)' }}>Years</span>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Animated vertical rail */}
            <div className="absolute left-4 top-2 bottom-2 w-px hidden md:block" style={{ background:'rgba(255,255,255,.04)' }}>
              <motion.div
                style={{ height: lineH }}
                className="absolute top-0 left-0 w-full origin-top rounded-full"
                style={{ background:'linear-gradient(to bottom,#B88746,rgba(184,135,70,.1))', height: lineH }}
              />
            </div>

            <div className="space-y-0">
              {milestones.map(({ year, event }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay: i * .1, duration:.65, ease }}
                  className="relative flex items-start gap-8 py-8 border-b border-white/[.04] group cursor-default"
                >
                  {/* Rail dot */}
                  <div className="absolute left-[11px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-[#0B1F3A] hidden md:flex items-center justify-center z-10 transition-all duration-400"
                    style={{ background:'#0B1F3A', boxShadow:'none' }}
                    onMouseEnter={e => Object.assign(e.currentTarget.style, { background:'#B88746', boxShadow:'0 0 16px rgba(184,135,70,.6)' })}
                    onMouseLeave={e => Object.assign(e.currentTarget.style, { background:'#0B1F3A', boxShadow:'none' })}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-current"/>
                  </div>

                  <div className="md:pl-8 flex items-start gap-6 w-full">
                    {/* Year */}
                    <div
                      className="flex-shrink-0 text-[2.2rem] font-bold leading-none transition-colors duration-400 group-hover:text-[#B88746]"
                      style={{ fontFamily:'var(--font-display)', color:'rgba(255,255,255,.08)', letterSpacing:'.01em', minWidth:80 }}
                    >
                      {year}
                    </div>
                    {/* Event */}
                    <p className="text-[#3D4A5C] text-[.85rem] leading-relaxed group-hover:text-[#6B7A8E] transition-colors duration-400 pt-1">
                      {event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom metrics row */}
            <motion.div
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:.5, duration:.7, ease }}
              className="mt-10 grid grid-cols-3 gap-5"
            >
              {[['10+','Years'],['100+','Engineers'],['500+','Projects']].map(([n, l]) => (
                <div key={l} className="text-center py-5 rounded-xl border border-white/[.04] hover:border-[#B88746]/20 transition-all duration-400 cursor-default"
                  style={{ background:'rgba(255,255,255,.015)' }}>
                  <div className="text-[2rem] font-bold text-[#B88746] leading-none mb-1" style={{ fontFamily:'var(--font-display)' }}>{n}</div>
                  <div className="text-[.54rem] text-[#9AAABB] uppercase tracking-wider" style={{ fontFamily:'var(--font-mono)' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
