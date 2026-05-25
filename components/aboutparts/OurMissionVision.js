'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function OurMissionVision() {
  const [active, setActive] = useState('mission');
  const tabs = [
    { id:'mission', label:'Our Mission', Icon:Target, content:'To deliver reliable and high-performance solutions for Indian Railways, Metro Corporations, and PSUs — combining precision engineering with exceptional customer service.',
      points:['Railway Rolling Stock Components','HVAC Systems for Metro & Industrial','Customer-Centric Engineering','Delivery Excellence'] },
    { id:'vision', label:'Our Vision', Icon:Eye, content:'To be a globally recognized leader in industrial engineering, setting new standards for quality, safety, and sustainable innovation in transportation and manufacturing.',
      points:['Global Engineering Leadership','Sustainable Innovation','Safety Standard Setting','Technological Advancement'] },
    { id:'value', label:'Our Values', Icon:ShieldCheck, content:'Integrity, precision, and a relentless focus on quality are the pillars that support our commitment to partners, employees, and the communities we serve.',
      points:['Uncompromising Integrity','Precision in Every Detail','Relentless Quality Focus','Community Commitment'] },
  ];
  const curr = tabs.find(t=>t.id===active);

  return (
    <section className="py-24 md:py-32 bg-[#0D1117] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_500px_at_50%_0%,rgba(227,81,15,0.06),transparent_70%)] pointer-events-none" />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="eyebrow mb-5 block">Our Approach</span>
            <h2 className="display-md max-w-xl">Empowering Sustainable <span style={{color:'#E3510F'}}>Growth</span></h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActive(id)}
              className={`flex items-center gap-2.5 px-6 py-3 font-medium text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${active===id ? 'bg-[#E3510F] text-white' : 'bg-white/[0.04] text-[#5A6478] hover:bg-white/8 hover:text-[#F0F2F5] border border-white/6'}`}
              style={{fontFamily:'var(--font-mono)',clipPath:active===id?'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))':'none'}}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>
        <div className="bento-cell p-8 md:p-14 border-gradient-flame overflow-hidden">
          <AnimatePresence mode="wait">
            {curr && (
              <motion.div key={curr.id} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-14 }}
                transition={{ duration:0.4 }} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div className="w-12 h-12 rounded-xl bg-[#E3510F]/15 flex items-center justify-center text-[#E3510F]">
                    <curr.Icon size={22} />
                  </div>
                  <h3 className="text-[#F0F2F5] text-3xl font-bold" style={{fontFamily:'var(--font-display)'}}>{curr.label}</h3>
                  <p className="text-[#9BA5B4] text-base leading-relaxed italic">&ldquo;{curr.content}&rdquo;</p>
                </div>
                <div className="lg:col-span-5">
                  <div className="bg-white/[0.03] border border-white/6 rounded-xl p-8">
                    <h4 className="text-[#5A6478] text-[10px] uppercase tracking-[0.2em] mb-6 font-medium" style={{fontFamily:'var(--font-mono)'}}>Strategic Priorities</h4>
                    <ul className="space-y-4">
                      {curr.points.map((p,i) => (
                        <motion.li key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08 }}
                          className="flex items-center gap-3 text-[#F0F2F5]">
                          <CheckCircle2 size={15} className="text-[#E3510F] flex-shrink-0" />
                          <span className="text-sm font-medium">{p}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
