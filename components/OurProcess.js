'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Settings, Zap, Shield } from 'lucide-react';

const steps = [
  { Icon:Search,   n:'01', title:'Design & Engineering',    text:'Customer requirements translated into precision designs using advanced simulation and CAD tools.' },
  { Icon:Settings, n:'02', title:'Strategic Procurement',   text:'High-quality materials sourced from certified vendors — ensuring quality, availability, and cost-efficiency.' },
  { Icon:Zap,      n:'03', title:'Precision Manufacturing', text:'State-of-the-art CNC facilities with multi-stage quality checkpoints throughout the production cycle.' },
  { Icon:Shield,   n:'04', title:'Rigorous Testing',        text:'Every product certified through comprehensive testing aligned with international railway standards.' },
];

const ease = [.22,1,.36,1];

export default function OurProcess() {
  return (
    <section className="bg-[#07080C] py-24 md:py-36 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none"/>
      <div className="absolute inset-0 glow-center pointer-events-none opacity-60"/>

      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">

        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-end">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.7,ease}}>
            <span className="eyebrow mb-6 block">Engineering Workflow</span>
            <h2 className="display-md">From Concept to<br/><span style={{color:'#E3510F'}}>Certified Product</span></h2>
          </motion.div>
          <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.15,duration:.7,ease}}
            className="text-[#9BA5B4] leading-relaxed text-[.95rem] border-l-2 border-[#E3510F]/35 pl-6">
            At AHIL, a structured four-stage engineering process ensures every deliverable meets the precise standards required for railway and metro applications.
          </motion.p>
        </div>

        {/* ── TIMELINE ── */}
        <div className="relative">
          {/* Horizontal connecting line — desktop */}
          <div className="absolute hidden lg:block"
            style={{top:'56px',left:'calc(56px + 2.5rem)',right:'calc(56px + 2.5rem)',height:'1px',background:'linear-gradient(90deg,transparent,rgba(227,81,15,.25) 20%,rgba(227,81,15,.25) 80%,transparent)'}}>
            {/* Progress dots */}
            {[0,1,2,3].map(i => (
              <div key={i} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#E3510F] border border-[#07080C]"
                style={{left:`${(i/3)*100}%`}}/>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ Icon, n, title, text }, i) => (
              <motion.div key={i} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{delay:i*.13,duration:.7,ease}}
                className="step group">

                {/* Icon + number row */}
                <div className="flex items-center gap-4 mb-7">
                  <div className="w-14 h-14 rounded-2xl bg-[#111827] border border-white/8 flex items-center justify-center flex-shrink-0
                    group-hover:bg-[#E3510F] group-hover:border-[#E3510F] transition-all duration-400 relative z-10">
                    <Icon size={21} className="text-[#E3510F] group-hover:text-white transition-colors"/>
                  </div>
                  <span className="text-[#1A2133] font-bold text-[4.5rem] leading-none select-none" style={{fontFamily:'var(--font-display)'}}>{n}</span>
                </div>

                {/* Accent */}
                <span className="accent mb-5 block"/>

                <h3 className="text-[#F0F2F5] font-semibold text-[.96rem] mb-3 leading-snug">{title}</h3>
                <p className="text-[#5A6478] text-[.82rem] leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Photo banner ── */}
        <motion.div initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.4,duration:.8,ease}}
          className="mt-14 rounded-2xl overflow-hidden relative h-[300px] md:h-[360px] border border-white/[.05]">
          <Image src="/images/ourprocess.jpg" alt="Manufacturing Process" fill className="object-cover opacity-45"/>
          <div className="absolute inset-0" style={{background:'linear-gradient(90deg,rgba(7,8,12,.92) 0%,rgba(7,8,12,.6) 50%,transparent 100%)'}}/>
          <div className="absolute inset-0 flex items-center px-10 md:px-16">
            <div className="max-w-lg">
              <span className="eyebrow mb-5 block" style={{color:'rgba(255,255,255,.35)'}}>Quality Assurance</span>
              <h3 className="text-[#F0F2F5] mb-4 leading-tight" style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3.5vw,2.8rem)'}}>
                ISO Certified<br/>Manufacturing
              </h3>
              <p className="text-[#9BA5B4] text-[.88rem] mb-8 leading-relaxed">
                Certified to ISO 9001:2015 and RDSO standards — delivering consistent, traceable quality on every component we produce.
              </p>
              <Link href="/about-us" className="btn-flame py-3 px-7 text-xs group inline-flex gap-2 items-center">
                <span>Our Standards</span>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
