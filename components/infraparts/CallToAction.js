'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="relative py-20 bg-[#B88746] overflow-hidden">
      <div className="absolute inset-0 bg-grid-eng opacity-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-white/5 pointer-events-none" style={{clipPath:'polygon(20% 0,100% 0,100% 100%,0 100%)'}} />
      <div className="max-w-screen-xl mx-auto px-5 md:px-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.h3 initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
          className="text-white font-bold leading-tight max-w-2xl" style={{fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,3vw,2.4rem)'}}>
          Innovative Products and Solutions for Railways, Metros, Wagons, and more.
        </motion.h3>
        <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay:0.15 }}>
          <Link href="/products"
            className="inline-flex items-center gap-3 bg-white text-[#B88746] font-bold px-8 py-4 hover:bg-[#07080C] hover:text-white transition-all duration-300 group flex-shrink-0"
            style={{fontFamily:'var(--font-mono)',fontSize:'0.75rem',letterSpacing:'0.12em',textTransform:'uppercase',clipPath:'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))'}}>
            <span>Explore Products</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
