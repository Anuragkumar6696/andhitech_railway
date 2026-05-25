'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';

export default function PageBanner({ title = '', backgroundImage, currentPage }) {
  const words = title.replace(/-/g,' ').split(' ');
  const last  = words.pop();
  const rest  = words.join(' ');

  return (
    <section className="relative h-[320px] md:h-[400px] flex items-center overflow-hidden bg-[#07080C]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#07080C]/72 z-10"/>
        <div className="absolute inset-0 z-10" style={{background:'linear-gradient(to top,#07080C 0%,transparent 45%,rgba(7,8,12,.4) 100%)'}}/>
        <Image src={backgroundImage || '/images/page-header-bg.jpg'} alt={title} fill
          className="object-cover scale-[1.04]" priority/>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-50 z-[11] pointer-events-none"/>

      {/* Diagonal accent block */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 z-[12] hidden lg:block pointer-events-none opacity-15"
        style={{background:'linear-gradient(to left,rgba(227,81,15,.12),transparent)',clipPath:'polygon(25% 0,100% 0,100% 100%,0 100%)'}}/>

      {/* Right accent lines */}
      <div className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-[#E3510F]/20 to-transparent z-[13] hidden lg:block" style={{right:'22%'}}/>

      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-20 w-full">
        {/* Breadcrumb */}
        <motion.nav initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.5}}
          className="flex items-center gap-2 mb-7">
          <Link href="/" className="flex items-center gap-1.5 text-[#5A6478] hover:text-[#E3510F] transition-colors text-[.6rem] uppercase tracking-[.2em] font-mono">
            <Home size={10}/> Home
          </Link>
          <ChevronRight size={10} className="text-[#2D3748]"/>
          <span className="text-[#9BA5B4] text-[.6rem] uppercase tracking-[.2em] font-mono">{(currentPage||'').replace(/-/g,' ')}</span>
        </motion.nav>

        {/* Title */}
        <motion.h1 initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.12}}
          className="display-lg">
          {rest && <>{rest} </>}
          <span style={{color:'#E3510F'}}>{last}</span>
        </motion.h1>

        {/* Expanding accent line */}
        <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:.75,delay:.38}}
          className="mt-5 origin-left"
          style={{width:52,height:2,background:'linear-gradient(90deg,#E3510F,#FF6B35)'}}/>
      </div>
    </section>
  );
}
