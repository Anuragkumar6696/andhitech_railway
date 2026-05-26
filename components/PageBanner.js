'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';

export default function PageBanner({ title='', backgroundImage, currentPage }) {
  const words = title.replace(/-/g,' ').split(' ');
  const last  = words.pop();
  const rest  = words.join(' ');

  return (
    <section className="relative h-[320px] md:h-[420px] flex items-center overflow-hidden" style={{ background:'#050608' }}>
      {/* Background image */}
      {(backgroundImage || '/images/page-header-bg.jpg') && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10" style={{ background:'rgba(5,6,8,.72)' }}/>
          <div className="absolute inset-0 z-10"
            style={{ background:'linear-gradient(to top,#050608 0%,transparent 40%,rgba(5,6,8,.35) 100%)' }}/>
          <div className="absolute inset-0 z-10"
            style={{ background:'linear-gradient(to right,#050608 0%,transparent 50%)' }}/>
          <Image
            src={backgroundImage || '/images/page-header-bg.jpg'}
            alt={title} fill
            className="object-cover scale-[1.05]"
            priority
          />
        </div>
      )}

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-45 z-[11] pointer-events-none"/>

      {/* Right light diagonal */}
      <div className="absolute right-0 top-0 bottom-0 w-2/5 z-[12] hidden lg:block pointer-events-none"
        style={{ background:'linear-gradient(to left,rgba(227,81,15,.07),transparent)', clipPath:'polygon(22% 0,100% 0,100% 100%,0 100%)' }}/>
      {/* Right accent rule */}
      <div className="absolute inset-y-0 w-px z-[13] hidden lg:block pointer-events-none"
        style={{ right:'20%', background:'linear-gradient(to bottom,transparent,rgba(227,81,15,.18),transparent)' }}/>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 z-[12] pointer-events-none"
        style={{ background:'linear-gradient(to top,#050608,transparent)' }}/>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 relative z-20 w-full">

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:.5 }}
          className="flex items-center gap-2 mb-8"
        >
          <Link href="/"
            className="flex items-center gap-1.5 text-[#4E5A6E] hover:text-[#E3510F] transition-colors"
            style={{ fontFamily:'var(--font-mono)', fontSize:'.56rem', letterSpacing:'.22em', textTransform:'uppercase' }}>
            <Home size={9}/> Home
          </Link>
          <ChevronRight size={9} className="text-[#2E3848]"/>
          <span className="text-[#8C98AA]"
            style={{ fontFamily:'var(--font-mono)', fontSize:'.56rem', letterSpacing:'.22em', textTransform:'uppercase' }}>
            {(currentPage||'').replace(/-/g,' ')}
          </span>
        </motion.nav>

        {/* Title */}
        <motion.h1
          initial={{ opacity:0, y:30, filter:'blur(6px)' }}
          animate={{ opacity:1, y:0, filter:'blur(0px)' }}
          transition={{ duration:.82, delay:.1, ease:[.22,1,.36,1] }}
          className="display-lg"
          style={{ lineHeight:.9 }}
        >
          {rest && <span className="text-[#EDF0F5]">{rest} </span>}
          <span style={{ color:'#E3510F' }}>{last}</span>
        </motion.h1>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX:0 }} animate={{ scaleX:1 }}
          transition={{ duration:.7, delay:.35, ease:[.22,1,.36,1] }}
          className="mt-6 origin-left"
          style={{ width:56, height:2, background:'linear-gradient(90deg,#E3510F,rgba(227,81,15,.2))' }}
        />
      </div>
    </section>
  );
}
