'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const certs = [
  { src:'/images/certificate1.png',  title:'ISO 9001:2015',   desc:'Quality Management System',   note:'International certification' },
  { src:'/images/certificate2.png',  title:'ISO 14001:2015',  desc:'Environmental Management',    note:'Eco compliance verified'     },
  { src:'/images/certificate3.png',  title:'RDSO Approved',   desc:'Railway Standards Body',      note:'Govt. of India approval'     },
  { src:'/images/rocertificate.png', title:'Industry Award',  desc:'Excellence in Manufacturing', note:'Recognized 2023'             },
];

const qualities = [
  'Rigorous incoming material inspection',
  'In-process quality checkpoints',
  'Final product testing and certification',
  'Traceable manufacturing documentation',
];

const ease = [.22, 1, .36, 1];

export default function Certificates() {
  return (
    <section className="bg-[#0D1117] py-24 md:py-36 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-45"/>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 700px 500px at 50% 0%,rgba(227,81,15,.04),transparent 70%)'
      }}/>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E3510F]/22 to-transparent"/>

      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:.7, ease }}
          >
            <span className="eyebrow mb-6 block">Trust & Compliance</span>
            <h2 className="display-md">Certified for<br/><span style={{ color:'#E3510F' }}>Excellence</span></h2>
          </motion.div>

          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:.15, duration:.7, ease }}
            className="space-y-4"
          >
            <p className="text-[#9BA5B4] text-[.96rem] leading-relaxed">
              Our quality assurance processes adhere to the most stringent international standards — ensuring every component we deliver is reliable, safe, and compliant.
            </p>
            <ul className="space-y-2.5 mt-5">
              {qualities.map((q, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={11} className="text-[#E3510F]"/>
                  </div>
                  <span className="text-[#9BA5B4] text-[.85rem]">{q}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Certificate cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {certs.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i * .1, duration:.65, ease }}
              className="group cell flex flex-col items-center p-7 text-center"
            >
              {/* Certificate image */}
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#07080C] border border-white/[.05] mb-5">
                <Image
                  src={c.src} alt={c.title} fill
                  className="object-contain p-5 group-hover:scale-[1.04] transition-transform duration-500"
                  unoptimized
                />
                {/* Shimmer on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background:'linear-gradient(135deg,rgba(227,81,15,.06) 0%,transparent 60%)' }}
                />
              </div>
              <div className="text-[#F0F2F5] font-semibold text-[.9rem] mb-1 group-hover:text-[#E3510F] transition-colors">{c.title}</div>
              <div className="text-[#5A6478] text-[.75rem] mb-1">{c.desc}</div>
              <div className="text-[#3A4457] text-[.62rem] uppercase tracking-wider font-mono">{c.note}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust badge */}
        <motion.div
          initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{ once:true }} transition={{ delay:.4 }}
          className="mt-14 cell px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={18} className="text-[#E3510F]"/>
            </div>
            <div>
              <div className="text-[#F0F2F5] font-semibold text-[.88rem]">Certified & RDSO Approved Manufacturer</div>
              <div className="text-[#5A6478] text-[.75rem]">Trusted by Indian Railways and Metro networks across India</div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-[.62rem] font-mono uppercase tracking-widest text-[#3A4457]">
            <span>ISO 9001</span>
            <div className="w-px h-4 bg-white/[.07]"/>
            <span>ISO 14001</span>
            <div className="w-px h-4 bg-white/[.07]"/>
            <span>RDSO</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
