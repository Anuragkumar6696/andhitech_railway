'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Settings2, Wrench, ArrowRight, ChevronRight } from 'lucide-react';

const caps = [
  { Icon:Cpu,       title:'Automation & Smart Manufacturing', desc:'Integrated systems and modern technologies streamlining operations at scale with precision.' },
  { Icon:ShieldCheck,title:'Advanced Quality Control',        desc:'Rigorous multi-stage testing ensuring uncompromised product performance and safety.' },
  { Icon:Settings2,  title:'Process Engineering',             desc:'Enhanced engineering workflows for greater speed, accuracy, and scalability.' },
  { Icon:Wrench,     title:'Custom Product Development',      desc:'Tailored component design delivering real-world engineering solutions on time.' },
];

const ease = [.22,1,.36,1];

export default function WhatWeDo() {
  return (
    <section className="bg-[#07080C] py-24 md:py-36 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none"/>
      <div className="absolute inset-0 glow-right pointer-events-none"/>

      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.7,ease}}>
            <span className="eyebrow mb-6 block">Core Capabilities</span>
            <h2 className="display-md">Empowering Industry<br/>Through <span style={{color:'#E3510F'}}>Precision</span></h2>
          </motion.div>
          <motion.p initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.15,duration:.7,ease}}
            className="text-[#9BA5B4] leading-relaxed text-[.96rem] border-l-2 border-[#E3510F]/35 pl-6">
            End-to-end manufacturing solutions combining innovation, precision, and efficiency — from concept engineering through international certification.
          </motion.p>
        </div>

        {/* ── TRUE BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_auto_auto] gap-4">

          {/* [1] Large cinematic image — 5 cols, 2 rows */}
          <motion.div initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.9,ease}}
            className="md:col-span-5 md:row-span-2 cell relative overflow-hidden" style={{minHeight:460}}>
            <Image src="/images/whatwedorightimage.jpg" alt="Precision Manufacturing" fill
              className="object-cover opacity-55 group-hover:opacity-75 transition-opacity duration-700 scale-[1.03] hover:scale-100" unoptimized/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080C] via-[#07080C]/25 to-transparent"/>

            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-14 h-14" style={{background:'linear-gradient(135deg,rgba(227,81,15,.5) 0%,transparent 60%),'}}/>
            <div className="absolute top-0 left-0 w-px h-14 bg-[#E3510F]/60"/>
            <div className="absolute top-0 left-0 h-px w-14 bg-[#E3510F]/60"/>

            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[#E3510F] text-[.6rem] tracking-[.25em] uppercase font-mono mb-3">Since 2013</p>
              <h3 className="text-[#F0F2F5] leading-tight mb-6" style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.2rem)'}}>
                Precision.<br/>Safety.<br/>Performance.
              </h3>
              <Link href="/contact" className="btn-flame inline-flex py-3 px-6 text-xs gap-2 group">
                <span>Start a Project</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </div>
          </motion.div>

          {/* [2–5] 2×2 capability cards — 7 cols */}
          {caps.map(({ Icon, title, desc }, i) => (
            <motion.div key={i} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{delay:i*.09,duration:.65,ease}}
              className="md:col-span-7 lg:col-span-3 xl:col-span-3 cell p-7 group flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0
                group-hover:bg-[#E3510F] transition-colors duration-400">
                <Icon size={21} className="text-[#E3510F] group-hover:text-white transition-colors"/>
              </div>
              <div>
                <h3 className="text-[#F0F2F5] font-semibold text-[.93rem] mb-2 leading-snug">{title}</h3>
                <p className="text-[#5A6478] text-[.82rem] leading-relaxed">{desc}</p>
              </div>
              <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 text-[#E3510F] text-[.65rem] font-mono uppercase tracking-widest">
                  <span>Learn More</span><ChevronRight size={12}/>
                </div>
              </div>
            </motion.div>
          ))}

          {/* [6] Wide stats bar — full 12 cols */}
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.35,duration:.7,ease}}
            className="md:col-span-12 cell p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <p className="text-[#9BA5B4] text-[.88rem] leading-relaxed max-w-lg">
              From design and procurement to precision manufacturing and rigorous testing — AHIL manages the full production lifecycle with certified quality at every stage.
            </p>
            <div className="flex gap-10 flex-shrink-0 flex-wrap">
              {[['100+','Engineers'],['500+','Components'],['10+','Years']].map(([n,l]) => (
                <div key={l} className="text-center">
                  <div className="text-[2.2rem] font-bold text-[#E3510F] mb-0.5 leading-none" style={{fontFamily:'var(--font-display)'}}>{n}</div>
                  <div className="text-[.58rem] text-[#3A4457] uppercase tracking-[.18em] font-mono">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
