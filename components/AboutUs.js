'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const features = [
  'Railway Rolling Stock Components',
  'Advanced HVAC Systems & Engineering',
  'Precision CNC Manufacturing',
  'State-of-the-Art Production Facilities',
];

const ease = [.22,1,.36,1];

export default function AboutUs() {
  return (
    <section className="bg-[#0D1117] py-24 md:py-36 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-fine opacity-60 pointer-events-none"/>
      <div className="absolute inset-0 glow-left pointer-events-none"/>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E3510F]/18 to-transparent"/>

      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28 items-center">

          {/* ── Image mosaic ── */}
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.9,ease}}
            className="relative">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden border border-white/[.06] relative">
              <Image src="/images/aboutback.jpg" alt="AND Hitech Engineering" width={620} height={560}
                className="w-full object-cover opacity-75 hover:opacity-90 hover:scale-[1.02] transition-all duration-700"
                style={{height:'480px'}}/>
              <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(13,17,23,.55) 0%,transparent 50%)'}}/>
            </div>

            {/* Overlapping accent image */}
            <div className="absolute -bottom-8 -right-8 w-[55%] rounded-2xl overflow-hidden border-4 border-[#0D1117] shadow-2xl hidden md:block">
              <Image src="/images/aboutfront.jpg" alt="AHIL Facility" width={360} height={240}
                className="w-full h-auto object-cover"/>
            </div>

            {/* Experience badge */}
            <div className="absolute -top-5 -left-5 hidden md:flex flex-col items-center justify-center text-white z-10"
              style={{width:90,height:90,background:'#E3510F',clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))'}}>
              <span className="text-3xl font-bold leading-none" style={{fontFamily:'var(--font-display)'}}>10+</span>
              <span className="text-[.52rem] uppercase tracking-wider opacity-80 font-mono">Years</span>
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 rounded-2xl bg-grid opacity-20 pointer-events-none"/>
          </motion.div>

          {/* ── Text content ── */}
          <div className="space-y-8">
            <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.7,ease}}>
              <span className="eyebrow mb-6 block">About AHIL</span>
              <h2 className="display-md mb-6">Leading the Way in<br/><span style={{color:'#E3510F'}}>Industrial Precision</span></h2>
              <p className="text-[#9BA5B4] text-[.96rem] leading-relaxed">
                Established in 2013, AND HITECH INDUSTRIES LTD (AHIL) has emerged as a trusted name in precision manufacturing, specializing in high-quality components for Railway Rolling Stock and advanced HVAC systems for Indian Railways and Metro networks.
              </p>
            </motion.div>

            <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.15,duration:.7,ease}}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f,i) => (
                <div key={i} className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/[.02] border border-white/[.05] hover:border-[#E3510F]/22 transition-colors group cursor-default">
                  <div className="w-5 h-5 rounded-full bg-[#E3510F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E3510F] transition-colors">
                    <CheckCircle2 size={11} className="text-[#E3510F] group-hover:text-white transition-colors"/>
                  </div>
                  <span className="text-[#9BA5B4] text-[.84rem] font-medium">{f}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:.3,duration:.7,ease}}
              className="pt-6 border-t border-white/[.06] flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link href="/about-us" className="btn-flame group inline-flex items-center gap-2">
                <span>Discover Our Story</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#E3510F] flex-shrink-0">
                  <Image src="/images/andhitechmd.jpg" alt="MD" width={44} height={44} className="object-cover w-full h-full"/>
                </div>
                <div>
                  <div className="text-[#F0F2F5] font-semibold text-[.88rem]">Managing Director</div>
                  <div className="text-[#5A6478] text-[.75rem] italic">Engineering excellence since 2013</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
