'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Settings, Zap, Shield, ArrowRight } from 'lucide-react';

const steps = [
  { Icon:Search,   n:'01', title:'Design & Engineering',    text:'Customer requirements are translated into precision designs using advanced simulation, CAD tools, and RDSO-aligned specifications.' },
  { Icon:Settings, n:'02', title:'Strategic Procurement',   text:'High-quality materials sourced exclusively from certified vendors ensuring traceability, availability, and cost efficiency at scale.' },
  { Icon:Zap,      n:'03', title:'Precision Manufacturing', text:'State-of-the-art CNC machining facilities with integrated quality checkpoints at every stage of the production cycle.' },
  { Icon:Shield,   n:'04', title:'Rigorous Testing',        text:'Every component certified through comprehensive testing aligned with RDSO, ISO, and international railway safety standards.' },
];

const ease = [.22,1,.36,1];

export default function OurProcess() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:sectionRef, offset:['start end','end start'] });
  const lineWidth  = useTransform(scrollYProgress, [.1,.6], ['0%','100%']);
  const bgY        = useTransform(scrollYProgress, [0,1], [0,-40]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden section-gap" style={{ background:'#050608' }}>
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none"/>
      <motion.div style={{ y:bgY }} className="absolute inset-0 glow-center pointer-events-none opacity-50"/>
      <div className="absolute inset-x-0 top-0 h-px divider pointer-events-none"/>
      <div className="absolute inset-x-0 bottom-0 h-px divider pointer-events-none"/>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-end">
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.75, ease }}
          >
            <span className="eyebrow mb-7 block">Engineering Workflow</span>
            <h2 className="display-md">From Concept to<br/><span style={{ color:'#E3510F' }}>Certified Product</span></h2>
          </motion.div>
          <motion.div
            initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:.14, duration:.75, ease }}
            className="border-l-2 border-[#E3510F]/32 pl-7"
          >
            <p className="text-[#8C98AA] leading-relaxed text-[.96rem]">
              At AHIL, a structured four-stage engineering process ensures every deliverable meets the precise standards required for railway and metro applications worldwide.
            </p>
          </motion.div>
        </div>

        {/* ── Steps timeline ── */}
        <div className="relative">

          {/* Animated progress line (desktop) */}
          <div className="absolute hidden lg:block" style={{ top:58, left:'calc(56px + 2.5rem)', right:'calc(56px + 2.5rem)', height:'1px' }}>
            <div className="absolute inset-0 bg-white/[.04]"/>
            <motion.div
              style={{ width:lineWidth }}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background:'linear-gradient(90deg,#E3510F,rgba(227,81,15,.3))', width:lineWidth }}
            />
            {/* Step dots */}
            {[0,1,2,3].map(i => (
              <motion.div
                key={i}
                initial={{ scale:0, opacity:0 }} whileInView={{ scale:1, opacity:1 }}
                viewport={{ once:true }} transition={{ delay:i*.18+.35, duration:.45, ease }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#050608]"
                style={{ left:`${(i/3)*100}%`, background:'#E3510F', boxShadow:'0 0 16px rgba(227,81,15,.7)' }}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ Icon, n, title, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay:i*.12, duration:.7, ease }}
                className="step group"
              >
                {/* Number + icon */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-450"
                    style={{ background:'#141B2D', border:'1px solid rgba(255,255,255,.07)' }}
                    onMouseEnter={e => Object.assign(e.currentTarget.style, { background:'#E3510F', border:'1px solid #E3510F', boxShadow:'0 0 30px rgba(227,81,15,.35)' })}
                    onMouseLeave={e => Object.assign(e.currentTarget.style, { background:'#141B2D', border:'1px solid rgba(255,255,255,.07)', boxShadow:'none' })}
                  >
                    <Icon size={20} className="text-[#E3510F] group-hover:text-white transition-colors duration-300"/>
                  </div>
                  <span className="text-[#1C2540] font-bold select-none leading-none" style={{ fontFamily:'var(--font-display)', fontSize:'4.8rem' }}>{n}</span>
                </div>

                <span className="accent-lg mb-6 block"/>

                <h3 className="text-[#EDF0F5] font-semibold text-[.93rem] mb-3 leading-snug">{title}</h3>
                <p className="text-[#4E5A6E] text-[.8rem] leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Quality banner ── */}
        <motion.div
          initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ delay:.4, duration:.85, ease }}
          className="mt-14 rounded-2xl overflow-hidden relative border border-white/[.05]"
          style={{ background:'linear-gradient(135deg,#0B0E15 0%,#0F1420 50%,#0B0E15 100%)', minHeight:300 }}
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-grid-dense opacity-30 pointer-events-none"/>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background:'radial-gradient(ellipse 800px 350px at 50% 50%,rgba(227,81,15,.06),transparent 65%)' }}/>

          {/* Decorative SVG blueprint */}
          <svg className="absolute right-0 top-0 h-full w-auto opacity-10" viewBox="0 0 400 300" fill="none" preserveAspectRatio="xMaxYMid meet">
            <circle cx="350" cy="150" r="130" stroke="#E3510F" strokeWidth="1.5" strokeDasharray="8 6"/>
            <circle cx="350" cy="150" r="90"  stroke="#E3510F" strokeWidth="1" strokeDasharray="4 4"/>
            <circle cx="350" cy="150" r="50"  stroke="#E3510F" strokeWidth="1"/>
            <line x1="220" y1="150" x2="480" y2="150" stroke="#E3510F" strokeWidth="1" strokeDasharray="6 4"/>
            <line x1="350" y1="20"  x2="350" y2="280" stroke="#E3510F" strokeWidth="1" strokeDasharray="6 4"/>
            <g stroke="#E3510F" strokeWidth="2">
              <path d="M 10,10 L 10,35 M 10,10 L 35,10"/>
              <path d="M 390,10 L 390,35 M 390,10 L 365,10"/>
              <path d="M 10,290 L 10,265 M 10,290 L 35,290"/>
            </g>
          </svg>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{ background:'linear-gradient(90deg,transparent,#E3510F,rgba(227,81,15,.3),transparent)' }}/>

          <div className="relative z-10 p-10 md:p-14 max-w-2xl">
            <p className="text-[#E3510F] text-[.56rem] tracking-[.28em] uppercase mb-6" style={{ fontFamily:'var(--font-mono)' }}>
              Quality Commitment
            </p>
            <h3 className="display-sm mb-6">
              Every Component.<br/><span style={{ color:'#E3510F' }}>Zero Compromise.</span>
            </h3>
            <p className="text-[#8C98AA] text-[.9rem] leading-relaxed mb-10 max-w-lg">
              Our quality management system is certified to ISO 9001:2015 and every product is validated against RDSO standards before delivery — ensuring the highest levels of safety and reliability for railway operations.
            </p>
            <Link href="/contact" className="btn-flame inline-flex group py-3.5 px-9 text-[.62rem] gap-2.5">
              <span>Request Certification Details</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
