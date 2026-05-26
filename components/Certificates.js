'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, Award, ArrowRight } from 'lucide-react';

const certs = [
  { src:'/images/certificate1.png',  title:'ISO 9001:2015',   subtitle:'Quality Management',      tag:'Certified' },
  { src:'/images/certificate2.png',  title:'ISO 14001:2015',  subtitle:'Environmental Management', tag:'Compliant' },
  { src:'/images/certificate3.png',  title:'RDSO Approved',   subtitle:'Railway Standards Body',   tag:'Govt. India' },
  { src:'/images/rocertificate.png', title:'Industry Award',  subtitle:'Excellence in Manufacturing', tag:'Awarded 2023' },
];

const qualities = [
  'Rigorous incoming material inspection at every delivery',
  'In-process quality checkpoints throughout manufacturing',
  'Final product testing against RDSO & ISO standards',
  'Fully traceable documentation for every component',
];

const ease = [.22,1,.36,1];

export default function Certificates() {
  return (
    <section className="relative overflow-hidden section-gap" style={{ background:'#0B0E15' }}>
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40"/>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 800px 600px at 50% -5%,rgba(227,81,15,.05),transparent 68%)' }}/>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(227,81,15,.2),transparent)' }}/>
      <div className="absolute inset-x-0 bottom-0 h-px divider pointer-events-none"/>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.75, ease }}
          >
            <span className="eyebrow mb-7 block">Trust & Compliance</span>
            <h2 className="display-md">Certified for<br/><span style={{ color:'#E3510F' }}>Excellence</span></h2>
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:.14, duration:.75, ease }}
            className="space-y-5"
          >
            <p className="text-[#8C98AA] text-[.95rem] leading-relaxed">
              Our quality assurance processes adhere to the most stringent international standards, ensuring every component we deliver is reliable, safe, and fully compliant with railway regulations.
            </p>
            <ul className="space-y-3 mt-2">
              {qualities.map((q, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={11} className="text-[#E3510F]"/>
                  </div>
                  <span className="text-[#8C98AA] text-[.83rem] leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Certificate cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {certs.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*.1, duration:.65, ease }}
              className="story-card group flex flex-col items-center p-7 text-center cursor-default"
            >
              {/* Badge tag */}
              <div className="badge mb-5 self-center">{c.tag}</div>

              {/* Certificate image */}
              <div className="relative w-full rounded-xl overflow-hidden bg-[#050608] border border-white/[.05] mb-6"
                style={{ aspectRatio:'3/4' }}>
                <Image
                  src={c.src} alt={c.title} fill
                  className="object-contain p-5 group-hover:scale-[1.05] transition-transform duration-600"
                  unoptimized
                />
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background:'linear-gradient(135deg,rgba(227,81,15,.07) 0%,transparent 55%)' }}/>
              </div>

              <div className="text-[#EDF0F5] font-semibold text-[.92rem] mb-1 group-hover:text-[#E3510F] transition-colors duration-300">
                {c.title}
              </div>
              <div className="text-[#4E5A6E] text-[.74rem]">{c.subtitle}</div>

              {/* Bottom accent bar */}
              <div className="mt-5 h-[1px] w-0 group-hover:w-12 bg-gradient-to-r from-[#E3510F] to-[#FF6835] transition-all duration-500 rounded-full"/>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom trust banner ── */}
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ delay:.35, duration:.75, ease }}
          className="relative rounded-2xl overflow-hidden border border-white/[.05]"
          style={{ background:'linear-gradient(135deg,#0B0E15 0%,#0F1420 50%,#0B0E15 100%)' }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{ background:'linear-gradient(90deg,transparent,#E3510F,rgba(227,81,15,.2),transparent)' }}/>

          <div className="px-8 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:'rgba(227,81,15,.1)', border:'1px solid rgba(227,81,15,.2)' }}>
                <ShieldCheck size={20} className="text-[#E3510F]"/>
              </div>
              <div>
                <div className="text-[#EDF0F5] font-semibold text-[.94rem]">Certified & RDSO Approved Manufacturer</div>
                <div className="text-[#4E5A6E] text-[.78rem] mt-0.5">Trusted by Indian Railways and Metro networks across India since 2013</div>
              </div>
            </div>
            <div className="flex items-center gap-6 flex-shrink-0 flex-wrap">
              {['ISO 9001','ISO 14001','RDSO','Make in India'].map((label, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>
                  <span className="text-[#4E5A6E] text-[.64rem] uppercase tracking-widest" style={{ fontFamily:'var(--font-mono)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
