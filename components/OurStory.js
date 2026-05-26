'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ease = [.22,1,.36,1];

const milestones = [
  { year:'2013', event:'Company founded in New Delhi with a vision to serve Indian Railways' },
  { year:'2015', event:'First RDSO approved components delivered to Indian Railways' },
  { year:'2018', event:'Expanded into advanced HVAC systems for metro rail networks' },
  { year:'2022', event:'ISO 14001:2015 certification achieved for environmental management' },
  { year:'2024', event:'500+ projects delivered — Pan-India operations and growing' },
];

export default function OurStory() {
  return (
    <section className="relative overflow-hidden section-gap" style={{ background:'#0B0E15' }}>
      <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none"/>
      <div className="absolute inset-0 glow-right pointer-events-none opacity-50"/>
      <div className="absolute inset-x-0 top-0 h-px divider pointer-events-none"/>
      <div className="absolute inset-x-0 bottom-0 h-px divider pointer-events-none"/>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.75, ease }}
          >
            <span className="eyebrow mb-7 block">Our Story</span>
            <h2 className="display-md">Transforming Industries<br/>Through <span style={{ color:'#E3510F' }}>Innovation</span></h2>
          </motion.div>
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:.14, duration:.75, ease }}
            className="grid grid-cols-2 gap-4"
          >
            {['/images/storytopleft.jpg','/images/storytopright.jpg'].map((src, i) => (
              <div key={i} className={`rounded-xl overflow-hidden border border-white/[.05] group ${i===1?'mt-8':''}`}>
                <Image src={src} alt="AND Hitech" width={360} height={260}
                  className="w-full h-52 object-cover opacity-60 group-hover:opacity-85 group-hover:scale-[1.04] transition-all duration-600"
                  unoptimized/>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Split layout: image + text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:.9, ease }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden border border-white/[.05] group">
              <Image src="/images/storybottom.jpg" alt="AND Hitech Railway" width={680} height={480}
                className="w-full object-cover opacity-65 group-hover:opacity-85 transition-opacity duration-700"
                unoptimized/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E15]/45 to-transparent"/>
            </div>
            {/* Corner accent */}
            <div className="absolute -bottom-4 -left-4 w-12 h-12 hidden md:block"
              style={{ background:'#E3510F', opacity:.6, clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)' }}/>
          </motion.div>

          <motion.div
            initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ delay:.1, duration:.9, ease }}
            className="space-y-7"
          >
            <p className="text-[#8C98AA] leading-relaxed border-l-2 border-[#E3510F]/35 pl-7 text-[.96rem]">
              Founded in 2013, AHIL has steadily built a reputation for trust, reliability, and customer-centric manufacturing. Under visionary leadership, we've grown into a dynamic organisation known for innovative engineering solutions.
            </p>
            <p className="text-[#4E5A6E] leading-relaxed text-[.88rem]">
              With a team of 100+ skilled professionals, we partner with Indian Railways, Metros, and PSUs — driving transformation through precision and innovation that meets the highest global standards.
            </p>

            {/* Timeline */}
            <div className="space-y-0 pt-2">
              {milestones.map(({ year, event }, i) => (
                <motion.div
                  key={year}
                  initial={{ opacity:0, x:16 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay:i*.07, duration:.55, ease }}
                  className="feature-item group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="feature-num flex-shrink-0 mt-0.5">{year}</span>
                    <span className="text-[#4E5A6E] text-[.8rem] leading-relaxed group-hover:text-[#8C98AA] transition-colors">{event}</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2E3848] group-hover:bg-[#E3510F] transition-colors flex-shrink-0"/>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-4">
              <div className="grid grid-cols-3 gap-5">
                {[['10+','Years'],['100+','Engineers'],['500+','Projects']].map(([n,l]) => (
                  <div key={l} className="text-center">
                    <div className="text-[2rem] font-bold text-[#E3510F] leading-none mb-0.5" style={{ fontFamily:'var(--font-display)' }}>{n}</div>
                    <div className="text-[.55rem] text-[#3D4A5C] uppercase tracking-wider" style={{ fontFamily:'var(--font-mono)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
